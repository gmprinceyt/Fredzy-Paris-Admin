import type { AddProductQuery } from "@/types/Api";
import toast, {Toaster}   from "react-hot-toast"
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { ApiFunctions } from "@/Apis/Apis";
import { ArrowLeft, Loader } from "lucide-react";
import ErrorMessage from "../small/ErrorUI";
import { Link } from "react-router";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddProductQuery>();

  const { mutate, error, isPending } = useMutation({
    mutationFn: ApiFunctions.CreateProduct,
    onSuccess: () => {
      reset();
      toast.success("Product Created")
    }
  });

  const CreateProduct: SubmitHandler<AddProductQuery> = (data) => {
    const formData = new FormData();
    formData.set("name", data.name);
    formData.set("discription", data.discription);
    formData.set("category", data.category);
    formData.set("price", data.price.toString());
    formData.set("stock", data.stock.toString());
    formData.set("photo", data.photo[0]);
    mutate(formData);
  };
  if (error) return <ErrorMessage ErrorMessage={error.message} />
  return (
    <div className=" h-screen relative max-w-[1280px] m-auto p-3 font-[Geist]  flex flex-col items-center justify-center">
        <Toaster position="top-center" />
        <Link to={"/products"} className="flex gap-1 absolute top-3 left-3 ">
            <ArrowLeft/>
            Back
        </Link>
      <h1 className="text-xl font-semibold mb-5">
        Add New Product In Invertory
      </h1>
      <Card className="px-2  ">
        <form onSubmit={handleSubmit(CreateProduct)} className="space-y-2">
          <div className="">
            <label className="ml-2 text-sm font-semibold">Product Name</label>
            <Input
              type="text"
              placeholder="Enter Name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm ml-3">
                Name field is required
              </span>
            )}
          </div>

          <div className="">
            <label className="ml-2 text-sm font-semibold">
              Product Description
            </label>

            <Input
              type="text"
              placeholder="Enter description"
              {...register("discription", { required: true })}
            />
            {errors.discription && (
              <span className="text-red-500 text-sm ml-3">
                {" "}
                Description field is required
              </span>
            )}
          </div>

          <div className="">
            <label className="ml-2 text-sm font-semibold">
              Product Category
            </label>
            <Input
              type="text"
              placeholder="Enter Type Category"
              {...register("category", { required: true })}
            />
            {errors.category && (
              <span className="text-red-500 text-sm ml-3">
                {" "}
                category field is required
              </span>
            )}
          </div>

          <div className="">
            <label className="ml-2 text-sm font-semibold">Product Price</label>
            <Input
              type="number"
              placeholder="Enter Price"
              {...register("price", { required: true })}
            />
            {errors.price && (
              <span className="text-red-500 text-sm ml-3">
                {" "}
                Price field is required
              </span>
            )}
          </div>

          <div className="">
            <label className="ml-2 text-sm font-semibold">Product Stock</label>
            <Input
              type="number"
              placeholder="Enter Stock"
              {...register("stock", { required: true })}
            />
            {errors.stock && (
              <span className="text-red-500 text-sm ml-3">
                {" "}
                Stock field is required
              </span>
            )}
          </div>

          <div className="">
            <label className="ml-2 text-sm font-semibold">Product Photo</label>
            <Input
              type="file"
              placeholder="Add Picture Of Product"
              accept="image/*"
              {...register("photo", { required: true })}
              ref={(e) => {
                register("photo").ref(e);
                if (e) e.value = ""; // clear file input on reset
              }}
            />
            {errors.photo && (
              <span className="text-red-500 text-sm ml-3">
                {" "}
                Photo field is required
              </span>
            )}
          </div>

          <Button className="w-full" type="submit">{ isPending ?  <Loader className="animate-spin"/>:  "Add Product" }</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddProduct;
