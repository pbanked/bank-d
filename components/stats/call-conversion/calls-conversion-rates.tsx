import { Group, Text } from "@mantine/core";
import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons-react";
import { LineChart } from "@mantine/charts";
import { data } from "./dummy";

const tempCalls = { callsWeek: 32, conversionWeek: 50, diff: 34 };
const tempConversion = { conversionWeek: 56, totalConversionWeek: 80, diff: 8 };

// Make sure to use the variable later and not the dummy values //
export default function CallsConversionRates({
  callsWeek,
  conversionWeek,
  totalCallsWeek,
  totalConversionWeek,
}: {
  callsWeek?: number;
  conversionWeek?: number;
  totalCallsWeek?: number;
  totalConversionWeek?: number;
}) {
  return (
    <>
      <div>
        <Text c="dimmed" tt="uppercase" fw={700} fz="xs">
          calls made (week)
        </Text>
        <Group className="align-bottom">
          <Text fw={700} fz="xl">
            {`${(
              (tempCalls.callsWeek / tempCalls.conversionWeek) *
              100
            ).toString()}%`}
          </Text>
          <LineChart
            h={100}
            w={100}
            data={data}
            dataKey="date"
            series={[{ name: "Apples", color: "indigo.6" }]}
            curveType="bump"
            tickLine="none"
            gridAxis="none"
            withXAxis={false}
            withYAxis={false}
            withDots={false}
            withTooltip={false}
          />
          <Text c="dimmed" fw={500} fz="sm" className="flex">
            <Text
              c={tempCalls.diff > 0 ? "teal" : "red"}
              fz="sm"
              fw={500}
              className="flex"
            >
              <span>{tempCalls.diff}%</span>
              {tempCalls.diff > 0 ? (
                <IconArrowUpRight size={12} />
              ) : (
                <IconArrowDownRight size={12} />
              )}
            </Text>
            <span>from last week</span>
          </Text>
        </Group>
      </div>
      <br />
      <div>
        <Text c="dimmed" tt="uppercase" fw={700} fz="xs">
          contacts made (week)
        </Text>
        <Group className="align-bottom">
          <Text fw={700} fz="xl">
            {`${(
              (tempConversion.conversionWeek /
                tempConversion.totalConversionWeek) *
              100
            ).toString()}%`}
          </Text>
          <LineChart
            h={100}
            w={100}
            data={data}
            dataKey="date"
            series={[{ name: "Oranges", color: "teal.6" }]}
            curveType="bump"
            tickLine="none"
            gridAxis="none"
            withXAxis={false}
            withYAxis={false}
            withDots={false}
            withTooltip={false}
          />
          <Text c="dimmed" fw={500} fz="sm" className="flex">
            <Text
              c={tempConversion.diff > 0 ? "teal" : "red"}
              fz="sm"
              fw={500}
              className="flex"
            >
              <span>{tempConversion.diff}%</span>
              {tempConversion.diff > 0 ? (
                <IconArrowUpRight size={12} />
              ) : (
                <IconArrowDownRight size={12} />
              )}
            </Text>
            <span>from last week</span>
          </Text>
        </Group>
      </div>
    </>
  );
}
