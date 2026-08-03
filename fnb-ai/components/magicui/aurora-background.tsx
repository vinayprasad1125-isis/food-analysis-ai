"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

export interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  showRadialGradient?: boolean
}

export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
  className = '',
  children,
  showRadialGradient = true,
  ...props
}) => {
  return (
    <main
      className={cn(
        'relative flex flex-col min-h-screen items-center justify-start bg-[#FCFCFC] text-slate-950 transition-bg overflow-hidden',
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {/* Soft Aurora green & sky ambient blobs */}
        <motion.div
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -30, 40, 0],
            scale: [1, 1.08, 0.95, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-32 left-1/4 w-[550px] h-[400px] bg-gradient-to-tr from-emerald-300/25 via-lime-200/20 to-sky-200/15 rounded-full blur-[110px]"
        />

        <motion.div
          animate={{
            x: [0, -40, 40, 0],
            y: [0, 50, -20, 0],
            scale: [1, 0.94, 1.05, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-48 right-1/4 w-[480px] h-[360px] bg-gradient-to-bl from-sky-300/20 via-emerald-200/15 to-lime-100/20 rounded-full blur-[120px]"
        />

        {showRadialGradient && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-transparent via-bg/40 to-[#FCFCFC]" />
        )}
      </div>

      <div className="relative z-10 w-full">{children}</div>
    </main>
  )
}

export default AuroraBackground
