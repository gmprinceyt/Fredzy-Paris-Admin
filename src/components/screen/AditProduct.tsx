import { ShieldCheck, Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiFunctions } from "@/Apis/Api";
import { useParams } from "react-router";
import { ENV } from "@/Apis";
import ErrorMessage from "../small/ErrorUI";
import Loading from "../small/Loading";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { UpdateProductQuery } from "@/types/Api";
import toast from "react-hot-toast";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const EditProduct = () => {
  const { productId } = useParams<{ productId: string }>();
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm<UpdateProductQuery>();

  const {
    data: single,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["SingleProduct", productId],
    queryFn: () => {
      if (!productId) throw new Error("Product ID missing");
      return ApiFunctions.SingalProduct(productId);
    },
    enabled: !!productId, // run only if productId exists
  });

  const { mutate, isPending } = useMutation({
    mutationFn: ApiFunctions.UpdateProduct,
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({
        queryKey: ["SingleProduct", productId],
      });
      toast.success("Product Updated");
      setIsOpen(false);
    },
    onError: (err: any) => {
      toast.error(err.message || "Update failed");
      console.log(err);
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <ErrorMessage ErrorMessage={error.message} />;
  if (!single) return null;

  const product = single.data.data;

  const updateProduct: SubmitHandler<UpdateProductQuery> = (formDataValues) => {
    const formData = new FormData();
    formData.set("name", formDataValues.name);
    formData.set("discription", formDataValues.discription);
    formData.set("category", formDataValues.category);
    formData.set("price", formDataValues.price.toString());
    formData.set("stock", formDataValues.stock.toString());
    if (formDataValues.photo?.[0]) {
      formData.set("photo", formDataValues.photo[0]);
    }
    mutate({ productId: productId!, post: formData });
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
          <img
            src={`${ENV.SERVER}${product.photo}`}
            alt={product.name}
            className="object-cover w-full h-full"
            width={700}
            height={700}
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-4 mb-4">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-medium">4.9</span>
              <span className="text-sm text-muted-foreground">
                (128 reviews)
              </span>
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-baseline gap-4 mb-6">
            <h1 className="text-2xl font-bold ">₹{product.price}</h1>
            <span className="text-lg text-muted-foreground line-through">
              ₹{(product.price * 1.12).toFixed(0)}
            </span>
            <span className="text-sm font-medium text-green-600">
              Save{" "}
              {(
                (100 * (product.price * 1.12 - product.price)) /
                product.price
              ).toFixed(0)}
              %
            </span>
          </div>

          <p className="text-muted-foreground mb-6">{product.discription}</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm">
              <div
                className={`h-2 w-2 rounded-full ${
                  product.stock > 1 ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <span>{product.stock > 1 ? "In Stock" : "Out of Stock"}</span>
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
            <Dialog open={isOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => setIsOpen(true)}
                  className="w-full"
                >
                  Edit Product Details
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit(updateProduct)}>
                  <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                    <DialogDescription>
                      Make changes to your product here. Click save when
                      you&apos;re done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4">
                    <div className="grid gap-3">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        defaultValue={product.name}
                        {...register("name")}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        defaultValue={product.discription}
                        {...register("discription")}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        defaultValue={product.category}
                        {...register("category")}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        type="number"
                        defaultValue={product.price}
                        {...register("price", { valueAsNumber: true })}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="stock">Stock</Label>
                      <Input
                        id="stock"
                        type="number"
                        defaultValue={product.stock}
                        {...register("stock", { valueAsNumber: true })}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="photo">Photo</Label>
                      <Input
                        id="photo"
                        type="file"
                        accept="image/*"
                        {...register("photo")}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" disabled={isPending}>
                      {isPending ? "Saving..." : "Save changes"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            {/* <Button onClick={}>Delete</Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
