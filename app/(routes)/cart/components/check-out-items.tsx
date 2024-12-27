import Currency from "@/components/ui/currency";
import useCheckOutStore from "@/hooks/use-checkout_items";
import { Product } from "@/types";
import Image from "next/image";
import { Slider } from "./slider";

const CheckOutItems = ({orderNumber=false}:{orderNumber?:boolean}) => {
  const data = useCheckOutStore((store) => store.items);
  return (
    <div>
      {data.map((product) => (
        <div key={product.product.id} className="grid w-full mt-5 space-x-3 grid-cols-5">
          <div className="col-span-1 aspect-square">
            <div className="relative h-full w-full">
              <Image
                fill
                src={product.product.images[0]?.url}
                alt=""
                className="object-cover object-center"
              />
            </div>
          </div>
          <div className="col-span-3">
            <p className="font-semibold">{product.product.name}</p>
            <div className="flex items-center gap-x-4">
                <div className="h-4 w-4 rounded-full " style={{backgroundColor:product.product.color.value}}/>
                <p className="text-gray-400">|</p> 
                <p className="text-sm text-neutral-500">{product.product.category.name}</p>
            </div>
          </div>
          <div className="text-right">
          <Currency value={product.product.price}/>
          <Slider number={product.number} id={product.product.id}/></div>
        </div>
      ))}
    </div>
  );
};
export default CheckOutItems;
