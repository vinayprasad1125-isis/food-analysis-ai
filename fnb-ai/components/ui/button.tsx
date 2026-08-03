"use client"
import React from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '../../lib/utils'

export type ButtonVariant = 'default' | 'ghost' | 'outline' | 'secondary' | 'emerald' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children' | 'className'> {
  variant?: ButtonVariant
  size?: ButtonSize
  children?: React.ReactNode
  className?: string
}

const variants: Record<ButtonVariant, string> = {
  default:
    'bg-primary text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/30 border border-emerald-500/20',
  emerald:
    'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md shadow-emerald-500/25 hover:from-emerald-600 hover:to-emerald-700 hover:shadow-lg hover:shadow-emerald-500/35 border border-emerald-400/30',
  secondary:
    'bg-sky-500 text-white shadow-md shadow-sky-500/20 hover:bg-sky-600 hover:shadow-lg hover:shadow-sky-500/30 border border-sky-400/20',
  ghost: 'bg-transparent text-slate-700 hover:bg-slate-100/80 hover:text-slate-900',
  outline:
    'bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-sm',
  danger:
    'bg-red-500 text-white shadow-md shadow-red-500/20 hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/30',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5 font-medium',
  md: 'px-4 py-2.5 text-sm rounded-xl gap-2 font-semibold',
  lg: 'px-6 py-3.5 text-base rounded-2xl gap-2.5 font-semibold',
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'md', className = '', children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        whileHover={{ scale: 1.02, y: -1 }}
        transition={{ type: 'spring', stiffness: 450, damping: 25 }}
        className={cn(
          'relative inline-flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
export default Button
