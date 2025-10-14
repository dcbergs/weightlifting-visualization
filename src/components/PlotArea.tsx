import Plot from "react-plotly.js";
import type {
  Cycle,
  Metric,
  TrainingHistory,
  TrainingWeek,
} from "../data/model";
import "./PlotArea.css";
import { convertModelToPlotlyData } from "../data/convertModelToPlotlyData";
import { useEffect, useRef } from "react";

// todo: can add some call to Plotly.Plots.resize() if I need
// to make it respond to something other than window size

interface PlotAreaProps {
  cycles: Cycle[];
  metrics: Metric[];
  selectedCycles: Set<string>;
  selectedMetrics: Set<string>;
}

function PlotArea({
  cycles,
  metrics,
  selectedCycles,
  selectedMetrics,
}: PlotAreaProps) {
  console.log("rerendering plot");
  const plotlyData = convertModelToPlotlyData(
    cycles,
    metrics,
    selectedCycles,
    selectedMetrics,
  );

  const eleRef = useRef(null);
  const plotRef = useRef<Plot | null>(null);
  useEffect(() => {
    if (!eleRef.current) {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      // plotly TS types aren't fully defined...
      //@ts-ignore
      plotRef?.current?.resizeHandler();
    });

    resizeObserver.observe(eleRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  return (
    <div
      ref={eleRef}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "500px",
        minWidth: "700px",
      }}
    >
      <Plot
        className="plot"
        data={plotlyData}
        ref={plotRef}
        layout={{
          autosize: true,
          showlegend: false,
          paper_bgcolor: "#111111",
          plot_bgcolor: "#111111",
          xaxis: {
            // the small "tick" under the axis
            tickcolor: "#555555",
            // the grid of guide lines in the plot
            gridcolor: "#555555",
            tickfont: {
              color: "#555555",
            },
            dtick: 1,
          },
        }}
        useResizeHandler={true}
        style={{ width: "100%", height: "100%", flexGrow: 1 }}
        config={{ responsive: true }}
      />
    </div>
  );
}

export default PlotArea;
