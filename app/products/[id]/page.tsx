'use client'

import Header from '@/app/components/features/Header'
import { useParams } from 'next/navigation'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ProductsType } from '@/app/types/product'
import { Star } from 'lucide-react'
import { useCart } from '@/app/context/CartContext'

export default function ProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<ProductsType | null>(null)
  const [loading, setLoading] = useState(true)

  const { addToCart } = useCart()

  useEffect(() => {
    if (!id) return
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then(res => setProduct(res.data))
      .finally(() => setLoading(false))
  }, [id])

  return (
    <>
      <Header />

      <div className="p-6 flex justify-center">
        {loading ? (
          <p>Loading...</p>
        ) : !product ? (
          <p>Product not found</p>
        ) : (
          <div className="flex flex-col max-w-4xl md:flex-row gap-10 p-6 rounded shadow-lg">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-96 object-contain"
            />

            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-bold">{product.title}</h1>

              <p className="text-gray-600 text-lg line-clamp-3">
                {product.description}
              </p>

              <div className="flex items-center gap-2">
                <Star className="text-yellow-500" />
                <span>
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>

              <p className="text-xl font-semibold text-green-500">
                ${product.price}
              </p>

              <button
                onClick={() => addToCart(product.id)}
                className="bg-blue-500 text-white p-4 rounded-2xl text-xl font-medium mt-6 hover:bg-blue-600 transition"
              >
                Add to cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
