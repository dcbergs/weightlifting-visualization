import { useState } from "react";
import { fakeTrainingHistory } from "../data/generateMockData";
import CycleSelection from "./CycleSelection";
import MetricSorter from "./MetricSorter";
import PlotArea from "./PlotArea";

function WeightliftingComparison() {
  // with fake data, default sort by date
  const [cycles, setCycles] = useState(
    fakeTrainingHistory.cycles.sort(
      (a, b) => +a.weeks[0].dateWeekStart - +b.weeks[0].dateWeekStart,
    ),
  );
  const [metrics, _] = useState(fakeTrainingHistory.metrics);

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

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <PlotArea
        cycles={cycles}
        metrics={metrics}
        selectedCycles={selectedCycles}
        selectedMetrics={selectedMetrics}
      />
      <div style={{ display: "flex", marginLeft: "8px", marginRight: "8px" }}>
        <CycleSelection
          cycles={cycles}
          setCycles={setCycles}
          selectedCycleNames={selectedCycles}
          setSelectedCycleNames={setSelectedCycles}
        />
        <MetricSorter
          metrics={metrics}
          selectedMetricNames={selectedMetrics}
          setSelectedMetricNames={setSelectedMetrics}
        />
      </div>
    </div>
  );
}

export default WeightliftingComparison;
