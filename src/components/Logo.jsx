import React from 'react';

export default function Logo({ className = "", size = "default" }) {
  const sizes = {
    small: { height: 50 },
    default: { height: 70 },
    large: { height: 90 }
  };

  const { height } = sizes[size] || sizes.default;

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/690553b61c1c5d3e58212524/a5f5faba2_blx_logo.png" 
        alt="BloomX Analytica" 
        style={{ height: `${height}px` }}
        className="object-contain"
      />
    </div>
  );
}

// Compact version for mobile
export function LogoCompact({ className = "" }) {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/690553b61c1c5d3e58212524/a5f5faba2_blx_logo.png" 
        alt="BloomX Analytica" 
        style={{ height: '56px' }}
        className="object-contain"
      />
    </div>
  );
}