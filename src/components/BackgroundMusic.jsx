'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const userPausedRef = useRef(false);

  // Gentle audio source (relaxed ambient acoustic instrumental)
  const audioUrl = process.env.NEXT_PUBLIC_MUSIC_URL || "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=acoustic-guitars-ambient-116186.mp3";

  const togglePlay = (e) => {
    if (e) e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      userPausedRef.current = true;
    } else {
      userPausedRef.current = false;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Audio play error:', err));
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // 1. Try initial autoplay on mount
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        setIsPlaying(false);
      });

    // 2. Play on first user interaction if autoplay was blocked & user didn't manually pause
    const handleFirstInteraction = () => {
      if (audioRef.current && !userPausedRef.current) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center">
      <audio ref={audioRef} src={audioUrl} loop preload="auto" />
      <button
        onClick={togglePlay}
        className={`relative p-3.5 rounded-full glass-panel border border-gold-500/40 text-gold-400 shadow-xl transition-all transform hover:scale-110 flex items-center justify-center ${
          isPlaying ? 'gold-glow bg-gold-500/20 text-gold-300' : 'bg-navy-900/90 text-gray-400'
        }`}
        title={isPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-5 h-5 animate-pulse text-gold-400" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-gold-500"></span>
            </span>
          </>
        ) : (
          <VolumeX className="w-5 h-5 opacity-70" />
        )}
      </button>
    </div>
  );
}

