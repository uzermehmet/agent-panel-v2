import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft,
  Edit,
  Trash,
  Plus,
  Check,
  X,
  Clock
} from 'lucide-react';

// Import types
import { ApplicationTab, ApplicationData } from './types';

// Import components
import ApplicationTabs from './components/ApplicationTabs';
import OverviewTab from './components/tabs/OverviewTab';
import DocumentsTab from './components/tabs/DocumentsTab';
import AppointmentTab from './components/tabs/AppointmentTab';
import NotesTab from './components/tabs/NotesTab';
import HistoryTab from './components/tabs/HistoryTab';

// Mock application data
const applicationData: ApplicationData = {
  id: 'APP-12345',
  status: 'processing',
  country: 'İtalya',
  purpose: 'Turizm',
  visaType: 'short_term',
  entryType: 'single',
  travelDates: '15.05.2025 - 30.05.2025',
  createdAt: '2025-04-10',
  customer: {
    id: '1001',
    name: 'Mehmet Yılmaz'
  },
  participants: [
    {
      id: 'P1001',
      firstName: 'Mehmet',
      lastName: 'Yılmaz',
      relationship: 'Kendisi',
      passportNumber: 'U12345678'
    },
    {
      id: 'P1002',
      firstName: 'Zeynep',
      lastName: 'Yılmaz',
      relationship: 'Eşi',
      passportNumber: 'U87654321'
    }
  ],
  documents: [
    {
      id: 'DOC-001',
      name: 'Pasaport',
      type: 'identity',
      required: true,
      participant: 'Mehmet Yılmaz',
      status: 'approved',
      uploadedBy: 'Müşteri',
      uploadedAt: '2025-04-11',
      dueDate: '2025-04-25',
      version: 1,
      notes: 'Fotoğraf arka fonu beyaz olmalı',
      history: [
        { action: 'upload', user: 'Müşteri', date: '2025-04-11 10:30' },
        { action: 'review', user: 'Ali Veli', date: '2025-04-11 11:30' },
        { action: 'approve', user: 'Ali Veli', date: '2025-04-11 11:35' }
      ]
    },
    {
      id: 'DOC-002',
      name: 'Banka Hesap Özeti',
      type: 'financial',
      required: true,
      participant: 'Mehmet Yılmaz',
      status: 'pending',
      uploadedBy: 'Müşteri',
      uploadedAt: '2025-04-12',
      dueDate: '2025-04-26',
      version: 2,
      notes: 'Son 3 aylık hesap hareketlerini içermeli',
      history: [
        { action: 'upload', user: 'Müşteri', date: '2025-04-12 09:30' },
        { action: 'reject', user: 'Zeynep Kaya', date: '2025-04-12 10:30', reason: 'Eksik dönem' },
        { action: 'upload', user: 'Müşteri', date: '2025-04-12 11:30' }
      ]
    }
  ],
  appointment: {
    date: '2025-04-25',
    time: '10:30',
    location: 'İtalya Başkonsolosluğu, İstanbul',
    status: 'confirmed'
  },
  notes: [
    {
      id: 'NOTE-001',
      text: 'Müşteri vize başvurusu için tüm evrakları hızlıca tamamladı.',
      user: 'Ali Veli',
      date: '2025-04-12 14:30'
    },
    {
      id: 'NOTE-002',
      text: 'Randevu konsolosluktan onaylandı, müşteriye bilgi verildi.',
      user: 'Ali Veli',
      date: '2025-04-15 09:45'
    }
  ],
  history: [
    {
      id: 'HIST-001',
      action: 'Başvuru oluşturuldu',
      user: 'Ali Veli',
      date: '2025-04-10 10:15'
    },
    {
      id: 'HIST-002',
      action: 'Evrak yüklendi: Pasaport - Mehmet Yılmaz',
      user: 'Sistem',
      date: '2025-04-11 11:20'
    }
  ],
  consultant: {
    id: '101',
    name: 'Ali Veli',
    email: 'ali.veli@acenta.com',
    phone: '+90 533 123 4567'
  }
};

const ApplicationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ApplicationTab>(ApplicationTab.Overview);
  const [showAddNoteForm, setShowAddNoteForm] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [showDocumentHistory, setShowDocumentHistory] = useState(false);
  
  const handleAddNote = () => {
    if (newNote.trim()) {
      // In a real app, this would send a request to the API
      console.log('Adding note:', newNote);
      setNewNote('');
      setShowAddNoteForm(false);
    }
  };
  
  const handleViewDocumentHistory = (document: any) => {
    setSelectedDocument(document);
    setShowDocumentHistory(true);
  };
  
  const handleApproveDocument = (documentId: string) => {
    console.log('Approving document:', documentId);
  };
  
  const handleRejectDocument = (documentId: string) => {
    console.log('Rejecting document:', documentId);
  };
  
  const handleDownloadDocument = (documentId: string) => {
    console.log('Downloading document:', documentId);
  };
  
  const handleUploadDocument = (documentId: string) => {
    console.log('Uploading document:', documentId);
  };
  
  const handleCreateAppointment = () => {
    navigate('/appointments/create');
  };
  
  const handleEditAppointment = () => {
    console.log('Editing appointment');
  };
  
  const getStatusDetails = (status: string) => {
    switch(status) {
      case 'approved':
        return {
          icon: <Check className="h-6 w-6 text-green-600" />,
          text: 'Onaylandı',
          description: 'Vize başvurusu onaylandı, seyahat edebilirsiniz.',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-800'
        };
      case 'rejected':
        return {
          icon: <X className="h-6 w-6 text-red-600" />,
          text: 'Reddedildi',
          description: 'Vize başvurusu reddedildi.',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-800'
        };
      case 'processing':
        return {
          icon: <Clock className="h-6 w-6 text-blue-600" />,
          text: 'İşlemde',
          description: 'Vize başvurunuz değerlendirme aşamasındadır.',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-800'
        };
      default:
        return {
          icon: <Clock className="h-6 w-6 text-gray-600" />,
          text: 'Durum Bilinmiyor',
          description: 'Vize başvurusu durumu bilinmiyor.',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-800'
        };
    }
  };
  
  const statusInfo = getStatusDetails(applicationData.status);
  
  return (
    <div className="space-y-6">
      {/* Application Header */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">
                  Başvuru: {applicationData.id}
                </h1>
                <span className={`ml-4 px-3 py-1 text-xs font-medium ${statusInfo.bgColor} ${statusInfo.textColor} rounded-full flex items-center`}>
                  {statusInfo.icon}
                  <span className="ml-1.5">{statusInfo.text}</span>
                </span>
              </div>
              <p className="mt-1 text-gray-600">
                Oluşturulma: {new Date(applicationData.createdAt).toLocaleDateString('tr-TR')}
                <span className="mx-2">•</span>
                Danışman: {applicationData.consultant.name}
              </p>
            </div>
            
            <div className="flex items-center gap-3 mt-4 md:mt-0">
              <button
                onClick={() => navigate('/applications')}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center"
              >
                <ChevronLeft className="h-4 w-4 mr-1.5" />
                Başvuru Listesine Dön
              </button>
              
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center">
                <Edit className="h-4 w-4 mr-1.5" />
                Düzenle
              </button>
            </div>
          </div>
          
          <div className={`mt-6 p-4 rounded-lg ${statusInfo.bgColor} ${statusInfo.borderColor} border`}>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {statusInfo.icon}
              </div>
              <div className="ml-3">
                <h3 className={`text-sm font-medium ${statusInfo.textColor}`}>
                  {statusInfo.text}
                </h3>
                <div className="mt-1 text-sm">
                  <p className={statusInfo.textColor}>
                    {statusInfo.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <ApplicationTabs 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
      
      {/* Tab Content */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        {activeTab === ApplicationTab.Overview && (
          <OverviewTab data={applicationData} />
        )}
        
        {activeTab === ApplicationTab.Documents && (
          <DocumentsTab
            documents={applicationData.documents}
            onViewHistory={handleViewDocumentHistory}
            onApprove={handleApproveDocument}
            onReject={handleRejectDocument}
            onDownload={handleDownloadDocument}
            onUpload={handleUploadDocument}
          />
        )}
        
        {activeTab === ApplicationTab.Appointment && (
          <AppointmentTab
            appointment={applicationData.appointment}
            participants={applicationData.participants}
            onCreateAppointment={handleCreateAppointment}
            onEditAppointment={handleEditAppointment}
          />
        )}
        
        {activeTab === ApplicationTab.Notes && (
          <NotesTab
            notes={applicationData.notes}
            showAddNoteForm={showAddNoteForm}
            newNote={newNote}
            onShowAddNoteForm={() => setShowAddNoteForm(true)}
            onHideAddNoteForm={() => setShowAddNoteForm(false)}
            onNewNoteChange={setNewNote}
            onAddNote={handleAddNote}
            onEditNote={(noteId) => console.log('Edit note:', noteId)}
            onDeleteNote={(noteId) => console.log('Delete note:', noteId)}
          />
        )}
        
        {activeTab === ApplicationTab.History && (
          <HistoryTab history={applicationData.history} />
        )}
      </div>
    </div>
  );
};

export default ApplicationDetail;
