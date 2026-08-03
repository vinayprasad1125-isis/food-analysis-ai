export interface PresetAnalysis {
  id: string
  name: string
  category: 'Food' | 'Drink'
  ingredients: string
  quantity: string
  score: number
  calories: number
  protein: string
  carbs: string
  fat: string
  sugar: string
  sodium: string
  riskLevel: 'Low' | 'Moderate' | 'High'
  goodIngredients: string[]
  badIngredients: string[]
  alternatives: string[]
  suggestions: string
  harmfulDetected: {
    name: string
    reason: string
    severity: 'low' | 'medium' | 'high'
  }[]
  vitamins: { name: string; amount: string; dailyVal: number }[]
}

export const PRESET_ANALYSES: PresetAnalysis[] = [
  {
    id: 'avocado-chicken-kale',
    name: 'Avocado Chicken Kale Power Bowl',
    category: 'Food',
    ingredients:
      '200g Grilled Chicken Breast, 1 Organic Avocado, 100g Fresh Kale, 1 tbsp Extra Virgin Olive Oil, 1 tsp Pumpkin Seeds, Lemon juice, Pinch of Sea Salt',
    quantity: '1 Bowl (380g)',
    score: 94,
    calories: 460,
    protein: '38g',
    carbs: '14g',
    fat: '26g',
    sugar: '3g',
    sodium: '320mg',
    riskLevel: 'Low',
    goodIngredients: [
      'Grilled Chicken Breast (Lean Protein)',
      'Organic Avocado (Monounsaturated Fats)',
      'Fresh Kale (Vitamins A, C, K)',
      'Extra Virgin Olive Oil (Polyphenols)',
      'Pumpkin Seeds (Magnesium & Zinc)',
    ],
    badIngredients: ['Sea Salt (In moderation)'],
    alternatives: [
      'Use nutritional yeast instead of extra salt for umami flavor',
      'Add quinoa for an extra complex carbohydrate boost',
    ],
    suggestions:
      'An outstanding nutrient-dense meal with exceptional amino acid profile and healthy lipid balance. Highly recommended for post-workout recovery and sustained cognitive energy.',
    harmfulDetected: [],
    vitamins: [
      { name: 'Vitamin K', amount: '120mcg', dailyVal: 100 },
      { name: 'Vitamin C', amount: '68mg', dailyVal: 75 },
      { name: 'Potassium', amount: '740mg', dailyVal: 22 },
      { name: 'Magnesium', amount: '85mg', dailyVal: 20 },
    ],
  },
  {
    id: 'matcha-oat-latte',
    name: 'Artisanal Matcha Oat Latte',
    category: 'Drink',
    ingredients:
      '3g Ceremonial Grade Uji Matcha, 200ml Organic Barista Oat Milk, 1 tsp Raw Agave Nectar, Hot Water',
    quantity: '1 Cup (240ml)',
    score: 84,
    calories: 140,
    protein: '3g',
    carbs: '22g',
    fat: '4.5g',
    sugar: '9g',
    sodium: '85mg',
    riskLevel: 'Low',
    goodIngredients: [
      'Ceremonial Grade Matcha (L-Theanine & Catechins)',
      'Organic Barista Oat Milk (Beta-glucans)',
    ],
    badIngredients: ['Raw Agave Nectar (Free Sugars)'],
    alternatives: [
      'Replace agave nectar with monk fruit or stevia drops to eliminate free sugar spike',
      'Use unsweetened almond milk to reduce carbohydrate load by 50%',
    ],
    suggestions:
      'Excellent beverage choice offering calm focus without coffee jitters. Matcha provides potent EGCG antioxidants that support vascular and cellular health.',
    harmfulDetected: [],
    vitamins: [
      { name: 'Antioxidant EGCG', amount: '137mg', dailyVal: 95 },
      { name: 'Calcium', amount: '180mg', dailyVal: 18 },
      { name: 'Vitamin B12', amount: '1.2mcg', dailyVal: 50 },
    ],
  },
  {
    id: 'energy-drink',
    name: 'Commercial Citrus Energy Drink',
    category: 'Drink',
    ingredients:
      'Carbonated Water, High Fructose Corn Syrup, Citric Acid, Taurine, Sodium Benzoate, Artificial Flavoring, Caffeine (160mg), FD&C Yellow #5, Sucralose',
    quantity: '1 Can (355ml)',
    score: 38,
    calories: 210,
    protein: '0g',
    carbs: '54g',
    fat: '0g',
    sugar: '52g',
    sodium: '240mg',
    riskLevel: 'High',
    goodIngredients: ['Taurine (Amino acid derivative)'],
    badIngredients: [
      'High Fructose Corn Syrup (Rapid glycemic spike)',
      'Sodium Benzoate (Synthetic preservative)',
      'FD&C Yellow #5 (Artificial dye)',
      'Excessive Caffeine (160mg single dose)',
    ],
    alternatives: [
      'Switch to natural sparkling green tea with organic ginger',
      'Try electrolyte infused mineral water with fresh lemon squeeze',
      'Yerba mate cold brew for natural, sustained energy without crash',
    ],
    suggestions:
      'Warning: This beverage contains 52g of refined sugars—exceeding the daily recommended sugar intake by 104%. Artificial colorings and high caffeine concentration pose risks to sleep architecture and metabolic balance.',
    harmfulDetected: [
      {
        name: 'High Fructose Corn Syrup',
        reason: 'Associated with hepatic insulin resistance and rapid blood glucose spikes.',
        severity: 'high',
      },
      {
        name: 'FD&C Yellow #5 (Tartrazine)',
        reason: 'Synthetic petroleum dye linked to hyperactivity sensitivity in certain individuals.',
        severity: 'medium',
      },
      {
        name: 'Sodium Benzoate',
        reason: 'Preservative that can form benzene traces under certain heat and light conditions.',
        severity: 'medium',
      },
    ],
    vitamins: [
      { name: 'Niacin (B3)', amount: '20mg', dailyVal: 100 },
      { name: 'Vitamin B6', amount: '2mg', dailyVal: 100 },
    ],
  },
  {
    id: 'fast-food-burger',
    name: 'Double Bacon Cheddar Burger',
    category: 'Food',
    ingredients:
      '2 Beef Patties (80/20), 2 Slices Processed American Cheddar, Brioche Bun (White Flour, Sugar, Preservatives), 2 Slices Smoked Bacon, Commercial Ketchup, Soybean Oil',
    quantity: '1 Burger (260g)',
    score: 48,
    calories: 780,
    protein: '42g',
    carbs: '48g',
    fat: '46g',
    sugar: '11g',
    sodium: '1420mg',
    riskLevel: 'Moderate',
    goodIngredients: [
      'Beef Patties (High bioavailable iron & B12)',
    ],
    badIngredients: [
      'Processed American Cheddar (Emulsifying salts & high sodium)',
      'Brioche Bun (Refined white flour & added fructose)',
      'Smoked Bacon (Nitrates & sodium)',
      'Soybean Oil (High Omega-6 linoleic acid)',
    ],
    alternatives: [
      'Swap brioche bun for a whole-grain artisanal sourdough or lettuce wrap',
      'Choose grass-fed lean beef patties (90/10) to reduce saturated fat by 35%',
      'Replace processed cheese with real aged cheddar or avocado slices',
    ],
    suggestions:
      'Provides high protein, but the excessive sodium (1420mg) and refined carbohydrates make it taxing on cardiovascular health. Great for occasional indulgence, but optimize sides with fresh greens.',
    harmfulDetected: [
      {
        name: 'Sodium Nitrites (Bacon)',
        reason: 'Preservative commonly used in cured meats; overconsumption linked to inflammation.',
        severity: 'high',
      },
      {
        name: 'Excessive Sodium (1420mg)',
        reason: 'Represents ~62% of daily recommended sodium limit in a single item.',
        severity: 'medium',
      },
    ],
    vitamins: [
      { name: 'Iron', amount: '4.8mg', dailyVal: 27 },
      { name: 'Vitamin B12', amount: '2.4mcg', dailyVal: 100 },
      { name: 'Zinc', amount: '6.2mg', dailyVal: 56 },
    ],
  },
  {
    id: 'ginger-turmeric-elixir',
    name: 'Cold-Pressed Ginger Turmeric Elixir',
    category: 'Drink',
    ingredients:
      'Fresh Hawaiian Ginger Root, Organic Turmeric Root, Ceylon Black Pepper Extract, Meyer Lemon Juice, Raw Manuka Honey, Coconut Water',
    quantity: '1 Bottle (330ml)',
    score: 98,
    calories: 90,
    protein: '1g',
    carbs: '21g',
    fat: '0.2g',
    sugar: '14g',
    sodium: '45mg',
    riskLevel: 'Low',
    goodIngredients: [
      'Organic Turmeric Root (Curcumin anti-inflammatory)',
      'Hawaiian Ginger Root (Gingerols & digestive aid)',
      'Ceylon Black Pepper (Piperine boosts curcumin absorption by 2000%)',
      'Coconut Water (Natural potassium & electrolytes)',
    ],
    badIngredients: [],
    alternatives: [
      'For zero-sugar keto option, dilute 50/50 with sparkling mineral water',
    ],
    suggestions:
      'An exceptional functional drink with maximum bioavailability of antioxidants. Piperine from black pepper ensures high curcumin uptake. Perfect daily immune and anti-inflammatory support.',
    harmfulDetected: [],
    vitamins: [
      { name: 'Vitamin C', amount: '45mg', dailyVal: 50 },
      { name: 'Potassium', amount: '480mg', dailyVal: 14 },
      { name: 'Curcuminoids', amount: '210mg', dailyVal: 100 },
    ],
  },
]

