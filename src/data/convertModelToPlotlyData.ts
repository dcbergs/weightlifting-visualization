import type { Dash, Data } from "plotly.js";
import type { Cycle, Metric, TrainingWeek } from "./model";

// some color scheme tools:
// https://colorbrewer2.org/#type=diverging&scheme=RdYlBu&n=10
// https://colordesigner.io/gradient-generator

// we only support 10 colors; if someone injects 11 training cycles in here, there
// will be repeats
export const ColorBank = [
  "#470000",
  "#912601",
  "#db7002",
  "#fcca2d",
  "#fafc78",
  "#66f5ca",
  "#2ae3f2",
  "#0b79d3",
  "#072098",
  "#16045d",
];

const lineTypeBank = ["12 12", "", "12 4 4 4", "4 4", "20 10"];

const lineThicknessBank = [2, 4, 8];
export const lineStyleCombos: { dash: string; width: number }[] =
  lineTypeBank.flatMap((type) =>
    lineThicknessBank.map((thick) => ({ dash: type, width: thick })),
  );

export function convertModelToPlotlyData(
  cycles: Cycle[],
  metrics: Metric[],
  selectedCycles: Set<string>,
  selectedMetrics: Set<string>,
  lineStyleMap: Map<string, { dash: string; width: number }>,
  colorMap: Map<string, string>,
): Data[] {
  function convertMetricToPlotlyLine(
    metric: string,
    weeks: TrainingWeek[],
    cycleName: string,
  ): Data {
    const x = weeks.map((w) => w.weeksOut);
    const y = weeks.map((w) => {
      const value = w.metricValues.get(metric);
      if (value === undefined) {
        throw new Error(
          `could not find metric ${metric} in week ${w} for cycle ${cycleName}`,
        );
      }
      return value;
    });
    return {
      type: "scatter",
      mode: "lines",
      line: {
        color: colorMap.get(cycleName) ?? "#ffffff",
        dash: (lineStyleMap.get(metric)?.dash as Dash) ?? lineTypeBank[0],
        width: lineStyleMap.get(metric)?.width ?? 2,
      },
      x: x,
      y: y,
      hoverinfo: "skip",
    };
  }

  return cycles
    .filter((c) => selectedCycles.has(c.name))
    .flatMap((cycle) => {
      return metrics
        .filter((m) => selectedMetrics.has(m.name))
        .map((metric) =>
          convertMetricToPlotlyLine(metric.name, cycle.weeks, cycle.name),
        );
    });
}
