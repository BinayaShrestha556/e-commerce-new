"use client";
import { cn } from "@/lib/utils";
import { Category } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface MainNavProps {
  data: Category[];
}


const MainNav: React.FC<MainNavProps> = ({ data }) => {
  const pathname = usePathname();
  const routes = data?.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  const [isMounted, setIsmounted] = useState(false);
  useEffect(() => {
  
    setIsmounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <nav>
    <div className="mx-6 md:flex items-center space-x-3 lg:space-x-5 hidden ">
      {routes?.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            " text font-medium transition-colors hover:text-black",
            route.active ? "text-black" : "text-neutral-500"
          )}
        >
          {route.label}
        </Link>
      ))}

    </div>

    
    </nav>
  );
};

export default MainNav;
