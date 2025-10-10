import Plot from "react-plotly.js";
import type { TrainingHistory, TrainingWeek } from "../data/model";
import "./PlotArea.css";
import { convertModelToPlotlyData } from "../data/convertModelToPlotlyData";

// todo: can add some call to Plotly.Plots.resize() if I need
// to make it respond to something other than window size

interface PlotAreaProps {
  data: TrainingHistory;
  selectedCycles: Set<string>;
  selectedMetrics: Set<string>;
}

function PlotArea({ data, selectedCycles, selectedMetrics }: PlotAreaProps) {
  const plotlyData = convertModelToPlotlyData(
    data,
    selectedCycles,
    selectedMetrics,
  );
  return (
    <Plot
      className="plot"
      data={plotlyData}
      layout={{
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
  );
}

export default PlotArea;
