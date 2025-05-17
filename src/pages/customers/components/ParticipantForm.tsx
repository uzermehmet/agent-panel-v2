import React, { useState } from 'react';
import { X, Save } from 'lucide-react';

interface ParticipantFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: {
    firstName: string;
    lastName: string;
    relationship: string;
    idNumber: string;
    passportNumber: string;
    birthDate: string;
    gender: string;
    email: string;
    phone: string;
  };
  mode: 'add' | 'edit';
}

const ParticipantForm: React.FC<ParticipantFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  mode
}) => {
  const [formData, setFormData] = useState({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    relationship: initialData?.relationship || '',
    idNumber: initialData?.idNumber || '',
    passportNumber: initialData?.passportNumber || '',
    birthDate: initialData?.birthDate || '',
    gender: initialData?.gender || '',
    email: initialData?.email || '',
    phone: initialData?.phone || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {mode === 'add' ? 'Yeni Katılımcı Ekle' : 'Katılımcı Düzenle'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  Ad <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Soyad <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label htmlFor="relationship" className="block text-sm font-medium text-gray-700 mb-1">
                  İlişki <span className="text-red-500">*</span>
                </label>
                <select
                  id="relationship"
                  name="relationship"
                  required
                  value={formData.relationship}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Seçiniz</option>
                  <option value="Kendisi">Kendisi</option>
                  <option value="Eşi">Eşi</option>
                  <option value="Çocuğu">Çocuğu</option>
                  <option value="Ebeveyni">Ebeveyni</option>
                  <option value="Diğer">Diğer</option>
                </select>
              </div>

              <div>
                <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  T.C. Kimlik No
                </label>
                <input
                  type="text"
                  id="idNumber"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label htmlFor="passportNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Pasaport No
                </label>
                <input
                  type="text"
                  id="passportNumber"
                  name="passportNumber"
                  value={formData.passportNumber}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Doğum Tarihi
                </label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                  Cinsiyet
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Seçiniz</option>
                  <option value="Erkek">Erkek</option>
                  <option value="Kadın">Kadın</option>
                  <option value="Diğer">Diğer</option>
                </select>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  E-posta
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-6 py-4 rounded-b-lg border-t flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <X className="h-4 w-4 inline mr-1.5" />
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 flex items-center"
            >
              <Save className="h-4 w-4 mr-1.5" />
              {mode === 'add' ? 'Ekle' : 'Kaydet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ParticipantForm;
