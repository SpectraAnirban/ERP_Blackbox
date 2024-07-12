// src/HRHome.js
import React, { useState, useEffect } from "react";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Col, Row, Card, Table, Badge, Form } from 'react-bootstrap';
import { Button } from 'primereact/button';
import '../../assets/css/dashboard.css';
import { Calendar } from 'primereact/calendar';
import { Link } from "react-router-dom";
import { Tooltip } from 'primereact/tooltip';
import { useTime } from 'react-timer-hook';
import { useSelector } from 'react-redux';
import axios from "axios";
import moment from 'moment-timezone';
import config from '../../config';
import { useAuth } from '../../contexts/AuthContext';
import CustomToast from '../../components/CustomToast';


const EmployeeHome = () => {

    //YearDropdownfilter
    const [projects, setProjects] = useState([]);
    const { userId } = useAuth(); // Get userId from the context
    const [date, setDate] = useState(null);
    const [isCheckInVisible, setIsCheckInVisible] = useState(true);
    const [isCheckOutVisible, setIsCheckOutVisible] = useState(false);
    const [isBreakOutVisible, setIsBreakOutVisible] = useState(false);
    const [isBreakInVisible, setIsBreakInVisible] = useState(false);
    const [todoTasks, setTodoTasks] = useState([]);
    const [progressReviewTasks, setProgressReviewTasks] = useState([]);
    const {
        seconds,
        minutes,
        hours,
        ampm,
    } = useTime({ format: '12-hour' });


    useEffect(() => {
        const fetchProjects = async (userId) => {
            try {
                const response = await axios.get(`${config.apiBASEURL}/project/projects`, {
                    params: { userId }
                });
                console.log(response);
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        const checkInState = async (userId) => {
            try {
                const response = await axios.get(`${config.apiBASEURL}/attendance/check-state`, {
                    params: { userId }
                });
                if (response.data.isCheckedIn) {
                    setIsCheckInVisible(false);
                } else {
                    setIsCheckInVisible(true);
                }
            } catch (error) {
                console.error('Error fetching check-in state:', error);
            }
        };

        const fetchTodoTasks = async (userId) => {
            try {
                const response = await axios.get(`${config.apiBASEURL}/tasks/fetch-todo-tasks`, {
                    params: { user_id: userId }
                });
                console.log(response);
                setTodoTasks(response.data.tasks);
            } catch (error) {
                console.error('Error fetching "To Do" tasks:', error);
            }
        };

        const fetchProgressReviewTasks = async (userId) => {
            try {
                const response = await axios.get(`${config.apiBASEURL}/tasks/fetch-progress-review-tasks`, {
                    params: { user_id: userId }
                });
                console.log(response);
                setProgressReviewTasks(response.data.tasks);
            } catch (error) {
                console.error('Error fetching "In Progress" and "In Review" tasks:', error);
            }
        };

        fetchProjects(userId);
        checkInState(userId);
        fetchTodoTasks(userId);
        fetchProgressReviewTasks(userId);
    }, [userId]);



    // Function to render projects using a for loop
    const renderProjects = () => {
        const projectCards = [];
        const maxProjects = Math.min(projects.length, 2);
        for (let i = 0; i < maxProjects; i++) {
            const project = projects[i];

            projectCards.push(
                <Col md={6} lg={6} className='projectCard ps-0' key={project.project_id}>
                    <Card>
                        <Card.Header>
                            <div className='d-flex justify-content-between text-start'>
                                <div>
                                    <span className='d-block'>
                                        <b>{project.project_name}</b>
                                        <small className='d-block text-dark'>
                                            <b className='text-danger'>{project.totalTasks}</b> Total tasks,{' '}
                                            <b className='text-danger'>{project.completedTasks}</b> tasks completed
                                        </small>
                                    </span>
                                </div>
                                <div>
                                    <Link className='btn btn-info btn-sm h-auto' to={`/employee/projectdetails/${project.project_id}`}>
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
                                    src={project.leaderAvatar || 'https://mdbootstrap.com/img/new/avatars/6.jpg'} // Use a default avatar if none provided
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
                                                src={'https://mdbootstrap.com/img/Photos/Avatars/man2.jpg'} // Replace with member avatar if available
                                                alt=''
                                                style={{ width: '30px', height: '30px' }}
                                                className='rounded-circle'
                                                data-pr-tooltip={member.name} // Corrected this line
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            );
        }

        return projectCards;
    };


    // Checkin and checkout
    const handleCheckInClick = async () => {
        try {
            const currentTime = moment().tz('Asia/Kolkata'); // Replace with your timezone if needed
            const response = await axios.post(`${config.apiBASEURL}/attendance/add`, {
                date: currentTime.format('YYYY-MM-DD'), // current date in YYYY-MM-DD format
                start_time: currentTime.format('HH:mm:ss'), // current time in HH:mm:ss format
                user_id: userId,
            });
            console.log('Check-in successful:', response.data);
            setIsCheckInVisible(false); // Hide Check In button and show Check Out button
        } catch (error) {
            console.error('Error checking in:', error);
        }
    };

    const handleCheckOutClick = async () => {
        try {
            const currentTime = moment().tz('Asia/Kolkata'); // Replace with your timezone if needed
            const response = await axios.put(`${config.apiBASEURL}/attendance/update`,
                {
                    end_time: currentTime.format('HH:mm:ss') // current time in HH:mm:ss format
                },
                {
                    params: {
                        userId,
                        date: currentTime.format('YYYY-MM-DD'), // current date in YYYY-MM-DD format
                    }
                }
            );
            console.log('Check-out successful:', response.data);
            setIsCheckInVisible(true); // Hide Check Out button and show Check In button
        } catch (error) {
            console.error('Error checking out:', error);
        }
    };



    return (
        <div className='body_content'>
            <Row className="mb-4 justify-content-between">
                <Col md={7} className=''>
                    <Breadcrumb className='align-items-center'>
                        <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
                        <span className='ms-2 me-2'>|</span>
                        <b><span classNames='text-danger'>{hours}</span>:
                            <span classNames='text-danger'>{minutes}</span>:
                            <span classNames='text-danger'>{seconds}</span>
                            <span classNames='text-danger'> {ampm}</span></b>
                    </Breadcrumb>
                </Col>
                <Col md={5} className='d-flex justify-content-end'>

                    {isCheckInVisible ? (
                        <Button icon="pi pi-clock" label="Check In" size='sm' severity="secondary" className='me-1 ms-1' onClick={handleCheckInClick} />
                    ) : (
                        <Button icon="pi pi-clock" label="Check Out" size='sm' severity="secondary" className='me-1 ms-1' onClick={handleCheckOutClick} />
                    )}
                    {/* <Button icon="pi pi-plus" label="Apply WFH" size='sm' severity="help" className='me-1 ms-1' />
                    <Button icon="pi pi-plus" label="Add Leaves" size='sm' severity="info" className='ms-1' /> */}
                </Col>
            </Row>
            <Row className="dadhboard-table">
                <Col md={6} lg={5} className='ps-0'>
                    <Card className='emp_list_card p-0'>
                        <Card.Header className='d-flex justify-content-between align-items-center'>
                            <b>New Task</b>
                            <span>Total: <b className='ms-1'>{todoTasks.length}</b></span>
                        </Card.Header>
                        <Card.Body className='table-scroll'>
                            <Table responsive="sm" size="sm" className='text-left'>
                                <thead>
                                    <tr>
                                        <th>Project Name</th>
                                        <th>Task Description</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {todoTasks.length > 0 ? (
                                        todoTasks.map(task => (
                                            <tr key={task.task_id}>
                                                <td>
                                                    <Link to='#' className='text-info'>
                                                        <b>{task.project_name}</b>
                                                    </Link>
                                                </td>
                                                <td>{task.task_description}</td>
                                                <td><Badge className='bg-help'>{task.status}</Badge></td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3">No tasks found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                    <Card className='emp_list_card p-0'>
                        <Card.Header className='d-flex justify-content-between align-items-center'>
                            <b>Attendance & Leaves</b>
                            <Calendar placeholder='Filter by date' value={date} onChange={(e) => setDate(e.value)} view="month" className='dmcalender' dateFormat="mm/yy" />
                        </Card.Header>
                        <Card.Body className='meeting_div'>
                            <Row className='mx-0 attendanceLiv'>

                                {/* <Col md={4} lg={4} Col='6' className='mb-2'>
                                    <h6>5.5 <small>Leaves Taken</small></h6>
                                </Col>
                                <Col md={4} lg={4} Col='6' className='mb-2'>
                                    <h6>04 <small>Leaves Absent</small></h6>
                                </Col>
                                <Col md={4} lg={4} Col='6' className='mb-2'>
                                    <h6>1<small>Pending Approval</small></h6>
                                </Col>
                                <Col md={4} lg={4} Col='6' className='mb-2'>
                                    <h6>214<small>Working Days</small></h6>
                                </Col>
                                <Col md={4} lg={4} Col='6' className='mb-2'>
                                    <h6>2 <small>Loss of Pay</small></h6>
                                </Col>
                                <Col md={4} lg={4} Col='6' className='mb-2'>
                                    <h6>15th Apr <small>Upcoming Holidays</small></h6>
                                </Col> */}
                                <p className="pt-5">Coming soon</p>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} lg={7} className='pe-0'>
                    <Card className='emp_list_card p-0'>
                        <Card.Header className='d-flex justify-content-between align-items-center'>
                            <b>Task Overview</b>
                            <span>Total: <b className='ms-1'>{progressReviewTasks.length}</b></span>
                        </Card.Header>
                        <Card.Body className='table-scroll'>
                            <Table responsive="sm" size="sm" hover>
                                <thead>
                                    <tr>
                                        <th>Project Name</th>
                                        <th>Task Name</th>
                                        <th>Task Description</th>
                                        <th style={{ width: '130px' }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {progressReviewTasks.map(task => (
                                        <tr key={task.task_id}>
                                            <td>
                                                <Link to={`/employee/projects`} className='text-info'>
                                                    <b>{task.project_name}</b> <span><Badge className='bg-danger'>{task.priority}</Badge></span>
                                                </Link>
                                            </td>
                                            <td>{task.task_name}</td>
                                            <td>{task.task_description}</td>
                                           
                                            <td>
                                                <Badge className='bg-warning'>{task.status}</Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                    <Row classNames="mx-0 p-0">
                        <Col md={12} lg={6} className='ps-0'>
                            <Card className='emp_list_card p-0'>
                                <Card.Header className='text-start'>
                                    <b>Meeting</b>
                                </Card.Header>
                                <Card.Body className='pt-1 meeting_div'>
                                    {/* <ul className='employee-notification-list'>
                                        <li className="employee-notification-grid">
                                            <div className="employee-notification-icon">
                                                <Link href="/react/template/activities">
                                                    <span className="badge-soft-danger rounded-circle">28 <small className='d-block'>Jun</small></span>
                                                </Link>
                                            </div>
                                            <div className="employee-notification-content">
                                                <h6><Link href="/react/template/activities">Lorem Ipsum is simply dummy</Link></h6>
                                                <ul className="nav">
                                                    <li>02:10 PM</li>
                                                    <li>|</li>
                                                    <li>2 Days Left</li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li className="employee-notification-grid">
                                            <div className="employee-notification-icon">
                                                <Link href="/react/template/activities">
                                                    <span className="badge-soft-danger rounded-circle">29 <small className='d-block'>Jun</small></span>
                                                </Link>
                                            </div>
                                            <div className="employee-notification-content">
                                                <h6><Link href="/react/template/activities">Lorem Ipsum is simply dummy</Link></h6>
                                                <ul className="nav">
                                                    <li>02:10 PM</li>
                                                    <li>|</li>
                                                    <li>2 Days Left</li>
                                                </ul>
                                            </div>
                                        </li>
                                    </ul> */}
                                    <p className="pt-5">Coming soon</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={12} lg={6} className='pe-0'>
                            <Card className='emp_list_card p-0'>
                                <Card.Header className='text-start'>
                                    <b>File</b>
                                </Card.Header>
                                <Card.Body className='pt-1 meeting_div'>
                                    {/* <ul className='employee-notification-list'>
                                        <li className="employee-notification-grid">
                                            <div className="employee-notification-icon">
                                                <Link href="/react/template/activities">
                                                    <span className="badge-soft-danger rounded-circle">PDF</span>
                                                </Link>
                                            </div>
                                            <div className="employee-notification-content">
                                                <h6><Link href="/react/template/activities">Lorem Ipsum is simply dummy</Link></h6>
                                                <ul className="nav">
                                                    <li>02:10 PM</li>
                                                    <li>|</li>
                                                    <li>2 Days Left</li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li className="employee-notification-grid">
                                            <div className="employee-notification-icon">
                                                <Link href="/react/template/activities">
                                                    <span className="badge-soft-danger rounded-circle">Img</span>
                                                </Link>
                                            </div>
                                            <div className="employee-notification-content">
                                                <h6><Link href="/react/template/activities">Lorem Ipsum is simply dummy</Link></h6>
                                                <ul className="nav">
                                                    <li>02:10 PM</li>
                                                    <li>|</li>
                                                    <li>21 Apr 2024</li>
                                                </ul>
                                            </div>
                                        </li>
                                    </ul> */}
                                    <p className="pt-5">Coming soon</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col md={6} lg={5} className='ps-0'>
                    <Card>
                        <Card.Header className='text-start d-flex justify-content-between'>
                            <b>Daly Task</b>
                            <Link className='btn-secondary btn-sm h-auto' href='/project/Projects'>View All</Link>
                        </Card.Header>
                        <Card.Body className='taxkScroll'>
                            {/* <ul className="dalytask">
                                <li>
                                    <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                    <span>
                                        <Badge className='bg-warning'>In Review</Badge>
                                    </span>
                                </li>
                                <li>
                                    <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                    <span>
                                        <Badge className='bg-info'>In Profgress</Badge>
                                    </span>
                                </li>
                                <li>
                                    <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                    <span>
                                        <Badge className='bg-success'>Completed</Badge>
                                    </span>
                                </li>
                            </ul> */}
                            <p className="pt-5 text-center">Coming soon</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} lg={7} className='pe-0'>
                    <Card className='emp_list_card p-0 mb-0'>
                        <Card.Header className='text-start d-flex justify-content-between'>
                            <b>On Going Projects</b>
                            <Link className='btn-secondary btn-sm h-auto' to='/employee/projects'>
                                Total : {projects.length}
                            </Link>
                        </Card.Header>
                        <Card.Body className="taxkScroll">
                            <Row className='mx-0'>
                                {projects.length > 0 ? (
                                    renderProjects()
                                ) : (
                                    <Col md={12}>
                                        <p>No projects found.</p>
                                    </Col>
                                )}
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>

    )
};

export default EmployeeHome;
