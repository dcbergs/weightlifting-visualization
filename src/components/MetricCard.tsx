import type { Metric } from "../data/model";
import "./MetricCard.css";

interface MetricCardProps {
  metric: Metric;
  handleToggleMetric: (name: string) => void;
  checked: boolean;
}

function MetricCard({ metric, handleToggleMetric, checked }: MetricCardProps) {
  // todo: description tooltip
  // const theme = useTheme();
  return (
    <label htmlFor={`checkbox-${metric.name}`} style={{ margin: "8px" }}>
      <input
        type="checkbox"
        id={`checkbox-${metric.name}`}
        className={"metricCard"}
        style={{ position: "absolute", opacity: 0 }}
        onChange={() => handleToggleMetric(metric.name)}
        checked={checked}
      />
      {/* todo: probably make invisible checkbox smaller just in case */}
      <div
        className={checked ? "CardChecked" : "CardUnchecked"}
        style={{
          width: "100px",
          height: "100px",
          border: `2px solid #bababa`,
          borderRadius: "8px",
          display: "flex",
        }}
      >
        <div
          style={{ userSelect: "none", margin: "auto", textAlign: "center" }}
        >
          {metric.name}
        </div>
      </div>
    </label>
  );
}

export default MetricCard;
