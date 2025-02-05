import { Category } from "@/types";
const getCategories = async (): Promise<Category[]|null> => {
  try {
    if(!process.env.NEXT_PUBLIC_API_URL) return []
  const URL=`${process.env.NEXT_PUBLIC_API_URL}/categories`;
      const res = await fetch(URL);
    
  
      const data = await res.json();
      return data;
  
} catch (error) {
  return null
  
}

  };
  export default getCategories