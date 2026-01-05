'use client'

import { ThemeProvider } from 'next-themes'
import { CartProvider } from './context/CartContext'
import CartModal from './components/CartModal'

export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      <CartProvider>
        {children}
        <CartModal />
      </CartProvider>

    </ThemeProvider>
  )
}
