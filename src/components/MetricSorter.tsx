import { metricCategorization } from "../data/metricCategories";
import type { Metric } from "../data/model";
import MetricSubgroup from "./MetricSubgroup";

interface MetricSorterProps {
  metrics: Metric[];
  selectedMetricNames: Set<string>;
  setSelectedMetricNames: (set: Set<string>) => void;
}
function MetricSorter({
  metrics,
  selectedMetricNames,
  setSelectedMetricNames,
}: MetricSorterProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <MetricSubgroup
        metrics={metrics.filter((m) =>
          metricCategorization.get("classics")?.has(m.name),
        )}
        selectedMetricNames={selectedMetricNames}
        setSelectedMetricNames={setSelectedMetricNames}
      />
      <MetricSubgroup
        metrics={metrics.filter((m) =>
          metricCategorization.get("strength")?.has(m.name),
        )}
        selectedMetricNames={selectedMetricNames}
        setSelectedMetricNames={setSelectedMetricNames}
      />
      <MetricSubgroup
        metrics={metrics.filter((m) =>
          metricCategorization.get("accessory")?.has(m.name),
        )}
        selectedMetricNames={selectedMetricNames}
        setSelectedMetricNames={setSelectedMetricNames}
      />
      <MetricSubgroup
        metrics={metrics.filter((m) =>
          metricCategorization.get("other")?.has(m.name),
        )}
        selectedMetricNames={selectedMetricNames}
        setSelectedMetricNames={setSelectedMetricNames}
      />
    </div>
  );
}

export default MetricSorter;
