import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import NotificationsPanel from './NotificationsPanel';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleNotifications = () => setNotificationsOpen(!notificationsOpen);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onMenuClick={toggleSidebar} 
          onNotificationsClick={toggleNotifications}
        />
        
        {/* Notifications panel (slides from right) */}
        <NotificationsPanel 
          isOpen={notificationsOpen} 
          onClose={() => setNotificationsOpen(false)} 
        />
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
