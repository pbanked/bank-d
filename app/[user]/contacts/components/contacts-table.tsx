'use client';
import React from 'react';
import { Table, Text, Badge, Button, Paper } from '@mantine/core';
import { IconHistory } from '@tabler/icons-react';
import { ContactsTableProps } from '../types';

export default function ContactsTable({ contacts, onViewHistory }: ContactsTableProps) {
  const rows = contacts.map((contact) => (
    <Table.Tr key={contact.id}>
      <Table.Td>
        <Text fw={500}>{contact.lastName}</Text>
      </Table.Td>
      <Table.Td>{contact.firstName}</Table.Td>
      <Table.Td style={{ fontFamily: 'monospace' }}>{contact.phoneNumber}</Table.Td>
      <Table.Td>{contact.age}</Table.Td>
      <Table.Td>
        <Badge 
          color={contact.party === 'Democrat' ? 'blue' : contact.party === 'Republican' ? 'red' : 'gray'}
          variant="light"
        >
          {contact.party}
        </Badge>
      </Table.Td>
      <Table.Td style={{ textAlign: 'right' }}>
        <Button 
          variant="subtle" 
          size="xs" 
          leftSection={<IconHistory size={14} />}
          onClick={() => onViewHistory(contact)}
        >
          History
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Paper withBorder radius="md" shadow="sm" overflow="hidden">
      <Table verticalSpacing="sm" striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Last Name</Table.Th>
            <Table.Th>First Name</Table.Th>
            <Table.Th>Phone</Table.Th>
            <Table.Th>Age</Table.Th>
            <Table.Th>Party</Table.Th>
            <Table.Th style={{ textAlign: 'right' }}>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rows.length > 0 ? rows : (
            <Table.Tr>
              <Table.Td colSpan={6}>
                <Text ta="center" c="dimmed" py="md">No contacts found</Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </Paper>
  );
}