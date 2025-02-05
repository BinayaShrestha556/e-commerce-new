import { Color } from '@/types'


export const getColors = async (): Promise<Color[]> => {
  if(!process.env.NEXT_PUBLIC_API_URL) return []

  const URL = `${process.env.NEXT_PUBLIC_API_URL}/colors`
try {
    const res = await fetch(URL)
  
    return res.json()
} catch (error) {
  return []
}
}
