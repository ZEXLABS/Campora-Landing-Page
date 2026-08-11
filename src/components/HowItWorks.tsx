import React from 'react';
import { UserCheck, Sliders, BellRing, Sparkles } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      icon: UserCheck,
      title: 'Submit Your Student Details',
      desc: 'Enter your name, WhatsApp number, and select your Nigerian university, polytechnic, or college of education in under 60 seconds.'
    },
    {
      num: '02',
      icon: Sliders,
      title: 'Specify Housing Preferences',
      desc: 'Tell us your annual budget in Naira, target move-in session, and preferred housing type (Self-Contain, Single Room, or Shared Flat).'
    },
    {
      num: '03',
      icon: BellRing,
      title: 'Get First Priority at Launch',
      desc: 'When Dormiqa launches at your campus, you get exclusive priority invites to view physically verified, scam-free student hostels near your gate.'
    }
  ];

  return (
    <section id="how-it-works" className="py-12 sm:py-20 px-4 sm:px-6 bg-[#FAF9F6]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            How Dormiqa Works
          </h2>
          <p className="text-sm text-[#78716C] mt-2">
            A seamless experience built to save you time, money, and stress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E7E5E4] shadow-2xs relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-extrabold text-[#0D9488] font-mono">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-[#E7E5E4] flex items-center justify-center text-[#0F172A]">
                      <Icon className="w-5 h-5 text-[#0D9488]" />
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0F172A] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
