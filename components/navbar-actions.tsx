"use client";

import {  ShoppingBag } from "lucide-react";
import { Button } from "./ui/Button";
import {  useState } from "react";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";

import { Category } from "@/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const NavbarActions = ({ data }: { data: Category[] }) => {
  const cart = useCart();
  const router = useRouter();


 
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="ml-auto flex items-center transition-all gap-x-2 md:gap-x-4">
       <div className="flex items-center gap-3 z-50 md:hidden">
    
    <Popover open={isModalOpen} onOpenChange={setIsModalOpen}  >
      <PopoverTrigger  asChild>
   <div className={cn("relative transition ease-in-out duration-150 -mt-1 mr-1 ",isModalOpen&&"rotate-90")}>
  <div  className={cn("h-1 rounded-full w-7 bg-black mt-1 transition ease-in-out duration-150 ",isModalOpen&&("rotate-45 w-[15px]"))}/>
  <div className={cn("h-1 rounded-full w-7 bg-black mt-1  ", isModalOpen&&("hidden"))}/>

  <div className={cn("h-1 rounded-full w-7 bg-black mt-1 transition ease-in-out duration-150 ",isModalOpen&&("-rotate-45 w-[15px]"))}/>

   </div>
      </PopoverTrigger>
      <PopoverContent  className="flex flex-col w-52 mt-3 gap-3">
      {
        data.map((e)=><Link href={`/category/${e.id}`} key={e.id}>{e.name}</Link>)
      }

      </PopoverContent>
</Popover>
  </div>
      <Button
        onClick={() => router.push("/cart")}
        className="flex items-center rounded-full bg-black px-4 py-2"
      >
        <ShoppingBag size={20} color="white" />
        <span className="ml-2 text-sm font-medium text-white">
          {cart.items.length}
        </span>
      </Button>
     
      </div>
  );
};

export default NavbarActions;