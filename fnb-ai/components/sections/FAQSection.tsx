"use client"
import React from 'react'
import { FAQ_DATA } from '../../lib/mock-data'
import { Accordion } from '../ui/accordion'
import { AnimatedBadge } from '../magicui/animated-badge'

export const FAQSection: React.FC = () => {
  return (
    <section id="faq" className="py-24 relative bg-slate-50/70 border-t border-slate-200/60">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="text-center">
          <AnimatedBadge text="Frequently Asked Questions" />
          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Everything You Need to Know About{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-lime-500">
              F&B AI
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Have questions about accuracy, clinical registries, or dietary personalization? Here are
            the answers to our most common inquiries.
          </p>
        </div>

        {/* Shadcn UI Accordion */}
        <div className="mt-14">
          <Accordion items={FAQ_DATA} />
        </div>
      </div>
    </section>
  )
}

export default FAQSection
