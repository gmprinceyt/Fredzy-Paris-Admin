const Years = [
  "JUN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUNE",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

export function TransformDataToCharts(Data: data) {
  const data: Charts[] = [];
  const today = new Date();
  const length = Data.lastSixMonthOrderCount.length || 0;
  for (let i = 0; i < length; i++) {
    data.push({
      OrdersCount: Data.lastSixMonthOrderCount[i],
      Revenues: Data.lastSixMonthRevenues[i],
      month: Years[today.getMonth() - (length - i)],
    });
  }
  return data;
}

//  Defind Types
type data = {
  lastSixMonthOrderCount: number[];
  lastSixMonthRevenues: number[];
};
type Charts = { Revenues: number; month: string; OrdersCount: number };

/* ====================================================================== */

export function TransformDataToLineCharts(data: number[], key: string) {
  const lineData = [];
  const today = new Date();
  for (let i = 0; i < data.length; i++) {
    lineData.push({
      month: Years[today.getMonth() - (data.length - i)],
      [key]: data[i],
    });
  }
  lineData.push({
    key: key,
  });

  return lineData;
}

type MyStringMap = Record<string, number>;
type PieCharts = {
  key: string;
  Radio: number;
  fill: string;
  property?: string;
};
export function TransformDataToPieCharts(value: MyStringMap, property: string) {
  const keys = Object.keys(value);
  const Data: PieCharts[] = [];

  for (let i = 0; i < keys.length; i++) {
    Data.push({
      key: Capitalize(keys[i]),
      Radio: value[keys[i]],
      fill: `var(--chart-${i + 1})`,
    });
  }
  Data.push({
    key: "",
    Radio: 0,
    fill: "",
    property,
  });
  return Data;
}

function Capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

// { month: "April", desktop: 73, mobile: 190 },
// { month: "May", desktop: 209, mobile: 130 },

export function TransformDataToBarData(
  data: number[],
  key: string,
  data2?: number[],
  key2?: string
) {
  const Bar = [];
  const today = new Date();
  for (let i = 0; i < data.length; i++) {
    if (data2 && key2) {
      Bar.push({
        month: Years[today.getMonth() - (6 - i)],
        [key]: data[i],
        [key2]: data2[i],
      });
    } else {
      Bar.push({
        month: Years[today.getMonth() - (6 - i)],
        [key]: data[i],
      });
    }
  };
  return Bar;
}
