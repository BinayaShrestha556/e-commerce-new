"use client"

import { Product, Size } from "@/types"
import { Button } from "./ui/Button"
import { useEffect, useState } from "react"
import useCart from "@/hooks/use-cart"

interface SizeProps{
    product:Product
}


const AddToCart:React.FC<SizeProps> = ({product}) => {
  const cart=useCart()
    const [size_,setSize]=useState<Size>()
    const [message,setMessage]=useState("")
    const onClick = ()=>{
        if(!size_)
        {   
            setMessage("please choose a size")
            return
        }
        cart.addItem(product,size_)
    }
    const [isMounted, setIsmounted] = useState(false);
 
 
    useEffect(() => {
     
      setIsmounted(true);
    }, []);
    if (!isMounted) return null;
    
  return (
    <div className="w-full flex flex-col gap-6">
        <div className="flex gap-2 items-center">
           Available sizes:  {product.size?.map((size)=>(
                <Button key={size.id} variant={size_?.id===size.id?"default":"outline"} onClick={()=>{setMessage("");setSize(size)}}>{size.name}</Button>
            ))}
        </div>
        {message!==""&&<p className="text-sm text-destructive">{message}</p>}
       {!cart.items.some(e=>e.product===product)? <Button className="" onClick={onClick}>Add to Cart</Button> : <Button onClick={()=>cart.removeItem(product.id)}>Remove from cart</Button>}
    </div>
  )
}

export default AddToCart