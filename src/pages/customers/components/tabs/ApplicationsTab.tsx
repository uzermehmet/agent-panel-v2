import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, ChevronRight } from 'lucide-react';

interface Application {
  id: string;
  country: string;
  purpose: string;
  status: string;
  date: string;
  documents: string;
  appointment: string;
}

interface ApplicationsTabProps {
  applications: Application[];
  customerId: string;
}

const ApplicationsTab: React.FC<ApplicationsTabProps> = ({ applications, customerId }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Başvurular</h2>
        <button 
          onClick={() => navigate(`/applications/create?customerId=${customerId}`)}
          className="px-3 py-1.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 flex items-center"
        >
          <Plus className="h-4 w-4 mr-1.5" />
          Yeni Başvuru
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Başvuru No
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ülke / Amaç
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Durum
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tarih
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Evraklar
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Randevu
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {applications.map((app) => (
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
                  <div className="text-sm font-medium text-gray-900">{app.country}</div>
                  <div className="text-sm text-gray-500">{app.purpose}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    app.status === 'Onaylandı' 
                      ? 'bg-green-100 text-green-800'
                      : app.status === 'Değerlendirmede'
                      ? 'bg-blue-100 text-blue-800'
                      : app.status === 'Evrak Bekleniyor'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {app.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(app.date).toLocaleDateString('tr-TR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    app.documents === 'Tamamlandı' 
                      ? 'bg-green-100 text-green-800'
                      : app.documents === 'Eksik'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {app.documents}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    app.appointment === 'Tamamlandı' 
                      ? 'bg-green-100 text-green-800'
                      : app.appointment === 'Planlandı'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {app.appointment}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link 
                    to={`/applications/${app.id}`}
                    className="text-primary-600 hover:text-primary-700"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationsTab;