export const FEATURES_DATA = [
  {
    id: 'ingredient-analysis',
    title: 'Ingredient Analysis',
    description:
      'Deep AI semantic parsing identifies every individual ingredient, additive, and preservative in any food or beverage.',
    icon: 'BeakerIcon',
    color: 'from-emerald-500/15 to-emerald-500/5',
    accent: 'text-emerald-600',
    tag: 'Core Engine',
  },
  {
    id: 'nutrition-breakdown',
    title: 'Nutrition Breakdown',
    description:
      'Precise estimation of calories, macronutrients, glycemic load, fiber, and micronutrient ratios from natural text or labels.',
    icon: 'ChartBarIcon',
    color: 'from-sky-500/15 to-sky-500/5',
    accent: 'text-sky-600',
    tag: 'Precision',
  },
  {
    id: 'ai-health-score',
    title: 'AI Health Score',
    description:
      'A holistic 0–100 score calculated by our neural engine considering ingredient synergy, processing level, and dietary risks.',
    icon: 'ShieldCheckIcon',
    color: 'from-lime-500/15 to-lime-500/5',
    accent: 'text-lime-600',
    tag: 'Algorithmic',
  },
  {
    id: 'harmful-detection',
    title: 'Harmful Ingredient Detection',
    description:
      'Automatically flags synthetic food dyes, high fructose corn syrup, nitrates, hidden sugars, and endocrine disruptors.',
    icon: 'ExclamationTriangleIcon',
    color: 'from-amber-500/15 to-amber-500/5',
    accent: 'text-amber-600',
    tag: 'Safety Guard',
  },
  {
    id: 'food-comparison',
    title: 'Food Comparison',
    description:
      'Side-by-side comparison of multiple meals or commercial drinks to help you pick the cleanest, most nutrient-dense option.',
    icon: 'ArrowsRightLeftIcon',
    color: 'from-emerald-500/15 to-sky-500/5',
    accent: 'text-emerald-600',
    tag: 'Smart Choice',
  },
  {
    id: 'healthy-alternatives',
    title: 'Healthy Alternatives',
    description:
      'Instant AI recommendations for cleaner substitutions that maintain flavor while dramatically reducing metabolic strain.',
    icon: 'SparklesIcon',
    color: 'from-lime-500/15 to-emerald-500/5',
    accent: 'text-lime-600',
    tag: 'Actionable',
  },
  {
    id: 'calorie-estimation',
    title: 'Calorie Estimation',
    description:
      'AI volumetric and density modeling estimates realistic calorie counts even for complex restaurant dishes and recipes.',
    icon: 'FireIcon',
    color: 'from-orange-500/15 to-amber-500/5',
    accent: 'text-orange-600',
    tag: 'Metabolism',
  },
  {
    id: 'vitamin-mineral',
    title: 'Vitamin & Mineral Insights',
    description:
      'Uncovers micronutrient density including bioavailable iron, potassium, B-complex vitamins, antioxidants, and polyphenols.',
    icon: 'HeartIcon',
    color: 'from-emerald-500/15 to-lime-500/5',
    accent: 'text-emerald-600',
    tag: 'Vitality',
  },
  {
    id: 'diet-recommendations',
    title: 'Diet Recommendations',
    description:
      'Tailored guidance for Keto, Mediterranean, High-Protein, Vegan, Gluten-Free, and Heart-Healthy dietary lifestyles.',
    icon: 'ClipboardDocumentCheckIcon',
    color: 'from-sky-500/15 to-emerald-500/5',
    accent: 'text-sky-600',
    tag: 'Personalized',
  },
]

