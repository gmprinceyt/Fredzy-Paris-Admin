import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../ui/chart";
import { TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { ApiFunctions } from "@/Apis/Apis";
import ErrorMessage from "../small/ErrorUI";
import Loading from "../small/Loading";
import { TransformDataToLineCharts } from "@/utils/TransfromChartData";
import { useMemo } from "react";

function chartConfig({ label, color }: { label: string; color: number }) {
  const chart = {
    desktop: {
      label,
      color: `var(--chart-${color})`,
    },
  } satisfies ChartConfig;
  return chart;
}

const Reports = () => {
  const {
    data: LineData,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["line"],
    queryFn: ApiFunctions.LineData,
  });

  const LineCharts = useMemo(() => {
    const data = LineData?.data.data;
    if (!data) return [];

    return [
      TransformDataToLineCharts(data.lastTwavleMonthProducts ?? [], "Product"),
      TransformDataToLineCharts(data.lastTwavleMonthRevenues ?? [], "Revenue"),
      TransformDataToLineCharts(data.lastTwavleMonthDiscounts ?? [], "Discount"),
      TransformDataToLineCharts(data.lastTwavleMonthUsers ?? [], "Users"),
    ];
  }, [LineData?.data.data]);

  if (isError) return <ErrorMessage ErrorMessage={error.message} />;
  if (isLoading) return <Loading />;

  return (
    <div className="max-w-[1080px] m-auto p-4 flex flex-col gap-3">
      {LineCharts.map((line, i) => {
        if (!line.length) return null; // avoid empty crash
        const lastKey = line[line.length - 1]?.key ?? "Value";

        return (
          <Card key={i}>
            <CardHeader>
              <CardTitle>{lastKey} Trend</CardTitle>
              <CardDescription>Last 12 Months</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig({ label: lastKey, color: i })}>
                <LineChart
                  accessibilityLayer
                  data={line}
                  margin={{ left: 12, right: 12 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Line
                    dataKey={lastKey}
                    type="natural"
                    stroke={`var(--chart-${i+1})`}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 leading-none font-medium">
                Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
              </div>
              <div className="text-muted-foreground leading-none">
                Showing totals for the last 12 months
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default Reports;
