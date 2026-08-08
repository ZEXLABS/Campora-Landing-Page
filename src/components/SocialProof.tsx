import React, { useEffect, useState } from 'react';
import { getWaitlistStats } from '../lib/firebase';
import { WaitlistStats } from '../types';
import { Users, GraduationCap, Building2 } from 'lucide-react';

export const SocialProof: React.FC = () => {
  const [stats, setStats] = useState<WaitlistStats | null>(null);

  useEffect(() => {
    getWaitlistStats().then(setStats).catch(() => {});
  }, []);

  const hasUsers = stats && stats.totalUsers > 0;

  return (
    <section className="py-10 px-4 sm:px-6 bg-[#FAF9F6] border-t border-[#E7E5E4]">
      <div className="max-w-4xl mx-auto text-center">
        {hasUsers ? (
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 bg-white px-6 py-4 rounded-2xl border border-[#E7E5E4] shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0F172A] text-white flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-[#0D9488]" />
              </div>
              <div className="text-left">
                <div className="text-xl sm:text-2xl font-extrabold text-[#0F172A] leading-tight">
                  {stats.totalUsers} {stats.totalUsers === 1 ? 'Student' : 'Students'}
                </div>
                <div className="text-xs text-[#78716C]">
                  On the Campora Waitlist
                </div>
              </div>
            </div>

            <div className="hidden sm:block h-8 w-px bg-[#E7E5E4]" />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-[#E7E5E4] text-[#0F172A] flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5 text-[#0D9488]" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-[#0F172A]">
                  Top Hub: {stats.topUniversity}
                </div>
                <div className="text-xs text-[#78716C]">
                  Plus students from 20+ universities
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-[#78716C]">
            <GraduationCap className="w-4 h-4 text-[#0D9488]" />
            <span>Connecting students with accredited off-campus housing near Nigerian university and polytechnic campuses.</span>
          </div>
        )}
      </div>
    </section>
  );
};
