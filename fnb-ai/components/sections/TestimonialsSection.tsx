"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { StarIcon } from '@heroicons/react/24/solid'
import { TESTIMONIALS_DATA } from '../../lib/mock-data'
import { AnimatedBadge } from '../magicui/animated-badge'
import { Card } from '../ui/card'

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="max-w-8xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <AnimatedBadge text="Trusted Evidence" />
          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Loved by Nutritionists, Executive Chefs &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-lime-500">
              Founders
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            See how clinicians and food industry leaders use F&B AI to audit menus, protect athlete
            performance, and build healthier consumer products.
          </p>
        </div>

        {/* Animated Testimonials Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS_DATA.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
              whileHover={{ y: -6 }}
            >
              <Card
                hoverEffect={false}
                className="p-8 bg-white/95 border-slate-200/80 hover:border-emerald-500/30 hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between"
              >
                <div>
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="mt-5 text-base md:text-lg text-slate-700 leading-relaxed font-medium italic">
                    &ldquo;{item.text}&rdquo;
                  </p>
                </div>

                {/* User Info & Avatar */}
                <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500/30 shadow-sm shrink-0 bg-slate-100">
                      <Image
                        src={item.avatar}
                        alt={item.name}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-base">{item.name}</div>
                      <div className="text-xs text-slate-500">{item.role}</div>
                    </div>
                  </div>

                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 hidden sm:inline-block">
                    {item.org}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
