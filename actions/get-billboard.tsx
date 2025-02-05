import { Billboard } from '@/types'


export const getBillboard = async (id: string): Promise<Billboard|null> => {
  if(!process.env.NEXT_PUBLIC_API_URL) return null
try {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`
    const res = await fetch(`${URL}/${id}`)
  
    return res.json()
} catch (error) {
 return null 
}
}
