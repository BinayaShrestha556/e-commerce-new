"use client";
import { cn } from "@/lib/utils";
import { Category } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface MainNavProps {
  data: Category[];
}
interface NotLoggedIn{
  loggedIn:boolean
  
}
import {User} from "@/types"
import axios from "axios";
import useUser from "@/hooks/use-user";
const MainNav: React.FC<MainNavProps> = ({ data }) => {
  const pathname = usePathname();
  const routes = data?.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));
  const [isMounted, setIsmounted] = useState(false);

  const user=useUser()
  useEffect(() => {
   user.setUserFromApi()
   setIsmounted(true);
  }, [user.setUserFromApi]);

  if (!isMounted) return null;
  return (
    <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
      {routes?.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            " text-sm font-medium transition-colors hover:text-black",
            route.active ? "text-black" : "text-neutral-500"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
