import React from 'react';
import { Link } from 'react-router-dom';
import { File, AlertCircle } from 'lucide-react';

const PendingDocuments: React.FC = () => {
  // Mock data for demonstration
  const documents = [
    {
      id: 'DOC-2001',
      name: 'Pasaport',
      customer: 'Merve Kaya',
      applicationId: 'APP-12360',
      daysLeft: 2,
      critical: true,
    },
    {
      id: 'DOC-2002',
      name: 'Banka Hesap Özeti',
      customer: 'Oğuz Demir',
      applicationId: 'APP-12361',
      daysLeft: 3,
      critical: true,
    },
    {
      id: 'DOC-2003',
      name: 'Konaklama Belgesi',
      customer: 'Selin Yıldız',
      applicationId: 'APP-12362',
      daysLeft: 5,
      critical: false,
    },
    {
      id: 'DOC-2004',
      name: 'Vize Başvuru Formu',
      customer: 'Ahmet Türk',
      applicationId: 'APP-12363',
      daysLeft: 7,
      critical: false,
    },
  ];

  return (
    <div className="space-y-4">
      {documents.map((doc) => (
        <div 
          key={doc.id}
          className={`p-3 border rounded-lg transition-colors ${
            doc.critical
              ? 'border-red-200 bg-red-50 hover:bg-red-100'
              : 'border-amber-200 bg-amber-50 hover:bg-amber-100'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <File className={`h-4 w-4 mr-1.5 ${
                doc.critical ? 'text-red-600' : 'text-amber-600'
              }`} />
              <span className="font-medium">{doc.name}</span>
            </div>
            <span className="text-sm text-gray-600">{doc.id}</span>
          </div>
          
          <div className="flex items-center justify-between mb-1 text-sm">
            <Link 
              to={`/applications/${doc.applicationId}`}
              className="text-primary-600 hover:text-primary-700"
            >
              {doc.customer}
            </Link>
            
            {doc.critical && (
              <div className="flex items-center text-red-600 font-medium">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span>Acil - {doc.daysLeft} gün kaldı</span>
              </div>
            )}
            
            {!doc.critical && (
              <span className="text-amber-600">
                {doc.daysLeft} gün kaldı
              </span>
            )}
          </div>
        </div>
      ))}
      
      <div className="text-right">
        <Link 
          to="/documents" 
          className="text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          Tüm evrakları görüntüle
        </Link>
      </div>
    </div>
  );
};

export default PendingDocuments;
