import React from 'react';
import {
  ShieldCheck,
  Building2,
  MapPin,
  Sparkles,
  Search,
  CheckCircle2,
  Lock,
  PhoneCall,
  Clock,
  Award,
  Users,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import { UNIVERSITIES, INSTITUTION_CATEGORIES } from '../data/universities';

interface PlatformOverviewProps {
  onJoinClick: () => void;
}

export const PlatformOverview: React.FC<PlatformOverviewProps> = ({ onJoinClick }) => {
  return (
    <section id="about" className="py-12 sm:py-20 px-4 sm:px-6 bg-white border-y border-[#E7E5E4]">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* SECTION 1: WHAT WE ARE & WHAT WE DO */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            What We Are &amp; What We Do
          </h2>
          <p className="text-sm sm:text-base text-[#78716C] mt-3 leading-relaxed">
            Campora is a brand new digital student housing platform designed specifically for Nigerian university, polytechnic, and college students. We bridge the gap between students seeking safe off-campus housing and verified campus landlords &amp; agents.
          </p>
        </div>

        {/* COMPARISON: OLD WAY VS CAMPORA WAY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Old Frustrating Way */}
          <div className="bg-[#FFF8F8] border border-rose-200 p-6 sm:p-8 rounded-2xl">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-base mb-4">
              <AlertTriangle className="w-5 h-5" />
              <span>The Problem Students Face Today</span>
            </div>
            <ul className="space-y-3.5 text-xs sm:text-sm text-[#57534E]">
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                <span><strong>Fake Agent Scams:</strong> Unverified agents taking "inspection fees" for hostels that don't exist or are already occupied.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                <span><strong>Misleading Photos:</strong> Arriving at campus only to find dilapidated rooms, missing water, or broken plumbing.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                <span><strong>Exorbitant Agency Charges:</strong> Paying 50% to 100% agreement and commission fees on top of high annual rent.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                <span><strong>Location Confusion:</strong> Being told a hostel is "2 mins from gate" only to discover it requires two okada rides.</span>
              </li>
            </ul>
          </div>

          {/* The Campora Solution */}
          <div className="bg-[#F0FDF4] border border-emerald-200 p-6 sm:p-8 rounded-2xl">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-base mb-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>What Campora Does Differently</span>
            </div>
            <ul className="space-y-3.5 text-xs sm:text-sm text-[#065F46]">
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span><strong>Physical Verification:</strong> Every listed property and agent is physically inspected and verified by our team.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span><strong>Real Video &amp; Photos:</strong> Clear, honest media showing actual room condition, toilet facilities, water supply, and power availability.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span><strong>Transparent Pricing:</strong> Clear breakdowns of annual rent in Naira, including light, water, and waste bills.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span><strong>Campus Gate Proximity:</strong> Exact walk times (in minutes) to main campus gates, back gates, and shuttle parks.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CORE PLATFORM PILLARS */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
              Built Around What Students Actually Need
            </h3>
            <p className="text-xs sm:text-sm text-[#78716C] mt-1">
              Four pillars guiding the new Campora platform architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-[#FAF9F6] p-5 rounded-2xl border border-[#E7E5E4]">
              <div className="w-10 h-10 rounded-xl bg-[#0F172A] text-white flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5 text-[#0D9488]" />
              </div>
              <h4 className="text-sm font-bold text-[#0F172A] mb-1">Scam Protection</h4>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Background-checked caretakers and agents verified with NIN and landlord authorization documents.
              </p>
            </div>

            <div className="bg-[#FAF9F6] p-5 rounded-2xl border border-[#E7E5E4]">
              <div className="w-10 h-10 rounded-xl bg-[#0F172A] text-white flex items-center justify-center mb-3">
                <MapPin className="w-5 h-5 text-[#0D9488]" />
              </div>
              <h4 className="text-sm font-bold text-[#0F172A] mb-1">Campus Proximity</h4>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Search specifically by campus gate, area (e.g. Akoka, Agbowo, Ife, South Gate), and walking distance.
              </p>
            </div>

            <div className="bg-[#FAF9F6] p-5 rounded-2xl border border-[#E7E5E4]">
              <div className="w-10 h-10 rounded-xl bg-[#0F172A] text-white flex items-center justify-center mb-3">
                <Users className="w-5 h-5 text-[#0D9488]" />
              </div>
              <h4 className="text-sm font-bold text-[#0F172A] mb-1">Roommate Matching</h4>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Find verified fellow students to share 2-bedroom flats or self-contains and split annual rent easily.
              </p>
            </div>

            <div className="bg-[#FAF9F6] p-5 rounded-2xl border border-[#E7E5E4]">
              <div className="w-10 h-10 rounded-xl bg-[#0F172A] text-white flex items-center justify-center mb-3">
                <Clock className="w-5 h-5 text-[#0D9488]" />
              </div>
              <h4 className="text-sm font-bold text-[#0F172A] mb-1">Session Timelines</h4>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Filter by move-in dates aligned with academic session calendars across different Nigerian universities.
              </p>
            </div>
          </div>
        </div>

        {/* NIGERIAN INSTITUTIONS COVERAGE */}
        <div className="bg-[#FAF9F6] p-6 sm:p-10 rounded-3xl border border-[#E7E5E4]">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h3 className="text-xl sm:text-3xl font-extrabold text-[#0F172A]">
              Supporting All Nigerian Tertiary Institutions
            </h3>
            <p className="text-xs sm:text-sm text-[#78716C] mt-2">
              Whether you attend a Federal University, State University, Private University, Polytechnic, or College of Education — Campora is coming to your campus.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8 text-center text-xs">
            <div className="p-3 bg-white rounded-xl border border-[#E7E5E4] font-bold text-[#0F172A]">
              Federal Universities
              <span className="block text-[11px] font-normal text-[#0D9488] mt-0.5">UNILAG, UI, OAU, FUTA, ABU, UNN...</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#E7E5E4] font-bold text-[#0F172A]">
              State Universities
              <span className="block text-[11px] font-normal text-[#0D9488] mt-0.5">LASU, OOU, LAUTECH, EKSU, DELSU...</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#E7E5E4] font-bold text-[#0F172A]">
              Private Universities
              <span className="block text-[11px] font-normal text-[#0D9488] mt-0.5">Covenant, Afe Babalola, Babcock, Nile...</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#E7E5E4] font-bold text-[#0F172A]">
              Polytechnics
              <span className="block text-[11px] font-normal text-[#0D9488] mt-0.5">YABATECH, Ilaro, MAPOLY, Auchi, Nekede...</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#E7E5E4] font-bold text-[#0F172A] col-span-2 sm:col-span-1">
              Colleges of Education
              <span className="block text-[11px] font-normal text-[#0D9488] mt-0.5">Adeyemi, Federal Oyo, Akoka, Zaria...</span>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={onJoinClick}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded-xl transition-all shadow-sm active:scale-[0.98] cursor-pointer"
            >
              <span>Select Your Campus &amp; Join Waitlist</span>
              <ArrowRight className="w-4 h-4 text-[#0D9488]" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
