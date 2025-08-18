import { TransformDataToCharts } from "@/utils/TransfromChartData";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  data?: {
    lastSixMonthOrderCount: number[];
    lastSixMonthRevenues: number[];
  }
}

export function Overview({
  data,
}: Props) {

  if (!data) return
  const data1 = TransformDataToCharts(data);
  console.log(data1)
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data1}>
        <XAxis dataKey="month" stroke="#888888" fontSize={12} />
        <YAxis />
        <Tooltip />
        <Legend/>
        <Bar
          dataKey="Revenues"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
        <Bar
          dataKey="OrdersCount"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
