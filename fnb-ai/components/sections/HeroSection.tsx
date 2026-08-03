"use client"
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  SparklesIcon,
  ShieldCheckIcon,
  FireIcon,
  BeakerIcon,
  ChartBarIcon,
  HeartIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/solid'
import { Button } from '../ui/button'
import { AnimatedBadge } from '../magicui/animated-badge'
import { FloatingParticles } from '../magicui/floating-particles'
import { ShineBorder } from '../magicui/shine-border'

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-8 pb-20 md:py-24 overflow-hidden">
      <FloatingParticles count={20} />

      <div className="max-w-8xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Content Area */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="lg:col-span-7 flex flex-col items-start z-10"
        >
          <AnimatedBadge text="AI-Powered Clinical Food & Beverage Intelligence" />

          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
            Understand What&apos;s Really Inside Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-500 to-lime-500">
              Food.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl">
            Instant AI semantic ingredient analysis that uncovers hidden sugars, synthetic additives,
            and precise macronutrient ratios. Get instant 0–100 health scores and clean healthier
            alternatives in seconds.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <Link href="#analyze">
              <Button size="lg" className="px-8 py-4 text-base rounded-2xl font-bold shadow-lg shadow-emerald-500/25">
                <SparklesIcon className="w-5 h-5" />
                Analyze Food Now
                <ArrowRightIcon className="w-4 h-4 ml-1" />
              </Button>
            </Link>

            <Link href="#dashboard">
              <Button variant="outline" size="lg" className="px-7 py-4 text-base rounded-2xl font-semibold bg-white/90">
                View Interactive Demo
              </Button>
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-12 pt-8 border-t border-slate-200/80 grid grid-cols-3 gap-6 w-full max-w-lg">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">250K+</div>
              <div className="text-xs sm:text-sm font-medium text-slate-500">Foods & Additives Analyzed</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">98.4%</div>
              <div className="text-xs sm:text-sm font-medium text-slate-500">Clinical Label Accuracy</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">&lt; 1.2s</div>
              <div className="text-xs sm:text-sm font-medium text-slate-500">Instant AI Inference</div>
            </div>
          </div>
        </motion.div>

        {/* Right Animated Visual & Floating Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.15, ease: 'easeOut' }}
          className="lg:col-span-5 relative flex items-center justify-center min-h-[480px] md:min-h-[520px]"
        >
          {/* Ambient Glow Backdrop */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-400/20 via-sky-300/15 to-lime-300/20 rounded-3xl blur-2xl -z-10" />

          {/* Center Main Visual Card */}
          <ShineBorder borderRadius={32} className="w-full max-w-md bg-white/95 backdrop-blur-xl shadow-2xl p-7">
            <div className="flex items-center justify-between pb-5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <HeartIcon className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-lg">Avocado Power Bowl</div>
                  <div className="text-xs text-slate-400">Analysis Completed in 0.8s</div>
                </div>
              </div>
              <div className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-1">
                <ShieldCheckIcon className="w-3.5 h-3.5" />
                <span>Verified</span>
              </div>
            </div>

            {/* Glowing Health Score Display */}
            <div className="py-6 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">AI Health Score</div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-5xl font-extrabold text-slate-900">94</span>
                  <span className="text-sm font-semibold text-emerald-600">/ 100 • Excellent</span>
                </div>
              </div>
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500 to-lime-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                <SparklesIcon className="w-9 h-9 animate-pulse" />
              </div>
            </div>

            {/* Floating Macro Cards row */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                <div className="flex items-center justify-center text-orange-500 mb-1">
                  <FireIcon className="w-4 h-4" />
                </div>
                <div className="text-xs text-slate-400 font-medium">Calories</div>
                <div className="text-base font-bold text-slate-900 mt-0.5">460 kcal</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                <div className="flex items-center justify-center text-sky-500 mb-1">
                  <BeakerIcon className="w-4 h-4" />
                </div>
                <div className="text-xs text-slate-400 font-medium">Protein</div>
                <div className="text-base font-bold text-slate-900 mt-0.5">38g</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                <div className="flex items-center justify-center text-emerald-500 mb-1">
                  <ChartBarIcon className="w-4 h-4" />
                </div>
                <div className="text-xs text-slate-400 font-medium">Sugar</div>
                <div className="text-base font-bold text-slate-900 mt-0.5">3g</div>
              </div>
            </div>

            {/* AI Insights banner inside main card */}
            <div className="mt-5 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/70 flex items-start gap-3">
              <SparklesIcon className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-900 leading-relaxed">
                <span className="font-bold">AI Insight: </span>
                Zero synthetic emulsifiers detected. Monounsaturated fatty acids from avocado improve fat-soluble vitamin uptake by 40%.
              </div>
            </div>
          </ShineBorder>

          {/* Floating Widget 1: Harmful Additive Guard */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-6 -left-6 sm:-left-10 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-100 hidden sm:flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <ShieldCheckIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800">Additive Guard</div>
              <div className="text-[11px] text-emerald-600 font-medium">0 Harmful Chemicals</div>
            </div>
          </motion.div>

          {/* Floating Widget 2: Alternative Suggestion */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -bottom-6 -right-4 sm:-right-8 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-100 hidden sm:flex items-center gap-3 max-w-[220px]"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 shrink-0">
              <SparklesIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800">Smart Substitution</div>
              <div className="text-[11px] text-slate-500 truncate">Swapped sugar for stevia</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
