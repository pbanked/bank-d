"use client";
import React, { useState } from "react";
import {
  Container,
  Title,
  Text,
  Button,
  Group,
  TextInput,
  Pagination,
  Select,
  Box,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconSearch,
  IconUserPlus,
  IconX,
  IconFilter,
} from "@tabler/icons-react";
import { Contact, CallHistoryItem } from "./types";
import AddContactForm from "./components/add-contact-form";
import ContactsTable from "./components/contacts-table";
import ContactDetailsDrawer from "./components/contact-details-drawer";
import CallHistoryModal from "./components/call-history-modal";
import Header from "@/components/header/header";
import { Navbar } from "@/components/navbar/navbar";

const initialContacts: Contact[] = [
  {
    id: "1",
    firstName: "Alice",
    lastName: "Johnson",
    age: 34,
    party: "Democrat",
    phoneNumber: "555-0101",
    email: "alice.j@example.com",
    address: "123 Maple Ave",
    city: "Springfield",
    state: "IL",
  },
  {
    id: "2",
    firstName: "Bob",
    lastName: "Smith",
    age: 52,
    party: "Republican",
    phoneNumber: "555-0102",
    email: "bob.smith@work.net",
    address: "456 Oak Rd",
    city: "Austin",
    state: "TX",
  },
  {
    id: "3",
    firstName: "Charlie",
    lastName: "Davis",
    age: 22,
    party: "Independent",
    phoneNumber: "555-0103",
    email: "charlie.d@uni.edu",
    address: "789 Pine Ln",
    city: "Seattle",
    state: "WA",
  },
  {
    id: "6",
    firstName: "Fiona",
    lastName: "Gallagher",
    age: 25,
    party: "Democrat",
    phoneNumber: "555-0106",
    email: "fiona.g@southside.com",
    address: "303 Wallace St",
    city: "Chicago",
    state: "IL",
  },
];

