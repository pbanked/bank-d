"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navbar/navbar";
import {
  Container,
  Title,
  Text,
  Button,
  Group,
  SimpleGrid,
  Paper,
  Box,
  Stack,
  TextInput,
  Select,
  SegmentedControl,
  Table,
  Badge,
  ActionIcon,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconPlus,
  IconSearch,
  IconFilter,
  IconLayoutGrid,
  IconList,
  IconDotsVertical,
} from "@tabler/icons-react";
import CreateEventModal from "./components/create-event-modal";
import EventCard, { OrganizationEvent } from "./components/event-card";
import Header from "@/components/header/header";

// Mock Data
const initialEvents: OrganizationEvent[] = [
  {
    id: "1",
    title: "Campaign Kickoff Rally",
    startDate: new Date("2026-03-15T14:00:00"),
    endDate: new Date("2026-03-15T16:00:00"),
    location: "Community Center Hall",
    status: "Published",
    attendees: 150,
    contacts: ["uuid-1", "uuid-2"],
    isRepeating: false,
    repeatingDays: [],
  },
  {
    id: "2",
    title: "Volunteer Training Session",
    startDate: new Date("2026-02-10T10:00:00"),
    endDate: new Date("2026-02-10T11:30:00"),
    location: "Zoom (Online)",
    status: "Draft",
    attendees: 0,
    contacts: [],
    isRepeating: true,
    repeatingDays: ["Mon", "Wed"],
  },
  {
    id: "3",
    title: "2025 Retrospective",
    startDate: new Date("2025-12-20T09:00:00"),
    endDate: new Date("2025-12-20T17:00:00"),
    location: "Headquarters",
    status: "Published",
    attendees: 45,
    contacts: ["uuid-3"],
    isRepeating: false,
    repeatingDays: [],
  },
];

export default function Organization() {
  const [events, setEvents] = useState<OrganizationEvent[]>(initialEvents);
  const [opened, { open, close }] = useDisclosure(false);

  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>("All");

  const now = new Date();

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || !statusFilter
        ? true
        : event.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const upcomingEvents = filteredEvents
    .filter((e) => e.startDate >= now)
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

  const pastEvents = filteredEvents
    .filter((e) => e.startDate < now)
    .sort((a, b) => b.startDate.getTime() - a.startDate.getTime());

  const handleCreateEvent = (
    eventData: Omit<OrganizationEvent, "id" | "attendees">
  ) => {
    const eventToAdd: OrganizationEvent = {
      ...eventData,
      id: crypto.randomUUID(),
      attendees: 0,
    };
    setEvents([...events, eventToAdd]);
  };

  const renderEvents = (eventList: OrganizationEvent[]) => {
    if (eventList.length === 0) {
      return (
        <Paper withBorder p="xl" radius="md" bg="gray.0" ta="center">
          <Text c="dimmed">No events found matching your criteria.</Text>
        </Paper>
      );
    }

    if (viewMode === "grid") {
      return (
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing="lg">
          {eventList.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </SimpleGrid>
      );
    }

    return (
      <Paper withBorder radius="md" shadow="sm">
        <Table verticalSpacing="sm" highlightOnHover striped>
          <Table.Thead bg="gray.0">
            <Table.Tr>
              <Table.Th>Event Title</Table.Th>
              <Table.Th>Date & Time</Table.Th>
              <Table.Th>Location</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Attendees</Table.Th>
              <Table.Th style={{ width: 50 }}></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {eventList.map((event) => (
              <Table.Tr key={event.id}>
                <Table.Td fw={600}>{event.title}</Table.Td>
                <Table.Td>
                  <Text size="sm">{event.startDate.toLocaleDateString()}</Text>
                  <Text size="xs" c="dimmed">
                    {event.startDate.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </Table.Td>
                <Table.Td>{event.location}</Table.Td>
                <Table.Td>
                  <Badge
                    color={event.status === "Published" ? "blue" : "gray"}
                    variant="light"
                  >
                    {event.status}
                  </Badge>
                </Table.Td>
                <Table.Td>{event.attendees}</Table.Td>
                <Table.Td>
                  <ActionIcon variant="subtle" color="gray">
                    <IconDotsVertical size={16} />
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#f8f9fa",
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
          <Header headerTitle="" />
        </div>

        <Box
          style={{ flex: 1, overflowY: "auto", padding: "0 2rem 2rem 2rem" }}
        >
          <Container fluid>
            <Group justify="space-between" align="flex-end" mb="xl">
              <div>
                <Title order={2} c="dark.5">
                  Organization Dashboard
                </Title>
                <Text c="dimmed">Manage your campaign events and rallies</Text>
              </div>
              <Button
                leftSection={<IconPlus size={18} />}
                onClick={open}
                size="md"
              >
                Create New Event
              </Button>
            </Group>

            <Group mb="xl" justify="space-between">
              <Group>
                <TextInput
                  placeholder="Search events..."
                  leftSection={<IconSearch size={16} />}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.currentTarget.value)}
                  w={300}
                />
                <Select
                  placeholder="Status"
                  leftSection={<IconFilter size={16} />}
                  data={["All", "Published", "Draft"]}
                  value={statusFilter}
                  onChange={setStatusFilter}
                  w={150}
                  allowDeselect={false}
                />
              </Group>

              <SegmentedControl
                value={viewMode}
                onChange={(val) => setViewMode(val as "grid" | "table")}
                data={[
                  {
                    value: "grid",
                    label: (
                      <Group gap={6} wrap="nowrap" align="center">
                        <IconLayoutGrid size={16} />
                        <span>Grid</span>
                      </Group>
                    ),
                  },
                  {
                    value: "table",
                    label: (
                      <Group gap={6} wrap="nowrap" align="center">
                        <IconList size={16} />
                        <span>Table</span>
                      </Group>
                    ),
                  },
                ]}
              />
            </Group>

            <Stack gap="xl">
              <section>
                <Title order={3} mb="lg" c="blue.8">
                  Upcoming Events
                </Title>
                {renderEvents(upcomingEvents)}
              </section>

              <section>
                <Title order={3} mb="lg" c="gray.7">
                  Past Events
                </Title>
                {renderEvents(pastEvents)}
              </section>
            </Stack>
          </Container>
        </Box>
      </div>

      <CreateEventModal
        opened={opened}
        onClose={close}
        onSubmit={handleCreateEvent}
      />
    </div>
  );
}
