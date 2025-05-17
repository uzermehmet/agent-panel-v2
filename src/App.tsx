import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './components/layout/Layout';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import Dashboard from './pages/dashboard/Dashboard';
import CustomerList from './pages/customers/CustomerList';
import CustomerDetail from './pages/customers/CustomerDetail';
import CustomerCreate from './pages/customers/CustomerCreate';
import CustomerEdit from './pages/customers/CustomerEdit';
import ApplicationList from './pages/applications/ApplicationList';
import ApplicationDetail from './pages/applications/ApplicationDetail';
import ApplicationCreate from './pages/applications/ApplicationCreate';
import DocumentManagement from './pages/documents/DocumentManagement';
import AppointmentList from './pages/appointments/AppointmentList';
import ServiceList from './pages/services/ServiceList';
import StaffList from './pages/staff/StaffList';
import StaffCreate from './pages/staff/StaffCreate';
import StaffDetail from './pages/staff/StaffDetail';
import ProfileSettings from './pages/settings/ProfileSettings';
import TaskList from './pages/tasks/TaskList';
import TaskCreate from './pages/tasks/TaskCreate';
import TaskEdit from './pages/tasks/TaskEdit';
import ReportList from './pages/reports/ReportList';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            
            <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              
              {/* Customer Routes */}
              <Route path="customers">
                <Route index element={<CustomerList />} />
                <Route path="create" element={<CustomerCreate />} />
                <Route path=":id" element={<CustomerDetail />} />
                <Route path="edit/:id" element={<CustomerEdit />} />
              </Route>
              
              {/* Application Routes */}
              <Route path="applications">
                <Route index element={<ApplicationList />} />
                <Route path="create" element={<ApplicationCreate />} />
                <Route path=":id" element={<ApplicationDetail />} />
              </Route>
              
              {/* Document Management Route */}
              <Route path="document-management" element={<DocumentManagement />} />
              
              {/* Appointment Routes */}
              <Route path="appointments" element={<AppointmentList />} />
              
              {/* Service Routes */}
              <Route path="services" element={<ServiceList />} />
              
              {/* Staff Routes */}
              <Route path="staff">
                <Route index element={<StaffList />} />
                <Route path="create" element={<StaffCreate />} />
                <Route path=":id" element={<StaffDetail />} />
              </Route>

              {/* Task Routes */}
              <Route path="tasks">
                <Route index element={<TaskList />} />
                <Route path="create" element={<TaskCreate />} />
                <Route path="edit/:id" element={<TaskEdit />} />
              </Route>
              
              {/* Reports Route */}
              <Route path="reports" element={<ReportList />} />
              
              {/* Settings Routes */}
              <Route path="settings/profile" element={<ProfileSettings />} />
              
              {/* Not Found */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
