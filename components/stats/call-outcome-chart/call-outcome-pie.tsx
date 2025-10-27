import { Group, Text, Box, Center, Flex } from "@mantine/core";
import { PieChart } from "@mantine/charts";

type CallOutcomeType = {
  name: string,
  value: number,
  color: string
}

const data = [
  { name: "Supportive", value: 45, color: "teal" },
  { name: "No Answer", value: 30, color: "gray" },
  { name: "Declined", value: 15, color: "red" },
  { name: "Hostile", value: 10, color: "blue" },
  { name: "Other", value: 10, color: "orange" },
];

export default function CallsOutcomes(callOutcomes:{callOutcomes?: CallOutcomeType}) {
  return (
    <div>
      <Text c="dimmed" tt="uppercase" fw={700} fz="xs">
        calls outcomes
      </Text>
      <Flex justify="flex-end">
        <Group
          mt="sm"
          w="40%"
          justify="center"
          style={{
            flexWrap: "wrap",
            marginLeft: "auto",
          }}
        >
          {data.map((item) => (
            <Group key={item.name}>
              <Box
                w={12}
                h={12}
                style={{ background: `var(--mantine-color-${item.color}-6)` }}
              />
              <Text fz="sm">{item.name}</Text>
            </Group>
          ))}
        </Group>
      </Flex>

      <Center>
        <PieChart size={260} data={data} withLabels withLabelsLine={false} />
      </Center>
    </div>
  );
}
