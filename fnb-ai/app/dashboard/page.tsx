"use client"
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FireIcon,
  BeakerIcon,
  ChartBarIcon,
  HeartIcon,
  ShieldCheckIcon,
  ArrowLeftIcon,
  ArrowPathIcon,
  SparklesIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Navbar, Footer } from '../../components/sections'
import { AuroraBackground, ShineBorder, AnimatedBadge } from '../../components/magicui'
import { Button } from '../../components/ui/button'
import { Tabs } from '../../components/ui/tabs'
import { Badge } from '../../components/ui/badge'
import { HealthGauge, IngredientsTable, NutritionChart, RecommendationCard } from '../../components/dashboard'
import { PRESET_ANALYSES, type PresetAnalysis } from '../../lib/mock-data'

export default function DashboardPage() {
  const [selectedId, setSelectedId] = React.useState<string>(PRESET_ANALYSES[0].id)
  const currentPreset: PresetAnalysis =
    PRESET_ANALYSES.find((p) => p.id === selectedId) ?? PRESET_ANALYSES[0]

  const tabItems = PRESET_ANALYSES.map((item) => ({
    id: item.id,
    label: item.name,
    badge: `${item.score}/100`,
  }))

  const nutritionData = [
    { label: 'Protein', value: parseInt(currentPreset.protein) || 20, unit: 'g' },
    { label: 'Carbs', value: parseInt(currentPreset.carbs) || 30, unit: 'g' },
    { label: 'Fat', value: parseInt(currentPreset.fat) || 15, unit: 'g' },
    { label: 'Sugar', value: parseInt(currentPreset.sugar) || 8, unit: 'g' },
  ]

  const ingredientRows = currentPreset.ingredients.split(', ').map((ing) => {
    const isBad = currentPreset.badIngredients.some((b) => ing.toLowerCase().includes(b.toLowerCase().split(' ')[0]))
    return {
      name: ing.trim(),
      qty: 'Standard serving',
      status: isBad ? ('harmful' as const) : ('good' as const),
      note: isBad
        ? 'Flagged for moderation by AI clinical guard.'
        : 'Whole food component with high nutrient density.',
    }
  })

  return (
    <AuroraBackground>
      <Navbar />

      <main className="max-w-8xl mx-auto px-6 md:px-12 py-12">
        {/* Back link & Header */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/analysis">
              <Button size="sm" variant="outline" className="font-semibold">
                <SparklesIcon className="h-4 w-4 text-emerald-600" />
                New AI Analysis
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <AnimatedBadge text="Executive Nutrition Dashboard" />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Clinical Control Room
            </h1>
            <p className="text-slate-600 mt-1">
              Live nutritional audit, safety risk scoring, and dietary optimization recommendations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="emerald" className="px-3 py-1 font-bold">
              • AI Model: F&B Neural v3
            </Badge>
            <Badge variant="sky" className="px-3 py-1 font-bold">
              Status: Live Sync
            </Badge>
          </div>
        </div>

        {/* Preset Selector Tabs */}
        <div className="flex overflow-x-auto pb-4 mb-8">
          <Tabs tabs={tabItems} activeTab={selectedId} onChange={setSelectedId} />
        </div>

        {/* Main Dashboard Workspace */}
        <div className="space-y-8">
          {/* Top Stat Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold uppercase">Health Score</span>
                <SparklesIcon className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900 mt-2">
                {currentPreset.score}
                <span className="text-sm font-semibold text-slate-400 ml-1">/ 100</span>
              </div>
              <div className="text-xs font-semibold text-emerald-600 mt-1">Algorithmic Rating</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold uppercase">Calories</span>
                <FireIcon className="h-5 w-5 text-orange-500" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900 mt-2">
                {currentPreset.calories}
                <span className="text-sm font-semibold text-slate-400 ml-1">kcal</span>
              </div>
              <div className="text-xs text-slate-500 mt-1">Energy density</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold uppercase">Protein</span>
                <BeakerIcon className="h-5 w-5 text-sky-500" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900 mt-2">
                {currentPreset.protein}
              </div>
              <div className="text-xs text-emerald-600 font-semibold mt-1">Essential amino acids</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold uppercase">Sugar</span>
                <ChartBarIcon className="h-5 w-5 text-emerald-500" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900 mt-2">
                {currentPreset.sugar}
              </div>
              <div className="text-xs text-slate-500 mt-1">Free sugar ratio</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold uppercase">Fat</span>
                <HeartIcon className="h-5 w-5 text-lime-500" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900 mt-2">
                {currentPreset.fat}
              </div>
              <div className="text-xs text-slate-500 mt-1">Lipid balance</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold uppercase">Sodium</span>
                <ShieldCheckIcon className="h-5 w-5 text-sky-500" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900 mt-2">
                {currentPreset.sodium}
              </div>
              <div className="text-xs text-slate-500 mt-1">Electrolyte index</div>
            </div>
          </div>

          {/* Main Visual Section: Gauge + Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <ShineBorder
              borderRadius={28}
              className="lg:col-span-5 p-6 bg-white/90 backdrop-blur-xl shadow-xl flex flex-col items-center justify-center"
            >
              <HealthGauge value={currentPreset.score} size={220} />
              <div className="w-full pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400 uppercase font-bold">Safety Assessment</div>
                  <div className="font-bold text-slate-800 text-sm mt-0.5">
                    {currentPreset.riskLevel === 'Low' ? 'Clean Whole Foods' : 'Moderate Additive Load'}
                  </div>
                </div>
                <Badge
                  variant={currentPreset.riskLevel === 'Low' ? 'emerald' : 'amber'}
                  className="font-bold"
                >
                  Risk: {currentPreset.riskLevel}
                </Badge>
              </div>
            </ShineBorder>

            <div className="lg:col-span-7 space-y-6">
              <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-md">
                <NutritionChart
                  data={nutritionData}
                  title={`${currentPreset.name} — Macro Spectrum`}
                  subtitle="Nutritional contribution per standardized serving size"
                />
              </div>

              <RecommendationCard
                title="AI Dietary Optimization Plan"
                confidence={96}
                alternatives={currentPreset.alternatives}
              >
                {currentPreset.suggestions}
              </RecommendationCard>
            </div>
          </div>

          {/* Harmful Additives or Alert banner */}
          {currentPreset.harmfulDetected && currentPreset.harmfulDetected.length > 0 && (
            <div className="p-6 rounded-3xl bg-red-50/90 border border-red-200 shadow-md space-y-3">
              <div className="flex items-center gap-2 text-red-800 font-bold text-base">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                <span>AI Clinical Safety Warning: Harmful Additives Detected</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentPreset.harmfulDetected.map((h, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/90 border border-red-200/70">
                    <div className="font-bold text-slate-900 text-sm">{h.name}</div>
                    <div className="text-xs text-red-700 mt-1 leading-relaxed">{h.reason}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Full Ingredients Table */}
          <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Comprehensive Ingredient Audit</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Detailed safety status, classification, and clinical guidance for each item.
                </p>
              </div>
              <Badge variant="emerald" className="font-bold self-start sm:self-auto">
                • {ingredientRows.length} Ingredients Verified
              </Badge>
            </div>

            <IngredientsTable items={ingredientRows} />
          </div>
        </div>
      </main>

      <Footer />
    </AuroraBackground>
  )
}
