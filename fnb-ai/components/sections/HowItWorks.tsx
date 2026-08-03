"use client"
import React from 'react'
import { motion } from 'framer-motion'
import {
  ClipboardDocumentListIcon,
  CpuChipIcon,
  CircleStackIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline'
import { HOW_IT_WORKS_STEPS } from '../../lib/mock-data'
import { AnimatedBadge } from '../magicui/animated-badge'

const stepIconMap: Record<string, React.ReactNode> = {
  ClipboardDocumentListIcon: <ClipboardDocumentListIcon className="w-6 h-6 text-emerald-600" />,
  CpuChipIcon: <CpuChipIcon className="w-6 h-6 text-sky-600" />,
  CircleStackIcon: <CircleStackIcon className="w-6 h-6 text-lime-600" />,
  ShieldCheckIcon: <ShieldCheckIcon className="w-6 h-6 text-emerald-600" />,
  SparklesIcon: <SparklesIcon className="w-6 h-6 text-emerald-600" />,
}

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 relative bg-slate-50/70 border-t border-slate-200/60">
      <div className="max-w-8xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <AnimatedBadge text="Workflow & Architecture" />
          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            How F&B AI Analyzes Your Meal in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-lime-500">
              5 Simple Steps
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            A seamless pipeline combining computer vision, semantic parsing, and clinical registries.
          </p>
        </div>

        {/* Timeline Desktop & Mobile */}
        <div className="mt-20 relative max-w-5xl mx-auto">
          {/* Vertical connecting line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-emerald-500 via-sky-400 to-lime-500 -translate-x-1/2 hidden md:block opacity-30" />

          <div className="space-y-12 relative">
            {HOW_IT_WORKS_STEPS.map((stepItem, idx) => {
              const isEven = idx % 2 === 0
              return (
                <motion.div
                  key={stepItem.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.55, delay: idx * 0.1, ease: 'easeOut' }}
                  className="relative flex flex-col md:flex-row items-center justify-between group"
                >
                  {/* Left Column (Even step content or empty) */}
                  <div className={`w-full md:w-5/12 ${isEven ? 'md:text-right' : 'md:order-2 md:text-left'}`}>
                    <div className="p-7 rounded-3xl bg-white border border-slate-200/80 shadow-md hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300">
                      <div className={`flex items-center gap-3 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                          Step 0{stepItem.step}
                        </span>
                        <span className="text-xs font-semibold text-slate-400">{stepItem.badge}</span>
                      </div>
                      <h3 className="mt-3 text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {stepItem.title}
                      </h3>
                      <p className="mt-2 text-sm md:text-base text-slate-600 leading-relaxed">
                        {stepItem.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Number Badge & Connector Node */}
                  <div className="my-4 md:my-0 relative z-10 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      className="w-14 h-14 rounded-2xl bg-white border-2 border-emerald-500 text-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20"
                    >
                      {stepIconMap[stepItem.icon] ?? <SparklesIcon className="w-6 h-6 text-emerald-600" />}
                    </motion.div>
                  </div>

                  {/* Right Column (Odd step content or empty) */}
                  <div className={`w-full md:w-5/12 hidden md:block ${isEven ? 'md:order-3' : ''}`} />

                  {/* Mobile downward arrow between steps */}
                  {idx < HOW_IT_WORKS_STEPS.length - 1 && (
                    <div className="md:hidden text-slate-300 my-2">
                      <ArrowDownIcon className="w-5 h-5 animate-bounce" />
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
