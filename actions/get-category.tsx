import { Category } from '@/types'


export const getCategory = async (id: string): Promise<Category|null> => {
  if(!process.env.NEXT_PUBLIC_API_URL) return null
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`
try {
  
    const res = await fetch(`${URL}/${id}`)
  
    return await res.json()
} catch (error) {
  return null
}
}
