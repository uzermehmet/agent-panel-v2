interface AdditionalInformationStepProps {
  formData: {
    residence: string;
    urgency: string;
    specialRequirements: string;
    assignedConsultant: string;
  };
  consultants: {
    id: string;
    name: string;
    countries: string[];
  }[];
  selectedCountry: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const AdditionalInformationStep: React.FC<AdditionalInformationStepProps> = ({
  formData,
  consultants,
  selectedCountry,
  onInputChange
}) => {
  return (
    <div className="p-6 space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Ek Bilgiler</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="residence" className="block text-sm font-medium text-gray-700 mb-1">
            İkamet Şehri
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="residence"
              name="residence"
              type="text"
              value={formData.residence}
              onChange={onInputChange}
              className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-1">
            Aciliyet Durumu
          </label>
          <select
            id="urgency"
            name="urgency"
            value={formData.urgency}
            onChange={onInputChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="normal">Normal</option>
            <option value="urgent">Acil</option>
            <option value="very_urgent">Çok Acil</option>
          </select>
        </div>
        
        <div className="md:col-span-2">
          <label htmlFor="assignedConsultant" className="block text-sm font-medium text-gray-700 mb-1">
            Atanacak Danışman <span className="text-red-500">*</span>
          </label>
          <select
            id="assignedConsultant"
            name="assignedConsultant"
            required
            value={formData.assignedConsultant}
            onChange={onInputChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Danışman seçin</option>
            {consultants
              .filter(consultant => 
                !selectedCountry || 
                consultant.countries.includes(selectedCountry)
              )
              .map(consultant => (
                <option key={consultant.id} value={consultant.id}>
                  {consultant.name}
                </option>
              ))
            }
          </select>
          {selectedCountry && (
            <p className="mt-1 text-sm text-gray-500">
              * Seçilen ülke için atanabilir danışmanlar listelenmektedir
            </p>
          )}
        </div>
        
        <div className="md:col-span-2">
          <label htmlFor="specialRequirements" className="block text-sm font-medium text-gray-700 mb-1">
            Özel Talepler / Notlar
          </label>
          <textarea
            id="specialRequirements"
            name="specialRequirements"
            rows={3}
            value={formData.specialRequirements}
            onChange={onInputChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            placeholder="Başvuru ile ilgili özel talepler veya notlar..."
          ></textarea>
        </div>
      </div>
      
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <div className="h-5 w-5 text-primary-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-primary-800">Başvuru Özeti</h3>
            <div className="mt-2 text-sm text-primary-700 space-y-1">
              <p>
                <strong>Ülke:</strong> {selectedCountry || 'Belirtilmedi'}
              </p>
              <p>
                <strong>Aciliyet:</strong> {formData.urgency === 'normal' ? 'Normal' : formData.urgency === 'urgent' ? 'Acil' : 'Çok Acil'}
              </p>
              <p>
                <strong>Danışman:</strong> {consultants.find(c => c.id === formData.assignedConsultant)?.name || 'Seçilmedi'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInformationStep;
