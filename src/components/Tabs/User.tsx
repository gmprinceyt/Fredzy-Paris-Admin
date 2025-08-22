import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { ApiFunctions } from "@/Apis/Apis";
import ErrorMessage from "../small/ErrorUI";
import Loading from "../small/Loading";

const Users = () => {
  const navigate = useNavigate();

  const {
    data: UsersData,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: ApiFunctions.GetAllUsers,
  });

  if (isError) return <ErrorMessage ErrorMessage={error.message} />;
  if (isLoading) return <Loading />;
  const data = UsersData?.data;
  return (
    <div className="max-w-[1280px] m-auto p-3">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">All Users</h1>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Customer Name</TableHead>
            <TableHead className="min-w-[150px]">Role</TableHead>
            <TableHead className="min-w-[150px]">Email</TableHead>
            <TableHead className="min-w-[150px]">DOB</TableHead>
            <TableHead className="text-right">Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data.map((data) => {
            return (
              <TableRow key={data._id}>
                <TableCell className="font-medium">{data.name}</TableCell>
                <TableCell>
                  <Badge className={data.role == "admin" ? "bg-red-500" : ""}>
                    {data.role}
                  </Badge>
                </TableCell>
                <TableCell>{data.email}</TableCell>
                <TableCell>{new Date(data.dob).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  {new Date(data.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    onClick={() => navigate(`/user/${data._id}`)}
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
  );
};

export default Users;
