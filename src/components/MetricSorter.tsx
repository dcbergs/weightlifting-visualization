import { metricCategorization } from "../data/metricCategories";
import type { Metric } from "../data/model";
import MetricSubgroup from "./MetricSubgroup";

interface MetricSorterProps {
  metrics: Metric[];
  selectedMetricNames: Set<string>;
  setSelectedMetricNames: (set: Set<string>) => void;
  lineStyleMap: Map<string, { dash: string; width: number }>;
}
function MetricSorter({
  metrics,
  selectedMetricNames,
  setSelectedMetricNames,
  lineStyleMap,
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
        lineStyleMap={lineStyleMap}
      />
      <MetricSubgroup
        metrics={metrics.filter((m) =>
          metricCategorization.get("strength")?.has(m.name),
        )}
        selectedMetricNames={selectedMetricNames}
        setSelectedMetricNames={setSelectedMetricNames}
        lineStyleMap={lineStyleMap}
      />
      <MetricSubgroup
        metrics={metrics.filter((m) =>
          metricCategorization.get("accessory")?.has(m.name),
        )}
        selectedMetricNames={selectedMetricNames}
        setSelectedMetricNames={setSelectedMetricNames}
        lineStyleMap={lineStyleMap}
      />
      <MetricSubgroup
        metrics={metrics.filter((m) =>
          metricCategorization.get("other")?.has(m.name),
        )}
        selectedMetricNames={selectedMetricNames}
        setSelectedMetricNames={setSelectedMetricNames}
        lineStyleMap={lineStyleMap}
      />
    </div>
  );
}

export default MetricSorter;
