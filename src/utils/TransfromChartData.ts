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

export function TransformDataToLineCharts(data:number[], key:string){
  const lineData = [];
  const today = new Date();
  for (let i = 0; i < data.length; i++){
    lineData.push({
      month: Years[today.getMonth() - (data.length -i )],
      [key]: data[i],
    })
  };
  lineData.push({
    key: key
  })

  return lineData;
} 
