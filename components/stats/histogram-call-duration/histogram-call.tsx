import { BarChart } from "@mantine/charts";
import { data } from "./dummy";
import { Center } from "@mantine/core";
type HistogramData = {
  duration: string;
  amount: number;
};

export default function HistogramCalls(histogramData: {
  histogramData: HistogramData;
}) {
  return (
    <Center h={"100%"}>
      <BarChart
        h={400}
        data={data}
        dataKey="duration"
        series={[{ name: "amount", color: "violet.6" }]}
        tickLine="xy"
        xAxisLabel="Call Duration (minutes)"
        yAxisLabel="Number of Calls"
      />
    </Center>
  );
}
