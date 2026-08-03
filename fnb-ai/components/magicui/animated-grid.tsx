"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

export interface AnimatedGridProps {
  className?: string
  width?: number
  height?: number
  numSquares?: number
}

export const AnimatedGrid: React.FC<AnimatedGridProps> = ({
  className,
  width = 48,
  height = 48,
}) => {
  return (
    <div
      className={cn(
        'absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.35]',
        className
      )}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(16, 185, 129, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(16, 185, 129, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: `${width}px ${height}px`,
        }}
      />
      <motion.div
        animate={{
          backgroundPosition: [`0px 0px`, `${width * 2}px ${height * 2}px`],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-emerald-500/5 to-transparent"
      />
      {/* Radial gradient vignette so edges fade into background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_20%,_#FCFCFC_90%)]" />
    </div>
  )
}

export default AnimatedGrid
