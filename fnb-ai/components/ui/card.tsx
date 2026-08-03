"use client"
import React from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '../../lib/utils'

export interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children' | 'className'> {
  children?: React.ReactNode
  className?: string
  hoverEffect?: boolean
  glass?: boolean
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = true,
  glass = true,
  ...props
}) => {
  return (
    <motion.div
      initial={{ y: 8, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={hoverEffect ? { y: -4, transition: { duration: 0.2 } } : undefined}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={cn(
        'rounded-2xl border border-slate-100 p-6 shadow-sm transition-all duration-300',
        glass ? 'bg-white/90 backdrop-blur-md' : 'bg-white',
        hoverEffect ? 'hover:shadow-md hover:border-emerald-500/20' : '',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card
