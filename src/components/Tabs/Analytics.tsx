import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart, Sector } from "recharts";
import type { PieSectorDataItem } from "recharts/types/polar/Pie";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { ApiFunctions } from "@/Apis/Apis";
import { TransformDataToPieCharts } from "@/utils/TransfromApiData";
import { useMemo } from "react";
import ErrorMessage from "../small/ErrorUI";
import Loading from "../small/Loading";

const chartConfig = {} satisfies ChartConfig;

export default function Analytics() {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["pie"],
    queryFn: ApiFunctions.PieData,
  });

  const pieChart = useMemo(() => {
    const pie = data?.data.data;
    if (!pie) return [];
    return [
      TransformDataToPieCharts(pie.stockAvailadblity, "Stock Availadblity"),
      TransformDataToPieCharts(pie.UsersRadio, "Users Radio"),
      TransformDataToPieCharts(pie.ageRadio, "Age Radio of Customer"),
      TransformDataToPieCharts(pie.revenueDistribution, "Revenue Distribution"),
      TransformDataToPieCharts(pie.orderfullfieldRadio, "Order Fullfield Radio"),
    ];
  }, [data?.data.data]);

  if (isError) return <ErrorMessage ErrorMessage={error.message} />;
  if (isLoading) return <Loading />;

  return (
    <div className="max-w-[1080px] m-auto p-4 flex flex-col gap-3">
      {pieChart.map((pieChart, i) => {
        console.log(pieChart)
        return (
          <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
              <CardTitle>Pie Chart </CardTitle>
              <CardDescription>{pieChart[pieChart.length-1].property}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={pieChart}
                    dataKey="Radio"
                    nameKey="key"
                    innerRadius={60}
                    strokeWidth={5}
                    activeIndex={0}
                    activeShape={({
                      outerRadius = 0,
                      ...props
                    }: PieSectorDataItem) => (
                      <Sector {...props} outerRadius={outerRadius + 10} />
                    )}
                  />
                </PieChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 leading-none font-medium">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="text-muted-foreground leading-none">
                Showing total visitors for the last 6 months
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
