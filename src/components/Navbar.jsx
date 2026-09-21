'use client';

import { useState, useEffect } from 'react';
import { eventConfig } from '@/config/eventConfig';
import { Sparkles, Calendar, Heart, MessageSquare, PhoneCall, Gift, Menu, X } from 'lucide-react';

export default function Navbar({ onOpenRsvp, onOpenGift }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Trang Chủ', href: '#hero', icon: Sparkles },
    { name: 'Lời Cảm Ơn', href: '#thank-you', icon: Heart },
    { name: 'Lễ Tốt Nghiệp', href: '#event-info', icon: Calendar },
    { name: 'Sổ Lưu Bút', href: '#wishes', icon: MessageSquare },
    { name: 'Liên Hệ', href: '#contact', icon: PhoneCall },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-navy-950/85 backdrop-blur-md border-b border-gold-500/20 py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Name */}
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-gold-600 to-gold-300 flex items-center justify-center font-bold text-navy-950 text-sm shadow-md group-hover:scale-105 transition-transform">
            TH
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold text-white tracking-wide group-hover:text-gold-400 transition-colors">
              {eventConfig.graduate.fullName}
            </span>
            <span className="text-[10px] text-gold-400/80 uppercase tracking-widest -mt-1 font-sans">
              Graduation Invitation
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-gold-400 transition-colors flex items-center gap-1.5 py-1"
              >
                <Icon className="w-4 h-4 text-gold-500/70" />
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenRsvp}
            className="px-4 py-1.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-bold text-xs shadow-md shadow-gold-500/20 hover:shadow-gold-500/40 transition-all transform hover:-translate-y-0.5"
          >
            Xác Nhận Tham Dự
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-300 hover:text-white rounded-lg focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-gold-500/20 px-6 py-4 space-y-3 mt-2 shadow-2xl animate-fadeIn">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 py-2 text-gray-200 hover:text-gold-400 font-medium border-b border-gray-800/60 text-sm"
              >
                <Icon className="w-4 h-4 text-gold-400" />
                {link.name}
              </a>
            );
          })}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRsvp();
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-bold text-xs text-center shadow-md"
            >
              Xác Nhận Tham Dự
            </button>
        </div>
      )}
    </header>
  );
}
