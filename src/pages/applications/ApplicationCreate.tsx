import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Users, 
  Flag, 
  Calendar, 
  FileText, 
  User,
  Check,
  ChevronLeft,
  ChevronRight,
  X,
  Save
} from 'lucide-react';

// Import wizard components
import CustomerInformationStep from './components/wizards/CustomerInformationStep';
import ApplicationDetailsStep from './components/wizards/ApplicationDetailsStep';
import ParticipantsStep from './components/wizards/ParticipantsStep';
import ServicesStep from './components/wizards/ServicesStep';
import AdditionalInformationStep from './components/wizards/AdditionalInformationStep';

// Mock services data
const availableServices = [
  {
    id: 'SRV-001',
    name: 'Vize Danışmanlık',
    type: 'visa_consulting',
    category: 'tourist',
    price: 2000,
    currency: 'TL'
  },
  {
    id: 'SRV-002',
    name: 'Öğrenci Vize Danışmanlık',
    type: 'visa_consulting',
    category: 'student',
    price: 1800,
    currency: 'TL'
  },
  {
    id: 'SRV-003',
    name: 'Seyahat Sağlık Sigortası (1 Hafta)',
    type: 'insurance',
    category: 'all',
    price: 500,
    currency: 'TL'
  },
  {
    id: 'SRV-004',
    name: 'Seyahat Sağlık Sigortası (15 Gün)',
    type: 'insurance',
    category: 'all',
    price: 750,
    currency: 'TL'
  }
];

