"use client";

import React from "react";
import {
  Drawer,
  Avatar,
  Text,
  Group,
  Stack,
  Badge,
  ThemeIcon,
  Divider,
  Grid,
} from "@mantine/core";
import {
  IconPhone,
  IconMail,
  IconMapPin,
  IconCake,
  IconFlag,
  IconBuilding,
} from "@tabler/icons-react";
import { Contact } from "../types";

interface ContactDetailsDrawerProps {
  opened: boolean;
  onClose: () => void;
  contact: Contact | null;
}

export default function ContactDetailsDrawer({
  opened,
  onClose,
  contact,
}: ContactDetailsDrawerProps) {
  if (!contact) return null;

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title="Contact Details"
      position="right"
      size="md"
      padding="xl"
    >
      <Stack align="center" mb="xl">
        <Avatar size={120} radius={120} color="blue" variant="light">
          {contact.firstName[0]}
          {contact.lastName[0]}
        </Avatar>
        <div style={{ textAlign: "center" }}>
          <Text size="xl" fw={700}>
            {contact.firstName} {contact.lastName}
          </Text>
          <Badge
            size="lg"
            variant="light"
            color={getPartyColor(contact.party)}
            mt="xs"
          >
            {contact.party}
          </Badge>
        </div>
      </Stack>

      <Divider my="lg" label="Contact Information" labelPosition="center" />

      <Stack gap="lg">
        <Group>
          <ThemeIcon color="blue" variant="light" size="lg">
            <IconPhone size={20} />
          </ThemeIcon>
          <div>
            <Text size="xs" c="dimmed">
              Phone Number
            </Text>
            <Text size="sm" fw={500}>
              {contact.phoneNumber}
            </Text>
          </div>
        </Group>

        <Group>
          <ThemeIcon color="grape" variant="light" size="lg">
            <IconMail size={20} />
          </ThemeIcon>
          <div>
            <Text size="xs" c="dimmed">
              Email Address
            </Text>
            <Text size="sm" fw={500}>
              {contact.email}
            </Text>
          </div>
        </Group>

        <Group>
          <ThemeIcon color="orange" variant="light" size="lg">
            <IconMapPin size={20} />
          </ThemeIcon>
          <div>
            <Text size="xs" c="dimmed">
              Physical Address
            </Text>
            <Text size="sm" fw={500}>
              {contact.address}
            </Text>
            <Text size="sm" fw={500}>
              {contact.city}, {contact.state}
            </Text>
          </div>
        </Group>
      </Stack>

      <Divider my="lg" label="Demographics" labelPosition="center" />

      <Grid>
        <Grid.Col span={6}>
          <Group>
            <ThemeIcon color="teal" variant="light">
              <IconCake size={18} />
            </ThemeIcon>
            <div>
              <Text size="xs" c="dimmed">
                Age
              </Text>
              <Text size="sm" fw={500}>
                {contact.age} years old
              </Text>
            </div>
          </Group>
        </Grid.Col>
        <Grid.Col span={6}>
          <Group>
            <ThemeIcon color="indigo" variant="light">
              <IconBuilding size={18} />
            </ThemeIcon>
            <div>
              <Text size="xs" c="dimmed">
                Region
              </Text>
              <Text size="sm" fw={500}>
                {contact.state}
              </Text>
            </div>
          </Group>
        </Grid.Col>
      </Grid>
    </Drawer>
  );
}

function getPartyColor(party: string) {
  switch (party) {
    case "Democrat":
      return "blue";
    case "Republican":
      return "red";
    case "Green":
      return "green";
    case "Independent":
      return "gray";
    default:
      return "gray";
  }
}
