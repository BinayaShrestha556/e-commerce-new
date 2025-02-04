import { Billboard } from "@/types";
const URL=`${process.env.NEXT_PUBLIC_API_URL}/billboards`;
const getBillboard= async (id:string): Promise<Billboard> => {
          const res = await fetch(`${URL}/${id}`);  
  try {
      const data = await res.json();
      return data;
  } catch (error) {
    console.log(error)
  }
  return {id:"",imageUrl:"",label:""}
  };
  export default getBillboard