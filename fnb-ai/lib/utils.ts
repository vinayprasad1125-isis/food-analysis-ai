import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatScoreColor(score: number): {
  color: string
  bg: string
  text: string
  label: string
} {
  if (score >= 80) {
    return {
      color: '#10B981',
      bg: 'bg-emerald-50 border-emerald-200',
      text: 'text-emerald-700',
      label: 'Excellent Health Score',
    }
  }
  if (score >= 60) {
    return {
      color: '#84CC16',
      bg: 'bg-lime-50 border-lime-200',
      text: 'text-lime-700',
      label: 'Good Health Score',
    }
  }
  if (score >= 40) {
    return {
      color: '#F97316',
      bg: 'bg-amber-50 border-amber-200',
      text: 'text-amber-700',
      label: 'Moderate Health Risk',
    }
  }
  return {
    color: '#EF4444',
    bg: 'bg-red-50 border-red-200',
    text: 'text-red-700',
    label: 'High Health Risk',
  }
}
