import type { Metric } from "../data/model";
import MetricCard from "./MetricCard";

interface MetricSubgroupProps {
  metrics: Metric[];
  selectedMetricNames: Set<string>;
  setSelectedMetricNames: (set: Set<string>) => void;
}
// this could become something which allows the user to sort metrics into different categories
// However, for my data, I know the metric categories which actually make sense, so this
// will be hard-coded for simplicity
function MetricSubgroup({
  metrics,
  selectedMetricNames,
  setSelectedMetricNames,
}: MetricSubgroupProps) {
  function handleToggleMetric(name: string) {
    if (selectedMetricNames.has(name)) {
      setSelectedMetricNames(selectedMetricNames.difference(new Set([name])));
    } else {
      setSelectedMetricNames(selectedMetricNames.union(new Set([name])));
    }
  }
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {metrics.map((m) => (
        <MetricCard
          key={m.name}
          metric={m}
          handleToggleMetric={handleToggleMetric}
          checked={selectedMetricNames.has(m.name)}
        />
      ))}
    </div>
  );
}

export default MetricSubgroup;
