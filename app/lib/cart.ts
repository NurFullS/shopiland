export type CartItem = {
  id: number
  qty: number
}

export const getCart = (): CartItem[] => {
  if (typeof window === 'undefined') return []
  return JSON.parse(localStorage.getItem('cart') || '[]')
}

export const addToCart = (id: number) => {
  const cart = getCart()
  const item = cart.find(i => i.id === id)

  if (item) {
    item.qty += 1
  } else {
    cart.push({ id, qty: 1 })
  }

  localStorage.setItem('cart', JSON.stringify(cart))
}

export const removeFromCart = (id: number) => {
  const cart = getCart().filter(i => i.id !== id)
  localStorage.setItem('cart', JSON.stringify(cart))
}
