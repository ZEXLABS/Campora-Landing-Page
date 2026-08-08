import React from 'react';
import { X, Shield, FileText, Mail } from 'lucide-react';

interface ModalProps {
  type: 'privacy' | 'terms' | 'contact' | null;
  onClose: () => void;
}

export const LegalModals: React.FC<ModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-[#E7E5E4] relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#78716C] hover:text-[#0F172A] hover:bg-[#F5F5F4] rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'privacy' && (
          <div className="space-y-4 text-xs sm:text-sm text-[#57534E]">
            <div className="flex items-center gap-2 text-[#0F172A] font-bold text-lg">
              <Shield className="w-5 h-5 text-[#0D9488]" />
              <h3>Privacy Policy</h3>
            </div>
            <p>
              At Campora, we respect your privacy and are committed to protecting your personal data.
            </p>
            <h4 className="font-bold text-[#0F172A] pt-2">Data We Collect</h4>
            <p>
              When you join our waitlist, we collect your full name, email address, optional phone number, university, study level, and accommodation preferences.
            </p>
            <h4 className="font-bold text-[#0F172A] pt-2">How We Use Your Data</h4>
            <p>
              Your data is used strictly to notify you about Campora&apos;s launch at your university, manage waitlist position rankings, and connect you with verified accommodation opportunities.
            </p>
            <h4 className="font-bold text-[#0F172A] pt-2">Data Protection</h4>
            <p>
              We do not sell, rent, or lease your personal information to third parties. All waitlist records are securely stored in encrypted cloud storage.
            </p>
          </div>
        )}

        {type === 'terms' && (
          <div className="space-y-4 text-xs sm:text-sm text-[#57534E]">
            <div className="flex items-center gap-2 text-[#0F172A] font-bold text-lg">
              <FileText className="w-5 h-5 text-[#0D9488]" />
              <h3>Terms of Service</h3>
            </div>
            <p>
              Welcome to Campora. By joining our waitlist, you agree to these basic terms.
            </p>
            <h4 className="font-bold text-[#0F172A] pt-2">Waitlist Service Scope</h4>
            <p>
              Campora is an accommodation discovery and agent connection platform. Joining the waitlist grants priority access but does not guarantee specific property availability.
            </p>
            <h4 className="font-bold text-[#0F172A] pt-2">Referral Program Rules</h4>
            <p>
              Referrals must be legitimate student registrations. Self-referrals, automated script signups, or duplicate email submissions are voided automatically.
            </p>
          </div>
        )}

        {type === 'contact' && (
          <div className="space-y-4 text-xs sm:text-sm text-[#57534E]">
            <div className="flex items-center gap-2 text-[#0F172A] font-bold text-lg">
              <Mail className="w-5 h-5 text-[#0D9488]" />
              <h3>Contact Campora Team</h3>
            </div>
            <p>
              Are you a student with questions, or an accredited property agent looking to partner with Campora?
            </p>
            <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E7E5E4] space-y-2 text-[#0F172A]">
              <p><strong>Student Support:</strong> hello@campora.app</p>
              <p><strong>Agent Partnerships:</strong> agents@campora.app</p>
              <p><strong>HQ:</strong> London &bull; Manchester &bull; Edinburgh</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
