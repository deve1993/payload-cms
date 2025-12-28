'use client'

import React from 'react'

export const Icon: React.FC = () => {
  return (
    <div className="pixarts-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 40 40"
        width="24"
        height="24"
        style={{ display: 'block' }}
      >
        <defs>
          {/* Gradient Arancione-Ambra */}
          <linearGradient id="pixarts-gradient-icon" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#FF6B2C', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#FFB347', stopOpacity: 1 }} />
          </linearGradient>

          {/* Effetto Glow leggero */}
          <filter id="glow-icon" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feFlood floodColor="#FF6B2C" floodOpacity="0.3" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Iniziali Px compatte */}
        <g filter="url(#glow-icon)">
          {/* P */}
          <path
            d="M4 6 L4 34 L9 34 L9 24 L16 24 C22 24 26 20 26 15 C26 10 22 6 16 6 L4 6 Z M9 11 L15 11 C18 11 21 13 21 15 C21 18 18 19 15 19 L9 19 L9 11 Z"
            fill="url(#pixarts-gradient-icon)"
          />
          {/* x piccola */}
          <path
            d="M27 16 L31 24 L27 32 L31 32 L33.5 27 L36 32 L40 32 L36 24 L40 16 L36 16 L33.5 21 L31 16 L27 16 Z"
            fill="url(#pixarts-gradient-icon)"
            opacity="0.85"
          />
        </g>
      </svg>
    </div>
  )
}

export default Icon
