'use client'

import React from 'react'

export const Logo: React.FC = () => {
  return (
    <div className="pixarts-logo">
      <img
        src="/1.png"
        alt="Pixarts"
        style={{
          display: 'block',
          width: '160px',
          height: 'auto',
        }}
      />
    </div>
  )
}

export default Logo
