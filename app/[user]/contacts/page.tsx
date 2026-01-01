'use client';
import React, { useState } from 'react';
import { Container, Title, Text, Button, Group, TextInput, Pagination, Select } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch, IconUserPlus, IconX } from '@tabler/icons-react';
import { Contact } from './types';
import AddContactForm from './components/add-contact-form';
import CallHistoryModal from './components/call-history-modal';
import ContactsTable from './components/contacts-table';
import Header from '@/components/header/header';

const initialContacts: Contact[] = [
  { id: 'uuid-1', firstName: 'Alice', lastName: 'Johnson', phoneNumber: '555-0123', age: 34, party: 'Democrat' },
  { id: 'uuid-2', firstName: 'Bob', lastName: 'Smith', phoneNumber: '555-0198', age: 52, party: 'Republican' },
  { id: 'uuid-3', firstName: 'Charlie', lastName: 'Davis', phoneNumber: '555-0256', age: 22, party: 'Independent' },
  { id: 'uuid-4', firstName: 'Diana', lastName: 'Prince', phoneNumber: '555-0999', age: 40, party: 'Democrat' },
  { id: 'uuid-5', firstName: 'Evan', lastName: 'Wright', phoneNumber: '555-0111', age: 29, party: 'Green' },
  { id: 'uuid-6', firstName: 'Fiona', lastName: 'Gallagher', phoneNumber: '555-0222', age: 25, party: 'Democrat' },
  { id: 'uuid-7', firstName: 'George', lastName: 'Costanza', phoneNumber: '555-0333', age: 45, party: 'Republican' },
  { id: 'uuid-8', firstName: 'Hannah', lastName: 'Montana', phoneNumber: '555-0444', age: 19, party: 'Independent' },
  { id: 'uuid-9', firstName: 'Ian', lastName: 'McKellen', phoneNumber: '555-0555', age: 80, party: 'Democrat' },
  { id: 'uuid-10', firstName: 'Jack', lastName: 'Sparrow', phoneNumber: '555-0666', age: 38, party: 'Pirate' },
  { id: 'uuid-11', firstName: 'Katherine', lastName: 'Janeway', phoneNumber: '555-0777', age: 50, party: 'Federation' },
  { id: 'uuid-12', firstName: 'Luke', lastName: 'Skywalker', phoneNumber: '555-0888', age: 25, party: 'Jedi' },
];

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [activePage, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState<string | null>('5');

  const [isAddFormOpen, { toggle: toggleAddForm, close: closeAddForm }] = useDisclosure(false);
  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleOpenHistory = (contact: Contact) => {
    setSelectedContact(contact);
    openModal();
  };

  const handleAddContact = (newContactData: Omit<Contact, 'id'>) => {
    const contactToAdd = {
      ...newContactData,
      id: crypto.randomUUID(),
    };
    setContacts([...contacts, contactToAdd]);
    closeAddForm();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearchTerm(value);
    setPage(1); 
  };

  const filteredContacts = contacts.filter((contact) => {
    const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase()) || 
           contact.phoneNumber.includes(searchTerm);
  });

  const itemsLimit = parseInt(rowsPerPage || '5', 10);
  const totalPages = Math.ceil(filteredContacts.length / itemsLimit);
  
  const paginatedContacts = filteredContacts.slice(
    (activePage - 1) * itemsLimit,
    activePage * itemsLimit
  );

  return (
    // UPDATED: Added `pl={100}` to offset the sidebar width. 
    // Adjust '100' to match the actual width of your blue sidebar.
    <Container fluid py="xl" pr="lg" pl={100}>
      <Header headerTitle="Contact" />
      
      <Group justify="flex-end" mb="lg">
        <Button 
          leftSection={isAddFormOpen ? <IconX size={16}/> : <IconUserPlus size={16}/>}
          onClick={toggleAddForm}
          color={isAddFormOpen ? 'gray' : 'blue'}
        >
          {isAddFormOpen ? 'Cancel' : 'Add Contact'}
        </Button>
      </Group>

      <AddContactForm 
        isOpen={isAddFormOpen} 
        onCancel={closeAddForm} 
        onSubmit={handleAddContact} 
      />

      <TextInput
        placeholder="Search by name or phone..."
        leftSection={<IconSearch size={16} stroke={1.5} />}
        size="md"
        mb="lg"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <ContactsTable 
        contacts={paginatedContacts} 
        onViewHistory={handleOpenHistory}
      />
      
      <Group justify="space-between" mt="md" align="center">
        
        <Group gap="xs">
          <Text size="sm" c="dimmed">Rows per page:</Text>
          <Select 
            value={rowsPerPage}
            onChange={(value) => {
              setRowsPerPage(value);
              setPage(1); 
            }}
            data={['5', '10', '20', '50']}
            allowDeselect={false}
            w={70}
            size="xs"
          />
          <Text size="sm" c="dimmed">
            Showing {(activePage - 1) * itemsLimit + 1} - {Math.min(activePage * itemsLimit, filteredContacts.length)} of {filteredContacts.length}
          </Text>
        </Group>

        <Pagination 
          total={totalPages} 
          value={activePage} 
          onChange={setPage} 
          color="blue"
        />
      </Group>

      <CallHistoryModal 
        opened={modalOpened} 
        onClose={closeModal} 
        contact={selectedContact} 
      />
    </Container>
  );
}