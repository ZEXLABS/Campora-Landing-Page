import React from 'react';
import { X, Shield, FileText, Mail, Phone } from 'lucide-react';

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
          className="absolute top-4 right-4 p-1.5 text-[#78716C] hover:text-[#0F172A] hover:bg-[#F5F5F4] rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'privacy' && (
          <div className="space-y-4 text-xs sm:text-sm text-[#57534E]">
            <div className="flex items-center gap-2 text-[#0F172A] font-bold text-lg border-b border-[#E7E5E4] pb-3">
              <Shield className="w-5 h-5 text-[#0D9488]" />
              <h3>Privacy Policy</h3>
            </div>
            <p className="leading-relaxed">
              At <strong>Campora</strong>, we respect your privacy and are committed to protecting your personal data in accordance with applicable data protection laws.
            </p>
            <h4 className="font-bold text-[#0F172A] pt-1">1. Information We Collect</h4>
            <p className="leading-relaxed">
              When you register on our student waitlist, we collect your full name, email address, phone number, institution, study level, move-in timeline, and accommodation preferences.
            </p>
            <h4 className="font-bold text-[#0F172A] pt-1">2. How We Use Your Information</h4>
            <p className="leading-relaxed">
              Your information is strictly used to notify you when verified student accommodation listings near your campus go live, manage waitlist position allocations, and provide support regarding off-campus housing.
            </p>
            <h4 className="font-bold text-[#0F172A] pt-1">3. Data Protection & Security</h4>
            <p className="leading-relaxed">
              We do not sell, rent, or trade your personal data with third-party advertisers. All information submitted to Campora is stored securely on encrypted cloud storage systems.
            </p>
            <h4 className="font-bold text-[#0F172A] pt-1">4. Contact Us Regarding Privacy</h4>
            <p className="leading-relaxed">
              If you have any questions or wish to request data removal, please contact our privacy compliance team at <a href="mailto:buildsafe247@gmail.com" className="text-[#0D9488] font-semibold underline">buildsafe247@gmail.com</a> or call <a href="tel:+2349131744823" className="text-[#0D9488] font-semibold underline">+234-913-174-4823</a>.
            </p>
          </div>
        )}

        {type === 'terms' && (
          <div className="space-y-4 text-xs sm:text-sm text-[#57534E]">
            <div className="flex items-center gap-2 text-[#0F172A] font-bold text-lg border-b border-[#E7E5E4] pb-3">
              <FileText className="w-5 h-5 text-[#0D9488]" />
              <h3>Terms of Service</h3>
            </div>
            <p className="leading-relaxed">
              Welcome to <strong>Campora</strong>. By registering on our waitlist or using our platform, you agree to comply with the following terms and conditions.
            </p>
            <h4 className="font-bold text-[#0F172A] pt-1">1. Scope of Waitlist Service</h4>
            <p className="leading-relaxed">
              Joining the Campora waitlist provides early access and priority notifications for verified student housing near tertiary institutions across Nigeria. Registration does not guarantee room availability or lease agreements.
            </p>
            <h4 className="font-bold text-[#0F172A] pt-1">2. Accurate Information</h4>
            <p className="leading-relaxed">
              Users must provide accurate registration details (name, email, phone number, and campus). Duplicate, fraudulent, or automated bot entries will be automatically disqualified.
            </p>
            <h4 className="font-bold text-[#0F172A] pt-1">3. Property & Agent Verification</h4>
            <p className="leading-relaxed">
              Campora conducts physical inspections and identity checks on listings and agents to prevent fraudulent property claims. Students are advised to perform standard due diligence prior to making personal lease commitments.
            </p>
            <h4 className="font-bold text-[#0F172A] pt-1">4. Service Modifications</h4>
            <p className="leading-relaxed">
              We reserve the right to update these terms or modify platform features as necessary. For support or legal inquiries, contact <a href="mailto:buildsafe247@gmail.com" className="text-[#0D9488] font-semibold underline">buildsafe247@gmail.com</a>.
            </p>
          </div>
        )}

        {type === 'contact' && (
          <div className="space-y-4 text-xs sm:text-sm text-[#57534E]">
            <div className="flex items-center gap-2 text-[#0F172A] font-bold text-lg border-b border-[#E7E5E4] pb-3">
              <Mail className="w-5 h-5 text-[#0D9488]" />
              <h3>Contact Campora Team</h3>
            </div>
            <p className="leading-relaxed">
              Have questions about off-campus student housing, or need assistance with your waitlist entry? Reach out to our team:
            </p>

            <div className="bg-[#FAF9F6] p-5 rounded-xl border border-[#E7E5E4] space-y-4 text-[#0F172A]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center shrink-0 border border-[#0D9488]/20">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#78716C] uppercase tracking-wider block">Phone Line</span>
                  <a href="tel:+2349131744823" className="font-bold text-sm text-[#0F172A] hover:text-[#0D9488] transition-colors">
                    +234-913-174-4823
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center shrink-0 border border-[#0D9488]/20">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#78716C] uppercase tracking-wider block">Email Support</span>
                  <a href="mailto:buildsafe247@gmail.com" className="font-bold text-sm text-[#0F172A] hover:text-[#0D9488] transition-colors">
                    buildsafe247@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
