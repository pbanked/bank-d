import { Text } from "@mantine/core";

const tempCalls = { callsWeek: 32, conversionWeek: 50 };
const tempConversion = { conversionWeek: 56, totalConversionWeek: 80 };
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
        <Text fw={700} fz="xl">
          {`${((tempCalls.callsWeek/tempCalls.conversionWeek) * 100).toString()}%`}
        </Text>
      </div>

      <div>
        <Text c="dimmed" tt="uppercase" fw={700} fz="xs">
          contacts made (week)
        </Text>
        <Text fw={700} fz="xl">
        {`${((tempConversion.conversionWeek/tempConversion.totalConversionWeek) * 100).toString()}%`}
        </Text>
      </div>
    </>
  );
}
