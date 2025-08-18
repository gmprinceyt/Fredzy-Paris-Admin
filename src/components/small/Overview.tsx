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
import ErrorMessage from "./ErrorUI";

type Props = {
  data?: {
    lastSixMonthOrderCount: number[];
    lastSixMonthRevenues: number[];
  }
}

export function Overview({
  data,
}: Props) {

  if (!data) return <ErrorMessage ErrorMessage="Data Not Comming Up! "/>
  const Charts = TransformDataToCharts(data);
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={Charts}>
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
