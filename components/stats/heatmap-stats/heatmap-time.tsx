import { ResponsiveHeatMap } from "@nivo/heatmap";
import { heatmapData } from "./dummy";

type HeatmapData = {
  id: string;
  data: { x: string; y: string };
};

export default function ProductivityHeatmap(heatmapProdData: {
  heatmapProdData: HeatmapData;
}) {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveHeatMap
        data={heatmapData}
        margin={{ top: 50, right: 70, bottom: 50, left: 60 }}
        colors={{ type: "sequential", scheme: "blues" }}
        borderWidth={0}
        axisTop={{
          legend: "Hour of Day",
          legendPosition: "middle",
          legendOffset: -40,
          tickRotation: -45,
        }}
        axisLeft={{
          legend: "Day of Week",
          legendPosition: "middle",
          legendOffset: -50,
        }}
        labelTextColor={{ from: "color", modifiers: [["darker", 3]] }}
        animate={true}
        legends={[
          {
            anchor: "right",
            translateX: 40,
            translateY: 0,
            length: 200,
            thickness: 6,
            direction: "column",
            tickPosition: "after",
            tickSize: 4,
            tickSpacing: 4,
            title: "Calls",
            titleAlign: "start",
            titleOffset: 4,
          },
        ]}
        theme={{
          labels: {
            text: { fontSize: 14, fontWeight: 500 },
          },
          axis: {
            legend: { text: { fontSize: 16, fontWeight: 600 } },
            ticks: { text: { fontSize: 12 } },
          },
        }}
      />
      {/* <p style={{ textAlign: "center", marginTop: 10, color: "#444" }}>
        Heatmap: Calls by Day and Hour (Weekdays, Before 6 PM)
      </p> */}
    </div>
  );
}
