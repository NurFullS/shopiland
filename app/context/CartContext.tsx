'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type CartItem = {
  id: number
  qty: number
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (id: number) => void
  removeFromCart: (id: number) => void
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('cart')
    if (saved) setCart(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (id: number) => {
    setCart(prev => {
      const item = prev.find(i => i.id === id)
      if (item) {
        return prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { id, qty: 1 }]
    })
    setIsOpen(true)
  }

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(i => i.id !== id))
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, isOpen, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false) }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
