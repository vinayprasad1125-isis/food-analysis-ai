"use client"
import React from 'react'
import { cn } from '../../lib/utils'

export interface DotBackgroundProps {
  className?: string
  dotColor?: string
}

export const DotBackground: React.FC<DotBackgroundProps> = ({
  className,
  dotColor = 'rgba(16, 185, 129, 0.16)',
}) => {
  return (
    <div
      className={cn(
        'absolute inset-0 z-0 overflow-hidden pointer-events-none',
        className
      )}
      style={{
        backgroundImage: `radial-gradient(${dotColor} 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_#FCFCFC_100%)]" />
    </div>
  )
}

export default DotBackground
