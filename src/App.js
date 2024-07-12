import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/Signup';
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import AdminDashboard from './pages/admin/Admindashboard';
import ClientDashboard from './pages/client/ClientDashboard';
import HRDashboard from './pages/HR/HRDashboard';
import ProtectedRoute from './components/PrivateRoute';
import AuthGuard from './components/AuthGuard';
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AuthGuard element={Login} />} />
          <Route path="/signup" element={<AuthGuard element={Signup} />} />
          <Route path="/employee/*" element={<ProtectedRoute element={EmployeeDashboard} allowedRoles={['Employee']} />} />
          <Route path="/admin/*" element={<ProtectedRoute element={AdminDashboard} allowedRoles={['Admin']} />} />
          <Route path="/client/*" element={<ProtectedRoute element={ClientDashboard} allowedRoles={['Client']} />} />
          <Route path="/hr/*" element={<ProtectedRoute element={HRDashboard} allowedRoles={['HR']} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
