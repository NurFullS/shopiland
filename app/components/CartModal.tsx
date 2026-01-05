'use client'

import { useCart } from '../context/CartContext'
import { X } from 'lucide-react'

const CartModal = () => {
  const { cart, isOpen, closeCart, removeFromCart } = useCart()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
      <div className="w-96 bg-white dark:bg-gray-800 p-4 h-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Cart</h2>
          <button onClick={closeCart}><X /></button>
        </div>

        {cart.length === 0 && <p>Cart is empty</p>}

        {cart.map(item => (
          <div key={item.id} className="flex justify-between mb-2">
            <span>Product #{item.id}</span>
            <span>x{item.qty}</span>
            <button
              className="text-red-500"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CartModal