export const TESTIMONIALS_DATA = [
  {
    id: '1',
    name: 'Dr. Elena Rostova',
    role: 'Clinical Nutritionist & Researcher',
    avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    text:
      'F&B AI has become an indispensable diagnostic aid for my patients. Its ability to detect hidden emulsifiers and sugar alcohols in commercial drinks has eye-opening precision.',
    org: 'Stanford Nutrition Inst.',
  },
  {
    id: '2',
    name: 'Marcus Vance',
    role: 'Executive Chef & Culinary Director',
    avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    text:
      'We use F&B AI to audit our restaurant menus. The AI recommendations helped us replace high-sodium seasonings with umami-rich organic herbs while raising our overall health score to 92.',
    org: 'Verde Kitchen Group',
  },
  {
    id: '3',
    name: 'Sarah Jenkins',
    role: 'Marathon Triathlete',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    text:
      'The speed of analyzing an ingredient list before a race is game-changing. I discovered that two of my "healthy" energy gels had synthetic dyes causing stomach inflammation.',
    org: 'Endurance Athlete',
  },
  {
    id: '4',
    name: 'Kenji Takahashi',
    role: 'Founder & CEO, BioFuel Labs',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    text:
      'We tested over 400 consumer beverages against F&B AI’s algorithm. The correlation with lab-measured glycemic responses was above 94%. True startup excellence.',
    org: 'BioFuel Tech',
  },
]

