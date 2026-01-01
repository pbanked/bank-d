'use client';
import React from 'react';
import { Modal, Text, Group, Paper, Avatar, Badge, ScrollArea, Timeline, Button } from '@mantine/core';
import { IconCheck, IconPhone, IconPhoneOff } from '@tabler/icons-react';
import { CallHistoryModalProps, CallHistoryItem } from '../types';

const MOCK_HISTORY: Record<string, CallHistoryItem[]> = {
  'uuid-1': [
    { id: '101', date: '2025-10-12T14:30:00', duration: 120, completed: true, note: 'Pleasant conversation', transcript: 'Voter indicated strong support for Prop 4...', author: 'Sarah (Volunteer)' },
    { id: '102', date: '2025-09-01T09:15:00', duration: 45, completed: false, note: 'Left Voicemail', transcript: undefined, author: 'Auto-Dialer' },
  ],
  'uuid-2': [
    { id: '201', date: '2025-11-05T18:00:00', duration: 300, completed: true, note: 'Refused / Angry', transcript: 'Requested removal from list.', author: 'Mike (Volunteer)' },
  ],
};

export default function CallHistoryModal({ opened, onClose, contact }: CallHistoryModalProps) {
  const history = contact ? (MOCK_HISTORY[contact.id] || []) : [];

  return (
    <Modal 
      opened={opened} 
      onClose={onClose} 
      title={<Text fw={700} size="lg">Contact History</Text>}
      size="lg"
      centered
    >
      {contact && (
        <>
          <Paper withBorder p="md" mb="md" radius="md" bg="var(--mantine-color-gray-0)">
            <Group justify="space-between" mb="xs">
              <Group gap="sm">
                <Avatar color="blue" radius="xl">{contact.firstName[0]}{contact.lastName[0]}</Avatar>
                <div>
                  <Text fw={600}>{contact.firstName} {contact.lastName}</Text>
                  <Text size="sm" c="dimmed">{contact.phoneNumber}</Text>
                </div>
              </Group>
              <Badge 
                color={contact.party === 'Democrat' ? 'blue' : contact.party === 'Republican' ? 'red' : 'gray'}
                variant="light"
                size="lg"
              >
                {contact.party}
              </Badge>
            </Group>
          </Paper>

          <ScrollArea h={350} type="auto" offsetScrollbars>
            {history.length > 0 ? (
              <Timeline active={history.length} bulletSize={24} lineWidth={2}>
                {history.map((item) => (
                  <Timeline.Item
                    key={item.id}
                    bullet={item.completed ? <IconCheck size={12} /> : <IconPhoneOff size={12} />}
                    color={item.completed ? 'teal' : 'yellow'}
                    title={
                      <Group justify="space-between">
                         <Text size="sm" fw={500}>{item.note}</Text>
                         <Text size="xs" c="dimmed">{new Date(item.date).toLocaleDateString()}</Text>
                      </Group>
                    }
                  >
                    <Text c="dimmed" size="xs">By {item.author} • {item.duration}s</Text>
                    {item.transcript && (
                      <Text size="sm" mt={4} style={{ fontStyle: 'italic' }}>&quot;{item.transcript}&quot;</Text>
                    )}
                  </Timeline.Item>
                ))}
              </Timeline>
            ) : (
              <Text c="dimmed" ta="center" py="xl">No call history found.</Text>
            )}
          </ScrollArea>

          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={onClose}>Close</Button>
            <Button leftSection={<IconPhone size={16} />}>Start Call</Button>
          </Group>
        </>
      )}
    </Modal>
  );
}