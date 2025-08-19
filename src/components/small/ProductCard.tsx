import { Edit } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardDescription,
  CardTitle,
} from "../ui/card";
import { useNavigate } from "react-router";
import type { ProductProps } from "@/types/Props";
import { ENV } from "@/Apis";

const ProductCard = ({
  name,
  discription,
  photo,
  price,
  productId,
  stock,
  category,
}: ProductProps) => {
const navigate = useNavigate();
  console.log(`${ENV.SERVER}/${photo}`)
  return (
    <Card className="p-0 overflow-hidden min-w-48 max-w-64 gap-1 font-[Geist]">
      <div className="w-full h-60 relative">
        <img
          src={`${ENV.SERVER}${photo}`}
          className="w-full h-full object-cover object-center"
        />
        <Badge className="absolute top-2 right-2 ">{category}</Badge>
      </div>
      <CardContent className="px-3 py-0 ">
        <CardTitle className="scroll-m-20 text-xl leading-5   md:text-2xl font-extrabold tracking-tight text-balance">
          {name.length <= 23 ? name : name.slice(0, 23).concat("...")}
        </CardTitle>
        <CardDescription className="scroll-m-20   text-xs md:text-sm tracking-tight">
          {discription.length <= 86
            ? discription
            : discription.slice(0, 86).concat("...")}
        </CardDescription>
      </CardContent>
      <CardFooter className="border p-0 px-2 py-1 flex-col">
        <div className="flex justify-between items-center w-full">
          <strong className="">₹{price}</strong>
          <Badge
            className={
              stock > 1
                ? `bg-green-900 border-green-500`
                : `bg-red-900 border-red-500`
            }
          >
            {stock > 1 ? `In Stock ${stock} `: "Out of Stock"}
          </Badge>
        </div>
        <div className="flex  items-center w-full gap-2 py-1">
          <Button
          onClick={()=> navigate(`/product/${productId}`)}
            className="flex-1">
            <Edit />
            Aduit 
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
