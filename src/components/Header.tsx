import React from 'react';
import { Logo } from './Logo';
import { Search, Shield } from 'lucide-react';

interface HeaderProps {
  onCheckPositionClick: () => void;
  onAdminClick: () => void;
  onJoinClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onCheckPositionClick,
  onAdminClick,
  onJoinClick,
}) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#E7E5E4] transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <a href="#" className="flex items-center group">
          <Logo />
        </a>

        {/* Center Navigation Links (Hidden on mobile) */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-[#57534E]">
          <button
            onClick={() => scrollToSection('about')}
            className="hover:text-[#0F172A] transition-colors cursor-pointer"
          >
            What We Do
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="hover:text-[#0F172A] transition-colors cursor-pointer"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="hover:text-[#0F172A] transition-colors cursor-pointer"
          >
            FAQ
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={onCheckPositionClick}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-[#44403C] hover:text-[#0F172A] hover:bg-[#F5F5F4] rounded-lg transition-colors cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-[#78716C]" />
            <span className="hidden xs:inline">Already joined?</span>
            <span className="xs:hidden">Check spot</span>
          </button>

          <button
            onClick={onJoinClick}
            className="inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded-lg transition-all shadow-xs active:scale-[0.98] cursor-pointer"
          >
            Join Waitlist
          </button>

          <button
            onClick={onAdminClick}
            title="Admin Dashboard"
            className="p-2 text-[#78716C] hover:text-[#0F172A] hover:bg-[#F5F5F4] rounded-lg transition-colors cursor-pointer"
          >
            <Shield className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
