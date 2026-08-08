import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FinalCTAProps {
  onJoinClick: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onJoinClick }) => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[#0F172A] text-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-white">
          Your next place should be easier to find.
        </h2>

        <p className="text-sm sm:text-lg text-slate-300 max-w-xl mx-auto mb-8 font-normal">
          Reserve your spot today for exclusive early access and priority university launch updates.
        </p>

        <button
          onClick={onJoinClick}
          className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-[#0F172A] bg-white hover:bg-slate-100 rounded-xl transition-all shadow-md active:scale-[0.98] group cursor-pointer"
        >
          <span>Join the Waitlist</span>
          <ArrowRight className="w-4 h-4 text-[#0D9488] transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
};
