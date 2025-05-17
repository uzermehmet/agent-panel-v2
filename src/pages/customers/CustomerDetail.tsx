import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Edit, 
  Trash, 
  ChevronLeft,
  User,
  FileText,
  Users,
  Clock,
  FileCheck,
  Calendar
} from 'lucide-react';

// Import tab components
import ProfileTab from './components/tabs/ProfileTab';
import ApplicationsTab from './components/tabs/ApplicationsTab';
import ParticipantsTab from './components/tabs/ParticipantsTab';
import HistoryTab from './components/tabs/HistoryTab';
import NotesTab from './components/tabs/NotesTab';
import ParticipantForm from './components/ParticipantForm';

// Mock customer data
const customerData = {
  id: '1001',
  firstName: 'Mehmet',
  lastName: 'Yılmaz',
  email: 'mehmet.yilmaz@example.com',
  phone: '+90 555 123 4567',
  birthDate: '1985-07-15',
  gender: 'Erkek',
  idNumber: '12345678901',
  passportNumber: 'U12345678',
  address: 'Kozyatağı Mah. Atatürk Cad. No:15/4 Kadıköy, İstanbul',
  occupation: 'Yazılım Mühendisi',
  reference: 'Ayşe Demir',
  assignedTo: 'Ali Veli',
  createdAt: '2025-01-15',
  participants: [
    {
      id: 'P1001',
      firstName: 'Mehmet',
      lastName: 'Yılmaz',
      relationship: 'Kendisi',
      idNumber: '12345678901',
      passportNumber: 'U12345678',
      birthDate: '1985-07-15',
      gender: 'Erkek',
      email: 'mehmet.yilmaz@example.com',
      phone: '+90 555 123 4567'
    },
    {
      id: 'P1002',
      firstName: 'Zeynep',
      lastName: 'Yılmaz',
      relationship: 'Eşi',
      idNumber: '98765432101',
      passportNumber: 'U87654321',
      birthDate: '1988-03-21',
      gender: 'Kadın',
      email: 'zeynep.yilmaz@example.com',
      phone: '+90 555 765 4321'
    }
  ],
  applications: [
    {
      id: 'APP-12345',
      country: 'İtalya',
      purpose: 'Turizm',
      status: 'Onaylandı',
      date: '2025-04-10',
      documents: 'Tamamlandı',
      appointment: 'Tamamlandı'
    },
    {
      id: 'APP-12346',
      country: 'Fransa',
      purpose: 'Turizm',
      status: 'Değerlendirmede',
      date: '2025-04-28',
      documents: 'Tamamlandı',
      appointment: 'Planlandı'
    },
    {
      id: 'APP-12347',
      country: 'Amerika',
      purpose: 'Turizm',
      status: 'Evrak Bekleniyor',
      date: '2025-04-30',
      documents: 'Eksik',
      appointment: 'Beklemede'
    }
  ],
  history: [
    {
      id: 'H1001',
      action: 'Başvuru oluşturuldu',
      application: 'APP-12347',
      user: 'Ali Veli',
      date: '2025-04-30 09:15'
    },
    {
      id: 'H1002',
      action: 'Evrak yüklendi - Pasaport',
      application: 'APP-12347',
      user: 'Mehmet Yılmaz',
      date: '2025-04-30 10:30'
    },
    {
      id: 'H1003',
      action: 'Randevu alındı - Fransa Konsolosluğu',
      application: 'APP-12346',
      user: 'Ali Veli',
      date: '2025-04-28 14:45'
    },
    {
      id: 'H1004',
      action: 'Vize onaylandı',
      application: 'APP-12345',
      user: 'Sistem',
      date: '2025-04-25 16:20'
    }
  ],
  notes: [
    {
      id: 'N1001',
      text: 'Müşteri İtalya vizesi için acele ettiğini belirtti. Süreç hızlandırılmalı.',
      user: 'Ali Veli',
      date: '2025-04-15 11:30'
    },
    {
      id: 'N1002',
      text: 'Telefon görüşmesinde Amerika başvurusu için eksik evraklar hatırlatıldı.',
      user: 'Ali Veli',
      date: '2025-04-30 13:45'
    }
  ]
};

const CustomerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [showAddNoteForm, setShowAddNoteForm] = useState(false);
  const [newNote, setNewNote] = useState('');
  
  // New state for participant form
  const [showParticipantForm, setShowParticipantForm] = useState(false);
  const [editingParticipant, setEditingParticipant] = useState<any>(null);
  const [participants, setParticipants] = useState(customerData.participants);

  const handleAddParticipant = () => {
    setEditingParticipant(null);
    setShowParticipantForm(true);
  };

  const handleEditParticipant = (participantId: string) => {
    const participant = participants.find(p => p.id === participantId);
    if (participant) {
      setEditingParticipant(participant);
      setShowParticipantForm(true);
    }
  };

  const handleDeleteParticipant = (participantId: string) => {
    if (window.confirm('Bu katılımcıyı silmek istediğinizden emin misiniz?')) {
      setParticipants(prev => prev.filter(p => p.id !== participantId));
    }
  };

  const handleParticipantSubmit = (formData: any) => {
    if (editingParticipant) {
      // Update existing participant
      setParticipants(prev => prev.map(p => 
        p.id === editingParticipant.id ? { ...formData, id: p.id } : p
      ));
    } else {
      // Add new participant
      const newParticipant = {
        ...formData,
        id: `P${Math.random().toString(36).substr(2, 9)}`
      };
      setParticipants(prev => [...prev, newParticipant]);
    }
    setShowParticipantForm(false);
    setEditingParticipant(null);
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      // In a real app, this would send a request to the API
      console.log('Adding note:', newNote);
      setNewNote('');
      setShowAddNoteForm(false);
    }
  };

  const handleEditNote = (noteId: string) => {
    // Handle editing note
    console.log('Editing note:', noteId);
  };

  const handleDeleteNote = (noteId: string) => {
    // Handle deleting note
    console.log('Deleting note:', noteId);
  };
  
  return (
    <div className="space-y-6">
      {/* Customer Header */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center">
              <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-800 text-xl font-medium">
                {customerData.firstName.charAt(0)}{customerData.lastName.charAt(0)}
              </div>
              <div className="ml-4">
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {customerData.firstName} {customerData.lastName}
                  </h1>
                  <span className="ml-4 px-2 py-1 text-xs font-medium bg-primary-50 text-primary-700 rounded-full">
                    ID: {customerData.id}
                  </span>
                </div>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  Oluşturulma: {new Date(customerData.createdAt).toLocaleDateString('tr-TR')}
                  
                  <span className="mx-2">•</span>
                  
                  <Users className="h-4 w-4 mr-1" />
                  Danışman: {customerData.assignedTo || 'Atanmamış'}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mt-4 md:mt-0">
              <button 
                onClick={() => navigate(`/applications/create?customerId=${customerData.id}`)}
                className="px-3 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 flex items-center"
              >
                <Plus className="h-4 w-4 mr-1.5" />
                Başvuru Oluştur
              </button>
              
              <button 
                onClick={() => navigate(`/customers/edit/${id}`)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center"
              >
                <Edit className="h-4 w-4 mr-1.5" />
                Düzenle
              </button>
              
              <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                <Trash className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="flex items-center">
              <div className="text-sm">
                <p className="text-gray-500">E-posta Adresi</p>
                <p className="font-medium">{customerData.email}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="text-sm">
                <p className="text-gray-500">Telefon</p>
                <p className="font-medium">{customerData.phone}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="text-sm">
                <p className="text-gray-500">Meslek</p>
                <p className="font-medium">{customerData.occupation}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-t border-gray-200">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-3 whitespace-nowrap font-medium text-sm border-b-2 ${
                activeTab === 'profile'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <User className="h-4 w-4 inline mr-1.5" />
              Profil Bilgileri
            </button>
            
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-4 py-3 whitespace-nowrap font-medium text-sm border-b-2 ${
                activeTab === 'applications'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FileText className="h-4 w-4 inline mr-1.5" />
              Başvurular ({customerData.applications.length})
            </button>
            
            <button
              onClick={() => setActiveTab('participants')}
              className={`px-4 py-3 whitespace-nowrap font-medium text-sm border-b-2 ${
                activeTab === 'participants'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Users className="h-4 w-4 inline mr-1.5" />
              Katılımcılar ({customerData.participants.length})
            </button>
            
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-3 whitespace-nowrap font-medium text-sm border-b-2 ${
                activeTab === 'history'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Clock className="h-4 w-4 inline mr-1.5" />
              İşlem Geçmişi
            </button>
            
            <button
              onClick={() => setActiveTab('notes')}
              className={`px-4 py-3 whitespace-nowrap font-medium text-sm border-b-2 ${
                activeTab === 'notes'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FileCheck className="h-4 w-4 inline mr-1.5" />
              Notlar ({customerData.notes.length})
            </button>
          </div>
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        {activeTab === 'profile' && (
          <ProfileTab data={customerData} />
        )}
        
        {activeTab === 'applications' && (
          <ApplicationsTab 
            applications={customerData.applications}
            customerId={customerData.id}
          />
        )}
        
        {activeTab === 'participants' && (
          <ParticipantsTab
            participants={participants}
            onAddParticipant={handleAddParticipant}
            onEditParticipant={handleEditParticipant}
            onDeleteParticipant={handleDeleteParticipant}
          />
        )}
        
        {activeTab === 'history' && (
          <HistoryTab history={customerData.history} />
        )}
        
        {activeTab === 'notes' && (
          <NotesTab
            notes={customerData.notes}
            showAddNoteForm={showAddNoteForm}
            newNote={newNote}
            onShowAddNoteForm={() => setShowAddNoteForm(true)}
            onHideAddNoteForm={() => setShowAddNoteForm(false)}
            onNewNoteChange={setNewNote}
            onAddNote={handleAddNote}
            onEditNote={handleEditNote}
            onDeleteNote={handleDeleteNote}
          />
        )}
      </div>

      {/* Participant Form Modal */}
      {showParticipantForm && (
        <ParticipantForm
          mode={editingParticipant ? 'edit' : 'add'}
          initialData={editingParticipant}
          onSubmit={handleParticipantSubmit}
          onCancel={() => {
            setShowParticipantForm(false);
            setEditingParticipant(null);
          }}
        />
      )}
    </div>
  );
};

export default CustomerDetail;
