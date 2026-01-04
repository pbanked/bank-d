/**
 * Represents a single entry in the PhoneBook (Voter List).
 */
export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  state: string;
  age: number;
  party: string;
}

/**
 * Represents a record of a call or interaction.
 */
export interface CallHistoryItem {
  id: string;
  contactId: string;   // Link to the contact
  date: string;        // ISO Timestamp
  duration: string;    // Formatted string "5m 30s" or number
  outcome: 'Reached' | 'No Answer' | 'Voicemail' | 'Callback Scheduled' | 'Wrong Number';
  type: 'Outbound' | 'Inbound';
  note: string;        // The "Work Note" content
  author?: string;     // Optional: who made the call
}

/**
 * Props for the AddContactForm component
 */
export interface AddContactFormProps {
  isOpen: boolean;
  onCancel: () => void;
  onSubmit: (contact: Omit<Contact, "id">) => void;
}

/**
 * Props for the ContactsTable component
 */
export interface ContactsTableProps {
  contacts: Contact[];
  onViewDetails: (contact: Contact) => void;
  onViewHistory: (contact: Contact) => void;
}

/**
 * Props for the CallHistoryModal component
 * UPDATED: Added 'history' prop
 */
export interface CallHistoryModalProps {
  opened: boolean;
  onClose: () => void;
  contact: Contact | null;
  history: CallHistoryItem[]; 
}