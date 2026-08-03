"use client"
import React from 'react'
import { motion } from 'framer-motion'

export interface NutritionItem {
  label: string
  value: number
  unit?: string
  color?: string
}

export interface NutritionChartProps {
  data: NutritionItem[]
  title?: string
  subtitle?: string
}

export const NutritionChart: React.FC<NutritionChartProps> = ({
  data,
  title = 'Macronutrient Distribution',
  subtitle = 'Daily Value percentage & total load',
}) => {
  const maxVal = Math.max(...data.map((d) => d.value), 100)

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-semibold text-slate-800 text-base">{title}</h4>
          <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 flex flex-col justify-between"
          >
            <div className="text-xs text-slate-500 font-medium">{item.label}</div>
            <div className="text-xl font-bold text-slate-900 mt-1">
              {item.value}
              <span className="text-xs font-normal text-slate-500 ml-1">
                {item.unit ?? 'g'}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="h-32 w-full pt-4 px-2 bg-slate-50/50 rounded-2xl border border-slate-200/50 flex items-end justify-around gap-2">
        {data.map((d, i) => {
          const barHeightPercent = Math.max((d.value / maxVal) * 100, 12)
          return (
            <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group">
              <div className="text-[11px] font-bold text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity mb-1">
                {d.value}
                {d.unit ?? 'g'}
              </div>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${barHeightPercent}%` }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
                className="w-full max-w-[32px] rounded-t-lg bg-gradient-to-t from-emerald-600 to-emerald-400 group-hover:from-emerald-500 group-hover:to-lime-400 transition-colors shadow-sm"
              />
              <span className="text-xs font-semibold text-slate-600 mt-2 truncate max-w-full">
                {d.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default NutritionChart
