import React, { useEffect, useState } from 'react';
import { Col, Row, Card, Badge, Breadcrumb, Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { Tooltip } from 'primereact/tooltip';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';
import config from '../../config';
import {
    MDBProgress,
    MDBProgressBar,
    MDBTable,
    MDBBadge,
    MDBTableBody,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane
} from 'mdb-react-ui-kit';
import '../../assets/css/dashboard.css';
import '../../assets/css/projects.css';
import Editproject from '../../modalPopup/Editproject';

import CustomToast from '../../components/CustomToast';

const Hrprojectdetails = () => {
    const { projectId } = useParams();
    const [projectDetails, setProjectDetails] = useState(null);
    const [visible, setVisible] = useState(false);
    const [fillActive, setFillActive] = useState('tab1');
    const [todoTasks, setTodoTasks] = useState([]);
    const [inProgressTasks, setInProgressTasks] = useState([]);
    const [inReviewTasks, setInReviewTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [visible2, setVisible2] = useState(false);
    const office_id = 1; // replace with your actual office_id
    const [users, setUsers] = useState([]);

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
        const fetchProjectDetails = async () => {
            try {
                const response = await axios.get(`${config.apiBASEURL}/project/projectdetails/${projectId}`);
                console.log('Project Details:', response.data); // Debug log
                setProjectDetails(response.data);
            } catch (error) {
                console.error('Error fetching project details:', error);
            }
        };
        fetchProjectDetails();
    }, [projectId]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`${config.apiBASEURL}/tasks/fetchallquery?project_id=${projectId}`);
                console.log('Task Details:', response.data); // Debug log
                setTodoTasks(response.data.todoTasks);
                setInProgressTasks(response.data.inProgressTasks);
                setInReviewTasks(response.data.inReviewTasks);
                setCompletedTasks(response.data.completedTasks);
            } catch (error) {
                console.error('Error fetching task details:', error);
            }
        };

        if (projectId) {
            fetchTasks();
        }
    }, [projectId]);

    const calculateOpenAndCompletedTasks = () => {
        const openTasksCount = inProgressTasks.length + inReviewTasks.length;
        const completedTasksCount = completedTasks.length;
        return { openTasksCount, completedTasksCount };
    };

    const calculateProjectCompletionPercentage = () => {
        const totalTasks = todoTasks.length + inProgressTasks.length + inReviewTasks.length + completedTasks.length;
        if (totalTasks === 0) {
            return 0;
        }
        const completedPercentage = (completedTasks.length / totalTasks) * 100;
        return Math.round(completedPercentage);
    };

    const { openTasksCount, completedTasksCount } = calculateOpenAndCompletedTasks();
    const completionPercentage = calculateProjectCompletionPercentage();

    return (
        <>
            {projectDetails && (
                <Row className='body_content'>
                    <Row className='mx-0'>
                        <Col md='12' lg='9' className='mb-4'>
                            <Breadcrumb>
                                <Breadcrumb.Item active>{projectDetails.project_name}</Breadcrumb.Item>
                            </Breadcrumb>
                        </Col>
                        <Col md='12' lg='3' className='d-flex justify-content-end mb-4'>
                            <Button className='btn btn-primary h-auto' onClick={() => setVisible(true)}>Edit Project </Button>
                        </Col>
                        <Col md={12} lg={9}>
                            <Card className='mb-3 h-auto'>
                                <Card.Header className='h5'>
                                    <span className='d-block text-dark'>
                                        <b>{openTasksCount}</b> <small>open tasks</small> | <b>{completedTasksCount}</b> <small>tasks completed</small>
                                    </span>
                                </Card.Header>
                                <Card.Body>
                                    {/* <Card.Text className='h6 mb-3 text-muted'>Description</Card.Text> */}
                                    {projectDetails.description}
                                </Card.Body>
                            </Card>
                            <Card className='mb-3 h-auto'>
                                <Card.Header className='h5'>Uploaded files Drive Link</Card.Header>
                                <Card.Body className='card-scroll'>
                                    <ul className='fileupload_card'>
                                        <li>
                                            <div className='d-flex align-items-center'>
                                                <img
                                                    src='https://play-lh.googleusercontent.com/9XKD5S7rwQ6FiPXSyp9SzLXfIue88ntf9sJ9K250IuHTL7pmn2-ZB0sngAX4A2Bw4w'
                                                    alt=''
                                                    style={{ width: '65px', height: '65px' }}
                                                />
                                                <div className='ms-3'>
                                                    <p className='fw-bold mb-0'>{projectDetails.project_files}</p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </Card.Body>
                            </Card>
                            <Card className='h-auto'>
                                <Card.Body>
                                    <MDBTabs pills fill className='mb-3'>
                                        <MDBTabsItem>
                                            <MDBTabsLink onClick={() => setFillActive('tab1')} active={fillActive === 'tab1'}>
                                                All Tasks
                                            </MDBTabsLink>
                                        </MDBTabsItem>
                                        <MDBTabsItem>
                                            <MDBTabsLink onClick={() => setFillActive('tab2')} active={fillActive === 'tab2'}>
                                                Pending Tasks
                                            </MDBTabsLink>
                                        </MDBTabsItem>
                                        <MDBTabsItem>
                                            <MDBTabsLink onClick={() => setFillActive('tab3')} active={fillActive === 'tab3'}>
                                                Completed Tasks
                                            </MDBTabsLink>
                                        </MDBTabsItem>
                                    </MDBTabs>

                                    <MDBTabsContent>
                                        <MDBTabsPane open={fillActive === 'tab1'}>
                                            <div className='card-scroll'>
                                                <ul className="dalytask">
                                                    {todoTasks.concat(inProgressTasks, inReviewTasks, completedTasks).map(task => (
                                                        <li key={task.task_id} className='pb-0'>
                                                            <span>
                                                                <small className='pd_tasklist'>
                                                                    <small>Task Name:</small>
                                                                        {task.task_name}
                                                                    
                                                                </small>
                                                                <small className='pd_tasklist'><small>Task Description:</small>{task.task_description}</small>
                                                            </span>
                                                            <span>
                                                                {task.status === 'inReview' && <Badge className='bg-warning'>In Review</Badge>}
                                                                {task.status === 'inProgress' && <Badge className='bg-info'>In Progress</Badge>}
                                                                {task.status === 'completed' && <Badge className='bg-success'>Completed</Badge>}
                                                                {task.status === 'todo' && <Badge className='bg-secondary'>To Do</Badge>}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </MDBTabsPane>
                                        <MDBTabsPane open={fillActive === 'tab2'}>
                                            <div className='card-scroll'>
                                                <ul className="dalytask">
                                                    {inProgressTasks.concat(inReviewTasks).map(task => (
                                                        <li key={task.task_id}>
                                                            <span>
                                                                <small className='pd_tasklist'><small>Task Name:</small> {task.task_name}</small>
                                                                <small className='pd_tasklist'><small>Task Description:</small>{task.task_description}</small>
                                                            </span>
                                                            <span>
                                                                {task.status === 'inReview' && <Badge className='bg-warning'>In Review</Badge>}
                                                                {task.status === 'inProgress' && <Badge className='bg-info'>In Progress</Badge>}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </MDBTabsPane>
                                        <MDBTabsPane open={fillActive === 'tab3'}>
                                            <div className='card-scroll'>
                                                <ul className="dalytask">
                                                    {completedTasks.map(task => (
                                                        <li key={task.task_id}>
                                                            <span>
                                                                <small className='pd_tasklist'>
                                                                    <small>Task Name:</small>
                                                                        {task.task_name}
                                                                    
                                                                </small>
                                                                <small className='pd_tasklist'><small>Task Description:</small>{task.task_description}</small>
                                                            </span>
                                                            <span>
                                                                <Badge className='bg-success'>Completed</Badge>
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </MDBTabsPane>
                                    </MDBTabsContent>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={12} lg='3'>
                            {/* Project Details Card */}
                            <Card className='mb-3 h-auto'>
                                <Card.Header className='h5'>Project details</Card.Header>
                                <Card.Body>
                                    <MDBTable small className='prj_dettab'>
                                        <MDBTableBody>
                                            {/* <tr>
                                                <th scope='row'>Cost:</th>
                                                <td>$1200</td>
                                            </tr>
                                            <tr>
                                                <th scope='row'>Total Hours:</th>
                                                <td>100 Hours</td>
                                            </tr> */}
                                            <tr>
                                                <th scope='row'>Created:</th>
                                                <td>{projectDetails.start_date} </td>
                                            </tr>
                                            <tr>
                                                <th scope='row'>Deadline:</th>
                                                <td>{projectDetails.end_date}</td>
                                            </tr>
                                            <tr>
                                                <th scope='row'>Priority:</th>
                                                <td>
                                                    <MDBBadge pill light color='danger'>
                                                        {projectDetails.priority}
                                                    </MDBBadge>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope='row'>Created by:</th>
                                                <td>{projectDetails.lead[0].name}</td>
                                            </tr>
                                            <tr>
                                                <th scope='row'>Status:</th>
                                                <td>Working</td>
                                            </tr>
                                        </MDBTableBody>
                                    </MDBTable>
                                    <Card.Text className='mt-3'>
                                        <small><b>Progress <span className="float-end text-success">{completionPercentage}%</span></b></small>
                                    </Card.Text>
                                    <MDBProgress>
                                        <MDBProgressBar bgColor='success' width={`${completionPercentage}`} valuemin={0} valuemax={100} />
                                    </MDBProgress>
                                </Card.Body>
                            </Card>
                            {/* Assigned Leader Card */}
                            <Card className='mb-3 h-auto'>
                                <Card.Header className='h5'>Assigned Leader</Card.Header>
                                <Card.Body>
                                    <Tooltip target=".leader-tooltip" mouseTrack mouseTrackLeft={10} mouseTrackTop={10} />
                                    <ul className="list-unstyled d-flex flex-wrap align-items-center m-0">
                                        {projectDetails.lead.map((leader) => (
                                            <li key={leader.user_id} className="d-flex align-items-center me-3 mt-2 leader-tooltip">
                                                <img src={'https://mdbootstrap.com/img/new/avatars/6.jpg'} alt={leader.name} className="rounded-circle me-2" width="30" height="30" />
                                                <span>{leader.name}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </Card.Body>
                            </Card>
                            {/* Assigned Team Member Card */}
                            <Card className='mb-3 h-auto'>
                                <Card.Header className='h5'>Assigned Team Members</Card.Header>
                                <Card.Body>
                                    <Tooltip target=".member-tooltip" mouseTrack mouseTrackLeft={10} mouseTrackTop={10} />
                                    <ul className="list-unstyled d-flex flex-wrap align-items-center m-0">
                                        {projectDetails.members.map((member) => (
                                            <li key={member.user_id} className="d-flex align-items-center me-3 mt-2 member-tooltip">
                                                <img src={'https://mdbootstrap.com/img/Photos/Avatars/man2.jpg'} alt={member.name} className="rounded-circle me-2" width="30" height="30" />
                                                <span>{member.name}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Row>
            )}
            {/* Edit Project Dialog */}
            <Dialog className='proj_dig' header="Edit Project" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <Editproject users={users} projectDetails={projectDetails} visible={visible} onHide={() => setVisible(false)} />
            </Dialog>
        </>
    );
};

export default Hrprojectdetails;
