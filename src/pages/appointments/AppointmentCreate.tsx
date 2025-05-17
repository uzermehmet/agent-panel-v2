import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Calendar,
  MapPin,
  Clock,
  User,
  FileText,
  Save,
  X,
  ChevronLeft,
  Info
} from 'lucide-react';

const AppointmentCreate: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    applicationId: '',
    date: '',
    time: '',
    location: '',
    type: 'visa_interview',
    notes: ''
  });
  
  // Mock data for demonstration
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
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/appointments');
    } catch (error) {
      console.error('Error creating appointment:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const selectedApplication = applications.find(app => app.id === formData.applicationId);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 md:text-2xl">Yeni Randevu Oluştur</h1>
          <p className="text-gray-600 mt-1">Başvuru için randevu planlaması yapın</p>
        </div>
        
        <button 
          onClick={() => navigate('/appointments')}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center"
        >
          <ChevronLeft className="h-4 w-4 mr-1.5" />
          Randevu Listesine Dön
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-6 space-y-6">
          {/* Application Selection */}
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
          
          {selectedApplication && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Tarih <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                  Saat <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
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
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    id="location"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Lokasyon seçin</option>
                    {selectedApplication && locations[selectedApplication.country as keyof typeof locations]?.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="md:col-span-2">
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
                  placeholder="Randevu ile ilgili ek notlar..."
                ></textarea>
              </div>
            </div>
          )}
          
          {selectedApplication && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Info className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Randevu Bilgilendirmesi</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>Randevu saatinden 15 dakika önce hazır olunması gerekmektedir. Tüm evrakların eksiksiz getirilmesi önemlidir.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Form Actions */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/appointments')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <X className="h-4 w-4 inline mr-1.5" />
            İptal
          </button>
          
          <button
            type="submit"
            disabled={isLoading || !selectedApplication}
            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center ${
              isLoading || !selectedApplication ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Save className="h-4 w-4 mr-1.5" />
            {isLoading ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentCreate;
