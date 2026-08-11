import React, { useState } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  MapPin,
  Building2,
  CheckCircle2,
  Sparkles,
  GraduationCap,
  Users,
  ChevronRight,
} from 'lucide-react';

interface HeroProps {
  onJoinClick: () => void;
  onAboutClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onJoinClick, onAboutClick }) => {
  const [selectedHub, setSelectedHub] = useState<string>('UNILAG');

  // Featured campus highlights for interactive quick tabs
  const featuredCampuses = [
    { code: 'UNILAG', name: 'UNILAG (Akoka)', tag: 'Main Gate & Back Gate' },
    { code: 'UI', name: 'UI (Ibadan)', tag: 'Agbowo & Samonda' },
    { code: 'OAU', name: 'OAU (Ife)', tag: 'Asherifa & Mayfair' },
    { code: 'FUTA', name: 'FUTA (Akure)', tag: 'South & North Gate' },
    { code: 'LASU', name: 'LASU (Ojo)', tag: 'Iyana Iba & Igando' },
    { code: 'YABATECH', name: 'YABATECH (Yaba)', tag: 'Onike & Abule Oja' },
    { code: 'ABU', name: 'ABU (Zaria)', tag: 'Samaru & North Gate' },
  ];

  return (
    <section className="relative pt-8 sm:pt-14 pb-12 sm:pb-20 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-[#FAF9F6] via-white to-[#FAF9F6]">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e7e5e415_1px,transparent_1px),linear-gradient(to_bottom,#e7e5e415_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight leading-[1.14] mb-5">
          The smart way to find student housing in Nigeria. <br className="hidden sm:block" />
          <span className="text-[#0D9488] bg-gradient-to-r from-[#0D9488] to-[#0F172A] bg-clip-text text-transparent">
            Zero scams. Physical verification.
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-lg text-[#57534E] font-normal leading-relaxed max-w-2xl mx-auto mb-8">
          Dormiqa is a brand new platform launching to connect students in Nigerian Universities, Polytechnics, and Colleges with verified off-campus hostels, self-contains, and student suites — directly near campus gates.
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto mb-6">
          <button
            onClick={onJoinClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] group cursor-pointer"
          >
            <span>Get Priority Early Access</span>
            <ArrowRight className="w-4 h-4 text-[#0D9488] transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onAboutClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-medium text-[#44403C] bg-white border border-[#E7E5E4] hover:bg-[#F5F5F4] hover:text-[#0F172A] rounded-xl transition-colors shadow-2xs cursor-pointer"
          >
            <span>What We Do &amp; How It Works</span>
          </button>
        </div>

        {/* Free Student Guarantee Note */}
        <p className="text-xs text-[#78716C] font-medium mb-12 flex items-center justify-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488]" />
          <span>100% Free for Students • No Hidden Inspection Fees • All 36 States &amp; FCT</span>
        </p>

        {/* PLATFORM SHOWCASE CARD (No property listings, pure platform identity & function) */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E7E5E4] p-5 sm:p-8 shadow-sm text-left max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E5E4]">
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-[#0F172A] mb-1">
                Supporting 170+ Nigerian Tertiary Institutions
              </h3>
            </div>

            <button
              onClick={onJoinClick}
              className="text-xs font-bold text-[#0D9488] hover:text-[#0F172A] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Select Your Campus on Waitlist</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Featured Campuses Interactive Pill Bar */}
          <div className="py-4">
            <span className="block text-xs font-bold uppercase tracking-wider text-[#78716C] mb-3">
              Popular Campus Hubs Onboarding First:
            </span>
            <div className="flex flex-wrap gap-2">
              {featuredCampuses.map((camp) => (
                <button
                  key={camp.code}
                  onClick={() => {
                    setSelectedHub(camp.code);
                    onJoinClick();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    selectedHub === camp.code
                      ? 'bg-[#0F172A] text-white shadow-xs'
                      : 'bg-[#FAF9F6] border border-[#E7E5E4] text-[#44403C] hover:bg-[#F5F5F4]'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5 text-[#0D9488]" />
                  <span>{camp.name}</span>
                  <span className="text-[10px] opacity-75 font-normal">({camp.tag})</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3 Pillar Value Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#F5F5F4]">
            <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E7E5E4]/80">
              <div className="w-8 h-8 rounded-lg bg-[#0F172A] text-[#0D9488] flex items-center justify-center mb-2.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1">
                Physical Verification
              </h4>
              <p className="text-xs text-[#78716C] leading-relaxed">
                We physically visit campus hostels and verify caretaker identity to prevent fake property scams.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E7E5E4]/80">
              <div className="w-8 h-8 rounded-lg bg-[#0F172A] text-[#0D9488] flex items-center justify-center mb-2.5">
                <MapPin className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1">
                Gate Distance Accuracy
              </h4>
              <p className="text-xs text-[#78716C] leading-relaxed">
                Real walking minutes to UNILAG, LASU, FUTA, UI, OAU, ABU, and YABATECH gates.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E7E5E4]/80">
              <div className="w-8 h-8 rounded-lg bg-[#0F172A] text-[#0D9488] flex items-center justify-center mb-2.5">
                <Building2 className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1">
                Transparent Rent Breakdown
              </h4>
              <p className="text-xs text-[#78716C] leading-relaxed">
                Clear pricing in Naira with explicit details on water supply, electricity meter, and security.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-10 pt-8 border-t border-[#E7E5E4] grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <span className="block text-2xl sm:text-3xl font-extrabold text-[#0F172A]">170+</span>
            <span className="text-xs text-[#78716C] font-medium">Nigerian Institutions</span>
          </div>
          <div>
            <span className="block text-2xl sm:text-3xl font-extrabold text-[#0F172A]">100%</span>
            <span className="text-xs text-[#78716C] font-medium">Free for Students</span>
          </div>
          <div>
            <span className="block text-2xl sm:text-3xl font-extrabold text-[#0F172A]">0&#8358;</span>
            <span className="text-xs text-[#78716C] font-medium">Inspection Fee Scams</span>
          </div>
          <div>
            <span className="block text-2xl sm:text-3xl font-extrabold text-[#0F172A]">36 States</span>
            <span className="text-xs text-[#78716C] font-medium">&amp; FCT Coverage</span>
          </div>
        </div>

      </div>
    </section>
  );
};
