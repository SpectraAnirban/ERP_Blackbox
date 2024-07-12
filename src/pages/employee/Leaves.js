import axios from "axios";
import React, { useState, useEffect } from "react";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Col, Row, Card, InputGroup } from 'react-bootstrap'; 
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import config from '../../config';
import { MDBProgress, MDBProgressBar, MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { Dialog } from 'primereact/dialog';
import EmpLeaverequest from '../../modalPopup/EmpLeaverequest';
import { InputText } from "primereact/inputtext";
import DatePicker from "react-datepicker";
import { Dropdown } from 'primereact/dropdown';
import { useAuth } from "../../contexts/AuthContext";
const Leaves = () => {
    const [visible, setVisible] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [leaveData, setLeaveData] = useState([]);
    const { userId } = useAuth(); // Get userId from the context
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [selectedLeaveType, setSelectedLeaveType] = useState(null);
    const [selectedStatusType, setSelectedStatusType] = useState(null);
    const [searchEmployee, setSearchEmployee] = useState('');

    // Define dropdown options for leave type and status type
    const leavetype = [
        { name: 'Sick Leave', code: 'Sick' },
        { name: 'Bereavement Leave', code: 'Bereavement' },
        { name: 'Casual Leave', code: 'Casual' },
        { name: 'Half Day', code: 'Half' },
        { name: 'Unpaid Leave', code: 'Unpaid' }
    ];

    const statustype = [
        { name: 'Pending', code: 'Pending' },
        { name: 'Approved', code: 'Approved' },
        { name: 'Rejected', code: 'Rejected' },
        { name: 'Cancelled', code: 'Cancelled' }
    ];

    useEffect(() => {
        const fetchLeaveData = async () => {
            try {
                const response = await fetch(`${config.apiBASEURL}/leaves/leave-req/remaining/${userId}`); // Replace with actual user_id
                if (!response.ok) {
                    throw new Error('Failed to fetch leave data');
                }
                const data = await response.json();
                setLeaveData(data.leaveData);
            } catch (error) {
                console.error('Error fetching leave data:', error);
            }
        };

        fetchLeaveData();
    }, []);

    useEffect(() => {
        const fetchLeaveRequests = async () => {
            try {
                const response = await axios.get(`${config.apiBASEURL}/leaves/leave-req/get`);
                setLeaveRequests(response.data);
            } catch (error) {
                console.error('Error fetching leave requests:', error);
            }
        };

        fetchLeaveRequests();
    }, []);

    const handleEdit = (request) => {
        setSelectedRequest(request);
        setVisible(true);
    };

    const filterLeaveRequests = (request) => {
        // Filter by employee name
        if (searchEmployee && !request.requester.username.toLowerCase().includes(searchEmployee.toLowerCase())) {
            return false;
        }
        // Filter by date range
        const requestDate = new Date(request.current_date);
        if ((startDate && requestDate < startDate) || (endDate && requestDate > endDate)) {
            return false;
        }
        // Filter by leave type
        if (selectedLeaveType && request.leave_name !== selectedLeaveType.name) {
            return false;
        }
        // Filter by status
        if (selectedStatusType && request.status !== selectedStatusType.name) {
            return false;
        }
        return true;
    };

    const filteredLeaveRequests = leaveRequests.filter(filterLeaveRequests);

    return (
        <>
            <Row className='body_content'>
                <Row className='mx-0'>
                    <Col md={12} lg={9} className='mb-4'>
                        <Breadcrumb>
                            <Breadcrumb.Item active>Leaves</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col md={12} lg={3} className='d-flex justify-content-end mb-4'>
                        <Button label="Leave Request" severity="primary" icon="pi pi-plus" size="small" onClick={() => setVisible(true)} className="h-auto"/>
                    </Col>

                    {leaveData.map((leave, index) => (
                        <Col key={index} md={6} lg={3} className='dashboard_card'>
                            <Card>
                                <Card.Header>
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <span className="d-block">{leave.leave_name}</span>
                                        </div>
                                        <div>
                                            <span className="d-block">{leave.max_days} days</span>
                                        </div>
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title>{leave.taken_days} days taken</Card.Title>
                                    <Card.Text>
                                        <MDBProgress>
                                            <MDBProgressBar bgColor='warning' width='50' value={leave.remaining_days * (100 / leave.max_days)} valuemin={0} valuemax={100} />
                                        </MDBProgress>
                                        <span>Left for you: <span className='text-danger'><b>{leave.remaining_days} days</b></span></span>
                                        &nbsp; | &nbsp; 
                                        <span>Collected: <span className='text-danger'><b>{leave.monthly_collected_days} days</b></span></span>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                    <Col md={12} lg={12} className="mx-0 mt-4">
                        <Card className='pt-3'>
                            <Card.Header>
                                <Row className='align-items-center justify-content-end pb-2'>
                                    <Col md='6' lg='2' col='12' className='dashboard_card plr'>
                                        <InputText placeholder="Employee Name" type='search' value={searchEmployee} onChange={(e) => setSearchEmployee(e.target.value)} />
                                    </Col>
                                    <Col md='12' lg='3' col='12' className='dashboard_card plr'>
                                        <InputGroup className='align-items-center'>
                                            <DatePicker
                                                showIcon
                                                selected={startDate}
                                                onChange={(date) => setStartDate(date)}
                                                className='w-100'
                                            />
                                            <p className='m-0 p-2'>To</p>
                                            <DatePicker
                                                showIcon
                                                selected={endDate}
                                                onChange={(date) => setEndDate(date)}
                                                className='w-100'
                                            />
                                        </InputGroup>
                                    </Col>
                                    <Col md='6' lg='2' col='6' className='dashboard_card plr'>
                                        <Dropdown 
                                            value={selectedLeaveType} 
                                            onChange={(e) => setSelectedLeaveType(e.value)} 
                                            options={leavetype} 
                                            optionLabel="name" 
                                            placeholder="Leave Type" 
                                            className="w-100" 
                                        />
                                    </Col>
                                    <Col md='6' lg='2' col='6' className='dashboard_card plr'>
                                        <Dropdown 
                                            value={selectedStatusType} 
                                            onChange={(e) => setSelectedStatusType(e.value)} 
                                            options={statustype} 
                                            optionLabel="name" 
                                            placeholder="Status" 
                                            className="w-100" 
                                        />
                                    </Col>
                                </Row>
                            </Card.Header>
                          
                            <MDBTable hover align='left'>
                                <MDBTableHead>
                                    <tr>
                                        <th scope='col'>ID</th>
                                        <th scope='col'>Name</th>
                                        <th scope='col'>Dates</th>
                                        <th scope='col'>Duration</th>
                                        <th scope='col'>Issued On</th>
                                        <th scope='col'>Status</th>
                                        <th scope='col'>Approved By</th>
                                        <th scope='col'>Actions</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {filteredLeaveRequests.map((request) => (
                                        <tr key={request.id_leave_request}>
                                            <td>{request.id_leave_request}</td>
                                            <td>
                                                <div className='d-flex align-items-center justify-content-start'>
                                                    <img
                                                        src='https://mdbootstrap.com/img/new/avatars/6.jpg'
                                                        alt=''
                                                        style={{ width: '30px', height: '30px' }}
                                                        className='rounded-circle'
                                                    />
                                                    <div className='ms-3'>
                                                        <p className='mb-0'>{request.requester.username}</p>
                                                        <p className='text-muted mb-0'>
                                                            <b className='text-info'>{request.total_days} Days</b>
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <p className='mb-0 text-primary fw-bold'>{request.leave_name}</p>
                                                    <p className='text-muted mb-0'>{request.dates}</p>
                                                </div>
                                            </td>
                                            <td>{request.duration}</td>
                                            <td>{request.current_date}</td>
                                            <td>
                                                <MDBBadge pill>{request.status}</MDBBadge>
                                            </td>
                                            <td>
                                                <div className='d-flex align-items-center justify-content-start'>
                                                    <img
                                                        src='https://mdbootstrap.com/img/new/avatars/6.jpg'
                                                        alt=''
                                                        style={{ width: '30px', height: '30px' }}
                                                        className='rounded-circle'
                                                    />
                                                    <div className='ms-3'>
                                                        <p className='mb-1'>{request.approver && request.approver.username}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <MDBBtn color='link' rounded size='sm' onClick={() => handleEdit(request)}>
                                                    Edit
                                                </MDBBtn>
                                            </td>
                                        </tr>
                                    ))}
                                </MDBTableBody>
                            </MDBTable>
                        </Card>
                    </Col>
                </Row>
            </Row>
            <Dialog header="Applying for" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <EmpLeaverequest />
            </Dialog>
        </>
    );
};

export default Leaves;
