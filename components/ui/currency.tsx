"use client"

import { useEffect, useState } from "react"

const formatter=new Intl.NumberFormat("en-US",{
    style:'currency',
    currency:"USD"
})
interface CurrencyProps{
value?:string|number
}
const Currency:React.FC<CurrencyProps> =    ({value}) => {
    const [loaded,setLoaded]=useState(false)
    useEffect(()=>setLoaded(true),[])
    return (
    loaded&&<div className="font-semibold">
        {formatter.format(Number(value))}
    </div>
  )
}

export default Currency