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
  X
} from 'lucide-react';

// Mock data
const documents = [
  {
    id: 'DOC-001',
    name: 'Pasaport',
    type: 'identity',
    required: true,
    customer: {
      id: '1001',
      name: 'Mehmet Yılmaz'
    },
    application: {
      id: 'APP-12345',
      country: 'İtalya'
    },
    participant: 'Mehmet Yılmaz',
    status: 'approved',
    uploadedBy: 'Müşteri',
    uploadedAt: '2025-04-11',
    dueDate: '2025-04-25',
    version: 1,
    notes: 'Fotoğraf arka fonu beyaz olmalı',
    history: [
      { action: 'upload', user: 'Müşteri', date: '2025-04-11 10:30' },
      { action: 'review', user: 'Ali Veli', date: '2025-04-11 11:30' },
      { action: 'approve', user: 'Ali Veli', date: '2025-04-11 11:35' }
    ]
  },
  {
    id: 'DOC-002',
    name: 'Banka Hesap Özeti',
    type: 'financial',
    required: true,
    customer: {
      id: '1002',
      name: 'Ayşe Demir'
    },
    application: {
      id: 'APP-12346',
      country: 'Amerika'
    },
    participant: 'Ayşe Demir',
    status: 'pending',
    uploadedBy: 'Müşteri',
    uploadedAt: '2025-04-12',
    dueDate: '2025-04-26',
    version: 2,
    notes: 'Son 3 aylık hesap hareketlerini içermeli',
    history: [
      { action: 'upload', user: 'Müşteri', date: '2025-04-12 09:30' },
      { action: 'reject', user: 'Zeynep Kaya', date: '2025-04-12 10:30', reason: 'Eksik dönem' },
      { action: 'upload', user: 'Müşteri', date: '2025-04-12 11:30' }
    ]
  },
  {
    id: 'DOC-003',
    name: 'Otel Rezervasyonu',
    type: 'travel',
    required: true,
    customer: {
      id: '1003',
      name: 'Hakan Koç'
    },
    application: {
      id: 'APP-12347',
      country: 'Fransa'
    },
    participant: 'Hakan Koç',
    status: 'missing',
    uploadedBy: null,
    uploadedAt: null,
    dueDate: '2025-04-28',
    version: 0,
    notes: 'Tüm seyahat süresini kapsamalı',
    history: []
  }
];

const DocumentList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [showHistory, setShowHistory] = useState(false);
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-amber-600" />;
      case 'missing':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Onaylandı';
      case 'rejected':
        return 'Reddedildi';
      case 'pending':
        return 'İnceleniyor';
      case 'missing':
        return 'Eksik';
      default:
        return status;
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'missing':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'upload':
        return 'text-blue-600';
      case 'approve':
        return 'text-green-600';
      case 'reject':
        return 'text-red-600';
      case 'review':
        return 'text-amber-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 md:text-2xl">Evraklar</h1>
          <p className="text-gray-600 mt-1">Tüm başvuru evraklarını yönetin ve takip edin</p>
        </div>
      </div>
      
      {/* Search & Filters */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Evrak adı, müşteri veya başvuru ile ara..."
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
                  Durum
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option value="">Tümü</option>
                  <option value="approved">Onaylandı</option>
                  <option value="pending">İnceleniyor</option>
                  <option value="rejected">Reddedildi</option>
                  <option value="missing">Eksik</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Evrak Tipi
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option value="">Tümü</option>
                  <option value="identity">Kimlik</option>
                  <option value="financial">Finansal</option>
                  <option value="travel">Seyahat</option>
                  <option value="other">Diğer</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teslim Tarihi
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option value="">Tümü</option>
                  <option>Bugün</option>
                  <option>Bu Hafta</option>
                  <option>Bu Ay</option>
                  <option>Geçmiş</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <button className="px-3 py-1 text-primary-600 hover:text-primary-700 text-sm font-medium">
                Filtreleri Temizle
              </button>
              <button className="ml-3 px-3 py-1 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700">
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
                  Evrak
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Müşteri / Başvuru
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Katılımcı
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Yükleyen
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Son Tarih
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900">{doc.name}</span>
                          {doc.required && (
                            <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                              Zorunlu
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">{doc.id}</div>
                        {doc.notes && (
                          <div className="flex items-center mt-1 text-xs text-gray-500">
                            <Info className="h-3 w-3 mr-1" />
                            {doc.notes}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <Link 
                        to={`/customers/${doc.customer.id}`}
                        className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center"
                      >
                        <User className="h-4 w-4 mr-1.5" />
                        {doc.customer.name}
                      </Link>
                      <Link
                        to={`/applications/${doc.application.id}`}
                        className="text-sm text-gray-500 mt-1 hover:text-gray-700"
                      >
                        {doc.application.id} ({doc.application.country})
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {doc.participant}
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
                    {doc.uploadedBy || '—'}
                    {doc.uploadedAt && (
                      <div className="text-xs text-gray-400">
                        {new Date(doc.uploadedAt).toLocaleDateString('tr-TR')}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-1.5 text-gray-400" />
                      {new Date(doc.dueDate).toLocaleDateString('tr-TR')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      {doc.status !== 'missing' && (
                        <button 
                          className="text-primary-600 hover:text-primary-800"
                          onClick={() => {
                            setSelectedDocument(doc);
                            setShowHistory(true);
                          }}
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                      )}
                      
                      {doc.status === 'pending' && (
                        <>
                          <button className="text-green-600 hover:text-green-800">
                            <CheckCircle className="h-5 w-5" />
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            <XCircle className="h-5 w-5" />
                          </button>
                        </>
                      )}
                      
                      {doc.status === 'missing' && (
                        <button className="text-primary-600 hover:text-primary-800">
                          <Upload className="h-5 w-5" />
                        </button>
                      )}
                      
                      {doc.status !== 'missing' && (
                        <button className="text-primary-600 hover:text-primary-800">
                          <Download className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {documents.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">Arama kriterlerinize uygun evrak bulunamadı.</p>
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
                Toplam <span className="font-medium">{documents.length}</span> evrak gösteriliyor
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

      {/* Document History Modal */}
      {showHistory && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Evrak Geçmişi</h3>
                <button
                  onClick={() => setShowHistory(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mb-4">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${getStatusBadgeColor(selectedDocument.status)}`}>
                  {getStatusIcon(selectedDocument.status)}
                  <span className="ml-2">{getStatusText(selectedDocument.status)}</span>
                </div>
              </div>

              <div className="space-y-4">
                {selectedDocument.history.map((event: any, index: number) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActionColor(event.action)} bg-opacity-10`}>
                        {event.action === 'upload' && <Upload className="w-4 h-4" />}
                        {event.action === 'approve' && <CheckCircle className="w-4 h-4" />}
                        {event.action === 'reject' && <XCircle className="w-4 h-4" />}
                        {event.action === 'review' && <Eye className="w-4 h-4" />}
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {event.user}
                        </p>
                        <span className="text-sm text-gray-500">{event.date}</span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {event.action === 'upload' && 'Evrak yüklendi'}
                        {event.action === 'approve' && 'Evrak onaylandı'}
                        {event.action === 'reject' && `Evrak reddedildi${event.reason ? `: ${event.reason}` : ''}`}
                        {event.action === 'review' && 'Evrak incelendi'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 rounded-b-lg border-t">
              <button
                onClick={() => setShowHistory(false)}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentList;
