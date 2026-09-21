'use client';

import { eventConfig } from '@/config/eventConfig';
import { Heart, GraduationCap, Users, Quote, Sparkles } from 'lucide-react';

export default function ThankYouSection() {
  const iconMap = {
    Heart: Heart,
    GraduationCap: GraduationCap,
    Users: Users,
  };

  return (
    <section id="thank-you" className="py-24 relative bg-navy-900/60 border-t border-b border-gold-500/10">
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-gold-500/20 text-gold-400 text-xs font-medium uppercase tracking-widest mb-3">
            <Heart className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
            <span>Tri Ân & Biết Ơn</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
            {eventConfig.gratitude.title}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-gold-500 to-transparent mx-auto rounded-full mb-6"></div>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            {eventConfig.gratitude.subtitle}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {eventConfig.gratitude.cards.map((card) => {
            const IconComponent = iconMap[card.icon] || Heart;

            return (
              <div
                key={card.id}
                className="glass-panel p-8 rounded-2xl border border-gold-500/20 hover:border-gold-500/50 transition-all duration-300 transform hover:-translate-y-2 group relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-16 h-16 text-gold-400" />
                </div>

                <div>
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-6 group-hover:scale-110 group-hover:bg-gold-500/20 transition-all">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-serif font-bold text-gold-300 mb-3 group-hover:text-gold-200 transition-colors">
                    {card.role}
                  </h3>

                  <p className="text-gray-300 text-sm leading-relaxed italic relative z-10">
                    "{card.content}"
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-800 flex items-center justify-between text-xs text-gold-400/70">
                  <span>Tài sản vô giá</span>
                  <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
