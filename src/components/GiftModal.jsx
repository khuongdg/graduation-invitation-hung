'use client';

import { useState } from 'react';
import { eventConfig } from '@/config/eventConfig';
import { X, Gift, Copy, Check, QrCode, CreditCard, Sparkles } from 'lucide-react';

export default function GiftModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('bank'); // 'bank' | 'momo'

  if (!isOpen) return null;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md glass-panel-gold rounded-3xl border border-gold-500/40 p-6 sm:p-8 shadow-2xl text-center overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full hover:bg-gold-500/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-gold-500/20 border border-gold-400 flex items-center justify-center mx-auto mb-4 text-gold-400 shadow-lg">
          <Gift className="w-7 h-7" />
        </div>

        <div className="flex items-center justify-center gap-1.5 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Món Quà Yêu Thương</span>
        </div>

        <h3 className="text-2xl font-serif font-bold text-white mb-2">
          Mừng Tốt Nghiệp Thịnh Hưng
        </h3>
        <p className="text-xs text-gray-300 mb-6 max-w-xs mx-auto">
          Sự hiện diện và lời chúc của bạn là món quà trân quý nhất! Nếu ở xa, bạn có thể gửi quà mừng qua đây nhé.
        </p>

        {/* Payment Tabs */}
        <div className="flex rounded-xl bg-navy-900/80 p-1 mb-6 border border-gold-500/20">
          <button
            onClick={() => setActiveTab('bank')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'bank'
                ? 'bg-gold-500 text-navy-950 shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Ngân Hàng</span>
          </button>
          <button
            onClick={() => setActiveTab('momo')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'momo'
                ? 'bg-pink-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Ví MoMo</span>
          </button>
        </div>

        {activeTab === 'bank' ? (
          <div className="space-y-4">
            {/* QR Image Frame */}
            <div className="w-48 h-48 mx-auto rounded-2xl bg-white p-2 shadow-inner border border-gold-400/40 overflow-hidden">
              <img
                src={eventConfig.giftInfo.qrCodeImg}
                alt="Bank QR Code"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="glass-panel p-4 rounded-xl border border-gold-500/20 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Ngân hàng:</span>
                <span className="font-bold text-white">{eventConfig.giftInfo.bankName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Chủ tài khoản:</span>
                <span className="font-bold text-gold-300">{eventConfig.giftInfo.accountName}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-800">
                <span className="text-gray-400">Số tài khoản:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-white text-sm">
                    {eventConfig.giftInfo.accountNumber}
                  </span>
                  <button
                    onClick={() => handleCopy(eventConfig.giftInfo.accountNumber)}
                    className="p-1 text-gold-400 hover:text-gold-300 rounded hover:bg-gold-500/10 transition-colors"
                    title="Sao chép số tài khoản"
                  >
                    {copied ? <Check className="w-4 h-4 text-emeraldGlow-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-48 h-48 mx-auto rounded-2xl bg-white p-2 shadow-inner border border-pink-400/40 overflow-hidden">
              <img
                src={eventConfig.giftInfo.qrCodeImg}
                alt="MoMo QR Code"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="glass-panel p-4 rounded-xl border border-pink-500/20 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Ví điện tử:</span>
                <span className="font-bold text-pink-400">MoMo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Chủ tài khoản:</span>
                <span className="font-bold text-white">{eventConfig.giftInfo.accountName}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-800">
                <span className="text-gray-400">Số điện thoại MoMo:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-white text-sm">
                    {eventConfig.giftInfo.momoPhone}
                  </span>
                  <button
                    onClick={() => handleCopy(eventConfig.giftInfo.momoPhone)}
                    className="p-1 text-pink-400 hover:text-pink-300 rounded hover:bg-pink-500/10 transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-emeraldGlow-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
