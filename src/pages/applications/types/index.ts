export enum ApplicationTab {
  Overview = 'overview',
  Documents = 'documents',
  Appointment = 'appointment',
  Notes = 'notes',
  History = 'history'
}

export interface TabItem {
  id: ApplicationTab;
  label: string;
  icon: React.ReactNode;
}

export interface ApplicationData {
  id: string;
  status: string;
  customer: {
    id: string;
    name: string;
  };
  country: string;
  purpose: string;
  createdAt: string;
  visaType: string;
  entryType: string;
  travelDates: string;
  participants: Array<{
    id: string;
    firstName: string;
    lastName: string;
    relationship: string;
    passportNumber: string;
  }>;
  consultant: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  documents: Array<{
    id: string;
    name: string;
    type: string;
    required: boolean;
    participant: string;
    status: string;
    uploadedBy: string | null;
    uploadedAt: string | null;
    dueDate: string;
    version: number;
    notes: string;
    history: Array<{
      action: string;
      user: string;
      date: string;
      reason?: string;
    }>;
  }>;
  appointment: {
    date: string;
    time: string;
    location: string;
    status: string;
  } | null;
  notes: Array<{
    id: string;
    text: string;
    user: string;
    date: string;
  }>;
  history: Array<{
    id: string;
    action: string;
    user: string;
    date: string;
    application?: string;
  }>;
}
