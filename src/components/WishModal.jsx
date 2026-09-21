'use client';

import { useState } from 'react';
import { eventConfig } from '@/config/eventConfig';
import { X, CheckCircle, Send, User, MessageSquare, Sparkles, Loader2, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function WishModal({ isOpen, onClose, onWishAdded }) {
  const [formData, setFormData] = useState({
    fullName: '',
    wish: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#e5b800', '#ffffff', '#10b981', '#ffd643'],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setErrorMsg('Vui lòng nhập tên của bạn.');
      return;
    }
    if (!formData.wish.trim()) {
      setErrorMsg('Vui lòng nhập lời chúc.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const scriptUrl = eventConfig.googleScriptUrl;

      if (scriptUrl) {
        // Send request to Google Apps Script endpoint
        await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName: formData.fullName,
            wish: formData.wish,
            type: 'wish',
          }),
        });
      }

      // Trigger success confetti & state update
      triggerConfetti();
      setSuccess(true);
      setLoading(false);

      // Notify parent to add wish to local wall list
      if (onWishAdded) {
        onWishAdded({
          id: Date.now(),
          name: formData.fullName,
          attendance: 'Gửi lời chúc',
          wish: formData.wish,
          date: 'Vừa xong',
        });
      }
    } catch (err) {
      console.error('Wish submission error:', err);
      triggerConfetti();
      setSuccess(true);
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccess(false);
    setFormData({
      fullName: '',
      wish: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg glass-panel-gold rounded-3xl border border-gold-500/40 p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-white rounded-full hover:bg-gold-500/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-gold-500/20 border border-gold-400 flex items-center justify-center mx-auto mb-4 text-gold-400">
              <Heart className="w-10 h-10 fill-gold-400" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-white mb-2">
              Gửi Lời Chúc Thành Công!
            </h3>
            <p className="text-gray-300 text-sm mb-6 max-w-xs mx-auto">
              Cảm ơn <span className="text-gold-300 font-semibold">{formData.fullName}</span> đã gửi những lời chúc tốt đẹp đến Thịnh Hưng!
            </p>
            <button
              onClick={handleReset}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-bold text-sm shadow-md"
            >
              Hoàn Tất & Đóng
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Sổ Lưu Bút Kỷ Niệm</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-white mb-1">
              Gửi Lời Chúc Đến Thịnh Hưng
            </h3>
            <p className="text-xs text-gray-300 mb-6">
              Lời chúc của bạn sẽ được lưu giữ lại tại góc kỷ niệm này!
            </p>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-gold-400" />
                  Họ và Tên của bạn <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-navy-900/80 border border-gold-500/20 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-gold-400 transition-colors"
                />
              </div>

              {/* Wish / Message */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-gold-400" />
                  Lời Chúc Mừng <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows="4"
                  required
                  placeholder="Viết những lời chúc mừng và kỷ niệm đáng nhớ đến Hưng..."
                  value={formData.wish}
                  onChange={(e) => setFormData({ ...formData, wish: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-navy-900/80 border border-gold-500/20 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-gold-400 transition-colors resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-bold text-sm shadow-lg shadow-gold-500/20 flex items-center justify-center gap-2 transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Đang Gửi Lời Chúc...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Gửi Lời Chúc Ngay</span>
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
