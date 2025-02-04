import { User } from "@/types";
import { create } from "zustand";

interface UserStore {
  user: User | null; // Stores user data
  loggedIn: boolean; // Indicates login status
  setUserFromApi: () => Promise<void>;
  removeUser:()=>Promise<void> // Fetch user data and update the store
}

const useUser = create<UserStore>((set) => ({
  user: null, // Default user state
  loggedIn: false, // Default login state

  // Function to fetch user data and update the store
  setUserFromApi: async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/users/get-info`, {
        credentials: "include",
        method:"post" // Ensures cookies are sent with the request
      });

      if (response.ok) {
        const userData = await response.json();
        const {user,loggedIn}:{user:User,loggedIn:boolean}=userData 
        // Assuming the API returns user data in JSON
    
        set({
          user,
          loggedIn
        });
     
      } else {
        console.error("Unexpected response from API:", response);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      set({
        user: null,
        loggedIn: false, // Ensure the user state is consistent even on errors
      });
    }
  },
  removeUser: async()=>{
    set({user:null,loggedIn:false})
  }
}));

export default useUser;