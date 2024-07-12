// src/AdminDashboard.js
import React from 'react';
import Navbar from '../navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import AdminHome from './AdminHome';
import Employeemanagement from './Employeemanagement';
import Settings from './Settings';
import Container from 'react-bootstrap/Container';
import VerifyEmployee from './VerifyEmployee';
import ProtectedRoute from '../../components/PrivateRoute';
import ProfileDetails from '../comonpage/ProfileDetails';
import { useAuth } from '../../contexts/AuthContext';
import Comingsoon from '../comonpage/Comingsoon';
import EmployeeList from '../comonpage/EmployeeList';
import EmpProfileEdit from '../HR/EmpProfileEdit';
import Hrproject from '../HR/Hrproject';
import Hrprojectdetails from '../HR/Hrprojectdetails';
import Calender from '../comonpage/Calender';
import ProjecttaskCL from '../comonpage/ProjecttaskCL';
const AdminDashboard = () => {
  const { role } = useAuth();

  return (
    <Container fluid className='wrapper p-0'>
      <Navbar role={role} />
      <div className='w-100 '>
        <Routes>
          <Route path="/" element={<ProtectedRoute element={AdminHome} allowedRoles={['Admin']} />} />
          <Route path="home" element={<ProtectedRoute element={AdminHome} allowedRoles={['Admin']} />} />
          <Route path="users" element={<ProtectedRoute element={Employeemanagement} allowedRoles={['Admin']} />} />
          <Route path="settings" element={<ProtectedRoute element={Settings} allowedRoles={['Admin']} />} />
          <Route path="verify" element={<ProtectedRoute element={VerifyEmployee} allowedRoles={['Admin']} />} />
          <Route path="/profile" element={<ProtectedRoute element={ProfileDetails} allowedRoles={['Admin']} />} />
          <Route
            path="/Calender"
            element={<ProtectedRoute element={Calender} allowedRoles={['Admin']} />}
          />
          <Route
            path="/employeelist"
            element={<ProtectedRoute element={EmployeeList} allowedRoles={['Admin']} />}
          />
          <Route
            path="/profile_edit"
            element={<ProtectedRoute element={EmpProfileEdit} allowedRoles={['Admin']} />}
          />

          <Route
            path="/projects"
            element={<ProtectedRoute element={Hrproject} allowedRoles={['Admin']} />}
          />
          <Route
            path="/projectdetails/:projectId"
            element={<ProtectedRoute element={Hrprojectdetails} allowedRoles={['Admin']} />}
          />
          <Route
            path="/comingsoon"
            element={<ProtectedRoute element={Comingsoon} allowedRoles={['Admin']} />}
          />
          <Route
              path="/taskBoard"
              element={<ProtectedRoute element={ProjecttaskCL} allowedRoles={['Admin']} />}
          />
        </Routes>
      </div>
    </Container>
  );
};

export default AdminDashboard;
