import { Tooltip, Typography } from "@mui/material";
import type { Metric } from "../data/model";
import "./MetricCard.css";

interface MetricCardProps {
  metric: Metric;
  handleToggleMetric: (name: string) => void;
  checked: boolean;
  strokeWidth: number;
  strokeDashArray: string;
}

function MetricCard({
  metric,
  handleToggleMetric,
  checked,
  strokeWidth,
  strokeDashArray,
}: MetricCardProps) {
  return (
    <Tooltip
      title={<Typography fontSize={16}>{metric.description}</Typography>}
      enterDelay={1000}
    >
      <label htmlFor={`checkbox-${metric.name}`} style={{ margin: "8px" }}>
        <input
          type="checkbox"
          id={`checkbox-${metric.name}`}
          className={"metricCard"}
          style={{ position: "absolute", opacity: 0 }}
          onChange={() => handleToggleMetric(metric.name)}
          checked={checked}
        />
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
            style={{
              userSelect: "none",
              margin: "auto",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {metric.name}
            <svg height="18" width="80" style={{ alignSelf: "center" }}>
              <path
                d="M0 9 L80 9"
                strokeWidth={strokeWidth}
                stroke="white"
                strokeDasharray={strokeDashArray}
              />
            </svg>
          </div>
        </div>
      </label>
    </Tooltip>
  );
}

export default MetricCard;
