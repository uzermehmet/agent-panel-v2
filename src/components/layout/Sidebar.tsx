import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Users, 
  FileText, 
  Calendar, 
  BarChart, 
  Settings,
  UserCog,
  FileCheck,
  X,
  Globe,
  Tag,
  CheckSquare
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  end?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, end = false }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) => 
      `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        isActive 
          ? 'bg-primary-50 text-primary-700 font-medium' 
          : 'text-gray-600 hover:bg-gray-100'
      }`
    }
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, hasPermission } = useAuth();
  
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}
    
      {/* Sidebar */}
      <aside
        className={`fixed lg:relative inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-30 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo & Close Button */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Globe className="h-6 w-6 text-primary-600" />
              <span className="text-lg font-bold text-gray-800">VisaFlow</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 lg:hidden"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-1">
            <NavItem 
              to="/dashboard" 
              icon={<Home className="w-5 h-5" />} 
              label="Anasayfa" 
              end 
            />
            
            <NavItem 
              to="/customers" 
              icon={<Users className="w-5 h-5" />} 
              label="Müşteriler" 
            />
            
            <NavItem 
              to="/applications" 
              icon={<FileText className="w-5 h-5" />} 
              label="Başvurular" 
            />
            
            <NavItem 
              to="/document-management" 
              icon={<FileCheck className="w-5 h-5" />} 
              label="Evrak Yönetimi" 
            />
            
            <NavItem 
              to="/appointments" 
              icon={<Calendar className="w-5 h-5" />} 
              label="Randevular" 
            />
            
            <NavItem 
              to="/services" 
              icon={<Tag className="w-5 h-5" />} 
              label="Hizmetler" 
            />

            <NavItem 
              to="/tasks" 
              icon={<CheckSquare className="w-5 h-5" />} 
              label="Görevler" 
            />
            
            <NavItem 
              to="/reports" 
              icon={<BarChart className="w-5 h-5" />} 
              label="Raporlar" 
            />
            
            {hasPermission('manage_staff') && (
              <NavItem 
                to="/staff" 
                icon={<UserCog className="w-5 h-5" />} 
                label="Personel" 
              />
            )}
          </nav>
          
          {/* Footer */}
          <div className="p-3 border-t border-gray-200">
            <NavItem 
              to="/settings/profile" 
              icon={<Settings className="w-5 h-5" />} 
              label="Ayarlar" 
            />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
