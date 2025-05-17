import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock } from 'lucide-react';

const UpcomingAppointments: React.FC = () => {
  // Mock data for demonstration
  const appointments = [
    {
      id: 'APT-1001',
      customer: 'Ali Vural',
      location: 'İtalya Konsolosluğu, İstanbul',
      date: '03.05.2025',
      time: '10:30',
      applicationId: 'APP-12350',
    },
    {
      id: 'APT-1002',
      customer: 'Sevgi Demir',
      location: 'Amerika Konsolosluğu, Ankara',
      date: '04.05.2025',
      time: '09:15',
      applicationId: 'APP-12351',
    },
    {
      id: 'APT-1003',
      customer: 'Hakan Şahin',
      location: 'Fransa Konsolosluğu, İstanbul',
      date: '05.05.2025',
      time: '11:45',
      applicationId: 'APP-12352',
    },
    {
      id: 'APT-1004',
      customer: 'Elif Yılmaz',
      location: 'Yunanistan Konsolosluğu, İzmir',
      date: '05.05.2025',
      time: '14:00',
      applicationId: 'APP-12353',
    },
  ];

  return (
    <div className="space-y-4">
      {appointments.map((apt) => (
        <div 
          key={apt.id}
          className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <Link 
              to={`/applications/${apt.applicationId}`}
              className="font-medium text-primary-600 hover:text-primary-700"
            >
              {apt.customer}
            </Link>
            <span className="text-sm text-gray-500">{apt.id}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600 mb-1">
            <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0" />
            <span>{apt.location}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-1.5 flex-shrink-0" />
            <span>{apt.date}, {apt.time}</span>
          </div>
        </div>
      ))}
      
      <div className="text-right">
        <Link 
          to="/appointments" 
          className="text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          Tüm randevuları görüntüle
        </Link>
      </div>
    </div>
  );
};

export default UpcomingAppointments;
