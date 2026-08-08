import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', iconOnly = false }) => {
  return (
    <div className={`inline-flex items-center gap-2.5 font-extrabold tracking-tight text-[#0F172A] ${className}`}>
      {/* Minimal Location Pin + Roof Icon */}
      <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-[#0F172A] text-white shadow-sm shrink-0">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
        >
          {/* Outer pin/frame outline */}
          <path d="M12 21.5c-3.5-3.8-7-7.8-7-11.5a7 7 0 1 1 14 0c0 3.7-3.5 7.7-7 11.5z" />
          {/* Inner minimalist house roof */}
          <path d="M9 11l3-2.5 3 2.5" />
        </svg>
      </div>

      {!iconOnly && (
        <span className="text-xl font-bold tracking-tight text-[#0F172A]">
          Campora
        </span>
      )}
    </div>
  );
};
