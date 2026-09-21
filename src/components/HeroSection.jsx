'use client';

import { useState, useEffect } from 'react';
import { eventConfig } from '@/config/eventConfig';
import { Calendar, MapPin, Sparkles, ChevronDown, CheckCircle, GraduationCap } from 'lucide-react';

export default function HeroSection({ onOpenRsvp }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date(eventConfig.event.dateISO).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center bg-spotlight overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-emeraldGlow-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
        {/* Invitation Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-gold-500/30 text-gold-300 text-xs font-semibold tracking-wider uppercase mb-6 animate-pulse-slow">
          <GraduationCap className="w-4 h-4 text-gold-400" />
          <span>Thiệp Mời Lễ Tốt Nghiệp</span>
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
        </div>

        {/* Graduate Name & Title */}
        <h2 className="text-[11px] xs:text-xs sm:text-sm uppercase tracking-[0.12em] sm:tracking-[0.25em] text-gray-400 mb-2 font-medium whitespace-nowrap overflow-hidden">
          Mời Bạn Tham Dự Lễ Tốt Nghiệp Của
        </h2>
        
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-gold-gradient tracking-tight leading-normal pb-2 mb-2 drop-shadow-md">
          {eventConfig.graduate.fullName}
        </h1>

        <p className="text-lg sm:text-xl text-gray-300 font-light max-w-2xl mx-auto mb-8 leading-relaxed">
          Tân {eventConfig.graduate.degree} ngành <span className="text-gold-300 font-semibold">{eventConfig.graduate.major}</span>
        </p>

        {/* Graduate Photo Card Frame */}
        <div className="relative w-44 h-44 sm:w-56 sm:h-56 mx-auto mb-10 group">
          <div className="absolute -inset-2 bg-gradient-to-r from-gold-500 via-yellow-300 to-gold-600 rounded-full blur-md opacity-60 group-hover:opacity-100 transition duration-500 animate-glow"></div>
          <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-gold-400/80 p-1 bg-navy-900 shadow-2xl">
            <img
              src={eventConfig.graduate.avatar}
              alt={eventConfig.graduate.fullName}
              className="w-full h-full object-cover rounded-full transform group-hover:scale-105 transition duration-500"
            />
          </div>
        </div>

        {/* Subtitle Message */}
        <p className="text-sm sm:text-base text-gray-300/90 max-w-xl mx-auto mb-10 italic">
          "{eventConfig.graduate.heroSubtitle}"
        </p>

        {/* Countdown Timer Grid */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="text-xs text-gold-400 uppercase tracking-widest mb-3 font-semibold">
            Đếm Ngược Tới Ngày Lễ
          </div>
          <div className="grid grid-cols-4 gap-3 sm:gap-4">
            {[
              { label: 'Ngày', value: timeLeft.days },
              { label: 'Giờ', value: timeLeft.hours },
              { label: 'Phút', value: timeLeft.minutes },
              { label: 'Giây', value: timeLeft.seconds },
            ].map((item, idx) => (
              <div
                key={idx}
                className="glass-panel-gold p-3 sm:p-4 rounded-2xl flex flex-col items-center justify-center border border-gold-500/30"
              >
                <span className="text-2xl sm:text-4xl font-bold font-display text-white">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="text-[11px] sm:text-xs text-gold-300/80 uppercase font-medium mt-1">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Event Pills */}
        <div className="flex flex-wrap justify-center gap-4 text-xs sm:text-sm text-gray-300 mb-10">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass-panel border-gold-500/20">
            <Calendar className="w-4 h-4 text-gold-400" />
            <span>{eventConfig.event.displayDate}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass-panel border-gold-500/20">
            <MapPin className="w-4 h-4 text-gold-400" />
            <span>{eventConfig.event.venueName}</span>
          </div>
        </div>

        {/* Main CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          {/* <button
            onClick={onOpenRsvp}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-bold text-sm shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Xác Nhận Tham Dự</span>
          </button> */}
          <a
            href="#event-info"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-gold-500/40 hover:bg-gold-500/10 text-gold-300 font-semibold text-sm transition-all text-center"
          >
            Xem Chi Tiết Lễ Tốt Nghiệp
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 flex justify-center">
          <a href="#thank-you" className="text-gray-400 hover:text-gold-400 transition-colors animate-bounce p-2">
            <ChevronDown className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
