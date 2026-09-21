'use client';

import { eventConfig } from '@/config/eventConfig';
import { Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 bg-navy-950 border-t border-gold-500/10 text-center relative z-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gold-600 to-gold-300 flex items-center justify-center font-bold text-navy-950 text-base mx-auto mb-4 shadow-md">
          TH
        </div>
        <h3 className="font-serif text-xl font-bold text-white mb-2">
          {eventConfig.graduate.fullName}
        </h3>
        <p className="text-xs text-gold-400/80 uppercase tracking-widest mb-6">
          Graduation Ceremony Invitation 2026
        </p>

        <p className="text-[10px] xs:text-[11px] sm:text-xs text-gray-400 flex items-center justify-center gap-1 whitespace-nowrap overflow-hidden px-1">
          <span>Thiết kế dành riêng cho ngày Tốt Nghiệp của Huỳnh Thịnh Hưng</span>
          <Heart className="w-3.5 h-3.5 text-gold-400 fill-gold-500/40 shrink-0" />
        </p>
      </div>
    </footer>
  );
}
