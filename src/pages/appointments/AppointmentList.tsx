import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Download,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  MapPin,
  User,
  Save,
  X
} from 'lucide-react';

interface Appointment {
  id: string;
  customer: {
    id: string;
    name: string;
  };
  application: {
    id: string;
    country: string;
  };
  location: string;
  date: string;
  time: string;
  status: string;
  type: string;
  notes: string;
}

interface AppointmentFormData {
  applicationId: string;
  date: string;
  time: string;
  location: string;
  type: string;
  notes: string;
}

// Mock data
const appointments = [
  {
    id: 'APT-1001',
    customer: {
      id: '1001',
      name: 'Mehmet Yılmaz'
    },
    application: {
      id: 'APP-12345',
      country: 'İtalya'
    },
    location: 'İtalya Başkonsolosluğu, İstanbul',
    date: '2025-05-15',
    time: '10:30',
    status: 'confirmed',
    type: 'visa_interview',
    notes: 'Tüm evraklar hazır'
  },
  {
    id: 'APT-1002',
    customer: {
      id: '1002',
      name: 'Ayşe Demir'
    },
    application: {
      id: 'APP-12346',
      country: 'Amerika'
    },
    location: 'Amerika Büyükelçiliği, Ankara',
    date: '2025-05-16',
    time: '09:15',
    status: 'pending',
    type: 'document_submission',
    notes: 'Eksik evraklar var'
  }
];

// Mock applications data
const applications = [
  { id: 'APP-12345', customer: 'Mehmet Yılmaz', country: 'İtalya' },
  { id: 'APP-12346', customer: 'Ayşe Demir', country: 'Amerika' },
  { id: 'APP-12347', customer: 'Hakan Koç', country: 'Fransa' }
];

const locations = {
  'İtalya': ['İtalya Başkonsolosluğu, İstanbul', 'İtalya Büyükelçiliği, Ankara'],
  'Amerika': ['Amerika Büyükelçiliği, Ankara', 'Amerika Başkonsolosluğu, İstanbul'],
  'Fransa': ['Fransa Başkonsolosluğu, İstanbul', 'Fransa Büyükelçiliği, Ankara']
};

