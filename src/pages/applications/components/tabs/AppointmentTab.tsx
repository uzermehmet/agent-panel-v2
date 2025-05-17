import React from 'react';
import { Calendar, MapPin, User, AlertCircle } from 'lucide-react';

interface Appointment {
  date: string;
  time: string;
  location: string;
  status: string;
}

interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  passportNumber: string;
}

interface AppointmentTabProps {
  appointment: Appointment | null;
  participants: Participant[];
  onCreateAppointment: () => void;
  onEditAppointment: () => void;
}

const AppointmentTab: React.FC<AppointmentTabProps> = ({
  appointment,
  participants,
  onCreateAppointment,
  onEditAppointment
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Randevu Bilgileri</h2>
        
        <div className="flex gap-3">
          {appointment && (
            <button 
              onClick={onEditAppointment}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center"
            >
              Randevuyu Düzenle
            </button>
          )}
        </div>
      </div>
      
      {appointment ? (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-md font-medium text-gray-900">Randevu Tarihi ve Saati</h3>
                <p className="mt-1 text-lg font-semibold flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-primary-600" />
                  {appointment.date}, {appointment.time}
                </p>
              </div>
              
              <div>
                <h3 className="text-md font-medium text-gray-900">Randevu Yeri</h3>
                <p className="mt-1 text-gray-700">{appointment.location}</p>
              </div>
              
              <div>
                <h3 className="text-md font-medium text-gray-900">Durum</h3>
                <span className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {appointment.status === 'confirmed' ? 'Onaylandı' : 'Bekleniyor'}
                </span>
              </div>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="text-md font-medium text-gray-900 mb-3">Katılımcılar</h3>
              <ul className="space-y-2">
                {participants.map((participant) => (
                  <li key={participant.id} className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm font-medium text-gray-900">
                      {participant.firstName} {participant.lastName}
                    </span>
                    <span className="ml-2 text-xs text-gray-500">
                      ({participant.passportNumber})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-6 border-t border-gray-200 pt-6">
            <h3 className="text-md font-medium text-gray-900 mb-3">Randevu Bilgilendirmesi</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    Lütfen randevu saatinden 15 dakika önce hazır olunuz. Tüm katılımcılar için gerekli evrakları yanınızda bulundurunuz. İptal veya değişiklik için en az 48 saat önceden bilgi verilmelidir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz randevu planlanmamış</h3>
          <p className="text-gray-600 mb-4">Bu başvuru için henüz bir randevu oluşturulmamış.</p>
          <button 
            onClick={onCreateAppointment}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 inline-flex items-center"
          >
            Randevu Oluştur
          </button>
        </div>
      )}
    </div>
  );
};

export default AppointmentTab;
