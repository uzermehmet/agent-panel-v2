import React from 'react';
import { 
  FileText, 
  Download, 
  Upload,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Eye,
  Info
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  required: boolean;
  customer: {
    id: string;
    name: string;
  };
  application: {
    id: string;
    country: string;
  };
  participant: string;
  status: string;
  uploadedBy: string | null;
  uploadedAt: string | null;
  dueDate: string;
  version: number;
  notes: string;
  history: Array<{
    action: string;
    user: string;
    date: string;
    reason?: string;
  }>;
}

interface DocumentsTabProps {
  documents: Document[];
  onViewHistory: (document: Document) => void;
  onApprove: (documentId: string) => void;
  onReject: (documentId: string) => void;
  onDownload: (documentId: string) => void;
  onUpload: (documentId: string) => void;
}

const DocumentsTab: React.FC<DocumentsTabProps> = ({
  documents,
  onViewHistory,
  onApprove,
  onReject,
  onDownload,
  onUpload
}) => {
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

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Evraklar</h2>
        
        <div className="flex gap-3">
          <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center">
            <Upload className="h-4 w-4 mr-1.5" />
            Evrak Yükle
          </button>
          
          <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center">
            <Download className="h-4 w-4 mr-1.5" />
            Tümünü İndir
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Evrak
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
                      {doc.notes && (
                        <div className="flex items-center mt-1 text-xs text-gray-500">
                          <Info className="h-3 w-3 mr-1" />
                          {doc.notes}
                        </div>
                      )}
                    </div>
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(doc.dueDate).toLocaleDateString('tr-TR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    {doc.status !== 'missing' && (
                      <button 
                        onClick={() => onViewHistory(doc)}
                        className="text-primary-600 hover:text-primary-800"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                    )}
                    
                    {doc.status === 'pending' && (
                      <>
                        <button 
                          onClick={() => onApprove(doc.id)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <CheckCircle className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => onReject(doc.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <XCircle className="h-5 w-5" />
                        </button>
                      </>
                    )}
                    
                    {doc.status === 'missing' && (
                      <button 
                        onClick={() => onUpload(doc.id)}
                        className="text-primary-600 hover:text-primary-800"
                      >
                        <Upload className="h-5 w-5" />
                      </button>
                    )}
                    
                    {doc.status !== 'missing' && (
                      <button 
                        onClick={() => onDownload(doc.id)}
                        className="text-primary-600 hover:text-primary-800"
                      >
                        <Download className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentsTab;
