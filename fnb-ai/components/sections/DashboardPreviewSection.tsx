"use client"
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FireIcon,
  BeakerIcon,
  ChartBarIcon,
  HeartIcon,
  ShieldCheckIcon,
  ArrowTopRightOnSquareIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'
import { PRESET_ANALYSES, type PresetAnalysis } from '../../lib/mock-data'
import { HealthGauge, IngredientsTable, NutritionChart, RecommendationCard } from '../dashboard'
import { Tabs } from '../ui/tabs'
import { AnimatedBadge } from '../magicui/animated-badge'
import { ShineBorder } from '../magicui/shine-border'
import { Badge } from '../ui/badge'

export const DashboardPreviewSection: React.FC = () => {
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

  const ingredientRows = currentPreset.ingredients.split(', ').map((ing, idx) => {
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
    <section id="dashboard" className="py-24 relative overflow-hidden">
      <div className="max-w-8xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <AnimatedBadge text="Interactive Clinical Dashboard" />
          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            A Premium Control Room for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-lime-500">
              Nutritional Clarity
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Test our live diagnostic dashboard below. Switch between preset meals and drinks to inspect
            real-time health scores, safety flags, and actionable AI recommendations.
          </p>
        </div>

        {/* Preset Selector Tabs */}
        <div className="mt-10 flex justify-center overflow-x-auto pb-2">
          <Tabs tabs={tabItems} activeTab={selectedId} onChange={setSelectedId} />
        </div>

        {/* Mockup Dashboard Card Container */}
        <div className="mt-10">
          <ShineBorder borderRadius={32} className="p-6 md:p-8 bg-white/90 backdrop-blur-xl shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPreset.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="space-y-8"
              >
                {/* Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider">
                        {currentPreset.category}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{currentPreset.quantity}</span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{currentPreset.name}</h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        currentPreset.riskLevel === 'Low'
                          ? 'emerald'
                          : currentPreset.riskLevel === 'Moderate'
                          ? 'amber'
                          : 'red'
                      }
                      className="px-3.5 py-1.5 text-sm font-bold"
                    >
                      {currentPreset.riskLevel === 'Low' && <ShieldCheckIcon className="h-4 w-4 mr-1 inline" />}
                      {currentPreset.riskLevel !== 'Low' && (
                        <ExclamationTriangleIcon className="h-4 w-4 mr-1 inline" />
                      )}
                      Risk Level: {currentPreset.riskLevel}
                    </Badge>
                  </div>
                </div>

                {/* Top Grid: Health Gauge + Macro Stat Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Gauge Card */}
                  <div className="lg:col-span-4 rounded-3xl bg-slate-50/70 border border-slate-200/70 p-4 flex items-center justify-center">
                    <HealthGauge value={currentPreset.score} size={200} />
                  </div>

                  {/* Macros & Calorie Stats Grid */}
                  <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                      <div className="flex items-center justify-between text-slate-400">
                        <span className="text-xs font-bold uppercase">Calories</span>
                        <FireIcon className="h-5 w-5 text-orange-500" />
                      </div>
                      <div className="text-3xl font-extrabold text-slate-900 mt-2">
                        {currentPreset.calories}
                        <span className="text-sm font-semibold text-slate-400 ml-1">kcal</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">Est. Thermogenic Load</div>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                      <div className="flex items-center justify-between text-slate-400">
                        <span className="text-xs font-bold uppercase">Protein</span>
                        <BeakerIcon className="h-5 w-5 text-sky-500" />
                      </div>
                      <div className="text-3xl font-extrabold text-slate-900 mt-2">
                        {currentPreset.protein}
                      </div>
                      <div className="text-xs text-emerald-600 font-semibold mt-1">High Bioavailability</div>
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

                    <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm col-span-2 sm:col-span-2">
                      <div className="flex items-center justify-between text-slate-400">
                        <span className="text-xs font-bold uppercase">Sodium</span>
                        <ShieldCheckIcon className="h-5 w-5 text-sky-500" />
                      </div>
                      <div className="text-3xl font-extrabold text-slate-900 mt-2">
                        {currentPreset.sodium}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">Electrolyte balance check</div>
                    </div>
                  </div>
                </div>

                {/* Middle Grid: Nutrition Chart + AI Recommendation Card */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
                    <NutritionChart
                      data={nutritionData}
                      title="Macronutrient Balance Chart"
                      subtitle="Proportional weight distribution per serving"
                    />
                  </div>

                  <RecommendationCard
                    title="AI Clinical Recommendation"
                    confidence={currentPreset.score >= 80 ? 96 : 91}
                    alternatives={currentPreset.alternatives}
                  >
                    {currentPreset.suggestions}
                  </RecommendationCard>
                </div>

                {/* Bottom Row: Ingredients Table */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-slate-900 text-lg">Parsed Ingredients Audit</h4>
                    <span className="text-xs text-slate-400">
                      Auto-detected {ingredientRows.length} component(s)
                    </span>
                  </div>
                  <IngredientsTable items={ingredientRows} />
                </div>
              </motion.div>
            </AnimatePresence>
          </ShineBorder>
        </div>
      </div>
    </section>
  )
}

export default DashboardPreviewSection
