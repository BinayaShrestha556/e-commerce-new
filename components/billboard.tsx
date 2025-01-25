import { Billboard as BillboardTypes } from "@/types"

interface BillboardProps{
    data: BillboardTypes
}
const Billboard:React.FC<BillboardProps> = ({data}) => {
  return (
    <div className="rounded-xl overflow-hidden">
        <div className="rounded-xl relative aspect-[2/1] md:aspect-[3/1] overflow-hidden bg-cover" style={{backgroundImage:`url(${data?.imageUrl})`,backgroundPosition:"center"}}>
        <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
           <div className="font-bold text-white text-3xl sm:text-5xl lg:text-8xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] sm:max-w-xl max-w-xs">
            {data?.label}
            </div> 
        </div>
        </div>
    </div>
  )
}

export default Billboard