import Plot from "react-plotly.js";
import type { Cycle, Metric } from "../data/model";
import "./PlotArea.css";
import { convertModelToPlotlyData } from "../data/convertModelToPlotlyData";
import { useEffect, useMemo, useRef } from "react";

// todo: can add some call to Plotly.Plots.resize() if I need
// to make it respond to something other than window size

interface PlotAreaProps {
  cycles: Cycle[];
  metrics: Metric[];
  selectedCycles: Set<string>;
  selectedMetrics: Set<string>;
  lineStyleMap: Map<string, { dash: string; width: number }>;
  colorMap: Map<string, string>;
}

function PlotArea({
  cycles,
  metrics,
  selectedCycles,
  selectedMetrics,
  lineStyleMap,
  colorMap,
}: PlotAreaProps) {
  const plotlyData = useMemo(
    () =>
      convertModelToPlotlyData(
        cycles,
        metrics,
        selectedCycles,
        selectedMetrics,
        lineStyleMap,
        colorMap,
      ),
    [cycles, metrics, selectedCycles, selectedMetrics, lineStyleMap],
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
          yaxis: {
            gridcolor: "#333333",
            tickfont: {
              color: "#eeeeee",
            },
            // prevents the silly zoom click-and-drag behavior
            fixedrange: true,
          },
          xaxis: {
            autorange: "reversed",
            // the small "tick" under the axis
            tickcolor: "#333333",
            // the grid of guide lines in the plot
            gridcolor: "#333333",
            tickfont: {
              color: "#eeeeee",
            },
            dtick: 1,
            fixedrange: true,
          },
          margin: {
            t: 30,
          },
        }}
        useResizeHandler={true}
        style={{ width: "100%", height: "100%", flexGrow: 1 }}
        config={{ responsive: true, displayModeBar: false }}
      />
    </div>
  );
}

export default PlotArea;
