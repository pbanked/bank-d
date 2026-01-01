"use client";

import { Grid, Paper, Text, Button, Group } from "@mantine/core";
import Header from "@/components/header/header";
import { Navbar } from "@/components/navbar/navbar";
import CallsContactMade from "@/components/stats/calls/calls-contact-made";
import CallsConversionRates from "@/components/stats/call-conversion/calls-conversion-rates";
import CallOutcomePie from "@/components/stats/call-outcome-chart/call-outcome-pie";
import HeatmapTime from "@/components/stats/heatmap-stats/heatmap-time";
import HistogramCalls from "@/components/stats/histogram-call-duration/histogram-call";

export default function Dashboard() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#f5f7fb",
        overflow: "hidden",
      }}
    >
      <Navbar />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          marginLeft: "80px",
        }}
      >
        <div style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
          <Header headerTitle="Dashboard" />
        </div>

        <div
          style={{ flex: 1, overflowY: "auto", padding: "0 2rem 2rem 2rem" }}
        >
          <Grid gutter="lg" align="stretch">
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Paper p="lg" radius="md" shadow="sm" h={"100%"}>
                <CallsContactMade />
              </Paper>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <Paper p="lg" radius="md" shadow="sm" h={"100%"}>
                <CallsConversionRates />
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
                <HeatmapTime />
              </Paper>
            </Grid.Col>
          </Grid>

          <Grid mt="xl" gutter="xl">
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Paper p="lg" radius="md" shadow="sm" style={{ height: 500 }}>
                <CallOutcomePie />
              </Paper>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Paper p="lg" radius="md" shadow="sm" style={{ height: 500 }}>
                <Text fw={600} mb="sm" c="dimmed">
                  Productivity
                </Text>
                <HistogramCalls />
              </Paper>
            </Grid.Col>
          </Grid>
        </div>
      </div>
    </div>
  );
}
