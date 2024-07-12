// src/HREmployees.js
import axios from "axios";
import React, { useState, useEffect } from "react";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Col, Row, Card, InputGroup } from 'react-bootstrap'; 
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import config from '../../config';
import { Link } from 'react-router-dom'; 
import { MDBProgress, MDBProgressBar,  MDBTooltip, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { Dialog } from 'primereact/dialog';
import EmpLeaverequest from '../../modalPopup/EmpLeaverequest';
import { InputText } from "primereact/inputtext";
import DatePicker from "react-datepicker";
import { Dropdown } from 'primereact/dropdown';
import { useAuth } from "../../contexts/AuthContext";
const Leaveactivity = () => {

    /*------------date---------------*/
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    /*--------------End_date------------------*/

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get(`${config.apiBASEURL}/leaves/leave-req/get/Status`);
        setLeaveRequests(response.data);
      } catch (error) {
        console.error('Error fetching leave requests:', error);
      }
    };

    fetchLeaveRequests();
  }, []);

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      const response = await axios.put(`${config.apiBASEURL}/leaves/leave-req/${requestId}`, {
        status: newStatus.name // Assuming 'name' contains the string representation of status
      });
  
      if (response.status === 200) {
        // Handle success
      } else {
        throw new Error('Failed to update leave request status');
      }
    } catch (error) {
      console.error('Error updating leave request status:', error);
    }
  };
  
  
  
    /*--------------------------*/

    const [selectedDuration, setSelectedDuration] = useState(null);
    const duration = [
        { name: '1st Half', code: '1st_Half' },
        { name: '2nd Half', code: '2nd_Half' },
        { name: 'Full Day', code: 'Full_Day' }
    ];

    /*---------------------------*/

    /*--------------------------*/

    const [selectedLeaveType, setSelectedLeaveType] = useState(null);
    const leavetype = [
        { name: 'Sick Leave', code: 'Sick' },
        { name: 'Bereavement Leave', code: 'Bereavement' },
        { name: 'Casual Leave', code: 'Casual' },
        { name: 'Half Day', code: 'Half' },
        { name: 'Unpaid Leave', code: 'Unpaid' }
    ];

    /*---------------------------*/

    /*--------------------------*/

    const [selectedStatusType, setSelectedStatusType] = useState(null);
    const statustype = [
        { name: 'Pending', code: 'Pending' },
        { name: 'Approved', code: 'Approved' },
        { name: 'Rejected', code: 'Rejected' },
        { name: 'Cancelled', code: 'Cancelled' }
    ];

    /*---------------------------*/

    /*--------------------------*/

    const [selectedStatusTable, setSelectedStatusTable] = useState(null);
    const statustable = [
        { name: 'Pending', code: 'Pending' },
        { name: 'Approved', code: 'Approved' },
        { name: 'Rejected', code: 'Rejected' },
        { name: 'Cancelled', code: 'Cancelled' }
    ];

    /*---------------------------*/


    return (
    <>
        <Row className='body_content'>
            <Row className="mx-0 mb-4 justify-content-between">
                <Col md='12' lg='7' className=''>
                    <Breadcrumb>
                        <Breadcrumb.Item active>Leaves</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
                <Col md='12' lg='3' className='d-flex justify-content-end'>
                    <Button className='btn btn-primary h-auto'> Add Leave</Button>
                </Col>
                <Row className="mx-0 mb-4 justify-content-between mt-4">
                    <Col md='6' lg='3' className='dashboard_card'>
                        <Card className='text-center'>
                            <Card.Header>Today Presents</Card.Header>
                            <Card.Body>
                                <Card.Title>12 / 20</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md='6' lg='3' className='dashboard_card'>
                        <Card className='text-center'>
                            <Card.Header>Planned Leaves</Card.Header>
                            <Card.Body>
                                <Card.Title>8 <small className='text-sm'>Today</small></Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md='6' lg='3' className='dashboard_card'>
                        <Card className='text-center'>
                            <Card.Header>Unplanned Leaves</Card.Header>
                            <Card.Body>
                                <Card.Title>0 <small className='text-sm'>Today</small></Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md='6' lg='3' className='dashboard_card'>
                        <Card className='text-center'>
                            <Card.Header>Pending Requests</Card.Header>
                            <Card.Body>
                                <Card.Title>6</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>{/*section-1 */}

                <Row className="mx-0 mb-4">
                    <Card className='pt-3'>
                        <Card.Header>
                            <Row className='align-items-center justify-content-end pb-2'>
                                <Col md='6' lg='2' col='12' className='dashboard_card plr'>
                                    {/* <i className="pi pi-search search-ic" /> */}
                                    <InputText placeholder="Employee Name" type='search'/>
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
                                        value={selectedDuration} 
                                        onChange={(e) => setSelectedDuration(e.value)} 
                                        options={duration} 
                                        optionLabel="name" 
                                        placeholder="Duration" 
                                        className="w-100" 
                                    />
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
                        <Card.Body>
                            <MDBTable hover align='left'>
                                <MDBTableHead>
                                    <tr>
                                    <th scope='col'>ID</th>
                                    <th scope='col'>Name</th>
                                    <th scope='col'>Dates</th>
                                    <th scope='col'>Duration</th>
                                    <th scope='col'>Reason</th>
                                    <th scope='col'>Issued On</th>
                                    <th scope='col'>Status</th>
                                    <th scope='col'>Actions</th>

                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                {leaveRequests.map(request => (
                                    <tr key={request.id_leave_request}>
                                        <td>{request.id_leave_request}</td>
                                        <td>
                                            <Link to={`/employee/profile/${request.userId}`}>
                                                <div className='d-flex align-items-center justify-content-start'>
                                                    <img
                                                        src='https://mdbootstrap.com/img/Photos/Avatars/man2.jpg'
                                                        alt=''
                                                        style={{ width: '30px', height: '30px' }}
                                                        className='rounded-circle'
                                                    />
                                                    <div className='ms-3'>
                                                        <p className='mb-0 text-dark'><b>{request.requester.username}</b></p>
                                                        <p className='text-muted mb-0'>
                                                            <b className='text-info'>{request.total_days} Days</b>
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </td>
                                        <td>
                                            <div>
                                                <p className='mb-0 text-primary fw-bold'>{request.leave_name}</p>
                                                <p className='text-dark mb-0'>{request.dates}</p>
                                            </div>
                                        </td>
                                        <td>{request.duration}</td>
                                        <td>
                                            <p className='mb-0'>{request.reason}</p>
                                        </td>
                                        <td>{request.current_date}</td>
                                        <td>
                                        <Dropdown
                                            value={request.status}
                                            onChange={(e) => handleStatusChange(request.id_leave_request, e.value)}
                                            options={statustable}
                                            optionLabel="name"
                                            placeholder="Status"
                                            className="table_dropdown"
                                            />
                                        </td>
                                        <td className='w-10'>
                                            <MDBBtn rounded size='sm' className='btn-primary'>
                                                Save
                                            </MDBBtn>
                                            <span className='morebtn'>
                                                <MDBTooltip
                                                    wrapperProps={{ color: 'white', padding: '0' }}
                                                    title={
                                                        <>
                                                            {/* Tooltip content */}
                                                        </>
                                                    }
                                                >
                                                    More...
                                                </MDBTooltip>
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                    {/* <tr>
                                        <td>2</td>
                                        <td>
                                            <Link to="/employee/profile">
                                                <div className='d-flex align-items-center justify-content-start'>
                                                    <img
                                                        src='https://mdbootstrap.com/img/new/avatars/6.jpg'
                                                        alt=''
                                                        style={{ width: '30px', height: '30px' }}
                                                        className='rounded-circle'
                                                    />
                                                    <div className='ms-3'>
                                                        <p className='mb-0 text-dark'><b>Alex Ray</b></p>
                                                        <p className='text-muted mb-0'>
                                                            <b className='text-info'>1 Days</b>
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </td>
                                        <td>
                                            <div>
                                                <p className='mb-0 text-primary fw-bold'>Sick Leave</p>
                                                <p className='text-dark mb-0'> 08/03/2024</p>
                                            </div>
                                        
                                        </td>
                                        <td>
                                        Full Day
                                        </td>
                                        <td>
                                            <p className='mb-0'>
                                                Going to Doctor
                                            </p>
                                        </td>
                                        <td>
                                            04/03/2024
                                        </td>
                                        <td>
                                            <Dropdown 
                                                value={selectedStatusTable} 
                                                onChange={(e) => setSelectedStatusTable(e.value)} 
                                                options={statustable} 
                                                optionLabel="name" 
                                                placeholder="Status" 
                                                className="table_dropdown" 
                                            />
                                        </td>
                                        <td className='w-10'>
                                            
                                            <MDBBtn rounded size='sm' className='btn-primary'>
                                                Save
                                            </MDBBtn>
                                            <span className='morebtn'>
                                                <MDBTooltip 
                                                    wrapperProps={{ color: 'white', padding:'0' }}
                                                    title={
                                                        <>
                                                            <p>
                                                                <strong>Leave Pending</strong>
                                                                <span><small>Bereavement Leave </small> : 5 days <i class="triangle-green"></i></span>
                                                                <span><small>Casual Leave </small> : 8 days <i class="triangle-green"></i></span>
                                                                <span><small>Half Day </small> : 99.5 days <i class="triangle-green"></i></span>
                                                                <span><small>Sick Leave </small> : 2 days <i class="triangle-red"></i></span>
                                                                <span><small>Unpaid Leave </small> : 100 days <i class="triangle-green"></i></span>
                                                            </p>
                                                            <p>
                                                                <strong>Projects</strong>
                                                                <span><small>Total Task </small> : 2 Projects </span>
                                                                <span><small>Pending Task </small> : 6 Projects</span>
                                                            </p>
                                                            <p>
                                                                <strong>Projects Deadline</strong>
                                                                <span><small>Project Name </small> : 9/03/2024 <i class="triangle-red"></i></span>
                                                                <span><small>Project Name </small> : 12/03/2024 <i class="triangle-green"></i></span>
                                                            </p>
                                                        </>
                                                    }
                                                    >
                                                    More...
                                                </MDBTooltip>
                                            </span>
                                        </td>
                                    </tr> */}
                                </MDBTableBody>
                            </MDBTable>
                        </Card.Body>
                    </Card>
                </Row>
            </Row>
        </Row>
    </>
)};

export default Leaveactivity;