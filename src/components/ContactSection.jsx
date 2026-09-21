'use client';

import { eventConfig } from '@/config/eventConfig';
import { PhoneCall, Mail, Send, ExternalLink } from 'lucide-react';

export default function ContactSection() {
  const phoneDigits = eventConfig.contact.phone ? eventConfig.contact.phone.replace(/\s+/g, '') : '';

  return (
    <section id="contact" className="py-24 relative bg-navy-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-gold-500/20 text-gold-400 text-xs font-medium uppercase tracking-widest mb-3">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Thông Tin Liên Hệ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
            Kết Nối Với Thịnh Hưng
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-gold-500 to-transparent mx-auto rounded-full mb-6"></div>
          <p className="text-gray-300 text-sm">
            Nếu bạn có bất kỳ câu hỏi nào về địa điểm, thời gian hoặc cần hỗ trợ chỉ đường, đừng ngần ngại liên hệ Hưng nhé!
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Phone / Zalo */}
          <div className="glass-panel p-6 rounded-2xl border border-gold-500/20 text-center flex flex-col items-center hover:border-gold-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-4">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white mb-1">Điện Thoại / Zalo</h4>
            <p className="text-xs text-gray-400 mb-4">{eventConfig.contact.phone}</p>
            <a
              href={`tel:${phoneDigits}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-400 hover:text-gold-300 bg-gold-500/10 px-4 py-2 rounded-xl border border-gold-500/20 hover:bg-gold-500/20 transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Gọi Ngay</span>
            </a>
          </div>

          {/* Facebook */}
          <div className="glass-panel p-6 rounded-2xl border border-gold-500/20 text-center flex flex-col items-center hover:border-gold-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-4">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            <h4 className="text-base font-bold text-white mb-1">Facebook</h4>
            <p className="text-xs text-gray-400 mb-4">Huỳnh Thịnh Hưng</p>
            <a
              href={eventConfig.contact.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-400 hover:text-gold-300 bg-gold-500/10 px-4 py-2 rounded-xl border border-gold-500/20 hover:bg-gold-500/20 transition-all"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Ghé Facebook</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Email */}
          <div className="glass-panel p-6 rounded-2xl border border-gold-500/20 text-center flex flex-col items-center hover:border-gold-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white mb-1">Email</h4>
            <p className="text-xs text-gray-400 mb-4">{eventConfig.contact.email}</p>
            <a
              href={`mailto:${eventConfig.contact.email}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-400 hover:text-gold-300 bg-gold-500/10 px-4 py-2 rounded-xl border border-gold-500/20 hover:bg-gold-500/20 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Gửi Email</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
