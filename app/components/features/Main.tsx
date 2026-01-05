'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { HandCoins, ShoppingCart, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ProductsType } from '@/app/types/product'
import { addToCart } from '@/app/lib/cart'
import { useCart } from '../../context/CartContext'


const Main = () => {

    const [products, setProducts] = useState<ProductsType[]>([])

    const [loading, setLoading] = useState(true);

    const router = useRouter()

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get("https://fakestoreapi.com/products");
                setProducts(res.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetch();
    }, []);

    const handleProductClick = (productId: number) => {
        router.push(`/products/${productId}`);
        console.log(`Product ${productId} clicked`);
    }

    const { addToCart } = useCart()

    return (
        <div className='flex flex-wrap gap-4 justify-around text-gray-800 dark:text-white'>
            {products.map(product => (
                <div
                    key={product.id}
                    className='w-65 cursor-pointer shadow-md rounded-lg justify-around items-center overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col'
                    
                >
                    <motion.div onClick={() => handleProductClick(product.id)} className='h-48 flex cursor-pointer justify-center items-center' initial={{ scale: 1 }} whileHover={{ scale: 1.1 }} transition={{ type: 'keyframes', stiffness: 300 }}>
                        <img
                            src={product.image}
                            alt={product.title}
                            className='max-h-full object-contain p-2 '
                        />
                    </motion.div>

                    <div className='p-4 flex flex-col'>
                        <h2 className='text-lg font-semibold mb-2 line-clamp-2' style={{ color: 'var(--text)' }}>
                            {product.title}
                        </h2>
                        <p className='text-gray-600 text-sm mb-4 line-clamp-3'>{product.description}</p>
                        <div className='flex items-center gap-5 mb-2' style={{ color: 'var(--text)' }}>
                            <div className='flex items-center gap-2'>
                                <Star size={16} color='yellow' />
                                <p>{product.rating.rate} ({product.rating.count} reviews)</p>
                            </div>
                        </div>
                        <div className='mt-auto flex justify-between items-center'>
                            <span className='text-green-500 font-bold text-lg'>${product.price}</span>
                            <button onClick={() => addToCart(product.id)} style={{ color: 'var(--text)' }} className='bg-blue-500 text-white px-3 py-2 cursor-pointer items-center p-2 rounded hover:bg-blue-600 transition'>
                                Add to cart <ShoppingCart className='inline-block ml-1' size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    )

}

export default Main