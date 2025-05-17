import React from 'react';
import { Check, User } from 'lucide-react';

interface CustomerInformationStepProps {
  formData: {
    customerType: 'existing' | 'new';
    customerId: string;
    newCustomer: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    };
  };
  existingCustomers: Array<{
    id: string;
    name: string;
    email: string;
  }>;
  onCustomerTypeChange: (type: 'existing' | 'new') => void;
  onCustomerSelect: (id: string) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomerInformationStep: React.FC<CustomerInformationStepProps> = ({
  formData,
  existingCustomers,
  onCustomerTypeChange,
  onCustomerSelect,
  onInputChange
}) => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-center space-x-4 mb-6">
        <button
          type="button"
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            formData.customerType === 'existing' 
              ? 'bg-primary-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => onCustomerTypeChange('existing')}
        >
          Mevcut Müşteriden Seç
        </button>
        <button
          type="button"
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            formData.customerType === 'new' 
              ? 'bg-primary-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => onCustomerTypeChange('new')}
        >
          Yeni Müşteri Oluştur
        </button>
      </div>
      
      {formData.customerType === 'existing' ? (
        <ExistingCustomerForm 
          customerId={formData.customerId}
          customers={existingCustomers}
          onCustomerSelect={onCustomerSelect}
        />
      ) : (
        <NewCustomerForm 
          customer={formData.newCustomer}
          onInputChange={onInputChange}
        />
      )}
    </div>
  );
};

interface ExistingCustomerFormProps {
  customerId: string;
  customers: Array<{
    id: string;
    name: string;
    email: string;
  }>;
  onCustomerSelect: (id: string) => void;
}

const ExistingCustomerForm: React.FC<ExistingCustomerFormProps> = ({
  customerId,
  customers,
  onCustomerSelect
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Müşteri Seçin</h3>
      
      <div className="border border-gray-200 rounded-lg overflow-hidden max-h-80 overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Müşteri
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                E-posta
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Seç
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.map(customer => (
              <tr key={customer.id} className={customerId === customer.id ? 'bg-primary-50' : 'hover:bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                  <div className="text-sm text-gray-500">ID: {customer.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {customer.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button
                    type="button"
                    onClick={() => onCustomerSelect(customer.id)}
                    className={`w-6 h-6 rounded-full ${
                      customerId === customer.id 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                    }`}
                  >
                    {customerId === customer.id && (
                      <Check className="w-4 h-4 mx-auto" />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {customerId && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Check className="h-5 w-5 text-green-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">
                <strong>{customers.find(c => c.id === customerId)?.name}</strong> müşterisi seçildi.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface NewCustomerFormProps {
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NewCustomerForm: React.FC<NewCustomerFormProps> = ({
  customer,
  onInputChange
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Yeni Müşteri Bilgileri</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="newCustomer.firstName" className="block text-sm font-medium text-gray-700 mb-1">
            Ad <span className="text-red-500">*</span>
          </label>
          <input
            id="newCustomer.firstName"
            name="newCustomer.firstName"
            type="text"
            required
            value={customer.firstName}
            onChange={onInputChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        
        <div>
          <label htmlFor="newCustomer.lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Soyad <span className="text-red-500">*</span>
          </label>
          <input
            id="newCustomer.lastName"
            name="newCustomer.lastName"
            type="text"
            required
            value={customer.lastName}
            onChange={onInputChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        
        <div>
          <label htmlFor="newCustomer.email" className="block text-sm font-medium text-gray-700 mb-1">
            E-posta <span className="text-red-500">*</span>
          </label>
          <input
            id="newCustomer.email"
            name="newCustomer.email"
            type="email"
            required
            value={customer.email}
            onChange={onInputChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        
        <div>
          <label htmlFor="newCustomer.phone" className="block text-sm font-medium text-gray-700 mb-1">
            Telefon <span className="text-red-500">*</span>
          </label>
          <input
            id="newCustomer.phone"
            name="newCustomer.phone"
            type="tel"
            required
            value={customer.phone}
            onChange={onInputChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-700">
          <strong>Not:</strong> Bu müşteri için detaylı bilgiler başvuru oluşturulduktan sonra tamamlanabilir.
        </p>
      </div>
    </div>
  );
};

export default CustomerInformationStep;
