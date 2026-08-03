import './globals.css'
import { ReactNode } from 'react'
import { AIChatBox } from '../components/ui/AIChatBox'

export const metadata = {
  title: 'F&B AI — Clinical Food & Beverage Intelligence',
  description:
    'AI-powered ingredient analysis that explains nutrition, health risks, and healthier alternatives in seconds. Get instant 0–100 health scores.',
  keywords: [
    'food AI',
    'nutrition analysis',
    'health score',
    'ingredient checker',
    'diet recommendations',
    'additive detection',
  ],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{ fontFamily: `'Plus Jakarta Sans', system-ui, sans-serif` }}
        className="bg-bg text-slate-900 antialiased selection:bg-emerald-500 selection:text-white"
      >
        {children}
        <AIChatBox />
      </body>
    </html>
  )
}
