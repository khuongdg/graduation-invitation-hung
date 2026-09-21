'use client';

import { useState } from 'react';
import { eventConfig } from '@/config/eventConfig';
import { X, CheckCircle, Send, User, Phone, Mail, Users, Sparkles, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RsvpModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    attendance: 'Sẽ tham dự',
    guestCount: '1',
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
      setErrorMsg('Vui lòng nhập họ và tên của bạn.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('Vui lòng nhập số điện thoại.');
      return;
    }
    if (!formData.email.trim()) {
      setErrorMsg('Vui lòng nhập địa chỉ email.');
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
          body: JSON.stringify({ ...formData, type: 'rsvp' }),
        });
      }

      // Trigger success confetti & state update
      triggerConfetti();
      setSuccess(true);
      setLoading(false);
    } catch (err) {
      console.error('RSVP submission error:', err);
      // Even if network CORS occurs, acknowledge user attempt gracefully
      triggerConfetti();
      setSuccess(true);
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccess(false);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      attendance: 'Sẽ tham dự',
      guestCount: '1',
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
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-white mb-2">
              Xác Nhận Thành Công!
            </h3>
            <p className="text-gray-300 text-sm mb-6 max-w-xs mx-auto">
              Cảm ơn <span className="text-gold-300 font-semibold">{formData.fullName}</span> đã gửi phản hồi. Hưng rất mong chờ được đón tiếp bạn!
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
              <span>Thiệp Mời Tốt Nghiệp</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-white mb-1">
              Xác Nhận Tham Dự
            </h3>
            <p className="text-xs text-gray-300 mb-6">
              Vui lòng cho Hưng biết sự có mặt của bạn trước ngày lễ nhé!
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
                  Họ và Tên <span className="text-red-400">*</span>
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

              {/* Phone / Zalo */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-gold-400" />
                  Số Điện Thoại <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Ví dụ: 0912345678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-navy-900/80 border border-gold-500/20 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-gold-400 transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-gold-400" />
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="Ví dụ: email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-navy-900/80 border border-gold-500/20 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-gold-400 transition-colors"
                />
              </div>

              {/* Attendance Choice */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-gold-400" />
                  Xác Nhận Tham Dự <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Sẽ tham dự', 'Tiếc là không thể', 'Chưa chắc chắn'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setFormData({ ...formData, attendance: option })}
                      className={`py-2 px-2 rounded-xl text-xs font-medium border transition-all ${
                        formData.attendance === option
                          ? 'bg-gold-500/20 border-gold-400 text-gold-300 font-bold'
                          : 'bg-navy-900/50 border-gray-800 text-gray-400 hover:border-gray-700'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Count */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-gold-400" />
                  Số Người Đi Cùng (Bao gồm bạn) <span className="text-red-400">*</span>
                </label>
                <select
                  required
                  value={formData.guestCount}
                  onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-navy-900/80 border border-gold-500/20 text-white text-sm focus:outline-none focus:border-gold-400 transition-colors"
                >
                  <option value="1">1 người (Chỉ mình tôi)</option>
                  <option value="2">2 người</option>
                  <option value="3">3 người</option>
                  <option value="4+">4 người trở lên</option>
                </select>
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
                    <span>Đang Gửi Phản Hồi...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Gửi Phản Hồi Ngay</span>
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
