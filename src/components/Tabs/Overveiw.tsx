import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecentSales } from "../small/recent-sales";
import Overview from "../small/Overview";
import { useQuery } from "@tanstack/react-query";
import { DashboardAPI } from "@/Apis/dashboard";
import ErrorMessage from "@/components/small/ErrorUI";
import Loading from "../small/Loading";
import DashboardCard from "../small/DashboardCard";

const OverviewTabs = () => {
  const {
    data: Stats,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["dashborad"],
    queryFn: DashboardAPI,
  });

  if (isError) return <ErrorMessage ErrorMessage={error.message} />;
  const data = Stats?.data.data;
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="space-y-4  m-auto max-w-[1280px] px-3 font-[Geist]">
          {/* Dashboard Card */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <DashboardCard
              name="Total Revenues"
              countData={`₹${data?.countData.totalRevenue}`}
              IncresmentlastMonth={data?.dataIncresmentlastMonth.revenue}
            />
            <DashboardCard
              name="Products"
              countData={`+${data?.countData.ProductCount}`}
              IncresmentlastMonth={data?.dataIncresmentlastMonth.product}
            />
            <DashboardCard
              name="Orders"
              countData={`+${data?.countData.OrderCount}`}
              IncresmentlastMonth={data?.dataIncresmentlastMonth.order}
            />
            <DashboardCard
              name="Users"
              countData={`+${data?.countData.UserCount}`}
              IncresmentlastMonth={data?.dataIncresmentlastMonth.users}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
            <Card className="col-span-1 lg:col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="ps-2">
                <Overview data={data?.lastSixMonthData} />
              </CardContent>
            </Card>
            <Card className="col-span-1 lg:col-span-3">
              <CardHeader>
                <CardTitle>Latest four transaction</CardTitle>
              </CardHeader>
              <CardContent>
                <RecentSales
                  latestTransaction={data?.modefiedlatestFourTransaction}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default OverviewTabs;
