import React from 'react';
import { Logo } from './Logo';

interface FooterProps {
  onOpenLegal: (type: 'privacy' | 'terms' | 'contact') => void;
  onAdminClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onAdminClick }) => {
  return (
    <footer className="bg-[#FAF9F6] border-t border-[#E7E5E4] py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand & Tagline */}
        <div className="text-center md:text-left">
          <Logo className="justify-center md:justify-start" />
          <p className="text-xs text-[#78716C] mt-2 font-medium">
            Verified student accommodation, simplified.
          </p>
        </div>

        {/* Center: Legal & Contact Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#57534E] font-medium">
          <button
            onClick={() => onOpenLegal('privacy')}
            className="hover:text-[#0F172A] transition-colors cursor-pointer"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => onOpenLegal('terms')}
            className="hover:text-[#0F172A] transition-colors cursor-pointer"
          >
            Terms of Service
          </button>
          <button
            onClick={() => onOpenLegal('contact')}
            className="hover:text-[#0F172A] transition-colors cursor-pointer"
          >
            Contact
          </button>
          <button
            onClick={onAdminClick}
            className="hover:text-[#0F172A] transition-colors cursor-pointer text-[#A8A29E]"
          >
            Admin Access
          </button>
        </div>

        {/* Right: Copyright */}
        <div className="flex items-center gap-4 text-xs text-[#78716C]">
          <span>&copy; {new Date().getFullYear()} Campora. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
};
