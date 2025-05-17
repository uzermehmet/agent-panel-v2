import React from 'react';
import { Flag, Calendar } from 'lucide-react';

interface ApplicationDetailsStepProps {
  formData: {
    country: string;
    purpose: string;
    visaType: string;
    entryType: string;
    travelStartDate: string;
    travelEndDate: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const ApplicationDetailsStep: React.FC<ApplicationDetailsStepProps> = ({
  formData,
  onInputChange
}) => {
  return (
    <div className="p-6 space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Başvuru Detayları</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
            Ülke <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Flag className="h-5 w-5 text-gray-400" />
            </div>
            <select
              id="country"
              name="country"
              required
              value={formData.country}
              onChange={onInputChange}
              className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Ülke seçin</option>
              <option value="Amerika">Amerika</option>
              <option value="Fransa">Fransa</option>
              <option value="İtalya">İtalya</option>
              <option value="Yunanistan">Yunanistan</option>
              <option value="Macaristan">Macaristan</option>
              <option value="İngiltere">İngiltere</option>
            </select>
          </div>
        </div>
        
        <div>
          <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-1">
            Seyahat Amacı <span className="text-red-500">*</span>
          </label>
          <select
            id="purpose"
            name="purpose"
            required
            value={formData.purpose}
            onChange={onInputChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="tourism">Turizm</option>
            <option value="business">İş</option>
            <option value="education">Eğitim</option>
            <option value="family">Aile Ziyareti</option>
            <option value="medical">Sağlık</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="visaType" className="block text-sm font-medium text-gray-700 mb-1">
            Vize Tipi
          </label>
          <select
            id="visaType"
            name="visaType"
            value={formData.visaType}
            onChange={onInputChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="short_term">Kısa Süreli (Schengen)</option>
            <option value="long_term">Uzun Süreli (Ulusal)</option>
            <option value="transit">Transit</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="entryType" className="block text-sm font-medium text-gray-700 mb-1">
            Giriş Tipi
          </label>
          <select
            id="entryType"
            name="entryType"
            value={formData.entryType}
            onChange={onInputChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="single">Tek Giriş</option>
            <option value="double">Çift Giriş</option>
            <option value="multiple">Çoklu Giriş</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="travelStartDate" className="block text-sm font-medium text-gray-700 mb-1">
            Seyahat Başlangıç Tarihi <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="travelStartDate"
              name="travelStartDate"
              type="date"
              required
              value={formData.travelStartDate}
              onChange={onInputChange}
              min={new Date().toISOString().split('T')[0]}
              className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="travelEndDate" className="block text-sm font-medium text-gray-700 mb-1">
            Seyahat Bitiş Tarihi <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="travelEndDate"
              name="travelEndDate"
              type="date"
              required
              value={formData.travelEndDate}
              onChange={onInputChange}
              min={formData.travelStartDate || new Date().toISOString().split('T')[0]}
              className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailsStep;
