import { LoaderPinwheel } from "lucide-react"

const Loading = () => {
  return ( 
    <div className="flex text-2xl  font-[Brand] gap-1 h-screen w-full items-center justify-center">
      <span className="">Loading</span>
      <span className="animate-spin"><LoaderPinwheel/></span>
  </div>
  )
}

export default Loading