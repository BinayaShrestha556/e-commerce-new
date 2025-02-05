import { Product } from '@/types'
import qs from 'query-string'


interface Query {
  categoryId?: string
  colorId?: string
  sizeId?: string
  isFeatured?: boolean
}

export const getProducts = async (query: Query): Promise<Product[]> => {
  if(!process.env.NEXT_PUBLIC_API_URL) return []

  const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      categoryId: query.categoryId,
      colorId: query.colorId,
      sizeId: query.sizeId,
      isFeatured: query.isFeatured,
    },
  })

try {
    const res = await fetch(url)
  
    return res.json()
} catch (error) {
  return []
}
}
