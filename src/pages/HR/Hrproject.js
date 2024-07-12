import React, { useState, useEffect } from "react";
import { Row, Col, Breadcrumb, Card, Table } from 'react-bootstrap';
import Addprojects from '../../modalPopup/Addprojects';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import "react-datepicker/dist/react-datepicker.css";
import { MDBProgress, MDBProgressBar } from 'mdb-react-ui-kit';
import '../../assets/css/dashboard.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import config from '../../config';
import { useAuth } from '../../contexts/AuthContext';
import { Tooltip } from 'primereact/tooltip';
import { IconField } from "primereact/iconfield";
import { InputText } from "primereact/inputtext";
import { Calendar } from 'primereact/calendar';
import CustomToast from '../../components/CustomToast';


const Hrproject = () => {
    const [visible, setVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const office_id = 1; // replace with your actual office_id
    const [projects, setProjects] = useState([]);
    const { role } = useAuth();
    const [dates, setDates] = useState(null);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${config.apiBASEURL}/user/alluser`, {
                    params: {
                        office_id: office_id,
                    },
                });
                setUsers(response.data);
            } catch (err) {
                console.error('Error fetching users:', err);
            }
        };

        if (office_id) {
            fetchUsers();
        }
    }, [office_id]);



    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get(`${config.apiBASEURL}/project/allprojects`); // No need to pass userId
                const projectsWithTasks = await Promise.all(response.data.map(async (project) => {
                    const taskResponse = await axios.get(`${config.apiBASEURL}/tasks/fetchallquery?project_id=${project.project_id}`);
                    const todoTasks = taskResponse.data.todoTasks;
                    const inProgressTasks = taskResponse.data.inProgressTasks;
                    const inReviewTasks = taskResponse.data.inReviewTasks;
                    const completedTasks = taskResponse.data.completedTasks;

                    const totalTasks = todoTasks.length + inProgressTasks.length + inReviewTasks.length + completedTasks.length;
                    const openTasksCount = inProgressTasks.length + inReviewTasks.length;
                    const completedTasksCount = completedTasks.length;
                    const completionPercentage = totalTasks ? Math.round((completedTasksCount / totalTasks) * 100) : 0;

                    return {
                        ...project,
                        totalTasks,
                        openTasksCount,
                        completedTasksCount,
                        completionPercentage
                    };
                }));
                setProjects(projectsWithTasks);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects(); // No need to check for userId
    }, []); // Removed userId dependency



    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const onChangeDateRange = (e) => {
        setDates(e.value);
    };

    const renderProjects = () => {
        let filteredProjects = [...projects];

        filteredProjects = filteredProjects.filter(project =>
            project.project_name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (dates && dates.length === 2) {
            const startDate = dates[0];
            const endDate = dates[1];
            filteredProjects = filteredProjects.filter(project =>
                new Date(project.end_date) >= startDate && new Date(project.end_date) <= endDate
            );
        }

        if (filteredProjects.length === 0) {
            return (
                <Col md={12}>
                    <p>No projects found.</p>
                </Col>
            );
        }

        return filteredProjects.map(project => (
            <Col md={6} lg={4} className='projectCard ps-0 mb-3' key={project.project_id}>
                <Card>
                    <Card.Header>
                        <div className='d-flex justify-content-between text-start'>
                            <div>
                                <span className='d-block'>
                                    <b>{project.project_name}</b>
                                    <small className='d-block text-dark'>
                                        <b className='text-danger'>{project.totalTasks}</b> Total tasks,{' '}
                                        <b className='text-danger'>{project.completedTasksCount}</b> tasks completed
                                    </small>
                                </span>
                            </div>
                            <div>
                                <Link className='btn btn-info btn-sm h-auto' to={`/${role === 'Admin' ? 'Admin' : 'HR'}/projectdetails/${project.project_id}`}>
                                    View
                                </Link>

                            </div>
                        </div>
                    </Card.Header>
                    <Card.Body className='text-start'>
                        <p>{project.description}</p>
                        <p>
                            <small>
                                <b className='text-danger'>Deadline: {new Date(project.end_date).toLocaleDateString()}</b>
                            </small>
                        </p>
                        <p>
                            <small>
                                <b>Project Leader :</b>
                            </small>
                        </p>
                        <div className='d-flex align-items-center justify-content-start mb-3 text-start projectHr'>
                            <img
                                src={project.leaderAvatar || 'https://mdbootstrap.com/img/new/avatars/6.jpg'}
                                alt=''
                                style={{ width: '30px', height: '30px' }}
                                className='rounded-circle'
                            />
                            <div className='ms-2'>
                                <p className='mb-1'>{project.lead[0]?.name || 'No leader assigned'}</p>
                            </div>
                        </div>
                        <p>
                            <small>
                                <b>Team :</b>
                            </small>
                        </p>
                        <div className='mb-3'>
                            <div className='d-flex align-items-center justify-content-start'>
                                {project.members.map(member => (
                                    <div key={member.user_id} className='d-flex align-items-center me-3'>
                                        <Tooltip target=".rounded-circle" mouseTrack mouseTrackLeft={15} />
                                        <img
                                            src={'https://mdbootstrap.com/img/Photos/Avatars/man2.jpg'}
                                            alt=''
                                            style={{ width: '30px', height: '30px' }}
                                            className='rounded-circle'
                                            data-pr-tooltip={member.name}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Card.Text className='mt-4'>
                            <small><b>Progress <span className="float-end text-success">{project.completionPercentage}%</span></b></small>
                        </Card.Text>
                        <MDBProgress>
                            <MDBProgressBar bgColor='success' width={project.completionPercentage} valuemin={0} valuemax={100} />
                        </MDBProgress>
                    </Card.Body>
                </Card>
            </Col>
        ));
    };


    return (
        <>
            <Row className='body_content'>
                <Row className='mx-0'>
                    <Col md={7} className='mb-4'>
                        <Breadcrumb className='align-items-center'>
                            <Breadcrumb.Item active>Projects</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col md={5} className='d-flex justify-content-end mb-4 filterPart'>
                        <span className='me-2 filterDiv d-flex align-items-center'>
                            <IconField iconPosition="left" className='me-2'>
                                <InputText
                                    placeholder="Search by project"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    className='ps-4'
                                />
                            </IconField>
                            <Calendar placeholder="Filter by date" value={dates} onChange={(e) => setDates(e.value)} selectionMode="range" readOnlyInput hideOnRangeSelection />
                        </span>
                        <Button icon="pi pi-plus" label=" Project" size='sm' severity="info" onClick={() => setVisible(true)} />
                    </Col>
                    {projects.length > 0 ? (
                        renderProjects()
                    ) : (
                        <Col md={12}>
                            <p>No projects found.</p>
                        </Col>
                    )}
                </Row>
            </Row>
            <Dialog className='proj_dig' header="Create Project" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <Addprojects users={users} office_id={office_id} visible={visible} onHide={() => setVisible(false)} />
            </Dialog>
        </>
    );
};

export default Hrproject;