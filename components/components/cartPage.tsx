

"use client";

import Container from "@/components/ui/container";
import useCart from "@/hooks/use-cart";
import { useEffect, useState } from "react";
import CartItem from "./cart-item";
import NoResult from "@/components/ui/no-result";
import Summary from "./summary";

const CartPage = () => {
  const items = useCart(e=>e.items);
  const [mounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-7 md:10 lg:14 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-3xl font-bold text-black">Shopping cart</h1>
          {items.length === 0 && (
            <div className="mt-10">
              <NoResult />
            </div>
          )}
          <div className="mt-3 md:mt-5 lg:mt-7 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {items.length === 0 && (
                <p className="text-neutral-500">No items added to cart.</p>
              )}
              <ul>
                {items.map((item) => (
                  <CartItem
                    key={item.product.id}
                    size={item.size}
                    data={item.product}
                  />
                ))}
              </ul>
            </div>
            <Summary />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
