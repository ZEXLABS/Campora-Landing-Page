import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { WaitlistUser } from '../types';
import { Share2, MessageCircle, Twitter, Sparkles, Check, Copy, Mail } from 'lucide-react';

interface SuccessStateProps {
  user: WaitlistUser;
  onReset?: () => void;
}

export const SuccessState: React.FC<SuccessStateProps> = ({ user }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = 'https://campora-landing-page.vercel.app/';

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

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }).catch(() => {
        fallbackCopy();
      });
    } else {
      fallbackCopy();
    }
  };

  const fallbackCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
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
        <p className="text-base sm:text-lg text-[#57534E] mb-6 max-w-lg mx-auto">
          We'll notify you as soon as verified hostels near <strong className="text-[#0F172A]">{user.university}</strong> are ready!
        </p>

        {/* 24-Hour Email Notice Box */}
        <div className="mb-8 p-4 sm:p-5 bg-[#FAF9F6] border border-[#0D9488]/30 rounded-2xl flex items-start gap-3.5 text-left shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center shrink-0 mt-0.5 border border-[#0D9488]/20">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#0F172A] mb-1">Check Your Email Inbox</h4>
            <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
              You will receive a welcome email within <strong>24 hours</strong> at <strong className="text-[#0F172A]">{user.email}</strong>. Please ensure you also check your <strong>spam/junk folder</strong> in case it lands there!
            </p>
          </div>
        </div>

        {/* What Happens Next & Social Share Box */}
        <div className="bg-[#0F172A] text-white p-6 sm:p-8 rounded-2xl text-left shadow-lg relative overflow-hidden">
          <h3 className="text-2xl font-bold tracking-tight text-white mb-2">
            What happens next?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mb-6">
            Our campus verification team is currently inspecting self-contains, single rooms, and flat hostels around <strong>{user.university}</strong>. You'll receive instant notification emails as verified listings go live.
          </p>

          {/* Direct Copyable Link Bar with Animation */}
          <div className="mb-6 p-3 bg-slate-900 border border-slate-700/80 rounded-xl flex items-center justify-between gap-3">
            <span className="font-mono text-xs text-[#0D9488] truncate select-all">
              {shareUrl}
            </span>
            <button
              onClick={handleCopyLink}
              className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                copied
                  ? 'bg-emerald-500 text-white scale-105 shadow-md'
                  : 'bg-[#0D9488] hover:bg-[#0F766E] text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 animate-bounce" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>

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
                onClick={handleCopyLink}
                className={`py-2.5 px-3 border rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  copied
                    ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500/40'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span>Share App</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
