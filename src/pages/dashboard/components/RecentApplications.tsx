import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock, AlertCircle, XCircle } from 'lucide-react';

const RecentApplications: React.FC = () => {
  // Mock data for demonstration
  const applications = [
    {
      id: 'APP-12345',
      customer: 'Mehmet Yılmaz',
      country: 'İtalya',
      status: 'approved',
      date: '02.05.2025',
    },
    {
      id: 'APP-12346',
      customer: 'Ayşe Demir',
      country: 'Amerika',
      status: 'pending',
      date: '01.05.2025',
    },
    {
      id: 'APP-12347',
      customer: 'Hakan Koç',
      country: 'Fransa',
      status: 'rejected',
      date: '30.04.2025',
    },
    {
      id: 'APP-12348',
      customer: 'Zeynep Aksoy',
      country: 'Yunanistan',
      status: 'processing',
      date: '29.04.2025',
    },
    {
      id: 'APP-12349',
      customer: 'Can Özkan',
      country: 'Macaristan',
      status: 'pending',
      date: '28.04.2025',
    },
  ];

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

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Başvuru
            </th>
            <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Müşteri
            </th>
            <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ülke
            </th>
            <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Durum
            </th>
            <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tarih
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {applications.map((app) => (
            <tr key={app.id} className="hover:bg-gray-50">
              <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-primary-600">
                <Link to={`/applications/${app.id}`}>{app.id}</Link>
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800">
                {app.customer}
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600">
                {app.country}
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-sm">
                <div className="flex items-center">
                  {getStatusIcon(app.status)}
                  <span className="ml-1.5">{getStatusText(app.status)}</span>
                </div>
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600">
                {app.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="mt-4 text-right">
        <Link 
          to="/applications" 
          className="text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          Tüm başvuruları görüntüle
        </Link>
      </div>
    </div>
  );
};

export default RecentApplications;
