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
          {/* Gradient per la X */}
          <linearGradient id="x-gradient-icon" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#FF6B2C', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#FFB347', stopOpacity: 1 }} />
          </linearGradient>
        </defs>

        {/* P stilizzata */}
        <path d="M8 5 L8 35" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M8 5 Q20 5 20 12 Q20 19 8 19" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>

        {/* X con gradient */}
        <path d="M24 8 L36 32" stroke="url(#x-gradient-icon)" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M36 8 L24 32" stroke="url(#x-gradient-icon)" strokeWidth="3" fill="none" strokeLinecap="round"/>
      </svg>
    </div>
  )
}

export default Icon