const AppointmentList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  
  const [formData, setFormData] = useState<AppointmentFormData>({
    applicationId: '',
    date: '',
    time: '',
    location: '',
    type: 'visa_interview',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // In a real app, this would be an API call
      console.log('Saving appointment:', formData);
      
      // Close modal and reset form
      setShowModal(false);
      setEditingAppointment(null);
      setFormData({
        applicationId: '',
        date: '',
        time: '',
        location: '',
        type: 'visa_interview',
        notes: ''
      });
    } catch (error) {
      console.error('Error saving appointment:', error);
    }
  };

  const handleEdit = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setFormData({
      applicationId: appointment.application.id,
      date: appointment.date,
      time: appointment.time,
      location: appointment.location,
      type: appointment.type,
      notes: appointment.notes
    });
    setShowModal(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-amber-600" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Onaylandı';
      case 'pending':
        return 'Beklemede';
      case 'cancelled':
        return 'İptal Edildi';
      default:
        return status;
    }
  };

  const selectedApplication = applications.find(app => app.id === formData.applicationId);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 md:text-2xl">Randevular</h1>
          <p className="text-gray-600 mt-1">Tüm randevuları yönetin ve takip edin</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-3 py-2 text-gray-700 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center"
          >
            <Filter className="h-4 w-4 mr-1.5" />
            Filtrele
          </button>
          
          <button
            onClick={() => {}}
            className="px-3 py-2 text-gray-700 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center"
          >
            <Download className="h-4 w-4 mr-1.5" />
            Dışa Aktar
          </button>
          
          <button
            onClick={() => {
              setEditingAppointment(null);
              setFormData({
                applicationId: '',
                date: '',
                time: '',
                location: '',
                type: 'visa_interview',
                notes: ''
              });
              setShowModal(true);
            }}
            className="px-3 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 flex items-center transition-colors"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Yeni Randevu
          </button>
        </div>
      </div>
      
      {/* Search & Filters */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Müşteri adı veya başvuru no ile ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
        
        {showFilters && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Durum
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option value="">Tümü</option>
                  <option value="confirmed">Onaylandı</option>
                  <option value="pending">Beklemede</option>
                  <option value="cancelled">İptal Edildi</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Randevu Tipi
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option value="">Tümü</option>
                  <option value="visa_interview">Vize Görüşmesi</option>
                  <option value="document_submission">Evrak Teslimi</option>
                  <option value="visa_pickup">Vize Teslim Alımı</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tarih
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option value="">Tümü</option>
                  <option>Bugün</option>
                  <option>Yarın</option>
                  <option>Bu Hafta</option>
                  <option>Gelecek Hafta</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <button className="px-3 py-1 text-primary-600 hover:text-primary-700 text-sm font-medium">
                Filtreleri Temizle
              </button>
              <button className="ml-3 px-3 py-1 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700">
                Uygula
              </button>
            </div>
          </div>
        )}
        
        {/* Appointments Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Randevu No
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Müşteri / Başvuru
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tarih / Saat
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lokasyon
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notlar
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600">
                    {appointment.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <Link 
                        to={`/customers/${appointment.customer.id}`}
                        className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center"
                      >
                        <User className="h-4 w-4 mr-1.5" />
                        {appointment.customer.name}
                      </Link>
                      <Link
                        to={`/applications/${appointment.application.id}`}
                        className="text-sm text-gray-500 mt-1 hover:text-gray-700"
                      >
                        {appointment.application.id} ({appointment.application.country})
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1.5 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-900">
                          {new Date(appointment.date).toLocaleDateString('tr-TR')}
                        </div>
                        <div className="text-sm text-gray-500">{appointment.time}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1.5 text-gray-400" />
                      <span className="text-sm text-gray-900">{appointment.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(appointment.status)}
                      <span className="ml-1.5 text-sm text-gray-900">
                        {getStatusText(appointment.status)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {appointment.notes}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(appointment)}
                      className="text-primary-600 hover:text-primary-800"
                    >
                      Düzenle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {appointments.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">Randevu bulunamadı.</p>
            </div>
          )}
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Önceki
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Sonraki
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Toplam <span className="font-medium">{appointments.length}</span> randevu gösteriliyor
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Önceki</span>
                  &laquo;
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-primary-50 text-sm font-medium text-primary-600 hover:bg-primary-100">
                  2
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  3
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Sonraki</span>
                  &raquo;
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <form onSubmit={handleSubmit}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {editingAppointment ? 'Randevu Düzenle' : 'Yeni Randevu'}
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingAppointment(null);
                    }}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="applicationId" className="block text-sm font-medium text-gray-700 mb-1">
                      Başvuru <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="applicationId"
                      name="applicationId"
                      required
                      value={formData.applicationId}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">Başvuru seçin</option>
                      {applications.map(app => (
                        <option key={app.id} value={app.id}>
                          {app.id} - {app.customer} ({app.country})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                        Tarih <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        required
                        value={formData.date}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                        Saat <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="time"
                        id="time"
                        name="time"
                        required
                        value={formData.time}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                      Randevu Tipi <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="type"
                      name="type"
                      required
                      value={formData.type}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="visa_interview">Vize Görüşmesi</option>
                      <option value="document_submission">Evrak Teslimi</option>
                      <option value="visa_pickup">Vize Teslim Alımı</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Lokasyon <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="location"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">Lokasyon seçin</option>
                      {selectedApplication && locations[selectedApplication.country as keyof typeof locations]?.map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                      Notlar
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Randevu ile ilgili notlar..."
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-6 py-4 rounded-b-lg border-t flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingAppointment(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <X className="h-4 w-4 inline mr-1.5" />
                  İptal
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 text-sm font-medium flex items-center"
                >
                  <Save className="h-4 w-4 mr-1.5" />
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentList;
