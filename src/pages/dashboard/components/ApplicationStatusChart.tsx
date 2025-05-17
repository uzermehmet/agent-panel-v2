import React from 'react';

const ApplicationStatusChart: React.FC = () => {
  // For a real implementation, you would use a charting library like Chart.js or Recharts
  // This is a simplified mock for demonstration purposes
  
  const statuses = [
    { name: 'Onaylandı', value: 156, color: '#10B981', percentage: 45 },
    { name: 'Değerlendirmede', value: 87, color: '#6366F1', percentage: 25 },
    { name: 'Beklemede', value: 62, color: '#F59E0B', percentage: 18 },
    { name: 'İptal Edildi', value: 24, color: '#EF4444', percentage: 7 },
    { name: 'Reddedildi', value: 17, color: '#6B7280', percentage: 5 }
  ];
  
  return (
    <div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {statuses.map((status) => (
          <div key={status.name} className="flex items-center">
            <div 
              className="h-3 w-3 rounded-full mr-2" 
              style={{ backgroundColor: status.color }}
            ></div>
            <span className="text-sm text-gray-700">{status.name}</span>
            <span className="ml-auto text-sm font-medium">{status.value}</span>
          </div>
        ))}
      </div>
      
      <div className="h-8 flex rounded-full overflow-hidden">
        {statuses.map((status) => (
          <div
            key={status.name}
            className="h-full transition-all duration-500"
            style={{ 
              width: `${status.percentage}%`, 
              backgroundColor: status.color 
            }}
            title={`${status.name}: ${status.value} (${status.percentage}%)`}
          ></div>
        ))}
      </div>
      
      <p className="mt-2 text-xs text-center text-gray-500">
        Son 12 aylık başvuru durumları dağılımı
      </p>
    </div>
  );
};

export default ApplicationStatusChart;
