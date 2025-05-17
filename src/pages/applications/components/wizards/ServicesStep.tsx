import React, { useState } from 'react';
import { DollarSign, Globe, Shield, FileText } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  type: string;
  category: string;
  price: number;
  currency: string;
}

interface SelectedService {
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
}

interface ServicesStepProps {
  availableServices: Service[];
  selectedServices: SelectedService[];
  onServiceSelect: (service: Service) => void;
  onServiceUpdate: (serviceId: string, updates: Partial<SelectedService>) => void;
}

const ServicesStep: React.FC<ServicesStepProps> = ({
  availableServices,
  selectedServices,
  onServiceSelect,
  onServiceUpdate
}) => {
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'visa_consulting':
        return <Globe className="h-5 w-5 text-primary-600" />;
      case 'insurance':
        return <Shield className="h-5 w-5 text-primary-600" />;
      default:
        return <FileText className="h-5 w-5 text-primary-600" />;
    }
  };

  const calculateFinalPrice = (service: SelectedService) => {
    const baseTotal = service.price * service.quantity;
    if (service.discount.type === 'percentage') {
      return baseTotal * (1 - service.discount.value / 100);
    } else {
      return baseTotal - service.discount.value;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Hizmet Seçimi</h3>
      
      <div className="space-y-4">
        {availableServices.map(service => {
          const selectedService = selectedServices.find(s => s.id === service.id);
          
          return (
            <div 
              key={service.id}
              className={`border rounded-lg p-4 ${
                selectedService
                  ? 'border-primary-200 bg-primary-50'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={!!selectedService}
                    onChange={() => onServiceSelect(service)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <div className="ml-3">
                    <div className="flex items-center">
                      {getServiceIcon(service.type)}
                      <span className="ml-2 text-sm font-medium text-gray-900">{service.name}</span>
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {service.price.toLocaleString()} {service.currency}
                    </div>
                  </div>
                </div>
                
                {selectedService && (
                  <div className="flex items-center space-x-6">
                    {/* Quantity Selection */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Adet
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={selectedService.quantity}
                        onChange={(e) => onServiceUpdate(service.id, {
                          quantity: Number(e.target.value),
                          finalPrice: calculateFinalPrice({
                            ...selectedService,
                            quantity: Number(e.target.value)
                          })
                        })}
                        className="block w-20 border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>

                    {/* Discount Type & Value */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        İndirim Tipi
                      </label>
                      <select
                        value={selectedService.discount.type}
                        onChange={(e) => onServiceUpdate(service.id, {
                          discount: {
                            type: e.target.value as 'percentage' | 'fixed',
                            value: 0
                          },
                          finalPrice: selectedService.price * selectedService.quantity
                        })}
                        className="block w-28 border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="percentage">Yüzde (%)</option>
                        <option value="fixed">Tutar</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        İndirim {selectedService.discount.type === 'percentage' ? '(%)' : '(TL)'}
                      </label>
                      <input
                        type="number"
                        min="0"
                        max={selectedService.discount.type === 'percentage' ? "100" : String(selectedService.price * selectedService.quantity)}
                        value={selectedService.discount.value}
                        onChange={(e) => {
                          const newDiscount = {
                            type: selectedService.discount.type,
                            value: Number(e.target.value)
                          };
                          onServiceUpdate(service.id, {
                            discount: newDiscount,
                            finalPrice: calculateFinalPrice({
                              ...selectedService,
                              discount: newDiscount
                            })
                          });
                        }}
                        className="block w-24 border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>

                    <div>
                      <div className="text-xs font-medium text-gray-700 mb-1">
                        Toplam Tutar
                      </div>
                      <div className="text-sm font-medium text-primary-600">
                        {selectedService.finalPrice.toLocaleString()} {service.currency}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {selectedServices.length > 0 && (
        <ServicesSummary services={selectedServices} />
      )}
    </div>
  );
};

interface ServicesSummaryProps {
  services: SelectedService[];
}

const ServicesSummary: React.FC<ServicesSummaryProps> = ({ services }) => {
  const total = services.reduce((sum, service) => sum + service.finalPrice, 0);
  
  return (
    <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
      <h4 className="text-sm font-medium text-gray-900 mb-3">Seçilen Hizmetler Özeti</h4>
      <div className="space-y-2">
        {services.map(service => (
          <div key={service.id} className="flex justify-between items-center text-sm">
            <div className="text-gray-600">
              {service.name} ({service.quantity} adet)
            </div>
            <div className="flex items-center">
              {service.discount.value > 0 && (
                <span className="text-red-600 mr-2">
                  {service.discount.type === 'percentage' ? 
                    `-${service.discount.value}%` : 
                    `-${service.discount.value.toLocaleString()} ${service.currency}`
                  }
                </span>
              )}
              <span className="font-medium">
                {service.finalPrice.toLocaleString()} {service.currency}
              </span>
            </div>
          </div>
        ))}
        <div className="border-t border-gray-200 mt-2 pt-2">
          <div className="flex justify-between items-center font-medium">
            <span>Toplam</span>
            <span>
              {total.toLocaleString()} TL
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesStep;
