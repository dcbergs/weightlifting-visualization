import type { ChartData } from "chart.js";
import type { TrainingHistory } from "./model";

// recharts data looks a lot nicer when using a scatter chart
// each series can just be an array of coordinate objects
// where each coord is x ("weeks out" for me) and y (value)
// could just wrap that array in an object which also has line width,
// color, etc

// so I'll need to take in TrainingHistory, and two Set<string>s for selected cycles/metrics
// return an array with max week index number of arrays in it
// each of those arrays starts with week index (week number + offset)
// and then has metric values in the order of metrics

// https://colorbrewer2.org/#type=diverging&scheme=RdYlBu&n=10
const ColorBank = [
  "#a50026",
  "#d73027",
  "#f46d43",
  "#fdae61",
  "#fee090",
  "#e0f3f8",
  "#abd9e9",
  "#74add1",
  "#4575b4",
  "#313695",
];

export type RechartData = {
  series: { value: number | null; weeksOut: number }[];
  fill: string;
  cycleName: string;
  metricName: string;
}[];

// export function convertModelToChartJsData(

//   data: TrainingHistory,
//   selectedCycles: Set<string>,
//   selectedMetrics: Set<string>,
// ): ChartData{
//   return data.cycles
//     .filter((c) => selectedCycles.has(c.name))
//     .flatMap((c, cIdx) =>
//       data.metrics
//         .filter((m) => selectedMetrics.has(m.name))
//         .map((m) => ({
//           datasets: c.weeks.map((w) => ({
//             weeksOut: w.weeksOut,
//             // could name this property "number" or "percent" if I wanna split axes up
//             value: w.metricValues.get(m.name) ?? null,
//           })),
//           fill: ColorBank[cIdx % ColorBank.length],
//           cycleName: c.name,
//           metricName: m.name,
//         })),
//     );
// }

export function convertModelToRechartData(
  data: TrainingHistory,
  selectedCycles: Set<string>,
  selectedMetrics: Set<string>,
): RechartData {
  console.log("converting data to chart form");
  return data.cycles
    .filter((c) => selectedCycles.has(c.name))
    .flatMap((c, cIdx) =>
      data.metrics
        .filter((m) => selectedMetrics.has(m.name))
        .map((m) => ({
          series: c.weeks.map((w) => ({
            weeksOut: w.weeksOut,
            // could name this property "number" or "percent" if I wanna split axes up
            value: w.metricValues.get(m.name) ?? null,
          })),
          fill: ColorBank[cIdx % ColorBank.length],
          cycleName: c.name,
          metricName: m.name,
        })),
    );
}
