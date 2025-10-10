import type { Dash, Data } from "plotly.js";
import type { TrainingHistory, TrainingWeek } from "./model";
import { metricCategorization } from "./metricCategories";

// some color scheme tools:
// https://colorbrewer2.org/#type=diverging&scheme=RdYlBu&n=10
// https://colordesigner.io/gradient-generator

const ColorBank = [
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

const lineTypeBank: Dash[] = [
  "solid",
  "dot",
  "dash",
  "longdash",
  "dashdot",
  "longdashdot",
];

const lineThicknessBank = [2, 4];
const lineStyleCombos: { dash: Dash; width: number }[] = lineTypeBank.flatMap(
  (type) => lineThicknessBank.map((thick) => ({ dash: type, width: thick })),
);

export function convertModelToPlotlyData(
  data: TrainingHistory,
  selectedCycles: Set<string>,
  selectedMetrics: Set<string>,
): Data[] {
  // we only support 10 colors; if someone injects 11 training cycles in here, there
  // will be repeats
  const colorMap = new Map(
    data.cycles.map((c, idx) => [c.name, ColorBank[idx % ColorBank.length]]),
  );

  // we're gonna need this in the metrics buttons too
  const lineStyleMap = new Map<string, { dash: Dash; width: number }>(
    data.metrics.map((m, idx) => [
      m.name,
      lineStyleCombos[idx % lineStyleCombos.length],
    ]),
  );

  function convertMetricToPlotlyLine(
    metric: string,
    weeks: TrainingWeek[],
    cycleName: string,
  ): Data {
    // could add offset here
    // const x = weeks.map((w) => w.weekNumber);
    // actually probably just make data have "weeks out"
    // but offset feature might be a thing
    const x = weeks.map((w, idx) => idx + 1);
    const y = weeks.map((w) => {
      const value = w.metricValues.get(metric);
      if (value === undefined) {
        throw new Error(
          `could not find metric ${metric} in week ${w} for cycle ${cycleName}`,
        );
      }
      // already threw if undefined, but make the linter happy
      return value ?? 0;
    });
    return {
      type: "scatter",
      mode: "lines",
      line: {
        color: colorMap.get(cycleName) ?? "#ffffff",
        dash: lineStyleMap.get(metric)?.dash ?? "solid",
        width: lineStyleMap.get(metric)?.width ?? 2,
      },
      x: x,
      y: y,
    };
  }

  return data.cycles
    .filter((c) => selectedCycles.has(c.name))
    .flatMap((cycle) => {
      return data.metrics
        .filter((m) => selectedMetrics.has(m.name))
        .map((metric) =>
          convertMetricToPlotlyLine(metric.name, cycle.weeks, cycle.name),
        );
    });
}