export const FAQ_DATA = [
  {
    id: 'how-does-ai-analyze',
    title: 'How does F&B AI analyze complex ingredient lists?',
    content:
      'Our neural architecture combines large language models trained on over 250,000 food chemistry and clinical nutrition datasets with real-time USDA and EFSA ingredient registries. When you submit text or upload an ingredient label, our AI parses chemical synonyms, processing additives, and quantity ratios to compute an objective health score.',
  },
  {
    id: 'what-is-health-score',
    title: 'What does the 0–100 AI Health Score mean?',
    content:
      'The Health Score is a composite rating evaluating nutrient density, whole-food percentage, fiber-to-carbohydrate ratios, sodium/sugar thresholds, and the presence of synthetic additives. Scores above 80 represent nutrient-rich whole foods; scores 60–79 indicate balanced daily options; and scores below 50 flag foods with high processing or cardiovascular risks.',
  },
  {
    id: 'can-it-detect-harmful',
    title: 'Can F&B AI detect hidden additives and artificial dyes?',
    content:
      'Yes. Our Harmful Ingredient Detection engine automatically identifies over 1,200 regulated and debated food additives, including synthetic colorings (e.g., Red 40, Yellow 5), chemical preservatives (e.g., Sodium Benzoate, TBHQ), high fructose corn syrup, and emulsifiers linked to gut microbiome disruption.',
  },
  {
    id: 'is-it-customizable-for-diets',
    title: 'Can I use F&B AI for Keto, Vegan, or Gluten-Free diets?',
    content:
      'Absolutely. You can tailor recommendations in your dashboard for specific dietary lifestyles including Ketogenic, Plant-Based/Vegan, Low-FODMAP, Heart-Healthy, and Allergen-Free profiles. The AI will highlight non-compliant ingredients and suggest instant substitutions.',
  },
  {
    id: 'how-accurate-is-calorie-estimate',
    title: 'How accurate is the calorie and macronutrient estimation?',
    content:
      'For standard recipes and labeled ingredients, accuracy is within 97% of laboratory bomb calorimetry. For restaurant dishes without explicit gram weights, our AI uses contextual volumetric modeling to give you realistic calorie ranges and macro distributions.',
  },
]

export const TRUSTED_LOGOS = [
  { name: 'Verde Kitchen Group', category: 'Restaurants', badge: 'Fine Dining' },
  { name: 'Stanford Clinical Nutrition', category: 'Nutritionists', badge: 'Research Lab' },
  { name: 'Apex Athlete Performance', category: 'Fitness', badge: 'Olympic Prep' },
  { name: 'Metro Health Center', category: 'Hospitals', badge: 'Preventive Care' },
  { name: 'BioPure Analytics', category: 'Food Labs', badge: 'ISO Certified' },
]

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: 'Input Food or Ingredients',
    description: 'Upload a picture of your meal, paste an ingredient list from any package, or type a custom recipe.',
    icon: 'ClipboardDocumentListIcon',
    badge: 'Instant Input',
  },
  {
    step: 2,
    title: 'AI Semantic Extraction',
    description: 'Our AI parses every compound, isolating whole foods from synthetic additives, preservatives, and hidden sugars.',
    icon: 'CpuChipIcon',
    badge: 'Neural Engine',
  },
  {
    step: 3,
    title: 'Clinical Database Lookup',
    description: 'Real-time cross-referencing with verified clinical nutrition registries, micronutrient tables, and glycemic indexes.',
    icon: 'CircleStackIcon',
    badge: '250K+ Foods',
  },
  {
    step: 4,
    title: 'AI Health Score Generated',
    description: 'A holistic 0–100 health score is calculated, flagging harmful additives and highlighting beneficial bioactives.',
    icon: 'ShieldCheckIcon',
    badge: '0–100 Rating',
  },
  {
    step: 5,
    title: 'Recommendations & Alternatives',
    description: 'Receive instant, actionable culinary substitutions that improve nutrient density without sacrificing taste.',
    icon: 'SparklesIcon',
    badge: 'Smart Upgrade',
  },
]
