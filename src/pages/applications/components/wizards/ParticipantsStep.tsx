import React from 'react';
import { User, X } from 'lucide-react';

interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  passportNumber: string;
  passportExpiry: string;
  relation: string;
}

interface ParticipantsStepProps {
  participants: Participant[];
  onParticipantChange: (id: string, field: string, value: string) => void;
  onAddParticipant: () => void;
  onRemoveParticipant: (id: string) => void;
}

const ParticipantsStep: React.FC<ParticipantsStepProps> = ({
  participants,
  onParticipantChange,
  onAddParticipant,
  onRemoveParticipant
}) => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Katılımcı Bilgileri</h3>
        
        <button
          type="button"
          onClick={onAddParticipant}
          className="px-3 py-1.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 flex items-center"
        >
          <User className="h-4 w-4 mr-1.5" />
          Katılımcı Ekle
        </button>
      </div>
      
      <div className="space-y-6">
        {participants.map((participant, index) => (
          <ParticipantForm
            key={participant.id}
            participant={participant}
            index={index}
            onParticipantChange={onParticipantChange}
            onRemoveParticipant={onRemoveParticipant}
          />
        ))}
      </div>
    </div>
  );
};

interface ParticipantFormProps {
  participant: Participant;
  index: number;
  onParticipantChange: (id: string, field: string, value: string) => void;
  onRemoveParticipant: (id: string) => void;
}

const ParticipantForm: React.FC<ParticipantFormProps> = ({
  participant,
  index,
  onParticipantChange,
  onRemoveParticipant
}) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-md font-medium text-gray-900">
          {index === 0 ? 'Ana Katılımcı' : `Katılımcı ${index + 1}`}
        </h4>
        
        {index > 0 && (
          <button
            type="button"
            onClick={() => onRemoveParticipant(participant.id)}
            className="text-red-600 hover:text-red-700"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ad <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={participant.firstName}
            onChange={(e) => onParticipantChange(participant.id, 'firstName', e.target.value)}
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Soyad <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={participant.lastName}
            onChange={(e) => onParticipantChange(participant.id, 'lastName', e.target.value)}
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pasaport No <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={participant.passportNumber}
            onChange={(e) => onParticipantChange(participant.id, 'passportNumber', e.target.value)}
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pasaport Son Geçerlilik
          </label>
          <input
            type="date"
            value={participant.passportExpiry}
            onChange={(e) => onParticipantChange(participant.id, 'passportExpiry', e.target.value)}
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Doğum Tarihi
          </label>
          <input
            type="date"
            value={participant.birthDate}
            onChange={(e) => onParticipantChange(participant.id, 'birthDate', e.target.value)}
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        
        {index > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              İlişki
            </label>
            <select
              value={participant.relation}
              onChange={(e) => onParticipantChange(participant.id, 'relation', e.target.value)}
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="family">Aile Üyesi</option>
              <option value="spouse">Eş</option>
              <option value="child">Çocuk</option>
              <option value="friend">Arkadaş</option>
              <option value="colleague">İş Arkadaşı</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParticipantsStep;
