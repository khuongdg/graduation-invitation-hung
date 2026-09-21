'use client';

import { eventConfig } from '@/config/eventConfig';
import { Calendar, Clock, MapPin, Shirt, Navigation, CheckCircle, ExternalLink } from 'lucide-react';

export default function EventInfoSection({ onOpenRsvp }) {
  // Helper to build Google Calendar link
  const createCalendarUrl = () => {
    const title = encodeURIComponent(`Lễ Tốt Nghiệp Huỳnh Thịnh Hưng`);
    const details = encodeURIComponent(`Trân trọng kính mời bạn đến dự Lễ Tốt Nghiệp của Huỳnh Thịnh Hưng!`);
    const location = encodeURIComponent(`${eventConfig.event.venueName}, ${eventConfig.event.address}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <section id="event-info" className="py-24 relative bg-navy-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-gold-500/20 text-gold-400 text-xs font-medium uppercase tracking-widest mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>Thời Gian & Địa Điểm</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
            Thông Tin Lễ Tốt Nghiệp
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-gold-500 to-transparent mx-auto rounded-full mb-6"></div>
          <p className="text-gray-300 text-sm sm:text-base">
            Sự hiện diện của bạn là niềm vinh hạnh lớn nhất đối với Hưng trong ngày trọng đại này.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Card 1: Time & Date */}
          <div className="glass-panel-gold p-8 rounded-2xl border border-gold-500/30 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400 mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-2">Thời Gian Diễn Ra</h3>
              <p className="text-2xl font-bold text-gold-300 mb-2 font-display">
                {eventConfig.event.displayTime}
              </p>
              <p className="text-gray-300 text-sm mb-6 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gold-400" />
                {eventConfig.event.displayDate}
              </p>
            </div>

            <a
              href={createCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-gold-400 hover:text-gold-300 border border-gold-500/30 px-4 py-2 rounded-xl hover:bg-gold-500/10 transition-colors w-fit"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Thêm Vào Google Calendar</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Card 2: Location & Address */}
          <div className="glass-panel p-8 rounded-2xl border border-gold-500/20 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-2">Địa Điểm Tổ Chức</h3>
              <p className="text-lg font-bold text-gold-300 mb-2">
                {eventConfig.event.venueName}
              </p>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                {eventConfig.event.address}
              </p>
            </div>

            <a
              href={eventConfig.event.googleMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-navy-950 bg-gold-400 hover:bg-gold-300 px-4 py-2 rounded-xl transition-all shadow-md w-fit"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Mở Bản Đồ Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Dresscode Pill Banner */}
        <div className="glass-panel p-6 rounded-2xl border border-gold-500/20 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
              <Shirt className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Trang Phục Gợi Ý (Dress Code)</h4>
              <p className="text-xs text-gray-300 mt-0.5">{eventConfig.event.dressCode}</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-gold-400 bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/20">
            Lịch Sự / Trang Trọng
          </span>
        </div>

        {/* Highlighted Confirmation RSVP Box */}
        <div className="glass-panel-gold p-8 sm:p-10 rounded-3xl border-2 border-gold-500/40 text-center max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent"></div>
          
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">
            Xác Nhận Tham Dự Ngay
          </h3>
          <p className="text-gray-300 text-sm mb-8 max-w-md mx-auto">
            Vui lòng điền thông tin để Hưng chuẩn bị đón tiếp chu đáo nhất nhé!
          </p>

          <button
            onClick={onOpenRsvp}
            className="px-10 py-4 rounded-full bg-gradient-to-r from-gold-500 via-yellow-400 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-bold text-base shadow-xl shadow-gold-500/30 hover:shadow-gold-500/50 transition-all transform hover:-translate-y-1 inline-flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            <span>Điền Thông Tin Xác Nhận</span>
          </button>
        </div>
      </div>
    </section>
  );
}
