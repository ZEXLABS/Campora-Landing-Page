import React, { useState, useEffect } from 'react';
import { WaitlistUser } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductPreview } from './components/ProductPreview';
import { Benefits } from './components/Benefits';
import { HowItWorks } from './components/HowItWorks';
import { WaitlistForm } from './components/WaitlistForm';
import { SuccessState } from './components/SuccessState';
import { SocialProof } from './components/SocialProof';
import { FAQSection } from './components/FAQSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { CheckPositionModal } from './components/CheckPositionModal';
import { AdminDashboard } from './components/AdminDashboard';
import { LegalModals } from './components/LegalModals';

export default function App() {
  const [currentUser, setCurrentUser] = useState<WaitlistUser | null>(null);
  const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'contact' | null>(null);

  // Restore saved session from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('campora_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.email) {
          setCurrentUser(parsed);
        }
      }
    } catch (e) {
      // Ignore storage errors
    }
  }, []);

  const scrollToWaitlist = () => {
    if (currentUser) {
      // User is already registered and seeing success state
      const el = document.getElementById('success-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      const el = document.getElementById('waitlist-form');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#0F172A] selection:bg-[#0D9488] selection:text-white">
      {/* Navigation Header */}
      <Header
        onCheckPositionClick={() => setIsCheckModalOpen(true)}
        onAdminClick={() => setIsAdminOpen(true)}
        onJoinClick={scrollToWaitlist}
      />

      {/* Main Page Body */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onJoinClick={scrollToWaitlist}
          onAboutClick={scrollToAbout}
        />

        {/* 2. Product Preview Section */}
        <ProductPreview onInquireClick={scrollToWaitlist} />

        {/* 3. Benefits Section */}
        <Benefits />

        {/* 4. How It Works */}
        <HowItWorks />

        {/* 5. Waitlist Form or Success State */}
        <div id="success-section">
          {currentUser ? (
            <SuccessState user={currentUser} />
          ) : (
            <WaitlistForm onSuccess={(user) => setCurrentUser(user)} />
          )}
        </div>

        {/* 6. Dynamic Social Proof */}
        <SocialProof />

        {/* 7. FAQ Section */}
        <FAQSection />

        {/* 8. Final CTA Banner */}
        <FinalCTA onJoinClick={scrollToWaitlist} />
      </main>

      {/* Footer */}
      <Footer
        onOpenLegal={(type) => setLegalModalType(type)}
        onAdminClick={() => setIsAdminOpen(true)}
      />

      {/* Check Position Modal */}
      <CheckPositionModal
        isOpen={isCheckModalOpen}
        onClose={() => setIsCheckModalOpen(false)}
        onUserFound={(user) => setCurrentUser(user)}
      />

      {/* Protected Admin Portal */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Privacy, Terms, Contact Modals */}
      <LegalModals
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}
