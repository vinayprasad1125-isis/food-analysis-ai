"use client"
import React from 'react'
import { CheckCircleIcon, ExclamationTriangleIcon, ShieldExclamationIcon } from '@heroicons/react/24/solid'
import { Badge } from '../ui/badge'

export interface IngredientRow {
  name: string
  qty: string
  status?: 'good' | 'harmful' | 'moderate' | 'neutral'
  note?: string
}

export interface IngredientsTableProps {
  items: IngredientRow[]
  className?: string
}

export const IngredientsTable: React.FC<IngredientsTableProps> = ({ items, className = '' }) => {
  function getStatusBadge(status?: string) {
    switch (status) {
      case 'good':
        return (
          <Badge variant="emerald" className="gap-1">
            <CheckCircleIcon className="h-3.5 w-3.5 text-emerald-600" />
            <span>Beneficial</span>
          </Badge>
        )
      case 'harmful':
        return (
          <Badge variant="red" className="gap-1">
            <ShieldExclamationIcon className="h-3.5 w-3.5 text-red-600" />
            <span>Harmful Flag</span>
          </Badge>
        )
      case 'moderate':
        return (
          <Badge variant="amber" className="gap-1">
            <ExclamationTriangleIcon className="h-3.5 w-3.5 text-amber-600" />
            <span>Moderate Risk</span>
          </Badge>
        )
      default:
        return <Badge variant="slate">Neutral</Badge>
    }
  }

  return (
    <div className={`overflow-x-auto rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-sm shadow-sm ${className}`}>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-200/80 bg-slate-50/70 text-xs font-bold uppercase tracking-wider text-slate-500">
            <th className="py-3.5 px-4">Ingredient Name</th>
            <th className="py-3.5 px-4">Quantity</th>
            <th className="py-3.5 px-4">Safety Status</th>
            <th className="py-3.5 px-4">Clinical Insight / Notes</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm">
          {items.map((item, idx) => (
            <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
              <td className="py-3.5 px-4 font-semibold text-slate-900">{item.name}</td>
              <td className="py-3.5 px-4 text-slate-600 font-medium">{item.qty}</td>
              <td className="py-3.5 px-4">{getStatusBadge(item.status)}</td>
              <td className="py-3.5 px-4 text-slate-600 text-xs md:text-sm leading-relaxed">
                {item.note ?? 'Standard food ingredient with normal metabolic clearance.'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default IngredientsTable
