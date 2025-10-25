"use client";

import { Grid, Paper, Text, Button, Group } from "@mantine/core";
import Header from "@/components/header/header";
import { Navbar } from "@/components/navbar/navbar";
import CallsContactMade from "@/components/stats/calls/calls-contact-made";
import CallsConversionRates from "@/components/stats/call-conversion/calls-conversion-rates";

export default function Dashboard() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f7fb" }}>
      <Navbar />
      <div style={{ flex: 1, marginLeft: 80,padding: "2rem", width: "100%" }}>
        <Header headerTitle="Dashboard" />

        <Grid mt="xl" gutter="xl" align="stretch">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Paper p="lg" radius="md" shadow="sm">
              <CallsContactMade/>
              {/* INSERT CALL COMPONENT */}
            </Paper>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Paper p="lg" radius="md" shadow="sm">
              <CallsConversionRates/>
              {/* INSERT CONVERSION COMPONENT */}
            </Paper>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Group grow mb="md">
              <Button
                variant="light"
                radius="md"
                size="lg"
                style={{
                  background: "rgb(48, 176, 199, 0.1)",
                  fontWeight: 400,
                }}
              >
                <h3 className="text-black">start a session</h3>
              </Button>
              <Button
                variant="light"
                radius="md"
                size="lg"
                style={{
                  background: "rgb(52, 199, 89, 0.1)",
                  fontWeight: 400,
                }}
              >
                <h3 className="text-black">assign tasks</h3>
              </Button>
            </Group>

            <Paper p="lg" radius="md" shadow="sm" style={{ height: 360 }}>
              <Text fw={600} mb="sm" c="dimmed">
                Productivity
              </Text>
              {/* INSERT PRODUCTIVITY COMPONENT HERE */}
              [Heatmap / Histogram Here]
            </Paper>
          </Grid.Col>
        </Grid>

        {/* Bottom charts */}
        <Grid mt="xl" gutter="xl">
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Paper p="lg" radius="md" shadow="sm" style={{ height: 400 }}>
              <Text fw={600} mb="sm" c="dimmed">
                Call outcomes
              </Text>
              {/* INSERT PIE CHART HERE */}
              [Pie Chart Here]
            </Paper>
          </Grid.Col>
        </Grid>
      </div>
    </div>
  );
}
