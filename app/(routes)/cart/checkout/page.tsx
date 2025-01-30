"use client";
import { Button } from "@/components/ui/Button";
import Currency from "@/components/ui/currency";
import CheckOutItems from "../components/check-out-items";
import useCheckOutStore from "@/hooks/use-checkout_items";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/use-user";
import useCart from "@/hooks/use-cart";
import toast from "react-hot-toast";
const formSchema = z.object({

  contactNumber: z
    .string()
    .min(10, { message: "contact number must be 10 digit long" }),
  shippingAddress: z.string().min(1),
  paymentMethod: z.string().min(1),
});
type FormValues = z.infer<typeof formSchema>;
const page = () => {
  const items = useCheckOutStore((state) => state.items);
  const cart = useCart()
  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.product.price) * item.number;
  }, 0);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      
      shippingAddress: "",
      contactNumber: "",
      paymentMethod: "",
    },
  });
  const onSubmit =async (values: FormValues) => {
    console.log("helo")
    const orderItems = items.map((e) => ({
      productId: e.product.id,
      sizeId: e.size.id,
      numberOfItem: e.number.toString(),
    }));
    const data = {
      orderItems,
      address: values.shippingAddress,
      phone: values.contactNumber,
    };
   try {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`,data,{withCredentials:true})
    items.map((e)=>{
      cart.removeItem(e.product.id)
    })
    toast.success("Order placed")
    router.push("/")
   } catch (error) {
    console.log(error)
   } 
  };
  const [mounted,setIsmounted]=useState(false)

  const router=useRouter()
    const user=useUser()
    useEffect(()=>{

        if(!user.loggedIn)
            router.push("/")
        setIsmounted(true)

    },[])
  if (!mounted) return null;

  return (
    <div className="m-auto flex w-[80%] gap-6 justify-center mt-10">
      <div className="mt-16 min-w-64 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
        <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
        <CheckOutItems orderNumber={true} />
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between border-gray-200 pt-4">
            <div className="text-base font-medium text-gray-900">
              Order total
            </div>
            <Currency value={totalPrice} />
          </div>
        </div>
        <Button className="w-ful mt-6">Checkout</Button>
      </div>
      <div className="w-[40%]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3 "
          >
            <FormField
              control={form.control}
              name="shippingAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipping address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField control={form.control} name="shippingAddress" render={({field})=>(
                    <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl><Input {...field}/></FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/> */}
            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipping Address</FormLabel>

                  <Select
                    disabled={false}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select payment method"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem key={"cash"} value={"cash"}>
                        Cash on delivery
                      </SelectItem>
                      <SelectItem key={"online"} value={"online"}>
                        Select online methods
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button >order</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default page;
