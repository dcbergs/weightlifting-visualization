import { useState } from "react";
import { fakeTrainingHistory } from "../data/generateMockData";
import CycleSelection from "./CycleSelection";
import "./WeightliftingComparison.css";
import MetricSorter from "./MetricSorter";
import PlotArea from "./PlotArea";

function WeightliftingComparison() {
  const [data, _] = useState(fakeTrainingHistory);

  const cycleNames = data.cycles.map((c) => c.name);
  // start with first two cycles active
  const defaultCycles = cycleNames.length > 2 ? cycleNames.slice(0, 2) : [];

  const [selectedCycles, setSelectedCycles] = useState<Set<string>>(
    new Set(defaultCycles),
  );
  // start with two metrics selected too
  const metricNames = data.metrics.map((m) => m.name);
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
        data={data}
        selectedCycles={selectedCycles}
        selectedMetrics={selectedMetrics}
      />
      <div className="controls">
        <CycleSelection
          cycles={data.cycles}
          selectedCycleNames={selectedCycles}
          setSelectedCycleNames={setSelectedCycles}
        />
        <MetricSorter
          metrics={data.metrics}
          selectedMetricNames={selectedMetrics}
          setSelectedMetricNames={setSelectedMetrics}
        />
      </div>
    </div>
  );
}

export default WeightliftingComparison;
