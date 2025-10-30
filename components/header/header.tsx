import { userLogOut } from "@/functions/log-out-user";
import {
  Avatar,
  Box,
  Group,
  Menu,
  Switch,
  Title,
} from "@mantine/core";
import {
  IconBell,
  IconLogout2,
  IconMessageCircle,
  IconSettings,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function Header({ headerTitle }: { headerTitle: string }) {
  const router = useRouter()
  return (
    <Box style={{ width: "90vw", zIndex: 1000, padding: "1rem 0" }}>
      <Group justify="space-between" align="center">
        <Title order={1}>{headerTitle}</Title>

        <Group>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Avatar className="cursor-pointer" radius="xl" />
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Application</Menu.Label>
              <Menu.Item leftSection={<IconSettings size={14} />} onClick={() => router.push("account")}>
                Settings
              </Menu.Item>
              <Menu.Item leftSection={<IconMessageCircle size={14} />}>
                Messages
              </Menu.Item>
              <Menu.Divider />

              <Menu.Label>Visual</Menu.Label>
              <Menu.Item>
                <Switch label="Light/Dark mode" />
              </Menu.Item>
              <Menu.Item leftSection={<IconLogout2 stroke={1} />} onClick={() => userLogOut(router)}>
                Sign out
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>

          <IconBell />
        </Group>
      </Group>
    </Box>
  );
}
