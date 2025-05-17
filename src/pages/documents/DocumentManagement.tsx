import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Upload,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  User,
  Calendar,
  Eye,
  Info,
  X,
  ChevronRight
} from 'lucide-react';

// Mock data
const documents = [
  {
    id: 'APP-12345',
    customer: {
      id: '1001',
      name: 'Mehmet Yılmaz'
    },
    country: 'İtalya',
    documentCount: {
      total: 8,
      pending: 2,
      approved: 5,
      rejected: 1
    },
    status: 'inceleme_bekleyen',
    lastUpdate: '2025-04-15'
  },
  {
    id: 'APP-12346',
    customer: {
      id: '1002',
      name: 'Ayşe Demir'
    },
    country: 'Amerika',
    documentCount: {
      total: 6,
      pending: 4,
      approved: 2,
      rejected: 0
    },
    status: 'eksik',
    lastUpdate: '2025-04-14'
  },
  {
    id: 'APP-12347',
    customer: {
      id: '1003',
      name: 'Hakan Koç'
    },
    country: 'Fransa',
    documentCount: {
      total: 7,
      pending: 0,
      approved: 7,
      rejected: 0
    },
    status: 'onaylanan',
    lastUpdate: '2025-04-13'
  }
];

const DocumentManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('inceleme_bekleyen'); // Default olarak "İnceleme Bekleyen"
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'onaylanan':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'inceleme_bekleyen':
        return <Clock className="h-5 w-5 text-amber-600" />;
      case 'reddedilen':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'eksik':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'onaylanan':
        return 'Onaylanan';
      case 'inceleme_bekleyen':
        return 'İnceleme Bekleyen';
      case 'reddedilen':
        return 'Reddedilen';
      case 'eksik':
        return 'Eksik';
      default:
        return status;
    }
  };

  // Filtreleme fonksiyonu
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = searchTerm === '' || 
      doc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || doc.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 md:text-2xl">Evrak Yönetimi</h1>
          <p className="text-gray-600 mt-1">Başvurulara ait evrakları yönetin ve takip edin</p>
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-3 py-2 text-gray-700 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center"
        >
          <Filter className="h-4 w-4 mr-1.5" />
          Filtrele
        </button>
      </div>
      
      {/* Search & Filters */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Başvuru no veya müşteri adı ile arayın..."
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
                  Evrak Durumu
                </label>
                <select 
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">Tümü</option>
                  <option value="eksik">Eksik</option>
                  <option value="inceleme_bekleyen">İnceleme Bekleyen</option>
                  <option value="onaylanan">Onaylanan</option>
                  <option value="reddedilen">Reddedilen</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ülke
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option value="">Tümü</option>
                  <option>İtalya</option>
                  <option>Amerika</option>
                  <option>Fransa</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Son Güncelleme
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option value="">Tümü</option>
                  <option>Bugün</option>
                  <option>Son 7 gün</option>
                  <option>Son 30 gün</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <button 
                onClick={() => {
                  setSelectedStatus('all');
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
        
        {/* Documents Table */}
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
                  Ülke
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Evrak Sayısı
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Son Güncelleme
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link 
                      to={`/applications/${doc.id}`}
                      className="text-sm font-medium text-primary-600 hover:text-primary-700"
                    >
                      {doc.id}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link 
                      to={`/customers/${doc.customer.id}`}
                      className="flex items-center text-sm font-medium text-gray-900 hover:text-primary-600"
                    >
                      <User className="h-4 w-4 mr-1.5 text-gray-500" />
                      {doc.customer.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doc.country}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">
                        {doc.documentCount.total} evrak
                      </span>
                      <div className="flex items-center space-x-2 text-xs">
                        <span className="text-green-600">{doc.documentCount.approved} onaylı</span>
                        <span className="text-amber-600">{doc.documentCount.pending} bekleyen</span>
                        {doc.documentCount.rejected > 0 && (
                          <span className="text-red-600">{doc.documentCount.rejected} reddedilen</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(doc.status)}
                      <span className="ml-1.5 text-sm text-gray-900">
                        {getStatusText(doc.status)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(doc.lastUpdate).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link 
                      to={`/applications/${doc.id}?tab=documents`}
                      className="text-primary-600 hover:text-primary-700"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredDocuments.length === 0 && (
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
                Toplam <span className="font-medium">{filteredDocuments.length}</span> başvuru gösteriliyor
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

export default DocumentManagement;
