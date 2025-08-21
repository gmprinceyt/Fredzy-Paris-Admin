import { ApiFunctions } from "@/Apis/Apis";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import ErrorMessage from "../small/ErrorUI";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

const UserDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate()
  const {
    data: User,
    isError,
    error,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => {
      if (!userId) throw new Error("User Id Not Access");
      return ApiFunctions.GetSingleUser(userId);
    },
  });

  const {mutate} = useMutation({
    mutationFn: ApiFunctions.DeleteUser,
    onMutate: ()=> {
        if (!data) return;
        if (data?.role === "admin") return toast.error("Admin Not Deteted its Self")
    },
    onSuccess: ()=> {
        toast.success("User Deleted")
        navigate("/users")
    }
  })

  if (isError) return <ErrorMessage ErrorMessage={error.message} />;
  const data = User?.data.data;
  return (
    <div className="max-w-[1280px] m-auto">
      <Card className="gap-1  p-0 m-0">
        <div className=" p-2 grid grid-cols-1 md:grid-cols-2">
          <div className=" flex items-center  justify-center border-green-400 md:border-r ">
            <img
              src={data?.photo}
              alt="Customer Img"
              height={200}
              width={200}
              className="object-cover rounded-full"
            />
          </div>
          <div className="p-1 ml-3 ">
            <div className="">
              <span className="font-semibold">Name- </span>
              <span>{data?.name}</span>
            </div>
            <div className="">
              <span className="font-semibold">DOB- </span>
              <span>{new Date(data?.dob || 0).toLocaleDateString()}</span>
            </div>
            <div className="">
              <span className="font-semibold">role- </span>
              <span>{data?.role}</span>
            </div>
            <div className="">
              <span className="font-semibold">email- </span>
              <span>{data?.email}</span>
            </div>
            <div className="">
              <span className="font-semibold">Gender- </span>
              <span>{data?.gender}</span>
            </div>
            <div className="">
              <span className="font-semibold">Signup Date- </span>
              <span>{new Date(data?.createdAt || 0).toLocaleDateString()}</span>
            </div>
          </div>
          <Button onClick={()=> mutate(userId!)} variant={"outline"} className="bg-red-500">Delete User</Button>
        </div>
      </Card>
    </div>
  );
};

export default UserDetails;
