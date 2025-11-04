"use client";

import {
  Button,
  Container,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconPhoneCall,
  IconUsers,
  IconChartBar,
  IconLock,
} from "@tabler/icons-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100">
      <Container size="lg" py={100}>
        <Grid align="center">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="sm">
              <Title order={1} size={40} fw={800}>
                Empower Your Campaign <br /> with Smarter Phone Banking
              </Title>
              <Text size="lg" c="dimmed">
                Connect with voters, track outcomes, and manage volunteer
                outreach — all from one simple, modern dashboard.
              </Text>
              <Group mt="md">
                <Button
                  color="blue"
                  size="md"
                  radius="md"
                  component="a"
                  href="/signup"
                >
                  Get Started
                </Button>
                <Button
                  variant="light"
                  color="blue"
                  size="md"
                  radius="md"
                  component="a"
                  href="/about"
                >
                  Learn More
                </Button>
              </Group>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Image
              src="/preview.png"
              alt="Phone Banking Dashboard"
              width={600}
              height={400}
              className="rounded-xl shadow-lg"
            />
          </Grid.Col>
        </Grid>
      </Container>

        <Container size="lg" py={80}>
          <Title order={2} ta="center" mb="xl">
            Why Choose Our Platform
          </Title>

          <Grid gutter="xl">
            {[
              {
                icon: <IconPhoneCall size={36} className="text-blue-600" />,
                title: "Smart Call Queue",
                desc: "Auto-assign contacts and call lists based on region, language, or campaign priorities.",
              },
              {
                icon: <IconUsers size={36} className="text-blue-600" />,
                title: "Volunteer Dashboard",
                desc: "Track volunteer activity and call performance with intuitive analytics.",
              },
              {
                icon: <IconChartBar size={36} className="text-blue-600" />,
                title: "Real-Time Analytics",
                desc: "View daily call results, support levels, and progress towards goals.",
              },
              {
                icon: <IconLock size={36} className="text-blue-600" />,
                title: "Secure & Reliable",
                desc: "Built with privacy and data integrity in mind using modern frameworks and encryption.",
              },
            ].map((feature, i) => (
              <Grid.Col
                key={i}
                span={{ base: 12, md: 3 }}
                style={{ display: "flex" }}
              >
                <Paper
                  p="lg"
                  radius="md"
                  shadow="sm"
                  withBorder
                  style={{ flex: 1, display: "flex", flexDirection: "column" }}
                >
                  <Stack
                    align="center"
                    justify="space-between"
                    gap="xs"
                    style={{ flexGrow: 1 }}
                  >
                    {feature.icon}
                    <Title order={4} ta="center">
                      {feature.title}
                    </Title>
                    <Text c="dimmed" ta="center">
                      {feature.desc}
                    </Text>
                  </Stack>
                </Paper>
              </Grid.Col>
            ))}
          </Grid>
        </Container>

      <Container size="md" py={100}>
        <Paper
          radius="xl"
          p="xl"
          shadow="md"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center"
        >
          <Title order={2} mb="sm">
            Ready to Start Calling?
          </Title>
          <Text size="lg" mb="lg">
            Join campaigns and organizations making real impact through
            outreach.
          </Text>
          <Button
            size="md"
            variant="white"
            color="dark"
            radius="md"
            component="a"
            href="/signup"
          >
            Create Account
          </Button>
        </Paper>
      </Container>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 p-10">
        <Text size="sm" c="dimmed">
          © {new Date().getFullYear()} Powerline — Built for modern campaign
          teams.
        </Text>
      </footer>
    </main>
  );
}
