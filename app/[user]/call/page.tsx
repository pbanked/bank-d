"use client";
import {
  Grid,
  Paper,
  Text,
  Group,
  Button,
  Stack,
  Textarea,
  Select,
  Progress,
  Badge,
} from "@mantine/core";
import Header from "@/components/header/header";
import { Navbar } from "@/components/navbar/navbar";
import { useState } from "react";
import { MOCK_CONTACTS } from "./mock";

/**
 * REPLACE ALL DUMMY VALUES ASAP
 */

export default function Calls() {
  const [contacts, setContacts] = useState(MOCK_CONTACTS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [notes, setNotes] = useState("");
  const [outcome, setOutcome] = useState("");
  const [completed, setCompleted] = useState(0);
  const [stats, setStats] = useState({
    reached: 0,
    noAnswer: 0,
    followUps: 0,
  });

  const current = contacts[currentIndex];

  const handleSave = () => {

    setCompleted((prev) => prev + 1);

    setStats((prev) => ({
      ...prev,
      reached: prev.reached + (outcome === "Reached" ? 1 : 0),
      noAnswer: prev.noAnswer + ((outcome === "No Answer" || outcome === "") ? 1 : 0),
      followUps: prev.followUps + (outcome === "Callback Needed" ? 1 : 0),
    }));

    setNotes("");
    setOutcome("");

    if (currentIndex < contacts.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      alert("All calls completed!");
    }
  };

  const handleSkip = () => {
    if (currentIndex < contacts.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const progress = Math.round((completed / contacts.length) * 100);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f7fb" }}>
      <Navbar />
      <div style={{ flex: 1, marginLeft: 80, padding: "2rem", width: "100%" }}>
        <Header headerTitle={"Calls"} />
        <Grid mt="xl" gutter="lg" align="stretch">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Paper p="lg" radius="md" shadow="sm" withBorder>
              <Text fw={600} size="lg" mb="sm">
                Next Contact
              </Text>

              {current ? (
                <Stack gap="xs">
                  <Text>
                    Name: <strong>{current.name}</strong>
                  </Text>
                  <Text>Phone: {current.phone}</Text>
                  <Text>Location: {current.location}</Text>
                  <Group gap="xs">
                    {current.tags.map((tag) => (
                      <Badge key={tag} color="blue">
                        {tag}
                      </Badge>
                    ))}
                  </Group>

                  <Group mt="md" grow>
                    <Button
                      variant="filled"
                      color="green"
                      radius={10}
                      onClick={handleSave}
                    >
                      Call
                    </Button>
                    <Button variant="default" radius={10} onClick={handleSkip}>
                      Skip
                    </Button>
                  </Group>
                </Stack>
              ) : (
                <Text c="dimmed">No contacts left in your queue.</Text>
              )}
            </Paper>

            <Paper p="lg" radius="md" shadow="sm" mt={10} withBorder>
              <Text fw={600} size="sm" mb="xs">
                Upcoming
              </Text>
              <Stack gap="xs">
                {contacts.slice(currentIndex + 1, currentIndex + 3).map((c) => (
                  <Group
                    key={c.id}
                    justify="space-between"
                    style={{ borderBottom: "1px solid #eee", paddingBottom: 4 }}
                  >
                    <Text size="sm">{c.name}</Text>
                    <Badge color="gray">{c.tags[0]}</Badge>
                  </Group>
                ))}
                {currentIndex >= contacts.length - 1 && (
                  <Text c="dimmed" size="sm">
                    No more contacts
                  </Text>
                )}
              </Stack>
            </Paper>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 5 }}>
            <Paper p="lg" radius="md" shadow="sm" withBorder>
              <Text fw={600} size="lg" mb="sm">
                Script / Talking Points
              </Text>
              <Text c="dimmed" mb="md">
                “hi, bblah blah blah”
              </Text>

              <Textarea
                label="Call Notes"
                placeholder="Write down outcomes, notes, or follow-ups..."
                autosize
                minRows={4}
                value={notes}
                onChange={(e) => setNotes(e.currentTarget.value)}
              />

              <Select
                label="Call Outcome"
                placeholder="Select outcome"
                data={[
                  "Reached",
                  "Left Voicemail",
                  "No Answer",
                  "Callback Needed",
                ]}
                mt="md"
                value={outcome}
                onChange={(_value, option) => setOutcome(option.value)}
              />

              <Button fullWidth mt="md" color="blue" onClick={handleSave}>
                Save Outcome
              </Button>
            </Paper>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 3 }}>
            <Paper p="lg" radius="md" shadow="sm" withBorder>
              <Text fw={600} size="lg" mb="sm">
                Today&apos;s Progress
              </Text>
              <Text size="sm" c="dimmed">
                {completed} of {contacts.length} calls completed
              </Text>
              <Progress
                value={progress}
                color="teal"
                size="lg"
                mt="sm"
                radius="xl"
              />

              <Stack mt="lg" gap="sm">
                <Group justify="space-between">
                  <Text>Reached:</Text>
                  <Badge color="green">{stats.reached}</Badge>
                </Group>
                <Group justify="space-between">
                  <Text>No Answer:</Text>
                  <Badge color="gray">{stats.noAnswer}</Badge>
                </Group>
                <Group justify="space-between">
                  <Text>Follow-ups:</Text>
                  <Badge color="yellow">{stats.followUps}</Badge>
                </Group>
              </Stack>
            </Paper>
          </Grid.Col>
        </Grid>
      </div>
    </div>
  );
}
