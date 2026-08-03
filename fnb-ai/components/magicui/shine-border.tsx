"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

export interface ShineBorderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  children?: React.ReactNode
  color?: string | string[]
  duration?: number
  borderWidth?: number
  borderRadius?: number
}

export const ShineBorder: React.FC<ShineBorderProps> = ({
  children,
  className = '',
  color = ['#10B981', '#84CC16', '#38BDF8'],
  duration = 8,
  borderRadius = 24,
  ...props
}) => {
  const gradientColors = Array.isArray(color) ? color.join(', ') : color

  return (
    <div
      style={{ borderRadius: `${borderRadius}px` }}
      className={cn('relative p-[1.5px] overflow-hidden group shadow-md', className)}
      {...props}
    >
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute -inset-10 opacity-70 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, ${gradientColors} 120deg, transparent 240deg)`,
        }}
      />
      <div
        style={{ borderRadius: `${borderRadius - 1.5}px` }}
        className="relative z-10 bg-white/95 backdrop-blur-md h-full w-full"
      >
        {children}
      </div>
    </div>
  )
}

export default ShineBorder
