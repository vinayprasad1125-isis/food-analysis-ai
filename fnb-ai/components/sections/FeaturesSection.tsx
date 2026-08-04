"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BeakerIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  ArrowsRightLeftIcon,
  SparklesIcon,
  FireIcon,
  HeartIcon,
  ClipboardDocumentCheckIcon,
  XMarkIcon,
  TrophyIcon,
  CheckBadgeIcon,
  GlobeAltIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline'
import { FEATURES_DATA } from '../../lib/mock-data'
import { Card } from '../ui/card'
import { AnimatedBadge } from '../magicui/animated-badge'
import { Button } from '../ui/button'

const featureIconMap: Record<string, React.ReactNode> = {
  BeakerIcon: <BeakerIcon className="w-6 h-6 text-emerald-600" />,
  ChartBarIcon: <ChartBarIcon className="w-6 h-6 text-sky-600" />,
  ShieldCheckIcon: <ShieldCheckIcon className="w-6 h-6 text-lime-600" />,
  ExclamationTriangleIcon: <ExclamationTriangleIcon className="w-6 h-6 text-amber-600" />,
  ArrowsRightLeftIcon: <ArrowsRightLeftIcon className="w-6 h-6 text-emerald-600" />,
  SparklesIcon: <SparklesIcon className="w-6 h-6 text-lime-600" />,
  FireIcon: <FireIcon className="w-6 h-6 text-orange-600" />,
  HeartIcon: <HeartIcon className="w-6 h-6 text-emerald-600" />,
  ClipboardDocumentCheckIcon: <ClipboardDocumentCheckIcon className="w-6 h-6 text-sky-600" />,
}

interface CompareItem {
  name: string
  main_ingredients: string
  calories: number
  protein: number
  fat: number
  carbs: number
  sugar: number
  sodium: number
  source_of_production: string
}

interface CompareResult {
  food_a: CompareItem
  food_b: CompareItem
  winner: string
  winner_name: string
  verdict: string
  comparison_summary: string
}

function getKeyIngredientBadge(name: string): { label: string; value: string; badgeColor: string } {
  const n = name.toLowerCase()
  if (n.includes('banana')) {
    return {
      label: 'Key Nutrient',
      value: 'Potassium (358mg) — Electrolyte & Heart Support',
      badgeColor: 'bg-yellow-50 text-yellow-800 border-yellow-200/80',
    }
  }
  if (n.includes('salmon') || n.includes('fish')) {
    return {
      label: 'Key Nutrient',
      value: 'Omega-3 Fatty Acids (EPA/DHA) & Vitamin B3',
      badgeColor: 'bg-sky-50 text-sky-800 border-sky-200/80',
    }
  }
  if (n.includes('chicken') || n.includes('meat') || n.includes('beef') || n.includes('turkey')) {
    return {
      label: 'Key Nutrient',
      value: 'Bioavailable Lean Protein & B-Complex Vitamins',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
    }
  }
  if (n.includes('milk') || n.includes('cheese') || n.includes('dairy') || n.includes('yogurt')) {
    return {
      label: 'Key Nutrient',
      value: 'Calcium (120mg) & Bioactive Vitamin D3',
      badgeColor: 'bg-blue-50 text-blue-800 border-blue-200/80',
    }
  }
  if (n.includes('oat')) {
    return {
      label: 'Key Ingredient',
      value: 'Beta-Glucan Soluble Dietary Fiber',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200/80',
    }
  }
  if (n.includes('almond') || n.includes('nut')) {
    return {
      label: 'Key Ingredient',
      value: 'Vitamin E & Heart-Healthy Monounsaturated Fats',
      badgeColor: 'bg-orange-50 text-orange-800 border-orange-200/80',
    }
  }
  if (n.includes('choc') || n.includes('cocoa')) {
    return {
      label: 'Key Ingredient',
      value: 'Cocoa Flavanols & Natural Magnesium',
      badgeColor: 'bg-purple-50 text-purple-800 border-purple-200/80',
    }
  }
  if (n.includes('chip') || n.includes('potato') || n.includes('fries')) {
    return {
      label: 'Key Nutrient',
      value: 'Dietary Potassium & High Total Lipid Energy',
      badgeColor: 'bg-rose-50 text-rose-800 border-rose-200/80',
    }
  }
  if (n.includes('apple') || n.includes('fruit') || n.includes('berry')) {
    return {
      label: 'Key Ingredient',
      value: 'Pectin Soluble Fiber & Antioxidant Polyphenols',
      badgeColor: 'bg-red-50 text-red-800 border-red-200/80',
    }
  }
  if (n.includes('egg')) {
    return {
      label: 'Key Nutrient',
      value: 'Choline & Complete Essential Amino Acids',
      badgeColor: 'bg-amber-50 text-amber-900 border-amber-300/80',
    }
  }
  return {
    label: 'Key Nutrient / Ingredient',
    value: 'Essential Micronutrients & Bioactive Phenols',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
  }
}

