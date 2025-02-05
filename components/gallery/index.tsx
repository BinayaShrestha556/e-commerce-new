"use client"
import {Images as ImageType} from"@/types"
import {Tab} from "@headlessui/react"
import GalleryTab from "./gallery-tab"
import Image from "next/image"
interface GalleryProps{
    images:ImageType[]
}
const Gallery:React.FC<GalleryProps>=({images})=>{
    return(
        <Tab.Group as="div" className='flex gap-3  flex-row-reverse '>
           <div className="mt-6  w-fit h-full max-w-sm">
                <Tab.List className="flex w-16 h-full md:w-20 lg:w-[5.5rem] sm:w-24 flex-col gap-6">
                    {images?.map((image)=>(
                        <GalleryTab key={image.id} images={image}/>
                    ))}
                </Tab.List>
           </div>
           <Tab.Panels className="aspect-square w-full">
         {images.map((image)=>(
            <Tab.Panel key={image.id}>
                <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
                    <Image fill src={image.url} alt="image" className="object-cover object-center"/>
                </div>
            </Tab.Panel>
         ))}
           </Tab.Panels>
        </Tab.Group>
    )
}
export default Gallery