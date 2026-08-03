"use client"
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { cn } from '../../lib/utils'

export interface AccordionItemData {
  id: string
  title: string
  content: React.ReactNode
}

export interface AccordionProps {
  items: AccordionItemData[]
  className?: string
}

export const Accordion: React.FC<AccordionProps> = ({ items, className }) => {
  const [openId, setOpenId] = React.useState<string | null>(items[0]?.id ?? null)

  return (
    <div className={cn('space-y-3', className)}>
      {items.map((item) => {
        const isOpen = openId === item.id
        return (
          <div
            key={item.id}
            className={cn(
              'rounded-2xl border transition-colors duration-200 overflow-hidden',
              isOpen
                ? 'bg-white border-emerald-500/30 shadow-md shadow-emerald-500/5'
                : 'bg-white/70 border-slate-200/80 hover:border-slate-300'
            )}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 focus:outline-none"
            >
              <span className="font-semibold text-slate-800 text-base md:text-lg">
                {item.title}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className={cn(
                  'p-1 rounded-full transition-colors',
                  isOpen ? 'bg-emerald-50 text-emerald-600' : 'text-slate-400'
                )}
              >
                <ChevronDownIcon className="h-5 w-5" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: 'auto' },
                    collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 pt-1 text-slate-600 text-sm md:text-base leading-relaxed border-t border-slate-100/60">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

export default Accordion
