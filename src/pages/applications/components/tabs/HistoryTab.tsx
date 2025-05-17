import React from 'react';

interface HistoryItem {
  id: string;
  action: string;
  user: string;
  date: string;
  application?: string;
}

interface HistoryTabProps {
  history: HistoryItem[];
}

const HistoryTab: React.FC<HistoryTabProps> = ({ history }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">İşlem Geçmişi</h2>
      
      <div className="relative">
        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        
        <div className="space-y-6 ml-6">
          {history.map((item) => (
            <div key={item.id} className="relative">
              <div className="absolute -left-6 mt-1.5 h-3 w-3 rounded-full border-2 border-white bg-primary-600"></div>
              
              <div className="flex flex-col sm:flex-row sm:items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.action}</p>
                  <div className="mt-1 flex items-center text-xs text-gray-500">
                    <span>{item.user}</span>
                    {item.application && (
                      <>
                        <span className="mx-1">•</span>
                        <span className="text-primary-600 hover:text-primary-700">
                          {item.application}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <span className="mt-1 sm:mt-0 text-xs text-gray-500">{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryTab;
