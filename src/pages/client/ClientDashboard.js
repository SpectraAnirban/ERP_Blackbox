import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../navbar/Navbar';
import ClientHome from './ClientHome';
import CLProjects from './CLProjects';
import ProtectedRoute from '../../components/PrivateRoute'; // Adjust import if necessary
import ProfileDetails from '../comonpage/ProfileDetails'; // Ensure correct import path
import Comingsoon from '../comonpage/Comingsoon';

const ClientDashboard = () => {
    const [role, setRole] = useState('');
    const { role: storedRole, loading } = useAuth();

    useEffect(() => {
        if (!loading && storedRole) {
            setRole(storedRole);
        }
    }, [storedRole, loading]);

    return (
        <Container fluid className='wrapper p-0'>
            <Navbar role={role} />
            <Row className='w-100'>
                <Routes>
                    <Route path="/" element={<ProtectedRoute element={ClientHome} allowedRoles={['Client']} />} />
                    <Route path="/home" element={<ProtectedRoute element={ClientHome} allowedRoles={['Client']} />} />
                    <Route path="/projects" element={<ProtectedRoute element={CLProjects} allowedRoles={['Client']} />} />
                    <Route path="/profile" element={<ProtectedRoute element={ProfileDetails} allowedRoles={['Client']} />} />
                    <Route
                        path="/comingsoon"
                        element={<ProtectedRoute element={Comingsoon} allowedRoles={['Client']} />}
                    />
                </Routes>
            </Row>
        </Container>
    );
};

export default ClientDashboard;
