import React from 'react'
import {
  Navbar,
  HeroSection,
  TrustedBy,
  FeaturesSection,
  HowItWorks,
  DashboardPreviewSection,
  AIAnalysisSection,
  TestimonialsSection,
  FAQSection,
  CTASection,
  Footer,
} from '../components/sections'
import { AuroraBackground } from '../components/magicui'

export default function HomePage() {
  return (
    <AuroraBackground showRadialGradient={true}>
      <Navbar />
      <HeroSection />
      <TrustedBy />
      <FeaturesSection />
      <HowItWorks />
      <DashboardPreviewSection />
      <AIAnalysisSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </AuroraBackground>
  )
}
