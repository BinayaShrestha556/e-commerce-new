import { Product, Size } from "@/types";
import toast from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartStore {
  items: {
    product:Product,
    size:Size
  }[];
  addItem: (data: Product,size:Size) => void;
  removeItem: (id: string) => void;
  removeAll:()=>void
}
const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product,size:Size) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.product.id === data.id);
        if (existingItem) return toast("Item already in cart.");
        set({ items: [...get().items, {product:data,size}] });
        // toast.success("Items sucessfully added to cart.");
      },
      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item.product.id !== id)] });
        toast.success("Items removed from the cart.");
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
