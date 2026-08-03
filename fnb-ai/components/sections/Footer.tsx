"use client"
import React from 'react'
import Link from 'next/link'
import { SparklesIcon } from '@heroicons/react/24/outline'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200/80 pt-16 pb-12 text-slate-600">
      <div className="max-w-8xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Brand Description */}
        <div className="md:col-span-2 space-y-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-lime-400 flex items-center justify-center text-white shadow-sm">
              <SparklesIcon className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900">
              F&B <span className="text-emerald-600">AI</span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-slate-500 max-w-sm">
            AI-powered Clinical Food & Beverage Intelligence. We help consumers, nutritionists, and
            food innovators understand ingredient chemistry and optimize dietary vitality.
          </p>
          <div className="text-xs text-slate-400 pt-2">
            © 2026 F&B AI Technologies, Inc. All rights reserved.
          </div>
        </div>

        {/* Column 1: Navigation */}
        <div>
          <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-4">
            Product & Tools
          </h4>
          <ul className="space-y-2.5 text-sm font-medium">
            <li>
              <Link href="#analyze" className="hover:text-emerald-600 transition-colors">
                AI Ingredient Analyzer
              </Link>
            </li>
            <li>
              <Link href="#dashboard" className="hover:text-emerald-600 transition-colors">
                Interactive Dashboard
              </Link>
            </li>
            <li>
              <Link href="#features" className="hover:text-emerald-600 transition-colors">
                Harmful Additive Guard
              </Link>
            </li>
            <li>
              <Link href="#how-it-works" className="hover:text-emerald-600 transition-colors">
                Clinical Workflow
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 2: Resources & FAQ */}
        <div>
          <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-4">
            Resources
          </h4>
          <ul className="space-y-2.5 text-sm font-medium">
            <li>
              <Link href="#faq" className="hover:text-emerald-600 transition-colors">
                Frequently Asked Questions
              </Link>
            </li>
            <li>
              <Link href="#testimonials" className="hover:text-emerald-600 transition-colors">
                Clinical Testimonials
              </Link>
            </li>
            <li>
              <Link href="/analysis" className="hover:text-emerald-600 transition-colors">
                Full Page Analyzer
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-emerald-600 transition-colors">
                Full Screen Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Legal & Social Links (GitHub, Privacy, Terms, Support) */}
        <div>
          <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-4">
            Company & Support
          </h4>
          <ul className="space-y-2.5 text-sm font-medium">
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-600 transition-colors flex items-center gap-1.5"
              >
                <span>GitHub Repository</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 font-bold">Open</span>
              </a>
            </li>
            <li>
              <Link href="#" className="hover:text-emerald-600 transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-emerald-600 transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="#contact" className="hover:text-emerald-600 transition-colors">
                Support & Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-6 md:px-12 mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div>Built with Next.js (App Router), Tailwind CSS, Shadcn UI, Framer Motion & Magic UI.</div>
        <div className="flex gap-4">
          <span className="hover:text-slate-600 cursor-pointer">Security Audit: A+</span>
          <span>•</span>
          <span className="hover:text-slate-600 cursor-pointer">Lighthouse Score: 99</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
