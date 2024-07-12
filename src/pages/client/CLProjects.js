// src/HRHome.js
import { Col, Row, Card, Form, Breadcrumb } from 'react-bootstrap';
import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { InputText } from "primereact/inputtext";
import { Link } from 'react-router-dom';
import '../../assets/css/client.css';
import ProjectDetails from '../../components/ProjectDetails';
import CustomToast from '../../components/CustomToast';

const CLProjects = () => {
    const [selectedDuration, setSelectedDuration] = useState(null);
    const [selectedProject, setSelectedProject] = useState('Project Name 1');
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);

    const duration = [
        { name: 'Graphē Wedding', code: 'GW' },
        { name: 'Website / Mobile App', code: 'WEBAPP' },
        { name: 'Marketing', code: 'MARK' }
    ];

    const projects = [
        { name: 'Project Name 1', type: 'Marketing', date: '01/01/2021', coordinator: 'Jomon' },
        { name: 'Project Name 2', type: 'Web / Mobile App', date: '01/01/2021', coordinator: 'Jomon' },
        { name: 'Project Name 3', type: 'Graphē Wedding', date: '01/01/2021', coordinator: 'Jomon' }
    ];

    const filteredProjects = projects.filter(project => {
        const matchesDuration = selectedDuration ? project.type === selectedDuration.name : true;
        const matchesSearchTerm = project.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesDuration && matchesSearchTerm;
    });

    const handleProjectClick = (projectName) => {
        setSelectedProject(projectName);
        setIsEditMode(false); // Reset edit mode when switching projects
    };

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
    };

    return (
        <>
            <Row className='body_content'>
                <Row className='justify-content-between'>
                    <Col md={12} lg={12} className='mb-4'>
                        <Breadcrumb className='align-items-center'>
                            <Breadcrumb.Item active>Projects</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Card className='cpList'>
                        <Card.Header>
                            <Form>
                                <Row className='align-items-center justify-content-end pb-2'>
                                    <Col md={'4'} lg={'2'} className='dashboard_card plr'>
                                        <InputText
                                            placeholder="Project Name"
                                            type='search'
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </Col>
                                    <Col md={'4'} lg={'2'} className='dashboard_card plr'>
                                        <Dropdown
                                            value={selectedDuration}
                                            onChange={(e) => setSelectedDuration(e.value)}
                                            options={duration}
                                            optionLabel="name"
                                            placeholder="Project Type"
                                            className="w-100"
                                        />
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Header>
                        <Card.Body className='ps-0 pe-0'>
                            <Row>
                                <Col md={'12'} lg={'3'} className=''>
                                    <ol className='prolistleft'>
                                        {filteredProjects.map((project, index) => (
                                            <li key={index} className={selectedProject === project.name ? 'active' : ''}>
                                                <Link to='#' onClick={() => handleProjectClick(project.name)}>
                                                    <h6>{project.name}</h6>
                                                    <p>Project Type: <span>{project.type}</span></p>
                                                    <p>Date: <span>{project.date}</span></p>
                                                    <p>Coordinator: <span>{project.coordinator}</span></p>
                                                </Link>
                                            </li>
                                        ))}
                                    </ol>
                                </Col>
                                <Col md={'12'} lg={'9'} className='ps-lg-5 clpDetails'>
                                    {selectedProject && (
                                        <ProjectDetails
                                            project={selectedProject}
                                            isEditMode={isEditMode}
                                            toggleEditMode={toggleEditMode}
                                        />
                                    )}
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Row>
            </Row>
        </>
    );
};

export default CLProjects;
