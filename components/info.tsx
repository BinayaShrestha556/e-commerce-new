import { Product } from "@/types"
import Currency from "./ui/currency"

import AddToCart from "./add-to-cart-button"
interface InfoProps{
    data:Product
}
const Info:React.FC<InfoProps>=({data})=>{
   
    return(
        <div>
            <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
            <div className="mt-2 flex items-end justify-between">
                <div className="text-xl text-gray-900">
                    <Currency value={data?.price}/>

                </div>

            </div>
            <hr className="my-4" />
            <div className="flex flex-col gap-y-4">
            
            <div className="flex items-center gap-x-4">
                <h3 className="font-semibold text-black">
                    Color:
                </h3>
                <div className="h-6 w-6 rounded-full border border-gray-600" style={{backgroundColor: data?.color?.value}}></div>
            </div>
            </div>
            <div className="mt-10 flex items-center gap-x-3">
               <AddToCart product={data}/>
            </div>
        </div>
    )
}
export default Info