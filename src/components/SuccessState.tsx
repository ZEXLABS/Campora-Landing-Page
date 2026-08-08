import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { WaitlistUser } from '../types';
import { Share2, MessageCircle, Twitter, Sparkles, CheckCircle2 } from 'lucide-react';

interface SuccessStateProps {
  user: WaitlistUser;
  onReset?: () => void;
}

export const SuccessState: React.FC<SuccessStateProps> = ({ user }) => {
  const shareUrl = window.location.origin + window.location.pathname;

  // Trigger confetti celebration on load
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0F172A', '#0D9488', '#38BDF8', '#F59E0B'],
      });
    } catch (e) {
      // Ignore if confetti fails
    }
  }, []);

  const shareText = `I just joined the Campora waitlist to find verified student accommodation near ${user.university}! Check it out:`;

  const handleWhatsAppShare = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
    window.open(url, '_blank');
  };

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join Campora Waitlist',
        text: shareText,
        url: shareUrl,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Campora link copied to clipboard!');
    }
  };

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 bg-white border-t border-[#E7E5E4] animate-in fade-in duration-300">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-[#0D9488]/10 text-[#0D9488] rounded-2xl flex items-center justify-center mx-auto mb-6 border border-[#0D9488]/20 shadow-2xs">
          <Sparkles className="w-8 h-8" />
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-3">
          You're all set! &#127881;
        </h2>

        {/* Sub Copy */}
        <p className="text-base sm:text-lg text-[#57534E] mb-8 max-w-lg mx-auto">
          We'll send you first priority notification as soon as verified hostels near <strong className="text-[#0F172A]">{user.university}</strong> are ready!
        </p>

        {/* Queue Position Box */}
        <div className="bg-[#FAF9F6] p-6 sm:p-8 rounded-2xl border border-[#E7E5E4] mb-8 shadow-2xs">
          <span className="text-xs font-bold text-[#78716C] uppercase tracking-wider block mb-1">
            Current Queue Position
          </span>
          <div className="text-4xl sm:text-5xl font-black text-[#0F172A] tracking-tight mb-2">
            #{user.position}
          </div>
          <p className="text-xs text-[#78716C] mb-5">
            Registered for <strong className="text-[#0F172A]">{user.university}</strong> &bull; Level: <span className="font-semibold text-[#0F172A]">{user.level}</span>
          </p>

          {/* Sync & Email Status Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F0FDF4] border border-emerald-200 text-xs font-semibold text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Welcome notification sent to <strong>{user.email}</strong></span>
          </div>
        </div>

        {/* Notification & Community Share Box */}
        <div className="bg-[#0F172A] text-white p-6 sm:p-8 rounded-2xl text-left shadow-lg relative overflow-hidden">
          <h3 className="text-2xl font-bold tracking-tight text-white mb-2">
            What happens next?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mb-6">
            Our campus verification team is currently inspecting self-contains, single rooms, and flat hostels around <strong>{user.university}</strong>. You'll receive instant notification emails as verified listings go live.
          </p>

          {/* Social Share Buttons */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2">
              Tell your friends about Campora
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={handleWhatsAppShare}
                className="py-2.5 px-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={handleTwitterShare}
                className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Twitter className="w-4 h-4" />
                <span>X (Twitter)</span>
              </button>

              <button
                onClick={handleNativeShare}
                className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Share App</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
