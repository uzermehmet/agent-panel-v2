import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Download,
  CheckCircle, 
  Clock, 
  AlertCircle, 
  XCircle, 
  Calendar,
  User,
  Flag,
  MoreHorizontal
} from 'lucide-react';

// Mock application data
const initialApplications = [
  {
    id: 'APP-12345',
    customer: {
      id: '1001',
      name: 'Mehmet Yılmaz',
    },
    country: 'İtalya',
    purpose: 'Turizm',
    status: 'approved',
    createdAt: '2025-04-10',
    travelDates: '15.05.2025 - 30.05.2025',
    consultant: 'Ali Veli',
    documents: 'completed',
    appointment: '15.04.2025'
  },
  {
    id: 'APP-12346',
    customer: {
      id: '1002',
      name: 'Ayşe Demir',
    },
    country: 'Amerika',
    purpose: 'Turizm',
    status: 'pending',
    createdAt: '2025-04-15',
    travelDates: '10.06.2025 - 25.06.2025',
    consultant: 'Zeynep Kaya',
    documents: 'missing',
    appointment: 'Planlanmadı'
  },
  {
    id: 'APP-12347',
    customer: {
      id: '1003',
      name: 'Mustafa Şahin',
    },
    country: 'Fransa',
    purpose: 'Turizm',
    status: 'processing',
    createdAt: '2025-04-20',
    travelDates: '05.06.2025 - 15.06.2025',
    consultant: 'Ali Veli',
    documents: 'completed',
    appointment: '25.04.2025'
  },
  {
    id: 'APP-12348',
    customer: {
      id: '1004',
      name: 'Zeynep Kaya',
    },
    country: 'Yunanistan',
    purpose: 'Turizm',
    status: 'rejected',
    createdAt: '2025-04-05',
    travelDates: '01.05.2025 - 10.05.2025',
    consultant: 'Beyza Yıldız',
    documents: 'completed',
    appointment: '10.04.2025'
  },
  {
    id: 'APP-12349',
    customer: {
      id: '1005',
      name: 'Ahmet Çelik',
    },
    country: 'Macaristan',
    purpose: 'İş',
    status: 'approved',
    createdAt: '2025-04-08',
    travelDates: '20.05.2025 - 27.05.2025',
    consultant: 'Ali Veli',
    documents: 'completed',
    appointment: '12.04.2025'
  },
  {
    id: 'APP-12350',
    customer: {
      id: '1006',
      name: 'Ebru Koç',
    },
    country: 'İtalya',
    purpose: 'Turizm',
    status: 'pending',
    createdAt: '2025-04-22',
    travelDates: '15.06.2025 - 30.06.2025',
    consultant: 'Zeynep Kaya',
    documents: 'missing',
    appointment: 'Planlanmadı'
  }
];

const ApplicationList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [applications, setApplications] = useState(initialApplications);
  const [filteredApplications, setFilteredApplications] = useState(initialApplications);
  const [showFilters, setShowFilters] = useState(false);
  
  // Status filter
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Simple filtering based on search term
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    filterApplications(term, statusFilter);
  };
  
  // Filter by status
  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;
    setStatusFilter(status);
    
    filterApplications(searchTerm, status);
  };
  
  // Combined filtering function
  const filterApplications = (term: string, status: string) => {
    let filtered = applications;
    
    // Filter by search term
    if (term.trim() !== '') {
      filtered = filtered.filter(app => 
        app.id.toLowerCase().includes(term.toLowerCase()) ||
        app.customer.name.toLowerCase().includes(term.toLowerCase()) ||
        app.country.toLowerCase().includes(term.toLowerCase())
      );
    }
    
    // Filter by status
    if (status !== 'all') {
      filtered = filtered.filter(app => app.status === status);
    }
    
    setFilteredApplications(filtered);
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setFilteredApplications(applications);
  };
  
  // Apply filters
  const applyFilters = () => {
    setShowFilters(false);
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-amber-600" />;
      case 'processing':
        return <AlertCircle className="h-5 w-5 text-blue-600" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Onaylandı';
      case 'pending':
        return 'Beklemede';
      case 'processing':
        return 'İşlemde';
      case 'rejected':
        return 'Reddedildi';
      default:
        return status;
    }
  };
  
  const getDocumentStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Tamamlandı
          </span>
        );
      case 'missing':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            Eksik
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 md:text-2xl">Başvurular</h1>
          <p className="text-gray-600 mt-1">Tüm vize başvurularını yönetin ve takip edin</p>
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
            onClick={() => navigate('/applications/create')}
            className="px-3 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 flex items-center transition-colors"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Yeni Başvuru
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
              placeholder="Başvuru no, müşteri adı veya ülke ile ara..."
              value={searchTerm}
              onChange={handleSearch}
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
                <select 
                  value={statusFilter}
                  onChange={handleStatusFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">Tümü</option>
                  <option value="approved">Onaylandı</option>
                  <option value="pending">Beklemede</option>
                  <option value="processing">İşlemde</option>
                  <option value="rejected">Reddedildi</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ülke
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option value="">Tümü</option>
                  <option>Amerika</option>
                  <option>Fransa</option>
                  <option>İtalya</option>
                  <option>Yunanistan</option>
                  <option>Macaristan</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Danışman
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option value="">Tümü</option>
                  <option>Ali Veli</option>
                  <option>Zeynep Kaya</option>
                  <option>Beyza Yıldız</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <button 
                onClick={resetFilters}
                className="px-3 py-1 text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                Filtreleri Temizle
              </button>
              <button 
                onClick={applyFilters}
                className="ml-3 px-3 py-1 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700"
              >
                Uygula
              </button>
            </div>
          </div>
        )}
        
        {/* Applications Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Başvuru No
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Müşteri
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ülke / Amaç
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tarihler
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Danışman
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Evraklar
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link 
                      to={`/applications/${app.id}`}
                      className="text-sm font-medium text-primary-600 hover:text-primary-700"
                    >
                      {app.id}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link 
                      to={`/customers/${app.customer.id}`}
                      className="flex items-center text-sm font-medium text-gray-900 hover:text-primary-600"
                    >
                      <User className="h-4 w-4 mr-1.5 text-gray-500" />
                      {app.customer.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Flag className="h-4 w-4 mr-1.5 text-gray-500" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{app.country}</div>
                        <div className="text-xs text-gray-500">{app.purpose}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(app.status)}
                      <span className="ml-1.5 text-sm text-gray-900">
                        {getStatusText(app.status)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="font-medium">Başvuru:</span>
                        <span className="ml-1">{new Date(app.createdAt).toLocaleDateString('tr-TR')}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <span className="font-medium">Seyahat:</span>
                        <span className="ml-1">{app.travelDates}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {app.consultant}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getDocumentStatusBadge(app.documents)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="relative inline-block text-left">
                      <button
                        className="text-gray-500 hover:text-gray-700 p-1"
                      >
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredApplications.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">Arama kriterlerinize uygun başvuru bulunamadı.</p>
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
                Toplam <span className="font-medium">{filteredApplications.length}</span> başvuru gösteriliyor
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
    </div>
  );
};

export default ApplicationList;
