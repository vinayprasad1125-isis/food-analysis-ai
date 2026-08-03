"use client"
import React from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bars3Icon,
  XMarkIcon,
  SparklesIcon,
  ShieldCheckIcon,
  BeakerIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline'
import { Button } from '../ui/button'
import { cn } from '../../lib/utils'
import { USDASearchBox } from '../ui/USDASearchBox'

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  React.useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Analyze', href: '#analyze' },
    { label: 'Features', href: '#features' },
    { label: 'How it Works', href: '#how-it-works' },
    { label: 'Dashboard', href: '#dashboard' },
  ]

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300 w-full',
        scrolled
          ? 'bg-white/90 backdrop-blur-lg border-b border-slate-200/80 shadow-sm py-2.5'
          : 'bg-white/50 backdrop-blur-sm py-4'
      )}
    >
      <div className="max-w-8xl mx-auto px-4 md:px-12 flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group focus:outline-none shrink-0">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 via-emerald-400 to-lime-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/25"
          >
            <SparklesIcon className="w-6 h-6" />
          </motion.div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-slate-900 flex items-center gap-1">
              F&B <span className="text-emerald-600">AI</span>
            </span>
            <span className="text-[10px] font-semibold text-slate-400 -mt-1 tracking-wider uppercase">
              Health Analysis
            </span>
          </div>
        </Link>

        {/* USDA Verified 2-Section Search Box */}
        <div className="flex-1 max-w-xl mx-2 hidden sm:block">
          <USDASearchBox />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-white/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-200/60 shadow-sm">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-3.5 py-1.5 rounded-full text-sm font-semibold text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/70 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('open-ai-chat'))}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/70 transition-all shadow-sm"
          >
            <ChatBubbleLeftRightIcon className="w-4 h-4 text-emerald-600" />
            AI Chat
          </button>
          <Link href="#analyze">
            <Button variant="default" size="sm" className="px-5 py-2.5 rounded-xl font-bold shadow-md">
              <SparklesIcon className="w-4 h-4" />
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-white/80 border border-slate-200 text-slate-700 hover:text-emerald-600 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-slate-200 bg-white/95 backdrop-blur-xl px-6 py-6 space-y-4"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-base font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-center">
                  Sign In
                </Button>
              </Link>
              <Link href="#analyze" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full justify-center font-bold">
                  Get Started
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
