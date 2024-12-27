import { Product } from "@/types";
import toast from "react-hot-toast";
import { create } from "zustand";


interface CheckoutStore {
  items: {product:Product,number:number}[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll:()=>void
  addNumber:(id:string)=>void
  reduceNumber:(id:string)=>void
}
const useCheckOutStore = create<CheckoutStore>((set) => ({
  items: [],
  addItem: (data: Product) => {
    set((state) => {
      // Check if the item already exists in the cart
      const existingItem = state.items.find((item) => item.product.id === data.id);

      if (existingItem) {
        // Item already exists, increase its quantity
        // const updatedItems = state.items.map((item) =>
        //   item.product.id === data.id
        //     ? { ...item, number: item.number + 1 }
        //     : item
        // );
        // toast.success("Increased item quantity!");
        return { items:state.items };
      }

      // Add new item to the cart
      // toast.success("Item added to cart!");
      return { items: [...state.items, { product: data, number: 1 }] };
    });
  },
  removeItem: (id: string) => {
    set((state) => {
      const updatedItems = state.items.filter((item) => item.product.id !== id);
      // toast.success("Item removed from cart!");
      return { items: updatedItems };
    });
  },
  removeAll: () => {
    set({ items: [] });
    // toast.success("All items removed from cart!");
  },
  addNumber:(id)=>{
    set((state)=>{
      const updatedItems=state.items.map((item)=>  item.product.id === id
          ? { ...item, number: item.number + 1 }
          : item)
          return {items:updatedItems}
    })

  },
  reduceNumber:(id)=>{
    set((state)=>{
      const updatedItems=state.items.map((item)=>  item.product.id === id
          ? { ...item, number: item.number===1?item.number:item.number - 1 }
          : item)
          return {items:updatedItems}
    })
  }
}));


export default useCheckOutStore;
