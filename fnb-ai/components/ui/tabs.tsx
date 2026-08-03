"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

export interface TabItem {
  id: string
  label: string
  icon?: React.ReactNode
  badge?: string | number
}

export interface TabsProps {
  tabs: TabItem[]
  activeTab: string
  onChange: (id: string) => void
  className?: string
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange, className }) => {
  return (
    <div
      className={cn(
        'inline-flex p-1.5 rounded-2xl bg-slate-100/80 border border-slate-200/80 gap-1 overflow-x-auto max-w-full',
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors duration-200 z-10 whitespace-nowrap',
              isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute inset-0 bg-white rounded-xl shadow-sm border border-slate-200/80 -z-10"
                transition={{ type: 'spring', stiffness: 450, damping: 30 }}
              />
            )}
            {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge && (
              <span
                className={cn(
                  'text-xs px-1.5 py-0.5 rounded-full font-bold',
                  isActive ? 'bg-primary/10 text-primary' : 'bg-slate-200 text-slate-600'
                )}
              >
                {tab.badge}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default Tabs
