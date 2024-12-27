import { Product } from "@/types";
import { create } from "zustand";

interface PreviewModalStore{
    isOpen:boolean;
    data?:Product;
    onOpen:(data: Product)=>void
    onClose:()=>void
};
const usePreviewModal=create<PreviewModalStore>((set)=>({
    isOpen:false,
    onClose:()=>set({isOpen:false}),
    onOpen:(data:Product)=>set({data,isOpen:true}),
    data:undefined

}))
export default usePreviewModal;