const MOCK_HISTORY: CallHistoryItem[] = [
  {
    id: "h1",
    contactId: "1",
    date: "2025-12-28T14:30:00",
    type: "Outbound",
    outcome: "Reached",
    duration: "5m 20s",
    note: "Discussed upcoming fundraiser. She is interested in hosting.",
  },
  {
    id: "h2",
    contactId: "1",
    date: "2025-11-15T10:00:00",
    type: "Inbound",
    outcome: "Reached",
    duration: "2m 10s",
    note: "Called to update email address.",
  },
  {
    id: "h3",
    contactId: "2",
    date: "2025-12-20T16:45:00",
    type: "Outbound",
    outcome: "No Answer",
    duration: "0s",
    note: "Left voicemail regarding town hall.",
  },
  {
    id: "h4",
    contactId: "4",
    date: "2025-12-29T09:15:00",
    type: "Outbound",
    outcome: "Callback Scheduled",
    duration: "1m 00s",
    note: "Busy, asked to call back next Tuesday.",
  },
  {
    id: "h5",
    contactId: "6",
    date: "2025-12-25T11:00:00",
    type: "Outbound",
    outcome: "Voicemail",
    duration: "0s",
    note: "Holiday greeting voicemail.",
  },
  {
    id: "h6",
    contactId: "7",
    date: "2025-10-01T13:20:00",
    type: "Outbound",
    outcome: "Wrong Number",
    duration: "0s",
    note: "Number disconnected.",
  },
  {
    id: "h7",
    contactId: "1",
    date: "2025-10-05T09:00:00",
    type: "Outbound",
    outcome: "Reached",
    duration: "15m 00s",
    note: "Initial onboarding call.",
  },
];

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);

  const [callHistory] = useState<CallHistoryItem[]>(MOCK_HISTORY);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterParty, setFilterParty] = useState<string | null>("All");
  const [activePage, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState<string | null>("5");

  const [isAddFormOpen, { toggle: toggleAddForm, close: closeAddForm }] =
    useDisclosure(false);
  const [detailsOpen, { open: openDetails, close: closeDetails }] =
    useDisclosure(false);
  const [historyOpen, { open: openHistory, close: closeHistory }] =
    useDisclosure(false);

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleViewDetails = (contact: Contact) => {
    setSelectedContact(contact);
    openDetails();
  };

  const handleViewHistory = (contact: Contact) => {
    setSelectedContact(contact);
    openHistory();
  };

  const handleAddContact = (newContactData: Omit<Contact, "id">) => {
    const contactToAdd = {
      ...newContactData,
      id: crypto.randomUUID(),
      email: newContactData.email || "pending@email.com",
      address: newContactData.address || "Unknown",
      city: newContactData.city || "Unknown",
      state: newContactData.state || "Unknown",
    };
    setContacts([...contacts, contactToAdd]);
    closeAddForm();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value);
    setPage(1);
  };

  const filteredContacts = contacts.filter((contact) => {
    const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      contact.phoneNumber.includes(searchTerm) ||
      contact.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesParty =
      filterParty === "All" || !filterParty
        ? true
        : contact.party === filterParty;

    return matchesSearch && matchesParty;
  });

  const itemsLimit = parseInt(rowsPerPage || "5", 10);
  const totalPages = Math.ceil(filteredContacts.length / itemsLimit);
  const paginatedContacts = filteredContacts.slice(
    (activePage - 1) * itemsLimit,
    activePage * itemsLimit
  );

  const selectedHistory = selectedContact
    ? callHistory.filter((log) => log.contactId === selectedContact.id)
    : [];

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#f5f7fb",
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
                  Contacts
                </Title>
                <Text c="dimmed">Manage organization directory</Text>
              </div>
              <Button
                leftSection={
                  isAddFormOpen ? (
                    <IconX size={16} />
                  ) : (
                    <IconUserPlus size={16} />
                  )
                }
                onClick={toggleAddForm}
                color={isAddFormOpen ? "gray" : "blue"}
                size="md"
              >
                {isAddFormOpen ? "Cancel" : "Add Contact"}
              </Button>
            </Group>

            <AddContactForm
              isOpen={isAddFormOpen}
              onCancel={closeAddForm}
              onSubmit={handleAddContact}
            />

            <Group mb="lg">
              <TextInput
                placeholder="Search by name, phone, or city..."
                leftSection={<IconSearch size={16} stroke={1.5} />}
                size="md"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ flex: 1 }}
              />
              <Select
                placeholder="Filter by Party"
                leftSection={<IconFilter size={16} stroke={1.5} />}
                size="md"
                data={[
                  "All",
                  "Democrat",
                  "Republican",
                  "Independent",
                  "Green",
                  "Libertarian",
                ]}
                value={filterParty}
                onChange={(val) => {
                  setFilterParty(val);
                  setPage(1);
                }}
                allowDeselect={false}
                w={200}
              />
            </Group>

            <ContactsTable
              contacts={paginatedContacts}
              onViewDetails={handleViewDetails}
              onViewHistory={handleViewHistory}
            />

            <Group justify="space-between" mt="md" align="center">
              <Group gap="xs">
                <Text size="sm" c="dimmed">
                  Rows per page:
                </Text>
                <Select
                  value={rowsPerPage}
                  onChange={(value) => {
                    setRowsPerPage(value);
                    setPage(1);
                  }}
                  data={["5", "10", "20", "50"]}
                  allowDeselect={false}
                  w={70}
                  size="xs"
                />
                <Text size="sm" c="dimmed">
                  Showing {(activePage - 1) * itemsLimit + 1} -{" "}
                  {Math.min(activePage * itemsLimit, filteredContacts.length)}{" "}
                  of {filteredContacts.length}
                </Text>
              </Group>

              <Pagination
                total={totalPages}
                value={activePage}
                onChange={setPage}
                color="blue"
              />
            </Group>
          </Container>
        </Box>
      </div>

      <ContactDetailsDrawer
        opened={detailsOpen}
        onClose={closeDetails}
        contact={selectedContact}
      />

      <CallHistoryModal
        opened={historyOpen}
        onClose={closeHistory}
        contact={selectedContact}
        history={selectedHistory}
      />
    </div>
  );
}
