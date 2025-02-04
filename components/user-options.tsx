"use client";

import Image from "next/image";

import { Button } from "./ui/Button";
import { CircleUser, Settings } from "lucide-react";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/use-user";
import axios from "axios";
import { User } from "@/types";

interface userProps{
user?:User
}
export const UserOptions:React.FC<userProps> = ({user}) => {
  const [loading,setLoading]=useState(false)
  const router=useRouter()
   const signOut=async()=>{
    setLoading(true)
    try {
    
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/users-logout`, {
        credentials: "include",
        method:"post" // Ensures cookies are sent with the request
      });
      const result=await response.json()
   window.location.reload()
    } catch (error) {
      console.log(error)
    }
  
}
  const [isModalOpen, setIsModalOpen] = useState(false);

  const params=useParams()
  const [mounted,setMounted]=useState(false)


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
