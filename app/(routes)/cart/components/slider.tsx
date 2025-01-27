"use client"

import IconButton from "@/components/ui/icon-button"
import useCheckOutStore from "@/hooks/use-checkout_items"
import { ArrowLeftIcon, ArrowRightIcon, Minus, Plus } from "lucide-react"
import { useState } from "react"
interface SliderProps{
    id:string,
    number:number
}

export const Slider:React.FC<SliderProps> = ({id,number}) => {
    
    const [gray,setGray]=useState(false)
    const checkOutItems=useCheckOutStore()
    const onIncrease=()=>{

        checkOutItems.addNumber(id)
        setGray(false)
        console.log(checkOutItems);


    }
    const onDecrease=()=>{
        if(number==1){
            setGray(true)
        return}
        checkOutItems.reduceNumber(id)

    }
  return (
    <div className="flex gap-2">
        items:
        <IconButton className="p-1"  onClick={onDecrease} icon={<Minus size={12}/>}/>
        <p className={`w-2 text-center ${gray&&"text-gray-400"}`}>{number}</p>
        <IconButton className="p-1" onClick={onIncrease} icon={<Plus size={12}/>}/>


    </div>
  )
}
