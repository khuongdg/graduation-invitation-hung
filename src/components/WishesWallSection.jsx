'use client';

import { useState, useEffect } from 'react';
import { eventConfig } from '@/config/eventConfig';
import { MessageSquare, Sparkles, Heart, Quote } from 'lucide-react';

export default function WishesWallSection({ wishesList, onOpenWishModal }) {
  const [wishes, setWishes] = useState(wishesList || []);
  const [loading, setLoading] = useState(false);

  // Sync prop changes
  useEffect(() => {
    if (wishesList) {
      setWishes(wishesList);
    }
  }, [wishesList]);

  // Fetch live wishes from Google Apps Script if available
  const fetchLiveWishes = async () => {
    const scriptUrl = eventConfig.googleScriptUrl;
    if (!scriptUrl) return;

    setLoading(true);
    try {
      const res = await fetch(scriptUrl);
      const json = await res.json();
      if (json && json.result === 'success' && Array.isArray(json.data)) {
        setWishes(json.data);
      }
    } catch (err) {
      console.log('Error fetching live wishes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveWishes();
  }, []);

  return (
    <section id="wishes" className="py-24 relative bg-navy-900/40 border-t border-b border-gold-500/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-gold-500/20 text-gold-400 text-xs font-medium uppercase tracking-widest mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Sổ Lưu Bút & Lời Chúc</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
            Góc Kỉ Niệm & Lời Chúc Mừng
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-gold-500 to-transparent mx-auto rounded-full mb-6"></div>
          <p className="text-gray-300 text-sm sm:text-base">
            Những tình cảm thương yêu từ người thân, thầy cô và bạn bè dành gửi cho Huỳnh Thịnh Hưng.
          </p>

          <div className="mt-6 flex items-center justify-center">
            <button
              onClick={onOpenWishModal}
              className="px-6 py-2.5 rounded-full bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/30 text-gold-300 text-xs font-semibold flex items-center gap-2 transition-all shadow-sm hover:border-gold-400"
            >
              <Heart className="w-3.5 h-3.5 text-gold-400 fill-gold-500/30" />
              <span>Gửi Lời Chúc Mới</span>
            </button>
          </div>
        </div>

        {/* Wishes Cards Masonry / Grid or Empty State */}
        {wishes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishes.map((item) => (
              <div
                key={item.id || Math.random()}
                className="glass-panel p-6 rounded-2xl border border-gold-500/15 hover:border-gold-500/40 transition-all duration-300 flex flex-col justify-between group relative"
              >
                <div className="absolute top-4 right-4 text-gold-500/10 group-hover:text-gold-500/20 transition-colors">
                  <Quote className="w-10 h-10" />
                </div>

                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gold-600 to-gold-400 flex items-center justify-center font-bold text-navy-950 text-xs shadow-sm">
                        {item.name ? item.name.charAt(0).toUpperCase() : 'K'}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-gold-300 transition-colors">
                          {item.name}
                        </h4>
                        <span className="text-[10px] text-gold-400/80 bg-gold-500/10 px-2 py-0.5 rounded-full border border-gold-500/20 inline-block mt-0.5">
                          {item.attendance || 'Gửi lời chúc'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed italic relative z-10 mb-4">
                    "{item.wish}"
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-800/80 flex items-center justify-between text-[11px] text-gray-400">
                  <span>{item.date || 'Gần đây'}</span>
                  <Sparkles className="w-3 h-3 text-gold-400/50" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-panel p-10 rounded-2xl border border-gold-500/20 text-center max-w-md mx-auto">
            <MessageSquare className="w-10 h-10 text-gold-400/50 mx-auto mb-3" />
            <p className="text-gray-300 text-sm font-medium">Chưa có lời chúc nào.</p>
            <p className="text-gray-400 text-xs mt-1 mb-6">Hãy là người đầu tiên gửi lời chúc mừng đến Huỳnh Thịnh Hưng!</p>
            <button
              onClick={onOpenWishModal}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 text-xs font-bold shadow-md hover:from-gold-400 hover:to-gold-500 transition-all inline-flex items-center gap-2"
            >
              <Heart className="w-3.5 h-3.5 fill-navy-950" />
              <span>Gửi Lời Chúc Ngay</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
