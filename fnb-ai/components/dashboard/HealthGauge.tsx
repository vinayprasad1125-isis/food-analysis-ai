"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { formatScoreColor } from '../../lib/utils'

export interface HealthGaugeProps {
  value: number // 0-100
  label?: string
  size?: number
}

export const HealthGauge: React.FC<HealthGaugeProps> = ({
  value,
  label = 'AI Health Score',
  size = 180,
}) => {
  const radius = 64
  const circumference = 2 * Math.PI * radius
  // Show semicircle or 3/4 circle
  const dash = (value / 100) * circumference
  const scoreStyle = formatScoreColor(value)

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size * 0.85 }}>
        <svg
          width={size}
          height={size * 0.9}
          viewBox="0 0 160 140"
          className="overflow-visible"
        >
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="60%" stopColor="#84CC16" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <g transform="translate(80,76)">
            {/* Background Track */}
            <circle
              r={radius}
              cx={0}
              cy={0}
              fill="none"
              stroke="#F1F5F9"
              strokeWidth={14}
              strokeLinecap="round"
              strokeDasharray={`${circumference * 0.75} ${circumference}`}
              strokeDashoffset={-circumference * 0.125}
              transform="rotate(135)"
            />
            {/* Animated Value Arc */}
            <motion.circle
              r={radius}
              cx={0}
              cy={0}
              fill="none"
              stroke="url(#scoreGradient)"
              strokeWidth={14}
              strokeLinecap="round"
              strokeDasharray={`${(dash * 0.75)} ${circumference}`}
              strokeDashoffset={-circumference * 0.125}
              transform="rotate(135)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              filter="url(#glow)"
            />
          </g>
        </svg>

        {/* Centered Score Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center mt-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            {value}
          </motion.div>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
            / 100
          </div>
        </div>
      </div>

      <div className="mt-1 flex flex-col items-center text-center">
        <div className="text-sm font-semibold text-slate-700">{label}</div>
        <div
          className={`mt-1.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${scoreStyle.bg} ${scoreStyle.text}`}
        >
          {value >= 70 ? (
            <ShieldCheckIcon className="h-3.5 w-3.5 shrink-0" />
          ) : (
            <ExclamationTriangleIcon className="h-3.5 w-3.5 shrink-0" />
          )}
          <span>{scoreStyle.label}</span>
        </div>
      </div>
    </div>
  )
}

export default HealthGauge
