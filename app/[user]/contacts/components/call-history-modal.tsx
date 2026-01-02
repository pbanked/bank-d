'use client';
import React from 'react';
import { Modal, Timeline, Text, Badge, Group, ScrollArea, Paper } from '@mantine/core';
import { 
  IconPhoneOutgoing, 
  IconPhoneIncoming, 
  IconMessageDots, 
  IconCheck, 
  IconX, 
  IconClock, 
  IconNote,
  IconCalendarTime,
  IconBan,
  IconPhoneCheck,
  IconPhoneOff
} from '@tabler/icons-react';
import { Contact, CallHistoryItem } from '../types';

interface CallHistoryModalProps {
  opened: boolean;
  onClose: () => void;
  contact: Contact | null;
  history: CallHistoryItem[];
}

export default function CallHistoryModal({ opened, onClose, contact, history }: CallHistoryModalProps) {
  if (!contact) return null;

  const sortedHistory = [...history].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Modal 
      opened={opened} 
      onClose={onClose} 
      title={<Text fw={700} size="lg">Call History: {contact.firstName} {contact.lastName}</Text>}
      size="lg"
      centered
    >
      <ScrollArea h={500} type="auto" offsetScrollbars>
        {sortedHistory.length > 0 ? (
          <Timeline bulletSize={32} lineWidth={2} p="md">
            
            {sortedHistory.map((log) => (
              <Timeline.Item 
                key={log.id} 
                bullet={getIconForOutcome(log.outcome)}
                color={getStatusColor(log.outcome)}
                title={
                  <Group justify="space-between" mb={4}>
                    <Text size="sm" fw={600} c={getStatusColor(log.outcome)}>
                      {log.outcome}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {new Date(log.date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                    </Text>
                  </Group>
                }
              >
                <Group gap="xs" mb="sm">
                   <Badge 
                     color={log.type === 'Outbound' ? 'blue' : 'orange'} 
                     size="xs" 
                     variant="light"
                     leftSection={log.type === 'Outbound' ? <IconPhoneOutgoing size={12}/> : <IconPhoneIncoming size={12}/>}
                   >
                     {log.type}
                   </Badge>
                   <Badge color="gray" size="xs" variant="outline" leftSection={<IconClock size={10}/>}>
                     {log.duration}
                   </Badge>
                </Group>
                
                {/* Ensure we access 'note' (singular) to match types.ts */}
                {log.note && (
                  <Paper withBorder p="xs" radius="md" bg="gray.0">
                    <Group gap="xs" align="center" mb={4}>
                        <IconNote size={12} className="text-gray-500" />
                        <Text size="xs" fw={600} c="dimmed">Work Notes</Text>
                    </Group>
                    <Text size="sm" c="dark.7" style={{ lineHeight: 1.4 }}>
                      {log.note}
                    </Text>
                  </Paper>
                )}
              </Timeline.Item>
            ))}

          </Timeline>
        ) : (
          <Text c="dimmed" ta="center" py="xl">No call history found for this contact.</Text>
        )}
      </ScrollArea>
    </Modal>
  );
}

function getIconForOutcome(outcome: string) {
  switch (outcome) {
    case 'Reached': return <IconPhoneCheck size={18} />;
    case 'No Answer': return <IconPhoneOff size={18} />;
    case 'Voicemail': return <IconMessageDots size={18} />;
    case 'Callback Scheduled': return <IconCalendarTime size={18} />;
    case 'Wrong Number': return <IconBan size={18} />;
    default: return <IconPhoneOutgoing size={18} />;
  }
}

function getStatusColor(outcome: string) {
  switch (outcome) {
    case 'Reached': return 'teal';
    case 'No Answer': return 'red';
    case 'Voicemail': return 'indigo';
    case 'Callback Scheduled': return 'orange';
    case 'Wrong Number': return 'gray';
    default: return 'blue';
  }
}