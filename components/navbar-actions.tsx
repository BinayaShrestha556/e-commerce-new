"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "./ui/Button";
import { useEffect, useState } from "react";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import axios from "axios";
import useUser from "@/hooks/use-user";
import Image from "next/image";

const NavbarActions = () => {
  const cart = useCart();
  const router = useRouter();
  const [isMounted, setIsmounted] = useState(false);
 
  const user=useUser()
  useEffect(() => {
   
    setIsmounted(true);
  }, []);
  if (!isMounted) return null;
  const onclick = () => {
    const baseUrl = "http://localhost:3000/auth/users/login";
    const params = new URLSearchParams({
      redirect: "http://localhost:3001",
    });

    window.location.href = `${baseUrl}?${params.toString()}`;
  };

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button onClick={()=>router.push("/cart")} className="flex items-center rounded-full bg-black px-4 py-2">
        <ShoppingBag size={20} color="white" />
        <span className="ml-2 text-sm font-medium text-white">
          {cart.items.length}
        </span>
        <span>{}</span>
      </Button>
      {!user.loggedIn&&<Button onClick={onclick}>signin</Button>}
     {user.loggedIn&& <Button className="relative h-8 w-8 rounded-full overflow-hidden"> <Image alt="" fill className="object-cover object-center" src={user.user?.image||"/avatar.png"}></Image></Button>}
    </div>
  );
};

export default NavbarActions;
