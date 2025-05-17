import React from 'react';

interface CustomerData {
  idNumber: string;
  passportNumber: string;
  birthDate: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
  occupation: string;
  reference: string;
}

interface ProfileTabProps {
  data: CustomerData;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Kişisel Bilgiler</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">T.C. Kimlik No</p>
            <p className="font-medium">{data.idNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Pasaport No</p>
            <p className="font-medium">{data.passportNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Doğum Tarihi</p>
            <p className="font-medium">{new Date(data.birthDate).toLocaleDateString('tr-TR')}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Cinsiyet</p>
            <p className="font-medium">{data.gender}</p>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">İletişim Bilgileri</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">E-posta Adresi</p>
            <p className="font-medium">{data.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Telefon</p>
            <p className="font-medium">{data.phone}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-500 mb-1">Adres</p>
            <p className="font-medium">{data.address}</p>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Diğer Bilgiler</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Meslek</p>
            <p className="font-medium">{data.occupation}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Referans</p>
            <p className="font-medium">{data.reference || 'Belirtilmemiş'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
