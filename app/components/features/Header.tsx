'use client'

import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon, ShoppingCart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/app/context/CartContext'

const Header = () => {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const router = useRouter()
    const [count, setCount] = useState(0)
    const { cart, openCart } = useCart()

    useEffect(() => {
        const update = () => {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]')
            setCount(cart.reduce((sum: number, i: any) => sum + i.qty, 0))
        }

        update()
        window.addEventListener('storage', update)
        return () => window.removeEventListener('storage', update)
    }, [])

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const currentTheme = theme === 'system' ? 'light' : theme

    return (
        <header className="bg-white dark:bg-gray-800 text-black dark:text-white mb-10 p-6 flex justify-between items-center">
            <h1 className="text-xl font-bold cursor-pointer" onClick={() => router.push('/')}>ShopiLand</h1>

            <div className='flex gap-5'>
                <button onClick={openCart} className="relative cursor-pointer">
                    <ShoppingCart size={22} />
                    {cart.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-xs px-1 rounded-full">
                            {cart.reduce((s, i) => s + i.qty, 0)}
                        </span>
                    )}
                </button>

                {currentTheme === 'dark' ? (
                    <button
                        onClick={() => setTheme('light')}
                        className="p-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    >
                        <Sun size={22} />
                    </button>
                ) : (
                    <button
                        onClick={() => setTheme('dark')}
                        className="p-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    >
                        <Moon size={22} />
                    </button>
                )}
            </div>
        </header>
    )
}

export default Header