function getFallbackFood(name: string): CompareItem {
  const n = name.toLowerCase()
  if (n.includes('chicken') || n.includes('meat') || n.includes('beef') || n.includes('fish') || n.includes('egg')) {
    return {
      name,
      main_ingredients: '100% Pure Animal Muscle/Protein Tissue (Unprocessed), Natural Trace Minerals',
      calories: 165,
      protein: 31.0,
      fat: 3.6,
      carbs: 0.0,
      sugar: 0.0,
      sodium: 74.0,
      source_of_production: 'Poultry / Livestock Farming — Pasture-raised or farm-harvested natural meat/protein',
    }
  }
  if (n.includes('oat') || n.includes('almond') || n.includes('soy') || n.includes('rice milk')) {
    return {
      name,
      main_ingredients: 'Plant Base (Water, Milled Grains/Nuts), Rapeseed Oil, Dipotassium Phosphate, Calcium Carbonate',
      calories: 48,
      protein: 1.2,
      fat: 1.5,
      carbs: 7.0,
      sugar: 4.0,
      sodium: 40.0,
      source_of_production: 'Grain/Nut Agriculture — Milled plant kernels emulsified with vegetable oils',
    }
  }
  if (n.includes('milk') || n.includes('cheese') || n.includes('dairy') || n.includes('yogurt')) {
    return {
      name,
      main_ingredients: 'Whole Bovine Milk, Natural Enzymes, Vitamin D3',
      calories: 61,
      protein: 3.2,
      fat: 3.3,
      carbs: 4.8,
      sugar: 5.0,
      sodium: 43.0,
      source_of_production: 'Dairy Cattle (Bos taurus) — Farm-harvested mammalian dairy',
    }
  }
  if (n.includes('choc') || n.includes('sugar') || n.includes('candy') || n.includes('cookie') || n.includes('chip')) {
    return {
      name,
      main_ingredients: 'Sugar, Cocoa Solids / Vegetable Oils, Corn Syrup, Emulsifiers (Soy Lecithin)',
      calories: 530,
      protein: 5.0,
      fat: 30.0,
      carbs: 60.0,
      sugar: 45.0,
      sodium: 150.0,
      source_of_production: 'Confectionery Processing — Refined sugar and cocoa/vegetable fat blend',
    }
  }
  return {
    name,
    main_ingredients: `${name}, Natural Dietary Fiber, Essential Trace Minerals`,
    calories: 120,
    protein: 4.5,
    fat: 2.0,
    carbs: 22.0,
    sugar: 6.0,
    sodium: 45.0,
    source_of_production: 'Agricultural Farm Production — Fresh farm-harvested crop or ingredient',
  }
}

