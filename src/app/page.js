'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ThankYouSection from '@/components/ThankYouSection';
import EventInfoSection from '@/components/EventInfoSection';
import WishesWallSection from '@/components/WishesWallSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import BackgroundMusic from '@/components/BackgroundMusic';
import RsvpModal from '@/components/RsvpModal';
import WishModal from '@/components/WishModal';
import GiftModal from '@/components/GiftModal';
import { eventConfig } from '@/config/eventConfig';

export default function Home() {
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [isWishOpen, setIsWishOpen] = useState(false);
  const [isGiftOpen, setIsGiftOpen] = useState(false);
  const [wishes, setWishes] = useState(eventConfig.sampleWishes);

  const handleWishAdded = (newWish) => {
    setWishes((prev) => [newWish, ...prev]);
  };

  return (
    <main className="min-h-screen bg-navy-950 text-white selection:bg-gold-500 selection:text-navy-950 relative overflow-x-hidden">
      {/* Floating Audio Player */}
      <BackgroundMusic />

      {/* Navigation Header */}
      <Navbar
        onOpenRsvp={() => setIsRsvpOpen(true)}
        onOpenGift={() => setIsGiftOpen(true)}
      />

      {/* Hero / Landing Section */}
      <HeroSection
        onOpenRsvp={() => setIsRsvpOpen(true)}
      />

      {/* Lời Cảm Ơn / Gratitude Section */}
      <ThankYouSection />

      {/* Thông Tin Lễ Tốt Nghiệp & RSVP Confirmation Section */}
      <EventInfoSection
        onOpenRsvp={() => setIsRsvpOpen(true)}
      />

      {/* Sổ Lưu Bút & Lời Chúc Section */}
      <WishesWallSection
        wishesList={wishes}
        onOpenWishModal={() => setIsWishOpen(true)}
      />

      {/* Thông Tin Liên Hệ & Gift Box Section */}
      <ContactSection
        onOpenGift={() => setIsGiftOpen(true)}
        onOpenRsvp={() => setIsRsvpOpen(true)}
      />

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <RsvpModal
        isOpen={isRsvpOpen}
        onClose={() => setIsRsvpOpen(false)}
      />

      <WishModal
        isOpen={isWishOpen}
        onClose={() => setIsWishOpen(false)}
        onWishAdded={handleWishAdded}
      />

      <GiftModal
        isOpen={isGiftOpen}
        onClose={() => setIsGiftOpen(false)}
      />
    </main>
  );
}
