"use client"

import Currency from "@/components/ui/currency"
import IconButton from "@/components/ui/icon-button"
import useCart from "@/hooks/use-cart"
import useCheckOutStore from "@/hooks/use-checkout_items"
import { Product, Size } from "@/types"
import { Checkbox } from "@material-tailwind/react"
import {   LucideCheckSquare2, X } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface CartItemProps{
    data:Product
    size: Size
}
const CartItem:React.FC<CartItemProps>=({data,size})=>{
    const cart = useCart()
    const checkOut=useCheckOutStore()
    // const [checkBox,setCheckBox]=useState(false)
    const onRemove=()=>{
        cart.removeItem(data.id)
    
    }
    const onCheck=()=>{
        if(checkOut.items.some((item) => item.product.id === data.id)) 
            checkOut.removeItem(data.id)
        else
        checkOut.addItem(data,size)
        // console.log(checkOut.items)
    }
    
    return(
        <li className="flex gap-x-3 py-6 border-b">
            <div className="self-center relative flex">
           {/* <input type="checkbox" className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={checkOut.items.includes(data)} onChange={onCheck}/> */}
           {/* <input   type="checkbox" className="appearance-none w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600"/> */}
          <input type="checkbox" className="w-4 h-4 appearance-none border rounded-sm z-30 border-black" onChange={onCheck}/>
            {checkOut.items.some((item) => item.product.id === data.id)&&<LucideCheckSquare2  className="h-5 z-0  w-5 absolute -top-0.5 -left-0.5"/>}
           </div>
            <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
                <Image fill src={data.images[0].url} alt="" className="object-cover object-center"/>
            </div>
            <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div className="absolute z-10 right-0 top-0">
                    <IconButton onClick={onRemove} icon={<X size={12}/>}/>
                </div>
                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6">
                    <div className="flex ">
                        <p className="text-lg font-semibold text-black">
                            {data.name}

                        </p>
                    </div>
                    <div className="mt-1 flex text-sm">
                        <p className="text-gray-500">{data.color.name}</p>
                        <p className="text-gray-500 ml-4 border-gray-200 pl-4 border-l">{size.name}</p>

                    </div>
                    <Currency value={data.price}/>
                </div>
            </div>
            
        </li>
    )
}
export default CartItem