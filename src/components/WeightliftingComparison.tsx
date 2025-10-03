import { fakeTrainingHistory } from "../data/generateMockData";
import CycleSelection from "./CycleSelection";
import MetricSelection from "./MetricSelection";
import PlotArea from "./PlotArea";
import "./WeightliftingComparison.css";

function WeightliftingComparison() {
  const data = fakeTrainingHistory;
  return (
    <>
      <PlotArea data={data} />
      <div className="controls">
        <CycleSelection cycles={data.cycles} />
        <MetricSelection />
      </div>
    </>
  );
}

export default WeightliftingComparison;
