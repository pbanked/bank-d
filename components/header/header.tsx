import { Avatar, Box, Burger, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBell } from "@tabler/icons-react";

export default function Header({ headerTitle }: { headerTitle: string }) {
  const [opened, { toggle }] = useDisclosure();
  return (
    <Box style={{ width: "90vw", zIndex: 1000, padding: "1rem 0" }}>
      <Group justify="space-between" align="center">
        <Title order={1}>{headerTitle}</Title>

        <Group>
          <Burger
            opened={opened}
            onClick={toggle}
            aria-label="Toggle navigation"
          />
          <Avatar radius="xl" />
          <IconBell />
        </Group>
      </Group>
    </Box>
  );
}
