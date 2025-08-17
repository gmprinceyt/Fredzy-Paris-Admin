import { Skeleton } from "@/components/ui/skeleton"

const ProductSkeleton= () =>{
  return (
    <div className="flex items-center space-x-4">
      <div className="space-y-2">
      <Skeleton className="h-36 w-60 rounded" />
        <Skeleton className="h-4 w-60" />
        <Skeleton className="h-4 w-60" />
        <Skeleton className="h-4 w-60" />
        <Skeleton className="h-4 w-60" />
        <div className="flex gap-2">
        <Skeleton className="h-8 w-12" />
        <Skeleton className="h-8 w-46" />
        </div>
      </div>
    </div>
  )
};

export default ProductSkeleton;
