"use client"
import React from 'react'
import { cn } from '../../lib/utils'

export type BadgeVariant =
  | 'default'
  | 'emerald'
  | 'lime'
  | 'sky'
  | 'amber'
  | 'red'
  | 'slate'
  | 'outline'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  children?: React.ReactNode
}

const badgeVariants: Record<BadgeVariant, string> = {
  default: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  emerald: 'bg-emerald-100/80 text-emerald-800 border-emerald-300',
  lime: 'bg-lime-100/80 text-lime-800 border-lime-300',
  sky: 'bg-sky-100/80 text-sky-800 border-sky-300',
  amber: 'bg-amber-100/80 text-amber-800 border-amber-300',
  red: 'bg-red-100/80 text-red-800 border-red-300',
  slate: 'bg-slate-100 text-slate-700 border-slate-200',
  outline: 'bg-white border border-slate-200 text-slate-700',
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  className = '',
  children,
  ...props
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-colors select-none',
        badgeVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export default Badge
