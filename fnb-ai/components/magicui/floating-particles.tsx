"use client"
import React from 'react'
import { motion } from 'framer-motion'

export interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

export const FloatingParticles: React.FC<{ count?: number }> = ({ count = 16 }) => {
  const [particles, setParticles] = React.useState<Particle[]>([])

  React.useEffect(() => {
    const arr: Particle[] = []
    for (let i = 0; i < count; i++) {
      arr.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 5 + 3,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
      })
    }
    setParticles(arr)
  }, [count])

  if (particles.length === 0) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: 0.15,
            scale: 0.8,
          }}
          animate={{
            top: [`${p.y}%`, `${(p.y + 20) % 100}%`, `${p.y}%`],
            left: [`${p.x}%`, `${(p.x - 10 + 100) % 100}%`, `${p.x}%`],
            opacity: [0.15, 0.45, 0.15],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
          className="absolute rounded-full bg-gradient-to-tr from-emerald-400 to-sky-300 blur-[1px]"
        />
      ))}
    </div>
  )
}

export default FloatingParticles
