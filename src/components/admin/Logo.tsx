'use client'

import React from 'react'

export const Logo: React.FC = () => {
  return (
    <div className="pixarts-logo">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 50"
        width="180"
        height="45"
        style={{ display: 'block' }}
      >
        <defs>
          {/* Gradient Arancione-Ambra */}
          <linearGradient id="pixarts-gradient-logo" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#FF6B2C', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#FFB347', stopOpacity: 1 }} />
          </linearGradient>

          {/* Effetto Glow */}
          <filter id="glow-logo" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feFlood floodColor="#FF6B2C" floodOpacity="0.4" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Testo Pixarts */}
        <g filter="url(#glow-logo)">
          {/* P */}
          <path
            d="M12 10 L12 40 L16 40 L16 28 L24 28 C30 28 34 24 34 19 C34 14 30 10 24 10 L12 10 Z M16 14 L23 14 C27 14 30 16 30 19 C30 22 27 24 23 24 L16 24 L16 14 Z"
            fill="url(#pixarts-gradient-logo)"
          />
          {/* i */}
          <path
            d="M40 10 L40 14 L44 14 L44 10 L40 10 Z M40 18 L40 40 L44 40 L44 18 L40 18 Z"
            fill="url(#pixarts-gradient-logo)"
          />
          {/* x */}
          <path
            d="M50 18 L56 28 L50 40 L55 40 L59 32 L63 40 L68 40 L62 28 L68 18 L63 18 L59 25 L55 18 L50 18 Z"
            fill="url(#pixarts-gradient-logo)"
          />
          {/* a */}
          <path
            d="M74 18 C70 18 68 21 68 25 L68 40 L72 40 L72 26 C72 23 74 21 77 21 C80 21 82 23 82 26 L82 40 L86 40 L86 25 C86 21 83 18 78 18 L74 18 Z M72 30 L72 34 L82 34 L82 30 L72 30 Z"
            fill="url(#pixarts-gradient-logo)"
          />
          {/* r */}
          <path
            d="M92 18 L92 40 L96 40 L96 26 C96 23 98 21 101 21 L104 21 L104 18 L100 18 C97 18 95 19 94 21 L92 18 Z"
            fill="url(#pixarts-gradient-logo)"
          />
          {/* t */}
          <path
            d="M110 10 L110 18 L106 18 L106 22 L110 22 L110 36 C110 39 112 40 115 40 L118 40 L118 36 L116 36 C114 36 114 35 114 34 L114 22 L118 22 L118 18 L114 18 L114 10 L110 10 Z"
            fill="url(#pixarts-gradient-logo)"
          />
          {/* s */}
          <path
            d="M124 18 C120 18 118 20 118 23 C118 26 120 28 124 29 L128 30 C130 30 131 31 131 32 C131 34 130 35 127 35 C124 35 122 34 122 32 L118 32 C118 36 121 40 127 40 C133 40 135 37 135 33 C135 30 133 28 129 27 L125 26 C123 26 122 25 122 24 C122 22 124 21 126 21 C129 21 130 22 130 24 L134 24 C134 20 131 18 126 18 L124 18 Z"
            fill="url(#pixarts-gradient-logo)"
          />
        </g>

        {/* Linea decorativa */}
        <line
          x1="12"
          y1="44"
          x2="135"
          y2="44"
          stroke="url(#pixarts-gradient-logo)"
          strokeWidth="1"
          opacity="0.5"
        />
      </svg>
    </div>
  )
}

export default Logo
