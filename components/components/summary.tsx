"use client";

import { Button } from "@/components/ui/Button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import {   useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import CheckOutItems from "./check-out-items";
import useCheckOutStore from "@/hooks/use-checkout_items";


const Summary = () => {
  const searchParams = useSearchParams();

  const checkOutItems = useCheckOutStore((e) => e.items);
  const checkOutitems = useCheckOutStore((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const totalPrice = checkOutItems.reduce((total, item) => {
    return total + Number(item.product.price) * item.number;
  }, 0);

const router=useRouter()
  const onCheckOut = async () => {
    if (checkOutitems.length === 0) {
      toast("No items checked.");
      return;
    }
    router.push("/cart/checkout");
  };
  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      removeAll();
    }
    if (searchParams.get("canceled")) {
      toast.error("something went wrong");
    }
  }, [removeAll,searchParams]);

  return (
    <div className="  rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      <CheckOutItems />
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button onClick={onCheckOut} className="w-ful mt-6">
        Checkout
      </Button>
    </div>
  );
};
export default Summary;
