'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { getCart, removeFromCart } from '../lib/cart'

export default function CartPage() {
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    const load = async () => {
      const cart = getCart()
      const res = await axios.get('https://fakestoreapi.com/products')
      const products = res.data

      const full = cart.map(c => ({
        ...products.find((p: any) => p.id === c.id),
        qty: c.qty
      }))

      setItems(full)
    }

    load()
  }, [])

  const total = items.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>

      {items.map(item => (
        <div key={item.id} className="flex justify-between mb-4">
          <div>
            <h2>{item.title}</h2>
            <p>{item.qty} × ${item.price}</p>
          </div>
          <button
            onClick={() => {
              removeFromCart(item.id)
              setItems(items.filter(i => i.id !== item.id))
            }}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}

      <hr />
      <p className="text-xl font-bold mt-4">Total: ${total.toFixed(2)}</p>
    </div>
  )
}
