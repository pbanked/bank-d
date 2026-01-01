// app/[user]/organization/components/create-event-modal.tsx
'use client';
import React, { useState } from 'react';
import { Modal, TextInput, Select, Button, Switch, MultiSelect, Group, Text, Collapse, Chip, Stack } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { OrganizationEvent } from './event-card'; 
import '@mantine/dates/styles.css';

interface CreateEventModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (event: Omit<OrganizationEvent, 'id' | 'attendees'>) => void;
}

// Mock Contact Data for the MultiSelect
const MOCK_CONTACTS = [
  { value: 'uuid-1', label: 'Alice Johnson' },
  { value: 'uuid-2', label: 'Bob Smith' },
  { value: 'uuid-3', label: 'Charlie Davis' },
  { value: 'uuid-4', label: 'Diana Prince' },
];

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CreateEventModal({ opened, onClose, onSubmit }: CreateEventModalProps) {
  // Form State
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState<string | null>('Draft');
  
  // Date State
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date(new Date().setHours(new Date().getHours() + 1))); // Default 1 hour later
  
  // Contacts State
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  
  // Repeating State
  const [isRepeating, setIsRepeating] = useState(false);
  const [repeatingDays, setRepeatingDays] = useState<string[]>([]);

  const handleSubmit = () => {
    if (!title || !startDate || !endDate) return;
    
    onSubmit({
      title,
      location: location || 'TBD',
      startDate,
      endDate,
      status: (status as 'Published' | 'Draft') || 'Draft',
      contacts: selectedContacts,
      isRepeating,
      repeatingDays: isRepeating ? repeatingDays : []
    });

    // Reset Form
    setTitle('');
    setLocation('');
    setStartDate(new Date());
    setEndDate(new Date());
    setSelectedContacts([]);
    setIsRepeating(false);
    setRepeatingDays([]);
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Create New Event" size="lg" centered>
      <Stack gap="md">
        
        {/* Title & Status Row */}
        <Group grow align="flex-start">
            <TextInput 
              label="Event Title" 
              placeholder="e.g. Town Hall Meeting" 
              required 
              data-autofocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Select
              label="Status"
              data={['Draft', 'Published']}
              value={status}
              onChange={setStatus}
              allowDeselect={false}
              w={150} // Fixed width for status
              style={{ flexGrow: 0 }}
            />
        </Group>

        {/* Date Range Row */}
        <Group grow>
            <DateTimePicker
                label="Start Date & Time"
                placeholder="Pick date and time"
                value={startDate}
                onChange={setStartDate}
                required
            />
            <DateTimePicker
                label="End Date & Time"
                placeholder="Pick date and time"
                value={endDate}
                onChange={setEndDate}
                required
                minDate={startDate || undefined}
            />
        </Group>

        {/* Location & Contacts */}
        <TextInput 
          label="Location" 
          placeholder="Address or Online Link" 
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <MultiSelect 
            label="Assign Contacts"
            placeholder="Search contacts..."
            data={MOCK_CONTACTS}
            value={selectedContacts}
            onChange={setSelectedContacts}
            searchable
            clearable
            hidePickedOptions
        />

        {/* Repeating Logic */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-2">
            <Group justify="space-between">
                <div>
                    <Text size="sm" fw={500}>Repeat Event</Text>
                    <Text size="xs" c="dimmed">Set this event to recur weekly</Text>
                </div>
                <Switch 
                    checked={isRepeating} 
                    onChange={(event) => setIsRepeating(event.currentTarget.checked)} 
                    size="md"
                />
            </Group>

            <Collapse in={isRepeating}>
                <div className="pt-4">
                    <Text size="xs" fw={500} mb="xs">Repeat On:</Text>
                    <Chip.Group multiple value={repeatingDays} onChange={setRepeatingDays}>
                        <Group justify="center" gap="xs">
                            {DAYS_OF_WEEK.map((day) => (
                                <Chip key={day} value={day} size="xs" variant="outline">{day}</Chip>
                            ))}
                        </Group>
                    </Chip.Group>
                </div>
            </Collapse>
        </div>

        <Button fullWidth mt="md" size="md" onClick={handleSubmit}>
          Create Event
        </Button>
      </Stack>
    </Modal>
  );
}