import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import { Routes, Route, useNavigate } from 'react-router-dom'; // Changed from useLocation to useNavigate for navigation
import Projects from './Projects';
import ProjectDetails from './ProjectDetails';
import EmployeeHome from './EmployeeHome';
import Leaves from './Leaves';
import Tasksheet from './Tasksheet';
import Resignation from './Resignation';
import ProjectTaskBoard from './ProjectTaskBoard';
import EmployeeList from '../comonpage/EmployeeList';
import ProfileDetails from '../comonpage/ProfileDetails';
import Calender from '../comonpage/Calender';
import { Container, Row } from 'react-bootstrap';
import ProtectedRoute from '../../components/PrivateRoute';
import { useAuth } from '../../contexts/AuthContext';
import Comingsoon from '../comonpage/Comingsoon';

const EmployeeDashboard = () => {
    const navigate = useNavigate(); // Hook for navigation
    const [role, setRole] = useState('');
    const { verificationStatus } = useAuth(); // Assuming userId and verificationStatus are available in the auth context
    const storedRole = useAuth();

    useEffect(() => {
        if (storedRole) {
            setRole(storedRole);
        }
    }, [storedRole]);



    return (
        <Container fluid className='wrapper p-0'>
            <Navbar role={role}  /> {/* Pass goToProfile function to the Navbar */}
            <Row className='w-100'>
                <Routes>
                    {verificationStatus ? (
                        <>
                            <Route path="/" element={<ProtectedRoute element={EmployeeHome} allowedRoles={['Employee']} />} />
                            <Route path="home" element={<ProtectedRoute element={EmployeeHome} allowedRoles={['Employee']} />} />
                            <Route path="projects" element={<ProtectedRoute element={Projects} allowedRoles={['Employee']} />} />
                            <Route path="projectdetails/:projectId" element={<ProtectedRoute element={ProjectDetails} allowedRoles={['Employee']} />} />
                            <Route path="leaves" element={<ProtectedRoute element={Leaves} allowedRoles={['Employee']} />} />
                            <Route path="tasksheet" element={<ProtectedRoute element={Tasksheet} allowedRoles={['Employee']} />} />
                            <Route path="resignation" element={<ProtectedRoute element={Resignation} allowedRoles={['Employee']} />} />
                            <Route path="taskboard" element={<ProtectedRoute element={ProjectTaskBoard} allowedRoles={['Employee']} />} />
                            <Route path="/employeelist" element={<ProtectedRoute element={EmployeeList} allowedRoles={['Employee']} />} />
                            <Route path="/profile" element={<ProtectedRoute element={ProfileDetails} allowedRoles={['Employee']} />} />
                            <Route path="calendar" element={<ProtectedRoute element={Calender} allowedRoles={['Employee']} />} />
                            <Route
                                path="/comingsoon"
                                element={<ProtectedRoute element={Comingsoon} allowedRoles={['Employee']} />}
                            />
                        </>
                    ) : (
                        <>
                            
                            <Route path="/profile" element={<ProtectedRoute element={ProfileDetails} allowedRoles={['Employee']} />} />
                        </>
                    )}
                </Routes>
            </Row>
        </Container>
    );
};

export default EmployeeDashboard;
