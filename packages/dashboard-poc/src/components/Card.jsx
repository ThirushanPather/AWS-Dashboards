// A reusable card component with a glassmorphism effect.
import React from 'react';

export default function Card({ children, className = '' }) {
  return (
    <div
      className={`
        bg-white/10 backdrop-blur-md rounded-xl shadow-lg 
        border border-white/20
        ${className}
      `}
    >
      {children}
    </div>
  );
}
