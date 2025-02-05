import { Size } from '@/types'


export const getSizes = async (): Promise<Size[]> => {
  if(!process.env.NEXT_PUBLIC_API_URL) return []

  const URL = `${process.env.NEXT_PUBLIC_API_URL}/sizes`
try {
    const res = await fetch(URL)
  
    return res.json()
} catch (error) {
  return []
}
}
