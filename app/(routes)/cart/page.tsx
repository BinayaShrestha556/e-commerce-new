"use client"

import Container from "@/components/ui/container"
import useCart from "@/hooks/use-cart"
import { useEffect, useState } from "react"
import CartItem from "./components/cart-item"
import NoResult from "@/components/ui/no-result"
import Summary from "./components/summary"
import useUser from "@/hooks/use-user"
import { useRouter } from "next/navigation"

const CartPage=()=>{
    const cart=useCart()
    const [mounted,setIsmounted]=useState(false)
    const router=useRouter()
    const user=useUser()
    useEffect(()=>{

        if(!user.loggedIn)
            router.push("/")
        setIsmounted(true)

    },[])
    if(!mounted) return null
    return <div className="bg-white">
        
        <Container>
                <div className="px-4 py-16 sm:px-6 lg:px-8">
                    <h1 className=" text-3xl font-bold text-black"> Shopping cart</h1>
                    {cart.items.length===0&&<div className="mt-10"><NoResult/></div>}
                    <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
                        <div className="lg:col-span-7">
                            {cart.items.length===0&&<p className="text-neutral-500">No items added to cart.</p>}
                            <ul>
                                {cart.items.map((item)=>(
                                    <CartItem
                                    key={item.product.id} size={item.size} data={item.product}/>
                                ))}
                            </ul>
                        </div>
                       

                            <Summary/>
                      
                    </div>
                </div>
        </Container>

    </div>
}
export default CartPage