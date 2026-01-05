'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import Header from './components/features/Header'
import Main from './components/features/Main'

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div>
      <Header />
      <Main />
    </div>
  )
}
