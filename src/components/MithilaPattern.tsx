import React from 'react';

// A beautiful traditional Mithila Sun (symbolizes life, prosperity, and energy in Madhubani art)
export const MithilaSun: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 120 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`animate-[spin_120s_linear_infinite] ${className}`}
    >
      {/* Outer flame rays */}
      <g stroke="#8F250C" strokeWidth="2">
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16;
          return (
            <path
              key={`ray-${i}`}
              d="M 60,60 L 60,10 A 10,10 0 0,1 65,22 L 60,60"
              transform={`rotate(${angle} 60 60)`}
              fill="#E5A93B"
            />
          );
        })}
      </g>
      
      {/* Inner circle border */}
      <circle cx="60" cy="60" r="35" fill="#FFFDF9" stroke="#1E4620" strokeWidth="3" />
      <circle cx="60" cy="60" r="30" fill="#E5A93B" opacity="0.3" />
      
      {/* Hand-drawn style decorative rings */}
      <circle cx="60" cy="60" r="28" stroke="#8F250C" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="60" cy="60" r="22" stroke="#1E4620" strokeWidth="1.5" />
      
      {/* Sun Eyes & Nose (classic Madhubani style) */}
      <path d="M 48,52 C 51,52 53,55 54,58" stroke="#8F250C" strokeWidth="2" strokeLinecap="round" />
      <path d="M 72,52 C 69,52 67,55 66,58" stroke="#8F250C" strokeWidth="2" strokeLinecap="round" />
      {/* Big expressive pupils */}
      <circle cx="51" cy="56" r="2.5" fill="#8F250C" />
      <circle cx="69" cy="56" r="2.5" fill="#8F250C" />
      
      {/* Nose */}
      <path d="M 60,55 L 58,68 L 62,68 Z" fill="#8F250C" />
      
      {/* Smiling Lips */}
      <path d="M 52,76 C 56,80 64,80 68,76" stroke="#8F250C" strokeWidth="2.5" strokeLinecap="round" fill="#8F250C" />
    </svg>
  );
};

// Traditional Mithila Fish (symbolizing wealth, fertility, and abundance in Madhubani art)
export const MithilaFish: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 60 }) => {
  return (
    <svg
      width={size}
      height={size / 2}
      viewBox="0 0 100 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Fish Body */}
      <path
        d="M 5,25 C 25,2 75,5 85,25 C 75,45 25,48 5,25 Z"
        fill="#FFFDF9"
        stroke="#8F250C"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      
      {/* Fish Scales (cross-hatching, very typical of Madhubani Bharni/Kachni style) */}
      <path
        d="M 25,12 C 28,18 28,32 25,38 M 35,10 C 39,18 39,32 35,40 M 45,9 C 50,18 50,32 45,41 M 55,10 C 60,18 60,32 55,40 M 65,12 C 70,18 70,32 65,38"
        stroke="#1E4620"
        strokeWidth="1.5"
      />
      
      {/* Eye */}
      <circle cx="15" cy="22" r="4.5" fill="#FFFDF9" stroke="#8F250C" strokeWidth="2" />
      <circle cx="15" cy="22" r="1.5" fill="#8F250C" />
      
      {/* Fins */}
      <path d="M 45,9 C 45,3 52,3 55,8" stroke="#8F250C" strokeWidth="2" fill="#E5A93B" />
      <path d="M 45,41 C 45,47 52,47 55,42" stroke="#8F250C" strokeWidth="2" fill="#E5A93B" />
      
      {/* Tail (Forked tail with line fillers) */}
      <path
        d="M 85,25 L 98,10 C 95,20 95,30 98,40 L 85,25 Z"
        fill="#E5A93B"
        stroke="#8F250C"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M 88,21 L 95,16 M 89,25 L 96,25 M 88,29 L 95,34" stroke="#8F250C" strokeWidth="1.5" />
    </svg>
  );
};

// Traditional Madhubani Red-Yellow border trim
export const MithilaBorder: React.FC<{ className?: string; position?: 'top' | 'bottom' | 'both' }> = ({
  className = '',
  position = 'top',
}) => {
  const BorderLine = () => (
    <div className="relative w-full h-4 overflow-hidden flex select-none pointer-events-none">
      {/* Repeating patterns using SVG background or repeated SVG components */}
      <div 
        className="w-full h-full"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='16' viewBox='0 0 40 16'%3E%3Cpath d='M0 0 L20 16 L40 0' fill='none' stroke='%238F250C' stroke-width='2'/%3E%3Ccircle cx='20' cy='6' r='3' fill='%23E5A93B'/%3E%3Ccircle cx='5' cy='3' r='2' fill='%231E4620'/%3E%3Ccircle cx='35' cy='3' r='2' fill='%231E4620'/%3E%3Cline x1='0' y1='1' x2='40' y2='1' stroke='%238F250C' stroke-width='2'/%3E%3Cline x1='0' y1='15' x2='40' y2='15' stroke='%231E4620' stroke-width='1.5'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat-x',
        }}
      />
    </div>
  );

  return (
    <div className={`w-full flex flex-col ${className}`}>
      {(position === 'top' || position === 'both') && <BorderLine />}
      {(position === 'bottom' || position === 'both') && <BorderLine />}
    </div>
  );
};

// Decorative separator/divider
export const MithilaDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center gap-4 py-6 ${className}`}>
      <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-[#8F250C] to-[#8F250C]/20" />
      <MithilaFish size={36} className="opacity-90" />
      <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent via-[#8F250C] to-[#8F250C]/20" />
    </div>
  );
};
