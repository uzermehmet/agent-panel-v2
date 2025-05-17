import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  UserCheck, 
  FileText, 
  CalendarClock, 
  MoreHorizontal,
  Download
} from 'lucide-react';

// Mock customer data
const initialCustomers = [
  {
    id: '1001',
    firstName: 'Mehmet',
    lastName: 'Yılmaz',
    email: 'mehmet.yilmaz@example.com',
    phone: '+90 555 123 4567',
    applicationCount: 3,
    lastApplication: '2025-04-28',
    assignedTo: 'Ali Veli'
  },
  {
    id: '1002',
    firstName: 'Ayşe',
    lastName: 'Demir',
    email: 'ayse.demir@example.com',
    phone: '+90 532 987 6543',
    applicationCount: 1,
    lastApplication: '2025-04-25',
    assignedTo: 'Zeynep Kaya'
  },
  {
    id: '1003',
    firstName: 'Mustafa',
    lastName: 'Şahin',
    email: 'mustafa.sahin@example.com',
    phone: '+90 505 456 7890',
    applicationCount: 2,
    lastApplication: '2025-04-20',
    assignedTo: 'Ali Veli'
  },
  {
    id: '1004',
    firstName: 'Zeynep',
    lastName: 'Kaya',
    email: 'zeynep.kaya@example.com',
    phone: '+90 542 345 6789',
    applicationCount: 0,
    lastApplication: null,
    assignedTo: null
  },
  {
    id: '1005',
    firstName: 'Ahmet',
    lastName: 'Çelik',
    email: 'ahmet.celik@example.com',
    phone: '+90 533 765 4321',
    applicationCount: 4,
    lastApplication: '2025-04-30',
    assignedTo: 'Beyza Yıldız'
  },
  {
    id: '1006',
    firstName: 'Ebru',
    lastName: 'Koç',
    email: 'ebru.koc@example.com',
    phone: '+90 554 234 5678',
    applicationCount: 1,
    lastApplication: '2025-04-15',
    assignedTo: 'Ali Veli'
  },
  {
    id: '1007',
    firstName: 'Hakan',
    lastName: 'Özkan',
    email: 'hakan.ozkan@example.com',
    phone: '+90 506 876 5432',
    applicationCount: 2,
    lastApplication: '2025-04-18',
    assignedTo: 'Zeynep Kaya'
  }
];

const CustomerList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState(initialCustomers);
  const [filteredCustomers, setFilteredCustomers] = useState(initialCustomers);
  const [showFilters, setShowFilters] = useState(false);
  
  // Simple filtering based on search term
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredCustomers(customers);
    } else {
      const filtered = customers.filter(customer => 
        customer.firstName.toLowerCase().includes(term.toLowerCase()) ||
        customer.lastName.toLowerCase().includes(term.toLowerCase()) ||
        customer.email.toLowerCase().includes(term.toLowerCase()) ||
        customer.phone.includes(term)
      );
      setFilteredCustomers(filtered);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 md:text-2xl">Müşteriler</h1>
          <p className="text-gray-600 mt-1">Tüm müşteri verilerini yönetin ve görüntüleyin</p>
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
            onClick={() => navigate('/customers/create')}
            className="px-3 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 flex items-center transition-colors"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Yeni Müşteri
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
              placeholder="İsim, e-posta veya telefon ile ara..."
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
                  Atanan Danışman
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option value="">Tümü</option>
                  <option>Ali Veli</option>
                  <option>Zeynep Kaya</option>
                  <option>Beyza Yıldız</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Başvuru Durumu
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option value="">Tümü</option>
                  <option>Aktif Başvuru Var</option>
                  <option>Başvuru Yok</option>
                  <option>Onaylanmış Başvuru</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Son İşlem Tarihi
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option value="">Tümü</option>
                  <option>Son 7 gün</option>
                  <option>Son 30 gün</option>
                  <option>Son 90 gün</option>
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
        
        {/* Customers Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Müşteri
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İletişim Bilgileri
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Başvurular
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Son İşlem
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Atanan Danışman
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-800 font-medium">
                        {customer.firstName.charAt(0)}{customer.lastName.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <Link 
                          to={`/customers/${customer.id}`}
                          className="text-sm font-medium text-gray-900 hover:text-primary-600"
                        >
                          {customer.firstName} {customer.lastName}
                        </Link>
                        <div className="text-sm text-gray-500">
                          ID: {customer.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.email}</div>
                    <div className="text-sm text-gray-500">{customer.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <FileText className="h-4 w-4 mr-1.5 text-primary-600" />
                      {customer.applicationCount} başvuru
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <CalendarClock className="h-4 w-4 mr-1.5 text-gray-400" />
                      {customer.lastApplication ? (
                        new Date(customer.lastApplication).toLocaleDateString('tr-TR')
                      ) : (
                        'Henüz başvuru yok'
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {customer.assignedTo ? (
                      <div className="flex items-center text-sm text-gray-900">
                        <UserCheck className="h-4 w-4 mr-1.5 text-green-600" />
                        {customer.assignedTo}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Atanmamış</span>
                    )}
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
          
          {filteredCustomers.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">Arama kriterlerinize uygun müşteri bulunamadı.</p>
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
                Toplam <span className="font-medium">{filteredCustomers.length}</span> müşteri gösteriliyor
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

export default CustomerList;
