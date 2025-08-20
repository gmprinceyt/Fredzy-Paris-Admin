import { ShieldCheck, Star, Truck } from "lucide-react";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import { ApiFunctions } from "@/Apis/Api";
import { useParams } from "react-router";
import { ENV } from "@/Apis";
import ErrorMessage from "../small/ErrorUI";
import Loading from "../small/Loading";

const AditProduct = () => {
  const { productId } = useParams();

  const {
    data: Singal,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product"],
    queryFn: () => ApiFunctions.SingalProduct(productId!),
  });
  if (isError) return <ErrorMessage ErrorMessage={error.message} />;
  if (isLoading) return <Loading />;

  const data = Singal!.data;

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
          <img
            src={`${ENV.SERVER}${data.data.photo}`}
            alt="Modern watch with leather strap"
            className="object-cover w-full h-full"
            width={700}
            height={700}
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-4 mb-4">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {data.data.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-medium">4.9</span>
              <span className="text-sm text-muted-foreground">
                (128 reviews)
              </span>
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-2">{data.data.name}</h1>
          <div className="flex items-baseline gap-4 mb-6">
            <h1 className="text-2xl font-bold ">₹{data.data.price}</h1>
            <span className="text-lg text-muted-foreground line-through">
              ₹{(data.data.price * 1.12).toFixed(0)}
            </span>
            <span className="text-sm font-medium text-green-600">
              Save{" "}
              {(
                (100 * (data.data.price * 1.12 - data.data.price)) /
                data.data.price
              ).toFixed(0)}
              %
            </span>
          </div>

          <p className="text-muted-foreground mb-6">{data.data.discription}</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm">
              <div
                className={`h-2 w-2 rounded-full ${
                  data.data.stock > 1 ? " bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <span>{data.data.stock > 1 ? "In Stock" : "Out of Stock"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Truck className="h-4 w-4" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <ShieldCheck className="h-4 w-4" />
              <span>2 Year Warranty</span>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <Button size="lg" className="flex-1">
              Edit Product Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AditProduct;
