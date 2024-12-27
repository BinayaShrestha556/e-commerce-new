"use client";

import { ShoppingBag } from "lucide-react";
import {Button} from "./ui/Button";
import { useEffect, useState } from "react";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const NavbarActions = () => {
  const cart = useCart();
  const router=useRouter()
  const [isMounted, setIsmounted] = useState(false);
  useEffect(() => {
    setIsmounted(true);
  }, []);
  if (!isMounted) return null;
  return (
    <div onClick={()=>router.push("/cart")} className="ml-auto flex items-center gap-x-4">
      <Button className="flex items-center rounded-full bg-black px-4 py-2">
        <ShoppingBag  size={20} color="white" />
        <span className="ml-2 text-sm font-medium text-white">{cart.items.length}</span>
      </Button>
      <SignedIn>
        <UserButton appearance={{
    elements: {
      userButtonAvatarBox: 'w-9 h-9', // Adjust size as needed
    },
  }}/>

      </SignedIn>
      <SignedOut>
        <SignInButton/>
      </SignedOut>
    </div>
  );
};

export default NavbarActions;
