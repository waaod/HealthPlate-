import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  iconOnly = false,
  size = 'md',
  variant = 'light',
}) => {
  const sizeMap = {
    sm: { iconSize: 28, textClass: 'text-lg', subClass: 'text-[10px]' },
    md: { iconSize: 38, textClass: 'text-xl', subClass: 'text-xs' },
    lg: { iconSize: 48, textClass: 'text-2xl', subClass: 'text-sm' },
    xl: { iconSize: 64, textClass: 'text-3xl', subClass: 'text-base' },
  };

  const { iconSize, textClass } = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Official HealthPlate Logo Icon: Plate + Leaf + Fork + Knife */}
      <div 
        className="relative flex items-center justify-center shrink-0 rounded-full shadow-sm transition-transform hover:scale-105"
        style={{ width: iconSize, height: iconSize }}
        title="HealthPlate Logo — Food, Nutrition & Healthy Living"
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Outer Ring / Base Glow */}
          <circle cx="50" cy="50" r="48" fill="#F5F5F0" stroke="#E8E6E0" strokeWidth="2" />
          
          {/* The Plate Body */}
          <circle cx="50" cy="50" r="41" fill="#FFFFFF" stroke="#E8E6E0" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="32" fill="#FDFCF8" stroke="#E8E6E0" strokeWidth="1" />
          <circle cx="50" cy="50" r="28" fill="#FFFFFF" />

          {/* Fork on the Left */}
          <g id="logo-fork" stroke="#2D3325" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Fork Handle */}
            <path d="M21 68 L21 44" />
            <path d="M21 68 Q21 72 19 72 Q17 72 17 68" fill="#2D3325" stroke="none" />
            {/* Fork Base & Tines */}
            <path d="M17 44 C17 47, 25 47, 25 44" />
            <path d="M17 44 L17 32" />
            <path d="M19.7 44 L19.7 31" />
            <path d="M22.3 44 L22.3 31" />
            <path d="M25 44 L25 32" />
          </g>

          {/* Knife on the Right */}
          <g id="logo-knife" stroke="#2D3325" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Knife Handle */}
            <path d="M79 68 L79 44" />
            <path d="M79 68 Q79 72 81 72 Q83 72 83 68" fill="#2D3325" stroke="none" />
            {/* Knife Blade Curve */}
            <path d="M79 44 L79 31 C79 31, 84 34, 84 41 C84 44, 79 44, 79 44 Z" fill="#7AA95C" stroke="#2D3325" strokeWidth="1.2" />
          </g>

          {/* Centered Sprouting Leaf on the Plate */}
          <g id="logo-leaf">
            {/* Leaf stem */}
            <path
              d="M50 64 C50 56 49 48 52 40"
              stroke="#2D3325"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* Primary Main Leaf */}
            <path
              d="M51 40 C41 33 42 22 55 20 C64 27 63 37 51 40 Z"
              fill="url(#leaf-grad-main)"
              stroke="#2D3325"
              strokeWidth="1.2"
            />
            {/* Secondary Tender Sprout Leaf */}
            <path
              d="M49 46 C41 46 38 39 46 35 C50 37 51 42 49 46 Z"
              fill="url(#leaf-grad-secondary)"
              stroke="#2D3325"
              strokeWidth="1"
            />
            {/* Leaf Vein detail */}
            <path
              d="M50 35 C52 30 53 26 55 23"
              stroke="#D9E9D3"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <path
              d="M45 42 C47 40 48 38 49 37"
              stroke="#D9E9D3"
              strokeWidth="0.9"
              strokeLinecap="round"
            />
          </g>

          {/* Gradients */}
          <defs>
            <linearGradient id="leaf-grad-main" x1="42" y1="20" x2="62" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#8DC06E" />
              <stop offset="100%" stopColor="#6A964D" />
            </linearGradient>
            <linearGradient id="leaf-grad-secondary" x1="38" y1="35" x2="51" y2="46" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#9FD07F" />
              <stop offset="100%" stopColor="#7AA95C" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {!iconOnly && (
        <div className="flex flex-col leading-none">
          <span className={`font-bold tracking-tight ${textClass} flex items-center`}>
            <span className={variant === 'dark' ? 'text-white' : 'text-[#2D3325]'}>Health</span>
            <span className="text-[#7AA95C]">Plate</span>
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#6B7264] mt-0.5">
            Nutrition & Living
          </span>
        </div>
      )}
    </div>
  );
};
