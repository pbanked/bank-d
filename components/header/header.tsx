import { Avatar, Box, Burger, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBell,
  IconBellExclamation,
  IconBurger,
  IconLine,
  IconNotification,
} from "@tabler/icons-react";

export default function Header({ headerTitle }: { headerTitle: string }) {
  const [opened, { toggle }] = useDisclosure();
  return (
    <>
      <Box style={{ width: "90vw", zIndex: 1000 }}>
        <Group>
          <Title order={1}>{headerTitle}</Title>
        </Group>
        <Group justify="flex-end">
          <Burger
            opened={opened}
            onClick={toggle}
            aria-label="Toggle navigation"
          />
          <Avatar radius="xl" />
          <IconBell></IconBell>
        </Group>
      </Box>
    </>
  );
}
