import Currency from "@/components/ui/currency";
import useCheckOutStore from "@/hooks/use-checkout_items";

import Image from "next/image";
import { Slider } from "./slider";

const CheckOutItems = () => {
  const data = useCheckOutStore((store) => store.items);
  return (
    <div className="w-full">
      {data.map((product) => (
        <div
          key={product.product.id}
          className="grid w-full mt-5  space-x-3 grid-cols-5"
        >
          <div className="  aspect-square">
            <div className="relative min-h-16 min-w-16 md:h-20 w-full h-full lg:w-24">
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
            <div className="flex items-center flex-wrap gap-x-2 md:gap-x-3 lg:gap-x-4">
              <div
                className="h-4 w-4 rounded-full "
                style={{ backgroundColor: product.product.color.value }}
              />
              <p className="text-gray-400">|</p>
              <p className="text-sm text-neutral-500">
                {product.product.category.name}
              </p>
              <Slider number={product.number} id={product.product.id} />
            </div>
          </div>
          <div className="text-right">
            <Currency value={product.product.price} />
          </div>
        </div>
      ))}
    </div>
  );
};
export default CheckOutItems;
