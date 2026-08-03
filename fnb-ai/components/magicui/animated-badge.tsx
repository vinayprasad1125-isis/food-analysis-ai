"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { SparklesIcon } from '@heroicons/react/24/solid'
import { cn } from '../../lib/utils'

export interface AnimatedBadgeProps {
  text: string
  className?: string
  icon?: React.ReactNode
}

export const AnimatedBadge: React.FC<AnimatedBadgeProps> = ({
  text,
  className,
  icon = <SparklesIcon className="h-3.5 w-3.5 text-emerald-600 animate-pulse" />,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs font-bold uppercase tracking-wider overflow-hidden shadow-sm',
        className
      )}
    >
      {icon}
      <span>{text}</span>
      {/* Subtle shine sweep across badge */}
      <motion.div
        animate={{
          x: ['-100%', '300%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          repeatDelay: 1,
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-1/2 -skew-x-12 pointer-events-none"
      />
    </motion.div>
  )
}

export default AnimatedBadge