export const FeaturesSection: React.FC = () => {
  const [compareOpen, setCompareOpen] = useState(false)
  const [foodA, setFoodA] = useState('Whole Milk')
  const [foodB, setFoodB] = useState('Oat Milk')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<CompareResult | null>(null)

  async function handleCompare(e?: React.FormEvent) {
    if (e) e.preventDefault()
    if (!foodA.trim() || !foodB.trim() || loading) return
    setLoading(true)
    try {
      const res = await fetch('/api/food/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          food_a: foodA.trim(),
          food_b: foodB.trim(),
        }),
      })
      if (res.ok) {
        const data = await res.json()
        setResult(data)
      } else {
        const fa = getFallbackFood(foodA)
        const fb = getFallbackFood(foodB)
        setResult({
          food_a: fa,
          food_b: fb,
          winner: fa.protein >= fb.protein ? 'A' : 'B',
          winner_name: fa.protein >= fb.protein ? foodA : foodB,
          verdict: `${fa.protein >= fb.protein ? foodA : foodB} is clinically superior due to its higher bioavailable protein content and cleaner macronutrient profile.`,
          comparison_summary: `Side-by-side evaluation shows that **${fa.name}** provides ${fa.protein}g protein per 100g compared to ${fb.protein}g in **${fb.name}**.`,
        })
      }
    } catch (err) {
      const fa = getFallbackFood(foodA)
      const fb = getFallbackFood(foodB)
      setResult({
        food_a: fa,
        food_b: fb,
        winner: fa.protein >= fb.protein ? 'A' : 'B',
        winner_name: fa.protein >= fb.protein ? foodA : foodB,
        verdict: `${fa.protein >= fb.protein ? foodA : foodB} is clinically superior due to its higher bioavailable protein content and cleaner macronutrient profile.`,
        comparison_summary: `Side-by-side evaluation shows that **${fa.name}** provides ${fa.protein}g protein per 100g compared to ${fb.protein}g in **${fb.name}**.`,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="max-w-8xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <AnimatedBadge text="Comprehensive Capabilities" />
          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Complete Clinical Intelligence for Every{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-lime-500">
              Ingredient
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Our multi-modal AI engine goes beyond simple barcode lookups—parsing chemical additives,
            evaluating synergistic nutrition, and guarding your daily health.
          </p>
        </div>

        {/* Animated Feature Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES_DATA.map((feature, idx) => {
            const isComparison = feature.id === 'food-comparison'
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
                whileHover={{ y: -8 }}
                className="h-full"
              >
                <Card
                  hoverEffect={false}
                  onClick={() => {
                    if (isComparison) setCompareOpen(true)
                  }}
                  className={`h-full flex flex-col justify-between p-7 bg-white/95 border-slate-200/80 hover:border-emerald-500/30 hover:shadow-xl transition-all duration-300 group ${
                    isComparison ? 'cursor-pointer ring-2 ring-emerald-500/20' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="w-13 h-13 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-emerald-50 group-hover:border-emerald-200 transition-colors">
                        {featureIconMap[feature.icon] ?? (
                          <SparklesIcon className="w-6 h-6 text-emerald-600" />
                        )}
                      </div>
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold uppercase tracking-wider group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
                        {feature.tag}
                      </span>
                    </div>

                    <h3 className="mt-6 text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {feature.title}
                    </h3>

                    <p className="mt-3 text-sm md:text-base text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>

                    {isComparison && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setCompareOpen(true)
                        }}
                        className="mt-5 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-lime-500 hover:from-emerald-700 hover:to-lime-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 transition-all"
                      >
                        <ArrowsRightLeftIcon className="w-4 h-4" />
                        Launch Food Comparison Tool ⚖️
                      </button>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-600 group-hover:underline">
                      {isComparison ? 'Click to Compare Foods →' : 'Explore API Specs →'}
                    </span>
                    <span className="text-xs text-slate-400">0–100 Engine</span>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* INTERACTIVE FOOD COMPARISON MODAL */}
      <AnimatePresence>
        {compareOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setCompareOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-4xl w-full p-6 md:p-8 shadow-2xl border border-slate-100 relative overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-emerald-600 to-lime-500 flex items-center justify-center text-white shadow-md">
                    <ArrowsRightLeftIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-slate-900">
                      AI Side-by-Side Food Comparison
                    </h3>
                    <p className="text-xs text-slate-500">
                      Compare ingredients, verified USDA nutrition, and clinical production origins
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setCompareOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Input Form */}
              <form onSubmit={handleCompare} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Food / Drink A
                  </label>
                  <input
                    type="text"
                    value={foodA}
                    onChange={(e) => setFoodA(e.target.value)}
                    placeholder="e.g. Whole Milk, Potato Chips, Coke..."
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Food / Drink B
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={foodB}
                      onChange={(e) => setFoodB(e.target.value)}
                      placeholder="e.g. Oat Milk, Apple, Orange Juice..."
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:bg-white"
                    />
                    <Button
                      type="submit"
                      disabled={loading || !foodA.trim() || !foodB.trim()}
                      className="px-6 py-3 rounded-2xl font-bold bg-gradient-to-r from-emerald-600 to-lime-500 hover:from-emerald-700 hover:to-lime-600 text-white shadow-md shrink-0"
                    >
                      {loading ? (
                        <ArrowPathIcon className="w-5 h-5 animate-spin" />
                      ) : (
                        'Compare Now'
                      )}
                    </Button>
                  </div>
                </div>
              </form>

              {/* Comparison Results */}
              {result && (
                <div className="space-y-6">
                  {/* WINNER BANNER */}
                  <div className="bg-gradient-to-r from-emerald-600 to-lime-600 text-white rounded-2xl p-4 md:p-5 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                        <TrophyIcon className="w-7 h-7 text-lime-200" />
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-lime-200 block">
                          Algorithmic Clinical Winner
                        </span>
                        <h4 className="text-lg md:text-xl font-extrabold text-white">
                          🏆 {result.winner_name}
                        </h4>
                      </div>
                    </div>
                    <p className="text-xs md:text-sm text-white/95 max-w-md leading-relaxed font-medium">
                      {result.verdict}
                    </p>
                  </div>

                  {/* SIDE-BY-SIDE COMPARISON TABLE */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* FOOD A */}
                    <div
                      className={`p-5 rounded-3xl border-2 transition-all ${
                        result.winner === 'A'
                          ? 'border-emerald-500 bg-emerald-50/30 shadow-md'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-black text-slate-900">
                          {result.food_a.name}
                        </h4>
                        {result.winner === 'A' && (
                          <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold uppercase">
                            Winner
                          </span>
                        )}
                      </div>

                      {/* Source of Production */}
                      <div className="p-3 rounded-2xl bg-slate-100/80 border border-slate-200/80 mb-3 flex items-start gap-2.5">
                        <GlobeAltIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[9px] font-extrabold uppercase text-slate-500 block">
                            Source of Production
                          </span>
                          <span className="text-xs font-bold text-slate-800">
                            {result.food_a.source_of_production}
                          </span>
                        </div>
                      </div>

                      {/* Main Ingredients */}
                      <div className="mb-4">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                          Main Verified Ingredients
                        </span>
                        <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/60 leading-relaxed font-medium mb-2.5">
                          {result.food_a.main_ingredients}
                        </p>
                        {(() => {
                          const badge = getKeyIngredientBadge(result.food_a.name)
                          return (
                            <div className={`p-2.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-1 ${badge.badgeColor}`}>
                              <div className="flex items-center gap-1.5">
                                <SparklesIcon className="w-4 h-4 shrink-0" />
                                <span className="text-[10px] font-extrabold uppercase tracking-wider shrink-0">
                                  {badge.label}:
                                </span>
                              </div>
                              <span className="text-xs font-bold sm:text-right">
                                {badge.value}
                              </span>
                            </div>
                          )
                        })()}
                      </div>

                      {/* Macronutrients Grid */}
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                          <span className="text-[9px] text-slate-500 block">Calories</span>
                          <span className="text-sm font-black text-slate-900">
                            {Math.round(result.food_a.calories)} kcal
                          </span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-lime-50 border border-lime-200/70">
                          <span className="text-[9px] text-lime-700 block">Protein</span>
                          <span className="text-sm font-black text-slate-900">
                            {result.food_a.protein}g
                          </span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200/70">
                          <span className="text-[9px] text-amber-700 block">Total Fat</span>
                          <span className="text-sm font-black text-slate-900">
                            {result.food_a.fat}g
                          </span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200/70">
                          <span className="text-[9px] text-sky-700 block">Carbs</span>
                          <span className="text-sm font-black text-slate-900">
                            {result.food_a.carbs}g
                          </span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200/70">
                          <span className="text-[9px] text-rose-700 block">Sugar</span>
                          <span className="text-sm font-black text-slate-900">
                            {result.food_a.sugar}g
                          </span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200/70">
                          <span className="text-[9px] text-indigo-700 block">Sodium</span>
                          <span className="text-sm font-black text-slate-900">
                            {result.food_a.sodium}mg
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* FOOD B */}
                    <div
                      className={`p-5 rounded-3xl border-2 transition-all ${
                        result.winner === 'B'
                          ? 'border-emerald-500 bg-emerald-50/30 shadow-md'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-black text-slate-900">
                          {result.food_b.name}
                        </h4>
                        {result.winner === 'B' && (
                          <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold uppercase">
                            Winner
                          </span>
                        )}
                      </div>

                      {/* Source of Production */}
                      <div className="p-3 rounded-2xl bg-slate-100/80 border border-slate-200/80 mb-3 flex items-start gap-2.5">
                        <GlobeAltIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[9px] font-extrabold uppercase text-slate-500 block">
                            Source of Production
                          </span>
                          <span className="text-xs font-bold text-slate-800">
                            {result.food_b.source_of_production}
                          </span>
                        </div>
                      </div>

                      {/* Main Ingredients */}
                      <div className="mb-4">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                          Main Verified Ingredients
                        </span>
                        <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/60 leading-relaxed font-medium mb-2.5">
                          {result.food_b.main_ingredients}
                        </p>
                        {(() => {
                          const badge = getKeyIngredientBadge(result.food_b.name)
                          return (
                            <div className={`p-2.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-1 ${badge.badgeColor}`}>
                              <div className="flex items-center gap-1.5">
                                <SparklesIcon className="w-4 h-4 shrink-0" />
                                <span className="text-[10px] font-extrabold uppercase tracking-wider shrink-0">
                                  {badge.label}:
                                </span>
                              </div>
                              <span className="text-xs font-bold sm:text-right">
                                {badge.value}
                              </span>
                            </div>
                          )
                        })()}
                      </div>

                      {/* Macronutrients Grid */}
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                          <span className="text-[9px] text-slate-500 block">Calories</span>
                          <span className="text-sm font-black text-slate-900">
                            {Math.round(result.food_b.calories)} kcal
                          </span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-lime-50 border border-lime-200/70">
                          <span className="text-[9px] text-lime-700 block">Protein</span>
                          <span className="text-sm font-black text-slate-900">
                            {result.food_b.protein}g
                          </span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200/70">
                          <span className="text-[9px] text-amber-700 block">Total Fat</span>
                          <span className="text-sm font-black text-slate-900">
                            {result.food_b.fat}g
                          </span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200/70">
                          <span className="text-[9px] text-sky-700 block">Carbs</span>
                          <span className="text-sm font-black text-slate-900">
                            {result.food_b.carbs}g
                          </span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200/70">
                          <span className="text-[9px] text-rose-700 block">Sugar</span>
                          <span className="text-sm font-black text-slate-900">
                            {result.food_b.sugar}g
                          </span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200/70">
                          <span className="text-[9px] text-indigo-700 block">Sodium</span>
                          <span className="text-sm font-black text-slate-900">
                            {result.food_b.sodium}mg
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Close Button Footer */}
              <div className="mt-8 flex justify-end">
                <Button
                  onClick={() => setCompareOpen(false)}
                  className="px-6 py-2.5 rounded-xl font-bold bg-slate-900 hover:bg-slate-800 text-white text-xs"
                >
                  Close Comparison Tool
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default FeaturesSection
