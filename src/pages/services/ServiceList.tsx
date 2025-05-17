import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Download,
  Tag,
  DollarSign,
  Globe,
  Users,
  Calendar,
  MoreHorizontal,
  Edit,
  Trash,
  Shield,
  FileText,
  X,
  Save
} from 'lucide-react';

interface Service {
  id: string;
  name: string;
  type: string;
  category: string;
  price: number;
  currency: string;
  description?: string;
}

// Mock data
const initialServices = [
  {
    id: 'SRV-001',
    name: 'Vize Danışmanlık',
    type: 'visa_consulting',
    category: 'tourist',
    price: 2000,
    currency: 'TL',
    description: 'Turistik vize başvuruları için danışmanlık hizmeti'
  },
  {
    id: 'SRV-002',
    name: 'Öğrenci Vize Danışmanlık',
    type: 'visa_consulting',
    category: 'student',
    price: 1800,
    currency: 'TL',
    description: 'Öğrenci vizesi başvuruları için danışmanlık hizmeti'
  },
  {
    id: 'SRV-003',
    name: 'Seyahat Sağlık Sigortası (1 Hafta)',
    type: 'insurance',
    category: 'all',
    price: 500,
    currency: 'TL',
    description: '1 haftalık seyahat sağlık sigortası'
  }
];

const ServiceList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [services, setServices] = useState(initialServices);
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<Service>({
    id: '',
    name: '',
    type: 'visa_consulting',
    category: 'tourist',
    price: 0,
    currency: 'TL',
    description: ''
  });

  const handleOpenModal = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData(service);
    } else {
      setEditingService(null);
      setFormData({
        id: `SRV-${String(services.length + 1).padStart(3, '0')}`,
        name: '',
        type: 'visa_consulting',
        category: 'tourist',
        price: 0,
        currency: 'TL',
        description: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingService(null);
    setFormData({
      id: '',
      name: '',
      type: 'visa_consulting',
      category: 'tourist',
      price: 0,
      currency: 'TL',
      description: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingService) {
      setServices(services.map(s => s.id === editingService.id ? formData : s));
    } else {
      setServices([...services, formData]);
    }
    
    handleCloseModal();
  };

  const handleDelete = (serviceId: string) => {
    if (window.confirm('Bu hizmeti silmek istediğinizden emin misiniz?')) {
      setServices(services.filter(s => s.id !== serviceId));
    }
  };
  
  const getServiceTypeText = (type: string) => {
    switch (type) {
      case 'visa_consulting':
        return 'Vize Danışmanlık';
      case 'insurance':
        return 'Sigorta';
      default:
        return type;
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'tourist':
        return 'Turistik';
      case 'student':
        return 'Öğrenci';
      case 'family':
        return 'Aile';
      case 'all':
        return 'Tümü';
      default:
        return category;
    }
  };

  const getServiceTypeIcon = (type: string) => {
    switch (type) {
      case 'visa_consulting':
        return <Globe className="h-5 w-5 text-blue-600" />;
      case 'insurance':
        return <Shield className="h-5 w-5 text-green-600" />;
      default:
        return <Tag className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 md:text-2xl">Hizmetler</h1>
          <p className="text-gray-600 mt-1">Hizmet ve fiyatlandırma yönetimi</p>
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
            onClick={() => handleOpenModal()}
            className="px-3 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 flex items-center transition-colors"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Yeni Hizmet
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
              placeholder="Hizmet adı ile ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
        
        {showFilters && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hizmet Tipi
                </label>
                <select 
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">Tümü</option>
                  <option value="visa_consulting">Vize Danışmanlık</option>
                  <option value="insurance">Sigorta</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kategori
                </label>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">Tümü</option>
                  <option value="tourist">Turistik</option>
                  <option value="student">Öğrenci</option>
                  <option value="family">Aile</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <button 
                onClick={() => {
                  setSelectedType('all');
                  setSelectedCategory('all');
                  setSearchTerm('');
                }} 
                className="px-3 py-1 text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                Filtreleri Temizle
              </button>
              <button 
                onClick={() => setShowFilters(false)}
                className="ml-3 px-3 py-1 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700"
              >
                Uygula
              </button>
            </div>
          </div>
        )}
        
        {/* Services Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hizmet
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tip
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategori
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fiyat
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getServiceTypeIcon(service.type)}
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {service.name}
                        </div>
                        <div className="text-sm text-gray-500">{service.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{getServiceTypeText(service.type)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{getCategoryText(service.category)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm font-medium text-gray-900">
                      <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
                      {service.price.toLocaleString()} {service.currency}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleOpenModal(service)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(service.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Service Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <form onSubmit={handleSubmit}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {editingService ? 'Hizmet Düzenle' : 'Yeni Hizmet'}
                  </h3>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Hizmet Adı <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                        Hizmet Tipi <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="type"
                        name="type"
                        required
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="visa_consulting">Vize Danışmanlık</option>
                        <option value="insurance">Sigorta</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                        Kategori <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="category"
                        name="category"
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="tourist">Turistik</option>
                        <option value="student">Öğrenci</option>
                        <option value="family">Aile</option>
                        <option value="all">Tümü</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                        Fiyat <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        required
                        min="0"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                        Para Birimi <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="currency"
                        name="currency"
                        required
                        value={formData.currency}
                        onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="TL">TL</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Açıklama
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-6 py-4 rounded-b-lg border-t flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
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

export default ServiceList;
