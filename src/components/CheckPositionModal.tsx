import React, { useState } from 'react';
import { getUserByEmail } from '../lib/firebase';
import { WaitlistUser } from '../types';
import { Search, X, Loader2, AlertCircle } from 'lucide-react';

interface CheckPositionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserFound: (user: WaitlistUser) => void;
}

export const CheckPositionModal: React.FC<CheckPositionModalProps> = ({
  isOpen,
  onClose,
  onUserFound,
}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    setIsLoading(true);

    try {
      const user = await getUserByEmail(email.trim());
      setIsLoading(false);

      if (user) {
        onUserFound(user);
        onClose();
      } else {
        setError('No waitlist registration found for this email.');
      }
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      setError('Error checking status. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E7E5E4] relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#78716C] hover:text-[#0F172A] hover:bg-[#F5F5F4] rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-10 h-10 rounded-xl bg-[#0F172A] text-white flex items-center justify-center mb-4">
          <Search className="w-5 h-5 text-[#0D9488]" />
        </div>

        <h3 className="text-xl font-bold text-[#0F172A] tracking-tight">
          Check Your Waitlist Position
        </h3>
        <p className="text-xs sm:text-sm text-[#78716C] mt-1 mb-6">
          Enter the email address you registered with to view your live queue position.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label htmlFor="searchEmail" className="block text-xs font-bold uppercase text-[#0F172A] mb-1.5">
              Email Address
            </label>
            <input
              id="searchEmail"
              type="email"
              required
              placeholder="alex@university.ac.uk"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D6D3D1] rounded-xl text-[#0F172A] placeholder-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-[#0F172A] hover:bg-[#1E293B] text-white text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#0D9488]" />
                <span>Searching...</span>
              </>
            ) : (
              <span>Check Position</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
