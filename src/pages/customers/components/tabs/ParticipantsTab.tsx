import React from 'react';
import { Edit, Trash, User } from 'lucide-react';

interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  relationship: string;
  idNumber: string;
  passportNumber: string;
  email: string;
  phone: string;
}

interface ParticipantsTabProps {
  participants: Participant[];
  onAddParticipant: () => void;
  onEditParticipant: (id: string) => void;
  onDeleteParticipant: (id: string) => void;
}

const ParticipantsTab: React.FC<ParticipantsTabProps> = ({
  participants,
  onAddParticipant,
  onEditParticipant,
  onDeleteParticipant
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Katılımcılar</h2>
        <button 
          onClick={onAddParticipant}
          className="px-3 py-1.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 flex items-center"
        >
          <User className="h-4 w-4 mr-1.5" />
          Katılımcı Ekle
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {participants.map((participant) => (
          <div 
            key={participant.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex">
                <div className="h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-700 font-medium">
                  {participant.firstName.charAt(0)}{participant.lastName.charAt(0)}
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">
                    {participant.firstName} {participant.lastName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {participant.relationship}
                  </div>
                </div>
              </div>
              <div className="flex space-x-1">
                <button 
                  onClick={() => onEditParticipant(participant.id)}
                  className="p-1 text-gray-400 hover:text-primary-600 rounded"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => onDeleteParticipant(participant.id)}
                  className="p-1 text-gray-400 hover:text-red-600 rounded"
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div>
                <div className="text-xs text-gray-500">T.C. Kimlik No</div>
                <div>{participant.idNumber}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Pasaport No</div>
                <div>{participant.passportNumber}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">E-posta</div>
                <div>{participant.email}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Telefon</div>
                <div>{participant.phone}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipantsTab;
