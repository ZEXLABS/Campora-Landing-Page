import React, { useState, useEffect } from 'react';
import { UNIVERSITIES, filterInstitutions } from '../data/universities';
import { WaitlistFormData, WaitlistUser } from '../types';
import { joinWaitlist } from '../lib/firebase';
import { User, Mail, Phone, GraduationCap, Calendar, Share2, AlertCircle, Loader2, Sparkles, CheckCircle2, Search, Building2 } from 'lucide-react';

interface WaitlistFormProps {
  onSuccess: (user: WaitlistUser) => void;
}

export const WaitlistForm: React.FC<WaitlistFormProps> = ({ onSuccess }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [university, setUniversity] = useState('University of Lagos (UNILAG)');
  const [customUniversity, setCustomUniversity] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [uniSearch, setUniSearch] = useState('');
  const [level, setLevel] = useState('Undergraduate Degree (B.Sc / B.Tech)');
  const [gender, setGender] = useState('Prefer not to say');
  const [accommodationNeed, setAccommodationNeed] = useState<'Yes' | 'No'>('Yes');
  const [accommodationTimeline, setAccommodationTimeline] = useState<string>('1–3 months');
  const [referralSource, setReferralSource] = useState<string>('Instagram');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [infoNote, setInfoNote] = useState('');

  // Filtered institutions based on search and category
  const filteredUnis = filterInstitutions(uniSearch, categoryFilter);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setInfoNote('');

    // Field validation
    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    const finalUniversity = university === 'Other Nigerian Institution' ? (customUniversity.trim() || 'Other Institution') : university;
    if (!finalUniversity) {
      setErrorMessage('Please select or specify your university or polytechnic.');
      return;
    }

    setIsLoading(true);

    const formData: WaitlistFormData = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      university: finalUniversity,
      level,
      gender,
      accommodationNeed,
      accommodationTimeline,
      referralSource,
    };

    try {
      const { user, isExisting } = await joinWaitlist(formData);

      if (isExisting) {
        setInfoNote("Welcome back! You're already on the waitlist.");
      }

      setIsLoading(false);
      onSuccess(user);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      setErrorMessage('An error occurred while joining. Please try again.');
    }
  };

  return (
    <section id="waitlist-form" className="py-12 sm:py-20 px-4 sm:px-6 bg-white border-t border-[#E7E5E4]">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Get early access to Dormiqa Nigeria
          </h2>
          <p className="text-sm sm:text-base text-[#78716C] mt-2">
            Be the first to browse verified student hostels and apartments near your campus when we launch.
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm rounded-xl flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-[#FAF9F6] p-6 sm:p-8 rounded-2xl border border-[#E7E5E4]">
          {/* Full Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullName" className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#A8A29E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="fullName"
                  type="text"
                  required
                  placeholder="e.g. Babatunde Adebayo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-[#D6D3D1] rounded-xl text-[#0F172A] placeholder-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#A8A29E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="student@unilag.edu.ng"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-[#D6D3D1] rounded-xl text-[#0F172A] placeholder-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
                />
              </div>
            </div>
          </div>

          {/* Phone Number (Optional) */}
          <div>
            <label htmlFor="phone" className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
              Phone Number / WhatsApp <span className="text-xs font-normal text-[#78716C] lowercase">(optional)</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#A8A29E] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="phone"
                type="tel"
                placeholder="0801 234 5678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-[#D6D3D1] rounded-xl text-[#0F172A] placeholder-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
              />
            </div>
          </div>

          {/* Tertiary Institution Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="university" className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                Nigerian Institution <span className="text-rose-500">*</span>
              </label>
              <span className="text-[11px] text-[#0D9488] font-medium">
                170+ Public, Poly & Private Supported
              </span>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 mb-2.5 text-[11px]">
              {[
                { label: 'All', value: 'ALL' },
                { label: 'Federal Uni', value: 'Federal Universities' },
                { label: 'State Uni', value: 'State Universities' },
                { label: 'Private Uni', value: 'Private Universities' },
                { label: 'Polytechnic', value: 'Polytechnics' },
                { label: 'College of Edu', value: 'Colleges of Education' },
              ].map((tab) => (
                <button
                  type="button"
                  key={tab.value}
                  onClick={() => setCategoryFilter(tab.value)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                    categoryFilter === tab.value
                      ? 'bg-[#0F172A] text-white'
                      : 'bg-white text-[#57534E] border border-[#E7E5E4] hover:bg-[#F5F5F4]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Instant Filter Search Bar */}
            <div className="relative mb-2">
              <Search className="w-3.5 h-3.5 text-[#A8A29E] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search UNILAG, LASU, YABATECH, FUTA, ABU, Covenant, state or city..."
                value={uniSearch}
                onChange={(e) => setUniSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#D6D3D1] rounded-lg text-[#0F172A] placeholder-[#A8A29E] focus:outline-none focus:ring-1 focus:ring-[#0F172A]"
              />
            </div>

            {/* Dropdown Select */}
            <div className="relative">
              <GraduationCap className="w-4 h-4 text-[#A8A29E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                id="university"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-[#D6D3D1] rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F172A] cursor-pointer"
              >
                {filteredUnis.length > 0 ? (
                  filteredUnis.map((uni) => (
                    <option key={uni.code} value={uni.name}>
                      {uni.name} ({uni.city}, {uni.state}) — {uni.category}
                    </option>
                  ))
                ) : (
                  <option value="Other Nigerian Institution">Other Nigerian Institution</option>
                )}
              </select>
            </div>

            {(university === 'Other Nigerian Institution' || university === 'Other Institution') && (
              <input
                type="text"
                placeholder="Type your university, polytechnic or college name..."
                value={customUniversity}
                onChange={(e) => setCustomUniversity(e.target.value)}
                className="mt-2 w-full px-3.5 py-2 text-xs bg-white border border-[#D6D3D1] rounded-lg text-[#0F172A]"
              />
            )}
          </div>

          {/* Level of Study */}
          <div>
            <label htmlFor="level" className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
              Study Level <span className="text-rose-500">*</span>
            </label>
            <select
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D6D3D1] rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F172A] cursor-pointer"
            >
              <option value="Undergraduate Degree (B.Sc / B.Tech)">Undergraduate Degree (B.Sc / B.Tech / B.A / LL.B / MBBS)</option>
              <option value="ND / HND (Polytechnic)">ND / HND (Polytechnic)</option>
              <option value="Postgraduate (PGD / M.Sc / MBA)">Postgraduate (PGD / M.Sc / MBA)</option>
              <option value="PhD / Doctorate">PhD / Doctorate</option>
              <option value="JUPEB / IJMB / Foundation">JUPEB / IJMB / Pre-Degree</option>
              <option value="NCE (College of Education)">NCE (College of Education)</option>
            </select>
          </div>

          {/* Gender (Optional) */}
          <div>
            <label htmlFor="gender" className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
              Gender <span className="text-xs font-normal text-[#78716C] lowercase">(optional)</span>
            </label>
            <div className="flex flex-wrap gap-2 text-xs">
              {['Female', 'Male', 'Non-binary', 'Prefer not to say'].map((g) => (
                <button
                  type="button"
                  key={g}
                  onClick={() => setGender(g)}
                  className={`px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                    gender === g
                      ? 'bg-[#0F172A] text-white border-[#0F172A]'
                      : 'bg-white text-[#57534E] border-[#D6D3D1] hover:bg-[#F5F5F4]'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Looking for accommodation this session? */}
          <div className="pt-2 border-t border-[#E7E5E4]">
            <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
              Are you looking for off-campus accommodation this session?
            </label>
            <div className="flex gap-3">
              {(['Yes', 'No'] as const).map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setAccommodationNeed(opt)}
                  className={`flex-1 py-2.5 px-4 rounded-xl border text-sm font-semibold transition-colors ${
                    accommodationNeed === opt
                      ? 'bg-[#0F172A] text-white border-[#0F172A]'
                      : 'bg-white text-[#57534E] border-[#D6D3D1] hover:bg-[#F5F5F4]'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* When do you need accommodation? */}
          <div>
            <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
              When do you need accommodation?
            </label>
            <div className="flex flex-wrap gap-2 text-xs">
              {['Immediately', 'Within 1 month', '1–3 months', '3–6 months', 'Just exploring'].map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setAccommodationTimeline(t)}
                  className={`px-3 py-2 rounded-xl border font-medium transition-colors ${
                    accommodationTimeline === t
                      ? 'bg-[#0F172A] text-white border-[#0F172A]'
                      : 'bg-white text-[#57534E] border-[#D6D3D1] hover:bg-[#F5F5F4]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* How did you hear about Dormiqa? */}
          <div>
            <label htmlFor="referralSource" className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
              How did you hear about Dormiqa?
            </label>
            <select
              id="referralSource"
              value={referralSource}
              onChange={(e) => setReferralSource(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D6D3D1] rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F172A] cursor-pointer"
            >
              <option value="Friend">Friend / Classmate Referral</option>
              <option value="WhatsApp">WhatsApp Group / Status</option>
              <option value="Instagram">Instagram</option>
              <option value="TikTok">TikTok</option>
              <option value="X">X (Twitter)</option>
              <option value="Campus">SUG / Campus Association / Flyer</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 text-base font-semibold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded-xl transition-all shadow-sm active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-[#0D9488]" />
                  <span>Joining Nigerian Waitlist...</span>
                </>
              ) : (
                <span>Join the Waitlist</span>
              )}
            </button>
            <p className="text-[11px] text-center text-[#78716C] mt-2.5">
              By joining, you agree to receive launch updates from Dormiqa Nigeria. No spam, unsubscribe anytime.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

