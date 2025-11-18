import { useMemo, useState } from "react";
import CycleSelection from "./CycleSelection";
import MetricSorter from "./MetricSorter";
import PlotArea from "./PlotArea";
import { ColorBank, lineStyleCombos } from "../data/convertModelToPlotlyData";
import { realCycles, realMetrics } from "../data/realProcessedData";

function WeightliftingComparison() {
  // default sort by date
  const [cycles, setCycles] = useState(
    realCycles.sort(
      (a, b) => +a.weeks[0].dateWeekStart - +b.weeks[0].dateWeekStart,
    ),
  );
  const [metrics, _] = useState(realMetrics);

  const cycleNames = cycles.map((c) => c.name);
  // start with first two cycles active
  const defaultCycles = cycleNames.length > 2 ? cycleNames.slice(0, 2) : [];

  const [selectedCycles, setSelectedCycles] = useState<Set<string>>(
    new Set(defaultCycles),
  );
  // start with two metrics selected too
  const metricNames = metrics.map((m) => m.name);
  const defaultMetrics =
    metricNames.find((m) => m === "classic reps") !== undefined &&
    metricNames.find((m) => m === "typical classic %") !== undefined
      ? ["classic reps", "typical classic %"]
      : [];
  const [selectedMetrics, setSelectedMetrics] = useState(
    new Set(defaultMetrics),
  );

  const lineStyleMap = useMemo(
    () =>
      new Map(
        metrics.map((m, idx) => [
          m.name,
          lineStyleCombos[idx % lineStyleCombos.length],
        ]),
      ),
    [metrics],
  );

  const colorMap = useMemo(
    () =>
      new Map(
        cycles.map((c, idx) => [c.name, ColorBank[idx % ColorBank.length]]),
      ),
    [cycles],
  );

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <PlotArea
        cycles={cycles}
        metrics={metrics}
        selectedCycles={selectedCycles}
        selectedMetrics={selectedMetrics}
        lineStyleMap={lineStyleMap}
        colorMap={colorMap}
      />
      <div
        style={{
          display: "flex",
          marginLeft: "8px",
          marginRight: "8px",
          justifyContent: "center",
        }}
      >
        <CycleSelection
          cycles={cycles}
          setCycles={setCycles}
          selectedCycleNames={selectedCycles}
          setSelectedCycleNames={setSelectedCycles}
          colorMap={colorMap}
        />
        <MetricSorter
          metrics={metrics}
          selectedMetricNames={selectedMetrics}
          setSelectedMetricNames={setSelectedMetrics}
          lineStyleMap={lineStyleMap}
        />
      </div>
    </div>
  );
}

export default WeightliftingComparison;
