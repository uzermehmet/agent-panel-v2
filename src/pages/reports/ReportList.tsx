import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Globe,
  Download,
  Calendar,
  Filter,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  FileCheck,
  Plane,
  DollarSign
} from 'lucide-react';

// Mock data
const performanceData = {
  totalApplications: 346,
  approvedApplications: 289,
  rejectedApplications: 32,
  pendingApplications: 25,
  approvalRate: 84,
  monthlyTrend: '+12%',
  countryStats: [
    { country: 'İtalya', count: 98, trend: '+15%', status: 'up' },
    { country: 'Amerika', count: 76, trend: '+8%', status: 'up' },
    { country: 'Fransa', count: 65, trend: '-3%', status: 'down' },
    { country: 'Yunanistan', count: 45, trend: '+5%', status: 'up' },
    { country: 'Macaristan', count: 32, trend: '+10%', status: 'up' }
  ],
  monthlyStats: [
    { month: 'Ocak', applications: 24, approved: 20, revenue: 48000 },
    { month: 'Şubat', applications: 32, approved: 28, revenue: 56000 },
    { month: 'Mart', applications: 28, approved: 25, revenue: 50000 },
    { month: 'Nisan', applications: 35, approved: 30, revenue: 60000 },
    { month: 'Mayıs', applications: 42, approved: 38, revenue: 76000 },
    { month: 'Haziran', applications: 38, approved: 35, revenue: 70000 }
  ],
  customerStats: {
    total: 245,
    new: 28,
    returning: 42,
    trend: '+8%'
  },
  visaTypes: [
    { type: 'Turist', count: 156, percentage: 45 },
    { type: 'İş', count: 87, percentage: 25 },
    { type: 'Öğrenci', count: 62, percentage: 18 },
    { type: 'Aile Ziyareti', count: 41, percentage: 12 }
  ],
  processingTimes: {
    average: 12,
    min: 7,
    max: 21,
    trend: '-2'
  },
  consultantPerformance: [
    { name: 'Ali Veli', applications: 45, approved: 42, rate: 93 },
    { name: 'Zeynep Kaya', applications: 38, approved: 35, rate: 92 },
    { name: 'Mehmet Demir', applications: 32, approved: 28, rate: 87 },
    { name: 'Ayşe Yılmaz', applications: 29, approved: 25, rate: 86 }
  ]
};

