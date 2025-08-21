import { ApiFunctions } from "@/Apis/Apis";
import { useQuery } from "@tanstack/react-query";
import ErrorMessage from "../small/ErrorUI";
import Loading from "../small/Loading";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";

const Orders = () => {
  const navigate = useNavigate();
  const { data:Orders, isLoading, isError, error } = useQuery({
    queryKey: ["allOrders"],
    queryFn: ApiFunctions.AllOrders,
  });

  if (isError) return <ErrorMessage ErrorMessage={error.message} />;
  if (isLoading) return <Loading/>
  const data = Orders?.data; 


  return <div className="max-w-[1280px] m-auto ">

  <div className="m-auto  max-w-[1280px] px-4 md:px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">All Orders</h1>
          </div>
          <div className="border shadow-sm rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Order</TableHead>
                  <TableHead className="min-w-[150px]">Date</TableHead>
                  <TableHead className="min-w-[150px]">Customer Name</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data.map((data) => {
                  return (
                    <TableRow key={data._id}>
                      <TableCell className="font-medium">
                        {data?._id.slice(0, 4).toUpperCase()}
                      </TableCell>
                      <TableCell>
                        {new Date(data.createdAt).toDateString()}
                      </TableCell>
                      <TableCell>
                        {data.user.name}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          className={`
                          
                        ${data.status === "Processing" ? "bg-black" : ""} 
                        ${data.status === "Shipped" ? "bg-blue-500" : ""}
                        ${
                          data.status === "OutOfDelivery" ? "bg-indigo-500" : ""
                        } 
                        ${data.status === "Delivered" ? "bg-green-500" : ""}`}
                        >
                          {data.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        ₹{data.total}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          onClick={() => navigate(`/order/${data._id}`)}
                          variant="link"
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

  </div>;
};

export default Orders;
