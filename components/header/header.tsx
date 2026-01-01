import { userLogOut } from "@/functions/log-out-user";
import {
  Avatar,
  Box,
  Group,
  Menu,
  rem,
  Text,
  ActionIcon,
  Title,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";
import {
  IconBell,
  IconLogout,
  IconMessageCircle,
  IconSettings,
  IconMoon,
  IconSun,
  IconChevronDown,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function Header({ headerTitle }: { headerTitle: string }) {
  const router = useRouter();
  
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Box 
      component="header" 
      mb="xl" 
      style={{ 
        width: "100%", 
        borderBottom: "1px solid var(--mantine-color-gray-2)",
        paddingBottom: "1.5rem", 
        paddingTop: "1rem"       
      }}
    >
      <Group justify="space-between" align="center" w="100%">
        
        <div>
          <Title order={1} size="h2" c="dark.6" fw={700}>{""}</Title>
        </div>

        <Group gap="lg"> 
          
          <ActionIcon variant="subtle" color="gray" size="xl" radius="xl">
            <IconBell style={{ width: rem(24), height: rem(24) }} />
          </ActionIcon>

          <Menu shadow="md" width={220} position="bottom-end" transitionProps={{ transition: 'pop-top-right' }}>
            <Menu.Target>
              <Group gap="sm" style={{ cursor: 'pointer' }}>
                <Avatar radius="xl" size="md" color="blue" variant="filled"> 
                  JD
                </Avatar>
                <div className="hidden sm:block text-left">
                  <Text size="sm" fw={600} lh={1.2}>John Doe</Text>
                  <Text c="dimmed" size="xs">Admin</Text>
                </div>
                <IconChevronDown size={16} className="text-gray-500" />
              </Group>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Application</Menu.Label>
              <Menu.Item 
                leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />} 
                onClick={() => router.push("account")}
              >
                Account Settings
              </Menu.Item>
              <Menu.Item 
                leftSection={<IconMessageCircle style={{ width: rem(14), height: rem(14) }} />}
              >
                Messages
              </Menu.Item>
              
              <Menu.Divider />

              <Menu.Label>Preferences</Menu.Label>
              <Menu.Item
                closeMenuOnClick={false}
                leftSection={computedColorScheme === 'dark' ? <IconSun size={14}/> : <IconMoon size={14}/>}
                onClick={toggleColorScheme}
              >
                Switch to {computedColorScheme === 'dark' ? 'Light' : 'Dark'} Mode
              </Menu.Item>

              <Menu.Divider />
              
              <Menu.Item 
                color="red" 
                leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
                onClick={() => userLogOut(router)}
              >
                Log out
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
    </Box>
  );
}