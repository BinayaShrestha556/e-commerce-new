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
      const response = await fetch("http://localhost:3000/api/users/get-info", {
        credentials: "include",
        method:"post" // Ensures cookies are sent with the request
      });

      if (response.ok) {
        const userData: User = await response.json(); // Assuming the API returns user data in JSON
        set({
          user: userData,
          loggedIn: true,
        });
      } else if (response.status === 400) {
        // If API returns 400, assume user is not logged in
        set({
          user: null,
          loggedIn: false,
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