import React from 'react';
import { X, Bell, Info, Check, AlertTriangle } from 'lucide-react';

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock notifications data
const notifications = [
  {
    id: 1,
    type: 'info',
    title: 'Yeni Başvuru',
    message: 'Ayşe Demir için yeni bir başvuru oluşturuldu.',
    time: '15 dakika önce',
    read: false
  },
  {
    id: 2,
    type: 'success',
    title: 'Evrak Onaylandı',
    message: 'Mehmet Yılmaz\'ın pasaport evrakı onaylandı.',
    time: '1 saat önce',
    read: false
  },
  {
    id: 3,
    type: 'warning',
    title: 'Yaklaşan Randevu',
    message: 'Bugün saat 14:00\'de Ahmet Kaya için randevunuz var.',
    time: '3 saat önce',
    read: true
  },
  {
    id: 4,
    type: 'info',
    title: 'Başvuru Güncellendi',
    message: 'Can Demir\'in başvurusu güncellendi.',
    time: '1 gün önce',
    read: true
  }
];

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
    
      {/* Panel */}
      <div 
        className={`fixed inset-y-0 right-0 w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary-600" />
              <h2 className="text-lg font-semibold text-gray-800">Bildirimler</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div 
                  key={notification.id}
                  className={`p-3 rounded-lg border ${
                    notification.read ? 'bg-white' : 'bg-blue-50'
                  } ${getBorderColorByType(notification.type)}`}
                >
                  <div className="flex gap-3">
                    <div className="mt-1">
                      {getIconByType(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-gray-900">{notification.title}</h3>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 py-8">
                <Bell className="w-10 h-10 text-gray-300 mb-2" />
                <p>Bildiriminiz bulunmamaktadır</p>
              </div>
            )}
          </div>
          
          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-4 border-t border-gray-200">
              <button className="w-full py-2 text-sm font-medium text-primary-600 hover:text-primary-700">
                Tüm bildirimleri gör
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// Helper functions for notification styling
function getIconByType(type: string) {
  switch (type) {
    case 'info':
      return <Info className="w-5 h-5 text-blue-500" />;
    case 'success':
      return <Check className="w-5 h-5 text-green-500" />;
    case 'warning':
      return <AlertTriangle className="w-5 h-5 text-amber-500" />;
    default:
      return <Bell className="w-5 h-5 text-gray-500" />;
  }
}

function getBorderColorByType(type: string) {
  switch (type) {
    case 'info':
      return 'border-blue-200';
    case 'success':
      return 'border-green-200';
    case 'warning':
      return 'border-amber-200';
    default:
      return 'border-gray-200';
  }
}

export default NotificationsPanel;
