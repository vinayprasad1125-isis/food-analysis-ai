"use client"
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { cn } from '../../lib/utils'

export type ToastType = 'success' | 'warning' | 'info' | 'error'

export interface ToastMessage {
  id: string
  title: string
  description?: string
  type?: ToastType
}

export interface ToastProps {
  toasts: ToastMessage[]
  onDismiss: (id: string) => void
}

const typeIcons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircleIcon className="h-5 w-5 text-emerald-500" />,
  warning: <ExclamationTriangleIcon className="h-5 w-5 text-amber-500" />,
  error: <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />,
  info: <InformationCircleIcon className="h-5 w-5 text-sky-500" />,
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
            className={cn(
              'pointer-events-auto flex items-start justify-between gap-3 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-xl'
            )}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">{typeIcons[toast.type ?? 'info']}</div>
              <div>
                <div className="font-semibold text-sm text-slate-900">{toast.title}</div>
                {toast.description && (
                  <div className="text-xs text-slate-500 mt-0.5">{toast.description}</div>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-full"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default ToastContainer
