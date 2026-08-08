import React from 'react';
import { Sparkles, Zap, Bell, MessageSquareQuote } from 'lucide-react';

export const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: Sparkles,
      title: 'Early access',
      description: 'Get access before Campora officially launches.'
    },
    {
      icon: Zap,
      title: 'Priority access to new listings',
      description: 'See newly verified accommodation as it becomes available.'
    },
    {
      icon: Bell,
      title: 'Launch notifications',
      description: 'Know when Campora goes live at your university.'
    },
    {
      icon: MessageSquareQuote,
      title: 'Shape Campora',
      description: 'Help us build the accommodation experience students actually need.'
    }
  ];

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 bg-white border-y border-[#E7E5E4]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Be first in line.
          </h2>
          <p className="text-sm sm:text-base text-[#78716C] mt-2">
            Why UK and international students are reserving their spot early.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={idx}
                className="bg-[#FAF9F6] p-6 rounded-2xl border border-[#E7E5E4] hover:border-[#D6D3D1] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#0F172A] text-white flex items-center justify-center mb-4 shadow-2xs">
                    <Icon className="w-5 h-5 text-[#0D9488]" />
                  </div>
                  <h3 className="text-base font-bold text-[#0F172A] mb-2 leading-snug">
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                    {benefit.description}
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
