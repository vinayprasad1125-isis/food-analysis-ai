"use client"
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/24/outline'
import { cn } from '../../lib/utils'

export interface DropdownOption {
  value: string
  label: string
  icon?: React.ReactNode
  description?: string
}

export interface DropdownProps {
  options: DropdownOption[]
  value: string
  onChange: (value: string) => void
  label?: string
  placeholder?: string
  className?: string
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder = 'Select option',
  className,
}) => {
  const [open, setOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const selected = options.find((o) => o.value === value)

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className={cn('relative inline-block text-left w-full', className)}>
      {label && <label className="block text-xs font-semibold text-slate-600 mb-1.5">{label}</label>}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between gap-2 px-4 py-2.5 bg-white/90 border border-slate-200/80 rounded-xl shadow-sm text-sm font-medium text-slate-800 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-200"
      >
        <span className="truncate flex items-center gap-2">
          {selected?.icon && <span className="w-4 h-4 text-emerald-600">{selected.icon}</span>}
          {selected ? selected.label : <span className="text-slate-400">{placeholder}</span>}
        </span>
        <ChevronDownIcon
          className={cn('h-4 w-4 text-slate-400 transition-transform duration-200', open && 'rotate-180')}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 mt-2 z-50 bg-white rounded-2xl shadow-xl border border-slate-100 p-1.5 max-h-60 overflow-y-auto"
          >
            {options.map((option) => {
              const isSelected = option.value === value
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value)
                    setOpen(false)
                  }}
                  className={cn(
                    'w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between gap-2 text-sm transition-colors',
                    isSelected ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                  )}
                >
                  <div className="flex items-center gap-2">
                    {option.icon && <span className="w-4 h-4 text-emerald-600">{option.icon}</span>}
                    <div>
                      <div>{option.label}</div>
                      {option.description && (
                        <div className="text-xs text-slate-400 font-normal">{option.description}</div>
                      )}
                    </div>
                  </div>
                  {isSelected && <CheckIcon className="h-4 w-4 text-emerald-600 shrink-0" />}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Dropdown
