import React from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, Home, Briefcase, Calendar } from 'lucide-react';

interface ApplicationData {
  id: string;
  status: string;
  customer: {
    id: string;
    name: string;
  };
  country: string;
  purpose: string;
  createdAt: string;
  visaType: string;
  entryType: string;
  travelDates: string;
  participants: Array<{
    id: string;
    firstName: string;
    lastName: string;
    relationship: string;
    passportNumber: string;
  }>;
  consultant: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
}

interface OverviewTabProps {
  data: ApplicationData;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Başvuru Bilgileri</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-md font-medium text-gray-900 mb-4">Başvuru Detayları</h3>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Başvuru No</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900">{data.id}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Oluşturulma Tarihi</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900">
                  {new Date(data.createdAt).toLocaleDateString('tr-TR')}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Ülke</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900">{data.country}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Seyahat Amacı</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900">{data.purpose}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Vize Tipi</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900">
                  {data.visaType === 'short_term' ? 'Kısa Süreli (Schengen)' : 'Uzun Süreli (Ulusal)'}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Giriş Tipi</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900">
                  {data.entryType === 'single' ? 'Tek Giriş' : data.entryType === 'double' ? 'Çift Giriş' : 'Çoklu Giriş'}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Seyahat Tarihleri</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900">{data.travelDates}</dd>
              </div>
            </dl>
          </div>
          
          <div>
            <h3 className="text-md font-medium text-gray-900 mb-4">Müşteri Bilgileri</h3>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Ad Soyad</dt>
                <dd className="mt-1 text-sm font-medium text-primary-600">
                  <Link to={`/customers/${data.customer.id}`}>
                    {data.customer.name}
                  </Link>
                </dd>
              </div>
              
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Müşteri No</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900">{data.customer.id}</dd>
              </div>
            </dl>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-md font-medium text-gray-900 mb-4">Katılımcılar</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ad Soyad
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pasaport No
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İlişki
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.participants.map((participant) => (
                  <tr key={participant.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {participant.firstName} {participant.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {participant.passportNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {participant.relationship}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-md font-medium text-gray-900 mb-4">Atanan Danışman</h3>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-3">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Ad Soyad</dt>
              <dd className="mt-1 text-sm font-medium text-gray-900">{data.consultant.name}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">E-posta</dt>
              <dd className="mt-1 text-sm font-medium text-gray-900">{data.consultant.email}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Telefon</dt>
              <dd className="mt-1 text-sm font-medium text-gray-900">{data.consultant.phone}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
