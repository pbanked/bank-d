// app/[user]/organization/components/event-card.tsx
'use client';
import React from 'react';
import { Paper, Group, Badge, ActionIcon, Text, Button, Tooltip } from '@mantine/core';
import { IconDotsVertical, IconCalendarEvent, IconMapPin, IconRepeat } from '@tabler/icons-react';

export interface OrganizationEvent {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  location: string;
  status: 'Published' | 'Draft';
  attendees: number;
  contacts: string[]; // List of Contact IDs or Names
  isRepeating: boolean;
  repeatingDays: string[]; // e.g. ['Mon', 'Wed']
}

export default function EventCard({ event }: { event: OrganizationEvent }) {
  const isPast = event.endDate < new Date();

  // Format date range: "Feb 10 • 2:00 PM - 4:00 PM"
  const dateStr = event.startDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  const timeStart = event.startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const timeEnd = event.endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <Paper 
      shadow="sm" 
      p="lg" 
      radius="md" 
      withBorder 
      className="hover:shadow-md transition-shadow h-full flex flex-col"
    >
      <Group justify="space-between" mb="xs">
        <Group gap="xs">
          <Badge color={isPast ? "gray" : "blue"} variant="light">
            {event.status}
          </Badge>
          {event.isRepeating && (
            <Tooltip label={`Repeats on ${event.repeatingDays.join(', ')}`}>
              <Badge variant="outline" color="gray" leftSection={<IconRepeat size={10}/>}>
                Repeating
              </Badge>
            </Tooltip>
          )}
        </Group>
        <ActionIcon variant="subtle" color="gray">
          <IconDotsVertical size={16} />
        </ActionIcon>
      </Group>

      <Text fw={700} size="lg" lineClamp={2} title={event.title} mt="sm">
        {event.title}
      </Text>

      <div className="flex-grow">
        <Group gap="xs" mt="md" align="flex-start">
          <IconCalendarEvent size={18} className="text-gray-500 mt-1" />
          <div>
             <Text size="sm" c="dimmed" fw={500}>{dateStr}</Text>
             <Text size="xs" c="dimmed">{timeStart} - {timeEnd}</Text>
          </div>
        </Group>

        <Group gap="xs" mt="xs">
          <IconMapPin size={18} className="text-gray-500" />
          <Text size="sm" c="dimmed" lineClamp={1}>
            {event.location}
          </Text>
        </Group>
      </div>

      <Group justify="space-between" mt="xl" pt="md" style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}>
        <Text size="xs" fw={500} c="dimmed">
            {event.contacts.length > 0 ? `${event.contacts.length} Contacts Assigned` : 'No Contacts'}
        </Text>
        <Button variant="light" size="xs">Manage</Button>
      </Group>
    </Paper>
  );
}