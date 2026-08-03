"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { SparklesIcon, CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/solid'
import { Badge } from '../ui/badge'

export interface RecommendationCardProps {
  title?: string
  confidence?: number
  alternatives?: string[]
  children?: React.ReactNode
  className?: string
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  title = 'AI Health Recommendation',
  confidence = 94,
  alternatives = [],
  children,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className={`rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-white via-emerald-50/30 to-lime-50/20 p-6 shadow-md backdrop-blur-md ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 shadow-inner">
            <SparklesIcon className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-base">{title}</h4>
            <p className="text-xs text-slate-500">Synthesized by F&B AI Engine</p>
          </div>
        </div>

        <Badge variant="emerald" className="px-3 py-1 font-bold">
          Confidence: {confidence}%
        </Badge>
      </div>

      <div className="mt-4 text-sm leading-relaxed text-slate-700 font-medium">
        {children}
      </div>

      {alternatives && alternatives.length > 0 && (
        <div className="mt-5 space-y-2 border-t border-emerald-100/70 pt-4">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Recommended Actionable Alternatives
          </div>
          <div className="space-y-2">
            {alternatives.map((alt, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-white/80 border border-emerald-200/60 shadow-sm"
              >
                <CheckCircleIcon className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs md:text-sm text-slate-800 font-medium">{alt}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default RecommendationCard
