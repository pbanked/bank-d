"use client";
import React from "react";
import {
  Table,
  Group,
  Text,
  ActionIcon,
  Badge,
  Avatar,
  Tooltip,
} from "@mantine/core";
import { IconId, IconHistory } from "@tabler/icons-react";
import { Contact } from "../types";

interface ContactsTableProps {
  contacts: Contact[];
  onViewDetails: (contact: Contact) => void;
  onViewHistory: (contact: Contact) => void;
}

export default function ContactsTable({
  contacts,
  onViewDetails,
  onViewHistory,
}: ContactsTableProps) {
  const rows = contacts.map((contact) => (
    <Table.Tr key={contact.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={30} radius="xl" color="blue">
            {contact.firstName[0]}
          </Avatar>
          <Text size="sm" fw={500}>
            {contact.firstName} {contact.lastName}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td>
        <Text size="sm">{contact.phoneNumber}</Text>
      </Table.Td>

      <Table.Td>
        <Text size="sm">{contact.age}</Text>
      </Table.Td>

      <Table.Td>
        <Text size="sm">
          {contact.city}, {contact.state}
        </Text>
      </Table.Td>

      <Table.Td>
        <Badge
          color={
            contact.party === "Democrat"
              ? "blue"
              : contact.party === "Republican"
              ? "red"
              : "gray"
          }
          variant="light"
        >
          {contact.party}
        </Badge>
      </Table.Td>

      <Table.Td>
        <Group gap="xs" justify="flex-end">
          {/* 1. View Profile Button */}
          <Tooltip label="View Profile Details" withArrow>
            <ActionIcon
              variant="subtle"
              color="blue"
              onClick={() => onViewDetails(contact)}
            >
              <IconId size={18} stroke={1.5} />
            </ActionIcon>
          </Tooltip>

          {/* 2. View History Button */}
          <Tooltip label="View Call History" withArrow>
            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={() => onViewHistory(contact)}
            >
              <IconHistory size={18} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="sm" highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Phone</Table.Th>
            <Table.Th>Age</Table.Th>
            <Table.Th>Location</Table.Th>
            <Table.Th>Party</Table.Th>
            <Table.Th style={{ textAlign: "right" }}>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
