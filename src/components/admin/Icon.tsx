'use client'

import React from 'react'

export const Icon: React.FC = () => {
  return (
    <div className="pixarts-icon">
      <img
        src="/logo-white.png"
        alt="Pixarts"
        style={{
          display: 'block',
          width: '24px',
          height: 'auto',
        }}
      />
    </div>
  )
}

export default Icon
