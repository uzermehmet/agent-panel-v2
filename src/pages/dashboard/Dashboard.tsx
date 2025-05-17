import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  FileText, 
  Users, 
  Calendar, 
  CheckCircle,
  Clock,
  Search,
  Bell,
  ChevronRight,
  Flag,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  // Stats data
  const stats = [
    {
      title: 'Toplam Başvuru',
      value: '1,234',
      trend: '+8.5%',
      period: 'Son 30 güne göre',
      icon: <FileText className="h-5 w-5 text-blue-600" />,
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Toplam Müşteri',
      value: '956',
      trend: '+12.3%',
      period: 'Son 30 güne göre',
      icon: <Users className="h-5 w-5 text-purple-600" />,
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Randevu Bekleyen',
      value: '45',
      trend: '-5.2%',
      period: 'Son 30 güne göre',
      icon: <Calendar className="h-5 w-5 text-amber-600" />,
      bgColor: 'bg-amber-50'
    },
    {
      title: 'Onaylanan Vize',
      value: '876',
      trend: '+15.7%',
      period: 'Son 30 güne göre',
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      bgColor: 'bg-green-50'
    }
  ];

  // Priority tasks data
  const priorityTasks = [
    { title: 'Acil Evrak Onayı', count: 12, type: 'urgent' },
    { title: 'Bugünün Randevuları', count: 8, type: 'appointment' },
    { title: 'Bugünün Görevleri', count: 15, type: 'task' }
  ];

  // Upcoming appointments data
  const upcomingAppointments = [
    {
      id: 'VZ-2025001',
      customer: 'Ahmet Yılmaz',
      country: { code: 'DE', name: 'Almanya' },
      agency: 'iData',
      category: 'Turistik',
      date: '28.05.2025'
    },
    {
      id: 'VZ-2025002',
      customer: 'Ayşe Demir',
      country: { code: 'IT', name: 'İtalya' },
      agency: 'iData',
      category: 'İş Seyahati',
      date: '29.05.2025'
    },
    {
      id: 'VZ-2025003',
      customer: 'Mehmet Kaya',
      country: { code: 'FR', name: 'Fransa' },
      agency: 'VFS',
      category: 'Turistik',
      date: '01.06.2025'
    }
  ];

  // Pending documents data
  const pendingDocuments = [
    {
      id: 'VZ-2025004',
      customer: 'Zeynep Şahin',
      country: { code: 'GB', name: 'İngiltere' },
      documentCount: 3,
      daysLeft: 5
    },
    {
      id: 'VZ-2025005',
      customer: 'Ali Can',
      country: { code: 'US', name: 'Amerika' },
      documentCount: 5,
      daysLeft: 8
    }
  ];

  // Appointment openings data
  const appointmentOpenings = [
    {
      country: { code: 'DE', name: 'Almanya' },
      agency: 'iData',
      category: 'Turistik',
      openingDate: '25.05.2025',
      dateRange: '10.06.2025 - 30.06.2025'
    },
    {
      country: { code: 'IT', name: 'İtalya' },
      agency: 'iData',
      category: 'İş Seyahati',
      openingDate: '26.05.2025',
      dateRange: '15.06.2025 - 15.07.2025'
    },
    {
      country: { code: 'US', name: 'Amerika' },
      agency: 'AIS',
      category: 'B1/B2 Turistik',
      openingDate: '27.05.2025',
      dateRange: '01.07.2025 - 31.07.2025'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Welcome & Quick Search */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <h1 className="text-lg font-semibold text-gray-900">Hoş geldiniz, {user?.name}</h1>
          <p className="text-sm text-gray-600">Güncel durumu ve öncelikli görevleri takip edin</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="TC Kimlik No, Pasaport No, Başvuru No, Telefon"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                {stat.icon}
              </div>
              <span className={`text-sm ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend}
              </span>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-sm text-gray-600">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Priority Tasks */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Öncelikli Görevler</h2>
            <div className="space-y-2">
              {priorityTasks.map((task, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    task.type === 'urgent'
                      ? 'bg-red-50 text-red-700'
                      : task.type === 'appointment'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-blue-50 text-blue-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{task.title}</span>
                    <span className="text-sm font-semibold">{task.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-900">Bildirimler</h2>
              <a href="#" className="text-xs text-primary-600 hover:text-primary-700">Tümünü Gör</a>
            </div>
            <div className="space-y-3">
              <div className="flex items-start p-2 hover:bg-gray-50 rounded-lg">
                <Bell className="h-4 w-4 text-primary-600 mt-0.5" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Yeni Randevu Açılışı</p>
                  <p className="text-xs text-gray-500 mt-0.5">Almanya Schengen vizesi için yeni randevu tarihleri açıldı</p>
                  <span className="text-xs text-gray-400 mt-1">10 dk önce</span>
                </div>
              </div>
              <div className="flex items-start p-2 hover:bg-gray-50 rounded-lg">
                <Bell className="h-4 w-4 text-primary-600 mt-0.5" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Evrak Eksikliği</p>
                  <p className="text-xs text-gray-500 mt-0.5">Ahmet Yılmaz'ın başvurusunda eksik evrak bulundu</p>
                  <span className="text-xs text-gray-400 mt-1">2 saat önce</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Upcoming Appointments */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-900">Yaklaşan Müşteri Randevuları</h2>
              <a href="#" className="text-xs text-primary-600 hover:text-primary-700">Tümünü Gör</a>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="text-xs font-medium text-gray-500 uppercase">
                    <th className="py-2 text-left">Başvuru No</th>
                    <th className="py-2 text-left">Müşteri</th>
                    <th className="py-2 text-left">Ülke</th>
                    <th className="py-2 text-left">Tarih</th>
                    <th className="py-2 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {upcomingAppointments.map((appointment) => (
                    <tr key={appointment.id} className="text-sm">
                      <td className="py-2 text-primary-600">{appointment.id}</td>
                      <td className="py-2 text-gray-900">{appointment.customer}</td>
                      <td className="py-2">
                        <div className="flex items-center">
                          <span className="text-xs font-medium bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                            {appointment.country.code}
                          </span>
                          <span className="ml-2 text-gray-600">{appointment.country.name}</span>
                        </div>
                      </td>
                      <td className="py-2 text-gray-600">{appointment.date}</td>
                      <td className="py-2 text-right">
                        <ChevronRight className="h-4 w-4 text-gray-400 inline-block" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pending Documents */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-900">İnceleme Bekleyen Evraklar</h2>
              <a href="#" className="text-xs text-primary-600 hover:text-primary-700">Tümünü Gör</a>
            </div>
            <div className="space-y-2">
              {pendingDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <span className="text-xs font-medium bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                        {doc.country.code}
                      </span>
                      <span className="ml-2 text-sm text-gray-900">{doc.customer}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">{doc.documentCount} evrak</span>
                    <span className="text-sm text-red-600">{doc.daysLeft} gün kaldı</span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Appointment Openings */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-900">Randevu Açılışları</h2>
              <a href="#" className="text-xs text-primary-600 hover:text-primary-700">Tümünü Gör</a>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="text-xs font-medium text-gray-500 uppercase">
                    <th className="py-2 text-left">Ülke</th>
                    <th className="py-2 text-left">Aracı Kuruluş</th>
                    <th className="py-2 text-left">Kategori</th>
                    <th className="py-2 text-left">Açılış Tarihi</th>
                    <th className="py-2 text-left">Tarih Aralığı</th>
                    <th className="py-2 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {appointmentOpenings.map((opening, index) => (
                    <tr key={index} className="text-sm">
                      <td className="py-2">
                        <div className="flex items-center">
                          <span className="text-xs font-medium bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                            {opening.country.code}
                          </span>
                          <span className="ml-2 text-gray-600">{opening.country.name}</span>
                        </div>
                      </td>
                      <td className="py-2 text-gray-600">{opening.agency}</td>
                      <td className="py-2 text-gray-600">{opening.category}</td>
                      <td className="py-2 text-gray-600">{opening.openingDate}</td>
                      <td className="py-2 text-gray-600">{opening.dateRange}</td>
                      <td className="py-2 text-right">
                        <ChevronRight className="h-4 w-4 text-gray-400 inline-block" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