const ApplicationCreate: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Parse customerId from query params if coming from customer detail
  const queryParams = new URLSearchParams(location.search);
  const initialCustomerId = queryParams.get('customerId') || '';
  
  // Form state
  const [formData, setFormData] = useState({
    // Step 1: Customer Information
    customerId: initialCustomerId,
    customerType: initialCustomerId ? 'existing' : 'new',
    newCustomer: {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    },
    
    // Step 2: Application Details
    country: '',
    purpose: 'tourism',
    visaType: 'short_term',
    stayDuration: 30,
    entryType: 'single',
    travelStartDate: '',
    travelEndDate: '',
    
    // Step 3: Participant Information
    participants: [
      {
        id: 'participant-1',
        firstName: '',
        lastName: '',
        birthDate: '',
        passportNumber: '',
        passportExpiry: '',
        relation: 'primary'
      }
    ],
    
    // Step 4: Services Selection
    services: [] as {
      id: string;
      name: string;
      price: number;
      currency: string;
      quantity: number;
      discount: {
        type: 'percentage' | 'fixed';
        value: number;
      };
      finalPrice: number;
    }[],
    
    // Step 5: Additional Information
    residence: 'İstanbul',
    urgency: 'normal',
    specialRequirements: '',
    assignedConsultant: ''
  });
  
  // Existing customers mock data
  const existingCustomers = [
    { id: '1001', name: 'Mehmet Yılmaz', email: 'mehmet.yilmaz@example.com' },
    { id: '1002', name: 'Ayşe Demir', email: 'ayse.demir@example.com' },
    { id: '1003', name: 'Mustafa Şahin', email: 'mustafa.sahin@example.com' },
    { id: '1004', name: 'Zeynep Kaya', email: 'zeynep.kaya@example.com' },
    { id: '1005', name: 'Ahmet Çelik', email: 'ahmet.celik@example.com' }
  ];
  
  // Consultants mock data
  const consultants = [
    { id: '101', name: 'Ali Veli', countries: ['İtalya', 'Fransa', 'Amerika'] },
    { id: '102', name: 'Zeynep Kaya', countries: ['Amerika', 'İngiltere', 'Yunanistan'] },
    { id: '103', name: 'Beyza Yıldız', countries: ['Yunanistan', 'İtalya', 'Macaristan'] }
  ];
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle nested fields
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  // Handle service selection
  const handleServiceSelect = (service: typeof availableServices[0]) => {
    setFormData(prev => {
      const existingService = prev.services.find(s => s.id === service.id);
      
      if (existingService) {
        return {
          ...prev,
          services: prev.services.filter(s => s.id !== service.id)
        };
      }
      
      return {
        ...prev,
        services: [
          ...prev.services,
          {
            id: service.id,
            name: service.name,
            price: service.price,
            currency: service.currency,
            quantity: 1,
            discount: {
              type: 'percentage',
              value: 0
            },
            finalPrice: service.price
          }
        ]
      };
    });
  };

  // Add new handleServiceUpdate function
  const handleServiceUpdate = (serviceId: string, updates: Partial<typeof formData.services[0]>) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.map(service => 
        service.id === serviceId ? { ...service, ...updates } : service
      )
    }));
  };
  
  // Handle service discount
  const handleServiceDiscount = (serviceId: string, discount: number) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.map(service => {
        if (service.id === serviceId) {
          const finalPrice = service.price * (1 - discount / 100);
          return {
            ...service,
            discount: {
              type: 'percentage',
              value: discount
            },
            finalPrice
          };
        }
        return service;
      })
    }));
  };
  
  // Handle participant changes
  const handleParticipantChange = (id: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      participants: prev.participants.map(p => 
        p.id === id ? { ...p, [field]: value } : p
      )
    }));
  };
  
  // Add new participant
  const addParticipant = () => {
    const newId = `participant-${formData.participants.length + 1}`;
    setFormData(prev => ({
      ...prev,
      participants: [
        ...prev.participants,
        {
          id: newId,
          firstName: '',
          lastName: '',
          birthDate: '',
          passportNumber: '',
          passportExpiry: '',
          relation: 'family'
        }
      ]
    }));
  };
  
  // Remove participant
  const removeParticipant = (id: string) => {
    if (formData.participants.length <= 1) return;
    
    setFormData(prev => ({
      ...prev,
      participants: prev.participants.filter(p => p.id !== id)
    }));
  };
  
  // Handle customer type selection
  const handleCustomerTypeChange = (type: 'new' | 'existing') => {
    setFormData(prev => ({
      ...prev,
      customerType: type,
      customerId: type === 'new' ? '' : prev.customerId
    }));
  };
  
  // Handle existing customer selection
  const handleCustomerSelect = (id: string) => {
    setFormData(prev => ({
      ...prev,
      customerId: id
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful creation
      const newApplicationId = 'APP-' + Math.floor(10000 + Math.random() * 90000);
      
      // Navigate to the new application
      navigate(`/applications/${newApplicationId}`);
    } catch (error) {
      console.error('Error creating application:', error);
      // Would handle errors here - show message, etc.
    } finally {
      setIsLoading(false);
    }
  };
  
  // Update isStepComplete to be more flexible
  const isStepComplete = (step: number): boolean => {
    switch (step) {
      case 1: // Customer Information
        return formData.customerType === 'existing' 
          ? !!formData.customerId
          : !!(formData.newCustomer.firstName && 
               formData.newCustomer.lastName && 
               formData.newCustomer.email && 
               formData.newCustomer.phone);
      case 2: // Application Details
        return !!(formData.country && 
                 formData.travelStartDate && 
                 formData.travelEndDate);
      case 3: // Participant Information
        return formData.participants.every(p => 
          p.firstName && p.lastName && p.passportNumber
        );
      case 4: // Services Selection
        return formData.services.length > 0;
      case 5: // Additional Information
        return !!formData.assignedConsultant;
      default:
        return false;
    }
  };

  // Add function to check if step is accessible
  const canAccessStep = (step: number): boolean => {
    // First step is always accessible
    if (step === 1) return true;

    // For other steps, at least one previous step must be complete
    return Array.from({ length: step - 1 }, (_, i) => i + 1)
      .some(prevStep => isStepComplete(prevStep));
  };

  // Add step navigation functions
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToNextStep = () => {
    if (currentStep < 5 && isStepComplete(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Update step navigation to be more flexible
  const goToStep = (step: number) => {
    if (canAccessStep(step)) {
      setCurrentStep(step);
    }
  };

  // Update the progress steps UI to be clickable
  const ProgressStep = ({ 
    step, 
    icon, 
    label 
  }: { 
    step: number; 
    icon: React.ReactNode; 
    label: string;
  }) => (
    <div className="flex-1 text-center">
      <button
        type="button"
        onClick={() => goToStep(step)}
        disabled={!canAccessStep(step)}
        className={`w-full flex flex-col items-center ${
          !canAccessStep(step) ? 'cursor-not-allowed opacity-50' : 'hover:opacity-80'
        }`}
      >
        <div className={`flex items-center justify-center w-10 h-10 rounded-full mx-auto ${
          currentStep === step 
            ? 'bg-primary-600 text-white' 
            : currentStep > step 
              ? 'bg-green-100 text-green-600' 
              : 'bg-gray-100 text-gray-400'
        }`}>
          {currentStep > step ? (
            <Check className="w-6 h-6" />
          ) : (
            icon
          )}
        </div>
        <p className={`mt-2 text-sm font-medium ${
          currentStep >= step ? 'text-gray-900' : 'text-gray-500'
        }`}>
          {label}
        </p>
      </button>
    </div>
  );
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 md:text-2xl">Yeni Başvuru Oluştur</h1>
          <p className="text-gray-600 mt-1">Vize başvurusu oluşturmak için adımları takip edin</p>
        </div>
        
        <button 
          onClick={() => navigate('/applications')}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center"
        >
          <ChevronLeft className="h-4 w-4 mr-1.5" />
          Başvuru Listesine Dön
        </button>
      </div>
      
      {/* Progress Steps */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
        <div className="flex items-center">
          <ProgressStep
            step={1}
            icon={<Users className="w-5 h-5" />}
            label="Müşteri Bilgileri"
          />
          
          <div className={`flex-grow h-0.5 mx-2 ${
            currentStep > 1 ? 'bg-primary-600' : 'bg-gray-200'
          }`} />
          
          <ProgressStep
            step={2}
            icon={<Flag className="w-5 h-5" />}
            label="Başvuru Detayları"
          />
          
          <div className={`flex-grow h-0.5 mx-2 ${
            currentStep > 2 ? 'bg-primary-600' : 'bg-gray-200'
          }`} />
          
          <ProgressStep
            step={3}
            icon={<User className="w-5 h-5" />}
            label="Katılımcı Bilgileri"
          />
          
          <div className={`flex-grow h-0.5 mx-2 ${
            currentStep > 3 ? 'bg-primary-600' : 'bg-gray-200'
          }`} />
          
          <ProgressStep
            step={4}
            icon={<FileText className="w-5 h-5" />}
            label="Hizmetler"
          />
          
          <div className={`flex-grow h-0.5 mx-2 ${
            currentStep > 4 ? 'bg-primary-600' : 'bg-gray-200'
          }`} />
          
          <ProgressStep
            step={5}
            icon={<FileText className="w-5 h-5" />}
            label="Ek Bilgiler"
          />
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg shadow-sm">
        {/* Step 1: Customer Information */}
        {currentStep === 1 && (
          <CustomerInformationStep
            formData={formData}
            existingCustomers={existingCustomers}
            onCustomerTypeChange={handleCustomerTypeChange}
            onCustomerSelect={handleCustomerSelect}
            onInputChange={handleChange}
          />
        )}
        
        {/* Step 2: Application Details */}
        {currentStep === 2 && (
          <ApplicationDetailsStep
            formData={formData}
            onInputChange={handleChange}
          />
        )}
        
        {/* Step 3: Participant Information */}
        {currentStep === 3 && (
          <ParticipantsStep
            participants={formData.participants}
            onParticipantChange={handleParticipantChange}
            onAddParticipant={addParticipant}
            onRemoveParticipant={removeParticipant}
          />
        )}
        
        {/* Step 4: Services Selection */}
        {currentStep === 4 && (
          <ServicesStep
            availableServices={availableServices}
            selectedServices={formData.services}
            onServiceSelect={handleServiceSelect}
            onServiceUpdate={handleServiceUpdate}
          />
        )}
        
        {/* Step 5: Additional Information */}
        {currentStep === 5 && (
          <AdditionalInformationStep
            formData={formData}
            consultants={consultants}
            selectedCountry={formData.country}
            onInputChange={handleChange}
          />
        )}
        
        {/* Navigation Buttons */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
          <button
            type="button"
            onClick={goToPreviousStep}
            className={`px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
              currentStep === 1 ? 'invisible' : ''
            }`}
          >
            <ChevronLeft className="h-4 w-4 inline mr-1.5" />
            Önceki Adım
          </button>
          
          {currentStep < 5 ? (
            <button
              type="button"
              onClick={goToNextStep}
              className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                !isStepComplete(currentStep) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={!isStepComplete(currentStep)}
            >
              Sonraki Adım
              <ChevronRight className="h-4 w-4 inline ml-1.5" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading || !isStepComplete(currentStep)}
              className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center ${
                isLoading || !isStepComplete(currentStep) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Save className="h-4 w-4 mr-1.5" />
              {isLoading ? 'Kaydediliyor...' : 'Başvuruyu Oluştur'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ApplicationCreate;
