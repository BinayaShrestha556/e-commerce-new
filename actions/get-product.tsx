import { Product } from '@/types'


export const getProduct = async (id: string): Promise<Product|null> => {
  if(!process.env.NEXT_PUBLIC_API_URL) return null

  const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`
try {
    const res = await fetch(`${URL}/${id}`)
  
    return res.json()
} catch (error) {
  return null
}
}
