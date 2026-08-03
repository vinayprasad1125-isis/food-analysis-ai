"use client"
import React from 'react'
import { motion } from 'framer-motion'
import {
  BuildingStorefrontIcon,
  AcademicCapIcon,
  TrophyIcon,
  HeartIcon,
  BeakerIcon,
} from '@heroicons/react/24/outline'
import { TRUSTED_LOGOS } from '../../lib/mock-data'

const categoryIcons: Record<string, React.ReactNode> = {
  Restaurants: <BuildingStorefrontIcon className="w-5 h-5 text-emerald-600" />,
  Nutritionists: <AcademicCapIcon className="w-5 h-5 text-sky-600" />,
  Fitness: <TrophyIcon className="w-5 h-5 text-lime-600" />,
  Hospitals: <HeartIcon className="w-5 h-5 text-emerald-600" />,
  'Food Labs': <BeakerIcon className="w-5 h-5 text-sky-600" />,
}

export const TrustedBy: React.FC = () => {
  return (
    <section className="py-12 border-y border-slate-200/60 bg-white/40 backdrop-blur-sm">
      <div className="max-w-8xl mx-auto px-6 md:px-12">
        <p className="text-center text-xs md:text-sm font-bold tracking-widest text-slate-400 uppercase">
          Trusted by Industry Leaders Across Gastronomy, Healthcare & Athletic Performance
        </p>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {TRUSTED_LOGOS.map((logo, idx) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/70 border border-slate-200/70 shadow-sm hover:shadow-md hover:border-emerald-500/30 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-slate-50 group-hover:bg-emerald-50 transition-colors">
                  {categoryIcons[logo.category] ?? <BeakerIcon className="w-5 h-5 text-emerald-600" />}
                </div>
                <span className="font-bold text-slate-800 text-sm md:text-base group-hover:text-emerald-700 transition-colors">
                  {logo.name}
                </span>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  {logo.category}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                  {logo.badge}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustedBy
