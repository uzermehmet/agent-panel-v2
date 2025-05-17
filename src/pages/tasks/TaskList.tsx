import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  CheckSquare,
  Clock,
  AlertCircle,
  XCircle,
  Calendar,
  Tag,
  User,
  Edit,
  Trash
} from 'lucide-react';

// Mock data
const tasks = [
  {
    id: 'TSK-001',
    title: 'Vize başvuru evraklarını kontrol et',
    description: 'Mehmet Yılmaz\'ın İtalya vize başvurusu için evrakları kontrol edilecek',
    dueDate: '2025-05-01',
    status: 'open',
    tags: ['evrak', 'kontrol'],
    customer: {
      id: 'CUS-001',
      name: 'Mehmet Yılmaz'
    },
    createdAt: '2025-04-15'
  },
  {
    id: 'TSK-002',
    title: 'Randevu takibi',
    description: 'Ayşe Demir\'in konsolosluk randevusu için hatırlatma',
    dueDate: '2025-05-03',
    status: 'in_progress',
    tags: ['randevu', 'takip'],
    customer: {
      id: 'CUS-002',
      name: 'Ayşe Demir'
    },
    createdAt: '2025-04-16'
  },
  {
    id: 'TSK-003',
    title: 'Sigorta poliçesi yenileme',
    description: 'Seyahat sigortası poliçelerinin yenilenmesi gerekiyor',
    dueDate: '2025-05-05',
    status: 'completed',
    tags: ['sigorta', 'yenileme'],
    customer: null,
    createdAt: '2025-04-17'
  }
];

const TaskList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckSquare className="h-5 w-5 text-green-600" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-amber-600" />;
      case 'open':
        return <AlertCircle className="h-5 w-5 text-blue-600" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Tamamlandı';
      case 'in_progress':
        return 'Devam Ediyor';
      case 'open':
        return 'Açık';
      case 'cancelled':
        return 'İptal Edildi';
      default:
        return status;
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-amber-100 text-amber-800';
      case 'open':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 md:text-2xl">Görevler</h1>
          <p className="text-gray-600 mt-1">Görevlerinizi yönetin ve takip edin</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-3 py-2 text-gray-700 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center"
          >
            <Filter className="h-4 w-4 mr-1.5" />
            Filtrele
          </button>
          
          <Link
            to="/tasks/create"
            className="px-3 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 flex items-center transition-colors"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Yeni Görev
          </Link>
        </div>
      </div>
      
      {/* Search & Filters */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Görev başlığı veya açıklama ile ara..."
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
                <select 
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">Tümü</option>
                  <option value="open">Açık</option>
                  <option value="in_progress">Devam Ediyor</option>
                  <option value="completed">Tamamlandı</option>
                  <option value="cancelled">İptal Edildi</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Son Tarih
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option value="all">Tümü</option>
                  <option value="today">Bugün</option>
                  <option value="tomorrow">Yarın</option>
                  <option value="this_week">Bu Hafta</option>
                  <option value="next_week">Gelecek Hafta</option>
                  <option value="overdue">Gecikmiş</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Etiket
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option value="">Tümü</option>
                  <option value="evrak">Evrak</option>
                  <option value="randevu">Randevu</option>
                  <option value="kontrol">Kontrol</option>
                  <option value="takip">Takip</option>
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
        
        {/* Tasks Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Görev
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Müşteri
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Son Tarih
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Etiketler
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {task.title}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {task.customer ? (
                      <Link 
                        to={`/customers/${task.customer.id}`}
                        className="flex items-center text-sm text-primary-600 hover:text-primary-700"
                      >
                        <User className="h-4 w-4 mr-1.5" />
                        {task.customer.name}
                      </Link>
                    ) : (
                      <span className="text-sm text-gray-500">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar className="h-4 w-4 mr-1.5 text-gray-400" />
                      {new Date(task.dueDate).toLocaleDateString('tr-TR')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(task.status)}
                      <span className={`ml-1.5 text-sm px-2 py-1 rounded-full ${getStatusBadgeColor(task.status)}`}>
                        {getStatusText(task.status)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {task.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link
                        to={`/tasks/edit/${task.id}`}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Edit className="h-5 w-5" />
                      </Link>
                      <button 
                        onClick={() => {}}
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
          
          {tasks.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">Görev bulunamadı.</p>
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
                Toplam <span className="font-medium">{tasks.length}</span> görev gösteriliyor
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

export default TaskList;
