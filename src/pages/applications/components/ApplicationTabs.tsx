import React from 'react';
import { FileText, Calendar, MessageSquare, Clock, Paperclip } from 'lucide-react';
import { ApplicationTab, TabItem } from '../types';

interface ApplicationTabsProps {
  activeTab: ApplicationTab;
  onTabChange: (tab: ApplicationTab) => void;
}

const tabs: TabItem[] = [
  {
    id: ApplicationTab.Overview,
    label: 'Genel Bakış',
    icon: <FileText className="h-4 w-4 inline mr-1.5" />
  },
  {
    id: ApplicationTab.Documents,
    label: 'Evraklar',
    icon: <Paperclip className="h-4 w-4 inline mr-1.5" />
  },
  {
    id: ApplicationTab.Appointment,
    label: 'Randevu',
    icon: <Calendar className="h-4 w-4 inline mr-1.5" />
  },
  {
    id: ApplicationTab.Notes,
    label: 'Notlar',
    icon: <MessageSquare className="h-4 w-4 inline mr-1.5" />
  },
  {
    id: ApplicationTab.History,
    label: 'İşlem Geçmişi',
    icon: <Clock className="h-4 w-4 inline mr-1.5" />
  }
];

const ApplicationTabs: React.FC<ApplicationTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="border-t border-gray-200">
      <div className="flex overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-3 whitespace-nowrap font-medium text-sm border-b-2 ${
              activeTab === tab.id
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ApplicationTabs;
