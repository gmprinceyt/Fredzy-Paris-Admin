import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import {
  BadgeCheck,
  Box,
  CircleCheckBig,
  Clock,
  Info,
  ShieldCheckIcon,
  TruckElectricIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiFunctions } from "@/Apis/Apis";
import ErrorMessage from "../small/ErrorUI";
import { Progress } from "../ui/progress";
import { ENV } from "@/Apis";
import { useEffect, useState } from "react";
import Loading from "../small/Loading";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
const MangeOrder = () => {
  const { orderId } = useParams();
  const [progress, setprogress] = useState(1);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: Order,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => {
      if (!orderId) throw new Error("Order id Can't Read");
      return ApiFunctions.OrderDetails(orderId);
    },
  });

  useEffect(() => {
    if (!Order?.data.data.status) return;

    const progressMap: Record<string, number> = {
      Delivered: 100,
      OutOfDelivery: 70,
      Shipped: 45,
      Processing: 17,
    };

    setprogress(progressMap[Order?.data.data.status]);
  }, [Order?.data.data.status]);

  const userId = Order?.data.data.user._id;
  // GET User details
  const { data: User } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => {
      if (!userId) throw new Error("User Id Not Diffind");
      return ApiFunctions.GetSingleUser(userId);
    },
  });

  // DELETE - Order Delete
  const { mutate: deleteOrder } = useMutation({
    mutationFn: ApiFunctions.DeleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order", orderId] });

      toast.success("Order Deleted");
      navigate("/orders");
    },
  });

  // Update Order Status`
  const { mutate: ChangeStatus } = useMutation({
    mutationFn: ApiFunctions.ChangeOrderStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order", orderId] });
      toast.success("Order Status Upadeted");
    },
  });

  if (isError) return <ErrorMessage ErrorMessage={error.message} />;
  if (isLoading) return <Loading />;
  const data = Order?.data;
  const user = User?.data.data;

  return (
    <div className="max-w-[1280px] px-3 m-auto font-[Geist] flex flex-col gap-3">
      {/* Information */}
      <section className="flex flex-col md:flex-row md:items-center  gap-2">
        {/* Order Information */}
        <Card className="p-0 gap-1 w-full ">
          <div className="border-b p-2 ">
            <div className="flex gap-1 text-yellow-600">
              <ShieldCheckIcon size={18} /> Order ID{"  "}
              {data?.data._id.slice(0, 4).toUpperCase()}
            </div>
            <span className="text-base flex gap-1 text-muted-foreground ">
              <Clock size={18} /> Placed on{" "}
              {new Date(data?.data.updatedAt || 0).toLocaleTimeString()}
            </span>
          </div>
          <div className="p-2">
            <h2 className="font-semibold flex gap-1 items-center">
              <Info size={18} />
              Customer Information
            </h2>
            <div>
              Name- <span className="font-semibold text-sm">{user?.name}</span>
            </div>
            <div>
              Email-{" "}
              <span className="font-semibold text-sm">{user?.email}</span>
            </div>
            <div className="">
              Address-{" "}
              <span className="font-semibold text-sm text-emerald-600">
                {data?.data.shippingInfo.address}
              </span>
            </div>
          </div>
        </Card>
        {/* Order Summary */}
        <Card className="p-2 gap-1 w-full">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>₹{data?.data.subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping Charges</span>
              <span>₹{data?.data.shippingCharges}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Discount</span>
              <span className="text-green-600">₹{data?.data.discount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>
                Taxes <span className="text-muted-foreground">( 8% )</span>
              </span>
              <span>₹{data?.data.tax}</span>
            </div>
            <div className="flex justify-between font-medium border-t pt-5">
              <span>Total</span>
              <span>₹{data?.data.total}</span>
            </div>
          </div>
        </Card>
      </section>

      {/* Mange Orders */}
      <section className="flex gap-4 ">
        <div className="">
          <Button className="bg-green-600 text-white"  variant={"outline"} onClick={()=>ChangeStatus(orderId!)}>Upadete Order Status</Button>
        </div>
        {/* delete */}
        <div className="">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="bg-red-500" variant="outline">
                Delete Order
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteOrder(orderId!)}
                  className="bg-red-500"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </section>

      {/* Orders Status */}
      <section>
        <Card>
          <CardTitle className="ml-4">Orders Status</CardTitle>
          <CardContent className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center gap-0.5">
                <div className={`bg-green-800 text-white rounded-full p-3`}>
                  <CircleCheckBig />
                </div>
                <div className="text-xs">Processing</div>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <div
                  className={`${
                    progress >= 45 ? "bg-green-800" : "bg-gray-800"
                  } text-white rounded-full p-3`}
                >
                  <Box />
                </div>
                <div className="text-xs">Shipped</div>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <div
                  className={`${
                    progress >= 70 ? "bg-green-800" : "bg-gray-800"
                  } text-white rounded-full p-3`}
                >
                  <TruckElectricIcon />
                </div>
                <div className="text-xs">Out for delivery</div>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <div
                  className={`${
                    progress >= 99 ? "bg-green-800" : "bg-gray-800"
                  } text-white rounded-full p-3`}
                >
                  <BadgeCheck />
                </div>
                <div className="text-xs">Delivered</div>
              </div>
            </div>
            <Progress value={progress} className="h-2 mt-2 transition" />
          </CardContent>
          <CardFooter>
            <div className="flex gap-2 items-center ">
              <Badge
                className={`text-gray-300
                      ${data?.data.status === "Processing" ? "bg-black" : ""} 
                      ${data?.data.status === "Shipped" ? "bg-blue-500" : ""}
                      ${
                        data?.data.status === "OutOfDelivery"
                          ? "bg-indigo-500"
                          : ""
                      } 
                      ${data?.data.status === "Delivered" ? "bg-green-500" : ""}
                    `}
              >
                {data?.data.status}
              </Badge>
              <p className="text-muted-foreground">
                {new Date(data?.data.updatedAt || 0).toLocaleDateString()}
              </p>
            </div>
          </CardFooter>
        </Card>
      </section>

      {/* Product Items */}
      <section className="mb-5">
        <Card>
          <CardTitle className="pl-4">Order Items</CardTitle>
          <CardHeader className="flex justify-between gap-5 font-semibold text-muted-foreground items-center ">
            <div className="flex-1">Product</div>
            <div className="">Quantity</div>
            <div className="">Orignal</div>
            <div className="">Price</div>
          </CardHeader>
          <CardContent>
            {data?.data.orderItems.map((order) => {
              return (
                <div
                  key={order.productId}
                  className="flex justify-between font-semibold my-2 gap-5 items-center "
                >
                  <div className="flex-1 flex gap-2 items-center">
                    <img
                      src={`${ENV.SERVER}${order.photo}`}
                      height={55}
                      width={55}
                      alt="product img"
                      className="rounded"
                    />
                    <h3 className="text-sm">{order.name}</h3>
                  </div>
                  <span className="text-sm  ">{order.quantity}</span>
                  <span className="text-sm text-muted-foreground ">
                    ₹{(order.price * 1.12).toFixed(0)}
                  </span>
                  <span className="text-sm">₹{order.price}</span>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default MangeOrder;
