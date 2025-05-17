import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, User, Search, Settings, LogOut, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps {
  onMenuClick: () => void;
  onNotificationsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, onNotificationsClick }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  const handleUserMenuToggle = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left Side - Menu & Search */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-full hover:bg-gray-100 lg:hidden"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>

          <div className="hidden md:flex items-center relative">
            <Search className="w-4 h-4 absolute left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Arama yapın..."
              className="pl-9 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-300"
            />
          </div>
        </div>

        {/* Right Side - Actions & User Menu */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100"
            title={theme === 'light' ? 'Karanlık tema' : 'Aydınlık tema'}
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-gray-600" />
            ) : (
              <Sun className="w-5 h-5 text-gray-600" />
            )}
          </button>

          <button
            onClick={onNotificationsClick}
            className="p-2 rounded-full hover:bg-gray-100 relative"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={handleUserMenuToggle}
              className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100"
            >
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                {user?.name.charAt(0)}
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700">
                {user?.name}
              </span>
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      navigate('/settings/profile');
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    <span>Profil</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      navigate('/settings');
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Ayarlar</span>
                  </button>
                  <hr className="my-1" />
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      logout();
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Çıkış Yap</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