const ReportList: React.FC = () => {
  const [dateRange, setDateRange] = useState('this_month');
  const [showFilters, setShowFilters] = useState(false);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 md:text-2xl">Raporlar</h1>
          <p className="text-gray-600 mt-1">Başvuru ve müşteri istatistiklerini görüntüleyin</p>
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
            className="px-3 py-2 text-gray-700 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center"
          >
            <Download className="h-4 w-4 mr-1.5" />
            Dışa Aktar
          </button>
        </div>
      </div>
      
      {/* Filters */}
      {showFilters && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tarih Aralığı
              </label>
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="today">Bugün</option>
                <option value="this_week">Bu Hafta</option>
                <option value="this_month">Bu Ay</option>
                <option value="last_month">Geçen Ay</option>
                <option value="last_3_months">Son 3 Ay</option>
                <option value="this_year">Bu Yıl</option>
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
                <option>Yunanistan</option>
                <option>Macaristan</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vize Tipi
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                <option value="">Tümü</option>
                <option>Turist</option>
                <option>İş</option>
                <option>Öğrenci</option>
                <option>Aile Ziyareti</option>
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
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Applications */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Toplam Başvuru</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{performanceData.totalApplications}</p>
            </div>
            <div className="h-12 w-12 bg-primary-50 rounded-full flex items-center justify-center">
              <FileText className="h-6 w-6 text-primary-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">{performanceData.monthlyTrend}</span>
            <span className="text-gray-500 ml-1.5">geçen aya göre</span>
          </div>
        </div>

        {/* Approval Rate */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Onay Oranı</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">%{performanceData.approvalRate}</p>
            </div>
            <div className="h-12 w-12 bg-green-50 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${performanceData.approvalRate}%` }}
              ></div>
            </div>
            <span className="ml-2 text-gray-500">{performanceData.approvedApplications} onaylı</span>
          </div>
        </div>

        {/* Processing Time */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ortalama Süre</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{performanceData.processingTimes.average} gün</p>
            </div>
            <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">{performanceData.processingTimes.trend} gün</span>
            <span className="text-gray-500 ml-1.5">geçen aya göre</span>
          </div>
        </div>

        {/* Customer Stats */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Aktif Müşteri</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{performanceData.customerStats.total}</p>
            </div>
            <div className="h-12 w-12 bg-purple-50 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-gray-500">
              {performanceData.customerStats.new} yeni
            </span>
            <span className="text-gray-500">
              {performanceData.customerStats.returning} tekrar
            </span>
            <span className="text-green-600 font-medium">
              {performanceData.customerStats.trend} ↑
            </span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Applications Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Aylık Başvurular</h2>
            <select className="text-sm border border-gray-300 rounded-md p-1">
              <option>Son 6 Ay</option>
              <option>Son 12 Ay</option>
            </select>
          </div>
          
          <div className="space-y-4">
            {performanceData.monthlyStats.map(stat => (
              <div key={stat.month} className="flex items-center">
                <div className="w-20 text-sm text-gray-600">{stat.month}</div>
                <div className="flex-1">
                  <div className="h-4 flex rounded-full overflow-hidden bg-gray-100">
                    <div 
                      className="bg-primary-500" 
                      style={{ width: `${(stat.approved / stat.applications) * 100}%` }}
                    ></div>
                    <div 
                      className="bg-gray-300" 
                      style={{ width: `${((stat.applications - stat.approved) / stat.applications) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-32 text-right">
                  <span className="text-sm font-medium text-gray-900">{stat.applications}</span>
                  <span className="text-sm text-gray-500 ml-1">başvuru</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-primary-500 rounded-full mr-2"></div>
                <span className="text-gray-600">Onaylanan</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
                <span className="text-gray-600">Diğer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Country Stats */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Ülkelere Göre Başvurular</h2>
            <select className="text-sm border border-gray-300 rounded-md p-1">
              <option>Bu Ay</option>
              <option>Son 3 Ay</option>
              <option>Bu Yıl</option>
            </select>
          </div>
          
          <div className="space-y-4">
            {performanceData.countryStats.map(country => (
              <div key={country.country} className="flex items-center">
                <div className="w-24 flex items-center">
                  <Globe className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">{country.country}</span>
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-primary-500 rounded-full"
                      style={{ width: `${(country.count / performanceData.countryStats[0].count) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-32 flex items-center justify-end">
                  <span className="text-sm font-medium text-gray-900 mr-2">{country.count}</span>
                  <div className={`flex items-center ${
                    country.status === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {country.status === 'up' ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    <span className="text-sm ml-1">{country.trend}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visa Types Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Vize Tipi Dağılımı</h2>
          <div className="space-y-4">
            {performanceData.visaTypes.map(type => (
              <div key={type.type} className="flex items-center">
                <div className="w-24 flex items-center">
                  <Plane className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">{type.type}</span>
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-primary-500 rounded-full"
                      style={{ width: `${type.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-32 text-right">
                  <span className="text-sm font-medium text-gray-900">{type.count}</span>
                  <span className="text-sm text-gray-500 ml-1">(%{type.percentage})</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Consultant Performance */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Danışman Performansı</h2>
          <div className="space-y-4">
            {performanceData.consultantPerformance.map(consultant => (
              <div key={consultant.name} className="flex items-center">
                <div className="w-32 flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-medium text-sm">
                    {consultant.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="text-sm text-gray-900 ml-2">{consultant.name}</span>
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-green-500 rounded-full"
                      style={{ width: `${consultant.rate}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-32 text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {consultant.approved}/{consultant.applications}
                  </div>
                  <div className="text-sm text-green-600">
                    %{consultant.rate} başarı
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Gelir Analizi</h2>
          <select className="text-sm border border-gray-300 rounded-md p-1">
            <option>Son 6 Ay</option>
            <option>Son 12 Ay</option>
            <option>Bu Yıl</option>
          </select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-green-600" />
                <span className="ml-2 text-sm font-medium text-green-900">Toplam Gelir</span>
              </div>
              <span className="text-green-600">+12%</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-green-900">₺360,000</p>
            <p className="mt-1 text-sm text-green-600">son 6 ay</p>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileCheck className="h-5 w-5 text-blue-600" />
                <span className="ml-2 text-sm font-medium text-blue-900">Ortalama Gelir</span>
              </div>
              <span className="text-blue-600">+8%</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-blue-900">₺60,000</p>
            <p className="mt-1 text-sm text-blue-600">aylık</p>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-purple-600" />
                <span className="ml-2 text-sm font-medium text-purple-900">Müşteri Başına</span>
              </div>
              <span className="text-purple-600">+5%</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-purple-900">₺2,400</p>
            <p className="mt-1 text-sm text-purple-600">ortalama</p>
          </div>
        </div>
        
        <div className="space-y-4">
          {performanceData.monthlyStats.map(stat => (
            <div key={stat.month} className="flex items-center">
              <div className="w-20 text-sm text-gray-600">{stat.month}</div>
              <div className="flex-1">
                <div className="h-4 flex rounded-full overflow-hidden bg-gray-100">
                  <div 
                    className="bg-green-500" 
                    style={{ width: `${(stat.revenue / 76000) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-32 text-right">
                <span className="text-sm font-medium text-gray-900">₺{stat.revenue.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportList;
