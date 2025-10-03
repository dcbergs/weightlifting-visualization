import Plot from "react-plotly.js";
import type { TrainingHistory, TrainingWeek } from "../data/model";
import type { Data } from "plotly.js";

interface PlotAreaProps {
  data: TrainingHistory;
}

const lineTypeBank = [
  "solid",
  "dot",
  "dash",
  "longdash",
  "dashdot",
  "longdashdot",
];

const ColorBank = [
  "#01a08d",
  "#d2521f",
  "#f6ab41",
  "#ece659",
  "#a6da4a",
  "#4ada76",
  "#4a78da",
  "#7e4ada",
  "#c14ada",
  "#da4a9a",
];

function mapCycleNameToColor(cycleName: string) {
  const foo = Math.round(Math.random() * 100);
  return ColorBank[foo % ColorBank.length];
}

function PlotArea({ data }: PlotAreaProps) {
  // dumb way to assign colors for now
  data.cycles = data.cycles.map((cycle, idx) => ({
    ...cycle,
    color: ColorBank[idx % ColorBank.length],
  }));

  function convertMetricToPlotlyLine(
    metric: string,
    weeks: TrainingWeek[],
    color: string,
    cycleName: string,
  ): Data {
    // could add offset here
    const x = weeks.map((w) => w.weekNumber);
    const y = weeks.map((w) => {
      const value = w.metricValues.get(metric);
      if (value === undefined) {
        throw new Error(
          `could not find metric ${metric} in week ${w.weekNumber} for cycle ${cycleName}`,
        );
      }
      // threw if undefined, but make the linter happy
      return value ?? 0;
    });
    return {
      type: "scatter",
      mode: "lines",
      line: {
        color: color,
        dash: "solid",
        // 2 is default
        width: 2,
      },
      x: x,
      y: y,
    };
  }
  console.log(data);
  const plotlyData = data.cycles.flatMap((cycle) => {
    return data.metrics.map((metric) =>
      convertMetricToPlotlyLine(
        metric.name,
        cycle.weeks,
        mapCycleNameToColor(cycle.name),
        cycle.name,
      ),
    );
  });
  return (
    <>
      <Plot data={[...plotlyData]} layout={{}} />
    </>
  );
}

export default PlotArea;
