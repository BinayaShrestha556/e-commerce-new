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
    <div className="flex gap-2 text-sm ">
        items:
        <IconButton className="p-0.5 md:p-1"  onClick={onDecrease} icon={<Minus className="h-2.5 w-2.5 aspect-square md:h-3 md:w-3"/>}/>
        <p className={`w-2 text-center ${gray&&"text-gray-400 text-sm md:text-base"}`}>{number}</p>
        <IconButton className="p-0.5 md:p-1" onClick={onIncrease} icon={<Plus className="h-2.5 w-2.5 aspect-square md:h-3 md:w-3"/>}/>


    </div>
  )
}
