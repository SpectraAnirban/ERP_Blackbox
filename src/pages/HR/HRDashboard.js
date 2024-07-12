import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import HRHome from './HRHome';
import EmpProfileEdit from './EmpProfileEdit';
import EmployeeList from '../comonpage/EmployeeList';
import Calender from '../comonpage/Calender';
import VerifyEmployee from '../admin/VerifyEmployee';
import Tasksheet from '../comonpage/Tasksheet';
import Overtime from '../comonpage/Overtime';
import Comingsoon from '../comonpage/Comingsoon';
import Leaveactivity from '../comonpage/Leaveactivity';
import ProtectedRoute from '../../components/PrivateRoute';
import { useAuth } from '../../contexts/AuthContext';
import ProfileDetails from '../comonpage/ProfileDetails';
import Hrproject from './Hrproject';
import Hrprojectdetails from './Hrprojectdetails';
import ProjecttaskCL from '../comonpage/ProjecttaskCL';
const HRDashboard = () => {
    const location = useLocation();
    const { role } = useAuth();
    const [currentRole, setCurrentRole] = useState(role);

    useEffect(() => {
        if (role) {
            setCurrentRole(role);
        }
    }, [role]);

    return (
        <Container fluid className='wrapper p-0'>
            <Navbar role={currentRole} />
            <Row className='w-100'>
                <Routes>
                    <Route
                        path="/"
                        element={<ProtectedRoute element={HRHome} allowedRoles={['HR']} />}
                    />
                    <Route
                        path="home"
                        element={<ProtectedRoute element={HRHome} allowedRoles={['HR']} />}
                    />
                    <Route
                        path="/employeelist"
                        element={<ProtectedRoute element={EmployeeList} allowedRoles={['HR']} />}
                    />
                    <Route
                        path="/Calender"
                        element={<ProtectedRoute element={Calender} allowedRoles={['HR']} />}
                    />
                    <Route
                        path="/profile_edit"
                        element={<ProtectedRoute element={EmpProfileEdit} allowedRoles={['HR']} />}
                    />
                    <Route
                        path="/verify"
                        element={<ProtectedRoute element={VerifyEmployee} allowedRoles={['HR']} />}
                    />
                    <Route
                        path="/allleaves"
                        element={<ProtectedRoute element={Leaveactivity} allowedRoles={['HR']} />}
                    />
                    <Route
                        path="/tasksheet"
                        element={<ProtectedRoute element={Tasksheet} allowedRoles={['HR']} />}
                    />
                    <Route
                        path="/overtime"
                        element={<ProtectedRoute element={Overtime} allowedRoles={['HR']} />}
                    />
                    <Route
                        path="/projects"
                        element={<ProtectedRoute element={Hrproject} allowedRoles={['HR']} />}
                    />
                    <Route
                        path="/projectdetails/:projectId"
                        element={<ProtectedRoute element={Hrprojectdetails} allowedRoles={['HR']} />}
                    />
                    <Route
                        path="/comingsoon"
                        element={<ProtectedRoute element={Comingsoon} allowedRoles={['HR']} />}
                    />
                    <Route
                        path="/taskBoard"
                        element={<ProtectedRoute element={ProjecttaskCL} allowedRoles={['HR']} />}
                    />
                    <Route path="/profile" element={<ProtectedRoute element={ProfileDetails} allowedRoles={['HR']} />} />
                </Routes>
            </Row>
        </Container>
    );
};

export default HRDashboard;

