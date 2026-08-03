"use client"
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { SparklesIcon, ArrowRightIcon, ShieldCheckIcon } from '@heroicons/react/24/solid'
import { Button } from '../ui/button'
import { ShineBorder } from '../magicui/shine-border'

export const CTASection: React.FC = () => {
  return (
    <section id="get-started" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <ShineBorder
          borderRadius={36}
          className="relative overflow-hidden bg-gradient-to-br from-white via-emerald-50/50 to-lime-50/30 p-10 md:p-16 text-center shadow-2xl"
        >
          {/* Ambient Glow background */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-gradient-to-tr from-emerald-400/25 to-sky-300/20 rounded-full blur-3xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative z-10 max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-6">
              <SparklesIcon className="h-4 w-4 text-emerald-600 animate-pulse" />
              <span>Instant Nutrition Intelligence</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Ready to Analyze Your Food &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-lime-500">
                Unlock Health?
              </span>
            </h2>

            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed">
              Join thousands of nutritionists, athletes, and health-conscious individuals using F&B AI
              to scan ingredients, uncover harmful additives, and optimize daily vitality.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="#analyze">
                <Button size="lg" className="px-8 py-4 text-base rounded-2xl font-bold shadow-lg shadow-emerald-500/25">
                  <SparklesIcon className="w-5 h-5" />
                  Get Started — Free Forever
                  <ArrowRightIcon className="w-4 h-4 ml-1" />
                </Button>
              </Link>

              <Link href="/dashboard">
                <Button variant="outline" size="lg" className="px-7 py-4 text-base rounded-2xl font-semibold">
                  Open Control Room
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 text-xs font-semibold text-slate-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheckIcon className="w-4 h-4 text-emerald-600" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheckIcon className="w-4 h-4 text-emerald-600" />
                <span>Instant 0–100 Scores</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheckIcon className="w-4 h-4 text-emerald-600" />
                <span>250K+ Food Registry</span>
              </div>
            </div>
          </motion.div>
        </ShineBorder>
      </div>
    </section>
  )
}

export default CTASection
