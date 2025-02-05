"use client";

import Image from "next/image";

import { Button } from "./ui/Button";
import { CircleUser,  } from "lucide-react";

import { useState } from "react";


import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";


import { User } from "@/types";

interface userProps{
user?:User
}
export const UserOptions:React.FC<userProps> = ({user}) => {
  const [loading,setLoading]=useState(false)

   const signOut=async()=>{
    setLoading(true)
    try {
    
     await fetch(`${process.env.NEXT_PUBLIC_API}/api/users-logout`, {
        credentials: "include",
        method:"post" // Ensures cookies are sent with the request
      });

   window.location.reload()
    } catch (error) {
      console.log(error)
    }
  
}
  const [isModalOpen, setIsModalOpen] = useState(false);



  return (
    <div className="flex items-center gap-2 z-50">
    
      <Popover open={isModalOpen} onOpenChange={setIsModalOpen}  >
        <PopoverTrigger asChild>

      <div className="relative">
        {user?.image ? (
          <div
          
          className="relative z-50 rounded-full overflow-hidden h-8 w-8 cursor-pointer"
          >
            <Image src={user?.image} alt="" fill className="object-cover z-50" />
          </div>
        ) : (
          <CircleUser
          className="cursor-pointer z-50"
          onClick={() => setIsModalOpen((e) => !e)}
          />
        )}
      </div>
        </PopoverTrigger>
        <PopoverContent  className="flex flex-col w-52 gap-3">
      <p>{(user?.name)}</p>
        <Button disabled={loading} onClick={signOut}>sign out</Button>
        </PopoverContent>
</Popover>
    </div>
  );
};
