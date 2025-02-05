import { cn } from "@/lib/utils"
import { Images as ImageType } from "@/types"
import { Tab } from "@headlessui/react"
import Image from "next/image"
interface GalleryTabProps{
    images:ImageType
}
const GalleryTab:React.FC<GalleryTabProps>=({images})=>{
   
    return(
       <Tab className="relative flex w-full aspect-square cursor-pointer items-center justify-center rounded-md bg-white">
            {({selected})=>(
                <div>
            
                        <Image src={images.url} fill alt="" className="object-cover object-center"/>
                   
                    <span className={cn("absolute inset-0 rounded-md ring-2 ring-offset-2",selected?"ring-black":"ring-transparent")}/>
                    

                </div>
            )}
       </Tab>
    )
}
export default GalleryTab