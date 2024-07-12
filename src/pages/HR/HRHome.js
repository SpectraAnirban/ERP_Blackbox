import '../../App.css';
import '../../assets/css/admin.css';
import { Col, Row, Card, Table, Badge, Form, Breadcrumb} from 'react-bootstrap';
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
//import { Chart as ChartJS} from "chart.js/auto";
import { Link } from 'react-router-dom';
import { TbUsersMinus } from "react-icons/tb";
import { HiOutlineUsers } from "react-icons/hi2";
import { PiUsersFourLight } from "react-icons/pi";
import { LiaHourglassHalfSolid } from "react-icons/lia";
import CustomToast from '../../components/CustomToast';


const HRHome = () => {
    return (
        <>
            <Row className='body_content'>
                <Row className="mx-0 mb-4 justify-content-between">
                    <Col md={'12'} lg={'12'} className='mb-4'>
                        <Breadcrumb>
                            <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col md={'6'} lg={'3'} className='dashboard_card mb-4'>
                        <Card>
                            <Card.Header>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <span class="d-block">Today Present</span>
                                    </div>
                                    <div className='hrshortdata'>
                                        <span><PiUsersFourLight /></span>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Card.Title> 10</Card.Title>
                                {/* <Card.Text>
                                    <MDBProgress>
                                        <MDBProgressBar bgColor='warning' width='75' valuemin={0} valuemax={100} />
                                    </MDBProgress>
                                    <span>Overall Employees 50</span>
                                </Card.Text> */}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={'6'} lg={'3'} className='dashboard_card mb-4'>
                        <Card>
                            <Card.Header>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <span class="d-block">Today Absent</span>
                                    </div>
                                    <div className='hrshortdata'>
                                        <span><TbUsersMinus /></span>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>2</Card.Title>
                                {/* <Card.Text>
                                    <MDBProgress>
                                        <MDBProgressBar bgColor='warning' width='75' valuemin={0} valuemax={100} />
                                    </MDBProgress>
                                    <span>Previous Month <small className='text-danger'><b>₹1,15,852</b></small></span>
                                </Card.Text> */}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={'6'} lg={'3'} className='dashboard_card mb-4'>
                        <Card>
                            <Card.Header>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <span class="d-block">Today Leave</span>
                                    </div>
                                    <div className='hrshortdata'>
                                        <span><HiOutlineUsers /></span>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>4</Card.Title>
                                {/* <Card.Text>
                                    <MDBProgress>
                                        <MDBProgressBar bgColor='warning' width='75' valuemin={0} valuemax={100} />
                                    </MDBProgress>
                                    <span>Previous Month <small className='text-danger'><b>₹7,500</b></small></span>
                                </Card.Text> */}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={'6'} lg={'3'} className='dashboard_card mb-4'>
                        <Card>
                            <Card.Header>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <span className="d-block">Half Day Leave</span>
                                    </div>
                                    <div className='hrshortdata'>
                                        <span><LiaHourglassHalfSolid /></span>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>2</Card.Title>
                                {/* <Card.Text>
                                    <MDBProgress>
                                        <MDBProgressBar bgColor='warning' width='75' valuemin={0} valuemax={100} />
                                    </MDBProgress>
                                    <span>Previous Month <small className='text-danger'><b>₹1,42,000</b></small></span>
                                </Card.Text> */}
                            </Card.Body>
                        </Card>
                    </Col>
                    {/* <Col md={'12'} lg={'4'} className='dashboard_secondcard mb-4'>
                        <Card>
                            <Card.Header>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <span className="d-block">Task Statistics</span>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>
                                    <div className="statistics">
                                        <Row>
                                            <Col md='6' lg='6' col='12' className='dashboard_card'>
                                                <div className="stats-box mb-4 text-center">
                                                    <p>Total Tasks</p>
                                                    <h3>385</h3>
                                                </div>
                                            </Col>
                                            <Col md='6' lg='6' col='12' className='dashboard_card'>
                                                <div className="stats-box mb-4 text-center">
                                                    <p>Overdue Tasks</p>
                                                    <h3>19</h3>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Card.Title>
                                <MDBProgress height='20'>
                                    <MDBProgressBar width='30' bgColor='success' valuemin={0} valuemax={100}>30%</MDBProgressBar>
                                    <MDBProgressBar bgColor='warning' width='22' valuemin={0} valuemax={100}>22%</MDBProgressBar>
                                    <MDBProgressBar bgColor='purple' width='24' valuemin={0} valuemax={100}>24%</MDBProgressBar>
                                    <MDBProgressBar bgColor='danger' width='21' valuemin={0} valuemax={100}>21%</MDBProgressBar>
                                    <MDBProgressBar bgColor='info' width='10' valuemin={0} valuemax={100}>10%</MDBProgressBar>
                                </MDBProgress>
                                <Card.Text className='mt-4'>
                                    <p><i className="fa-regular fa-circle-dot text-success me-2"></i>Completed Tasks <span className="float-end">166</span></p>
                                    <p><i className="fa-regular fa-circle-dot text-warning me-2"></i>Inprogress Tasks <span className="float-end">115</span></p>
                                    <p><i className="fa-regular fa-circle-dot text-purple me-2"></i>On Hold Tasks <span className="float-end">31</span></p>
                                    <p><i className="fa-regular fa-circle-dot text-danger me-2"></i>Pending Tasks <span className="float-end">47</span></p>
                                    <p className="mb-0"><i className="fa-regular fa-circle-dot text-info me-2"></i>Review Tasks <span className="float-end">5</span></p>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col> */}
                    <Col md={6} lg={8} className='pe-0'>
                        <Card className='emp_list_card p-0'>
                            <Card.Header className='d-flex justify-content-between align-items-center'>
                                <b>Task Overview</b>
                                <span>Total: <b className='ms-1'>2</b></span>
                            </Card.Header>
                            <Card.Body className='table-scroll'>
                                <Table responsive="sm" size="sm" hover>
                                    <thead>
                                        <tr>
                                            <th>Project Name</th>
                                            <th>Task Descriprion</th>
                                            <th>Assigned By</th>
                                            <th>Assigned Date</th>
                                            <th style={{ width: '130px' }}>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Link href='' className='text-info'>
                                                    <b>Test Project </b>&nbsp; <span><Badge className='bg-danger'>Urgent</Badge></span>
                                                </Link>
                                            </td>
                                            <td>Appointment booking with payment gateway</td>
                                            <td>Jon</td>
                                            <td>01/17/2024</td>
                                            {/* <td>
                                                <DatePicker
                                                    showIcon
                                                    selected={startDate}
                                                    onChange={(date) => setStartDate(date)}
                                                />
                                            </td> */}
                                            <td>
                                                <Form.Select aria-label="Default select example" className='table_sel w-100'>
                                                    <option disabled>Select status</option>
                                                    <option value="1">Not Start</option>
                                                    <option value="2">Discontinued</option>
                                                    <option value="2">On Track</option>
                                                    <option value="3">Complete</option>
                                                </Form.Select>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <Link href='' className='text-info'>
                                                    <b>Test Project </b>&nbsp; <span><Badge className='bg-danger'>Urgent</Badge></span>
                                                </Link>
                                            </td>
                                            <td>Appointment booking with payment gateway</td>
                                            <td>Jon</td>
                                            <td>01/17/2024</td>
                                            <td>
                                                <Form.Select aria-label="Default select example" className='table_sel w-100'>
                                                    <option disabled>Select status</option>
                                                    <option value="1">Not Start</option>
                                                    <option value="2">Discontinued</option>
                                                    <option value="2">On Track</option>
                                                    <option value="3">Complete</option>
                                                </Form.Select>
                                            </td>
                                        </tr>
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
                                        <ul className='employee-notification-list'>
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
                                        </ul>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={12} lg={6} className='pe-0'>
                                <Card className='emp_list_card p-0'>
                                    <Card.Header className='text-start'>
                                        <b>File</b>
                                    </Card.Header>
                                    <Card.Body className='pt-1 meeting_div'>
                                        <ul className='employee-notification-list'>
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
                                        </ul>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={'12'} lg={'4'} className='dashboard_secondcard mb-4'>
                        <Card>
                            <Card.Header>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <span className='me-2'>Today Absent</span>
                                        <span className="bg-inverse-danger">5</span>
                                    </div>
                                    <div>
                                        <button className="btn btn-sm btn-info">View All</button>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body className='scrollbody'>
                                <Card.Title>
                                    <div className="leave-info-box">
                                        <div className='d-flex align-items-center'>
                                            <img
                                                src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                                alt=''
                                                style={{ width: '34px', height: '34px' }}
                                                className='rounded-circle'
                                            />
                                            <div className='ms-3'>
                                                <p className='fw-bold mb-1 text-sm'>John Doe</p>
                                                <p className='text-muted mb-0 text-sm'>Leave Date : 24 Jan 2024</p>
                                            </div>
                                        </div>
                                        <Row className="align-items-center mt-0 justify-content-end">
                                            <Col lg='6' col='12' className='text-end'>
                                                <MDBBadge color='danger' pill className='text-sm'>
                                                    Pending
                                                </MDBBadge>
                                            </Col>
                                        </Row>
                                    </div>
                                </Card.Title>
                                <Card.Title>
                                    <div className="leave-info-box">
                                        <div className='d-flex align-items-center'>
                                            <img
                                                src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                                alt=''
                                                style={{ width: '34px', height: '34px' }}
                                                className='rounded-circle'
                                            />
                                            <div className='ms-3'>
                                                <p className='fw-bold mb-1 text-sm'>Martin Lewis</p>
                                                <p className='text-muted mb-0 text-sm'>Leave Date : 24 Jan 2024</p>
                                            </div>
                                        </div>
                                        <Row className="align-items-center mt-0 justify-content-end">
                                            <Col lg='6' col='12' className='text-end'>
                                                <MDBBadge color='success' pill className='text-sm'>
                                                    Approved
                                                </MDBBadge>
                                            </Col>
                                        </Row>
                                    </div>
                                </Card.Title>
                                <Card.Title>
                                    <div className="leave-info-box">
                                        <div className='d-flex align-items-center'>
                                            <img
                                                src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                                alt=''
                                                style={{ width: '34px', height: '34px' }}
                                                className='rounded-circle'
                                            />
                                            <div className='ms-3'>
                                                <p className='fw-bold mb-1 text-sm'>Martin Doe</p>
                                                <p className='text-muted mb-0 text-sm'>Leave Date : 24 Jan 2024</p>
                                            </div>
                                        </div>
                                        <Row className="align-items-center mt-0 justify-content-end">
                                            <Col lg='6' col='12' className='text-end'>
                                                <MDBBadge color='danger' pill className='text-sm'>
                                                    Pending
                                                </MDBBadge>
                                            </Col>
                                        </Row>
                                    </div>
                                </Card.Title>
                                
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={'12'} lg={'4'} className='dashboard_secondcard mb-4'>
                        <Card>
                            <Card.Header>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <span className="d-block">New Projects</span>
                                    </div>
                                    <div>
                                        <button className="btn btn-sm btn-info">View All</button>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body className='scrollbody'>
                                <Card.Title>
                                    <div className="leave-info-box">
                                        <div className='d-flex align-items-center justify-content-between'>
                                            <div className='d-flex'>
                                                <img
                                                    src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                                    alt=''
                                                    style={{ width: '34px', height: '34px' }}
                                                    className='rounded-circle'
                                                />
                                                <div className='ms-3'>
                                                    <p className='fw-bold mb-1 text-sm'> Barry Cuda</p>
                                                    <p className='text-muted mb-0 text-sm'>barrycuda@example.com</p>
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <Form.Select aria-label="Default select example" className='border'>
                                                    <option value="1"> Active</option>
                                                    <option value="2">In Active</option>
                                                </Form.Select>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Title>
                                <Card.Title>
                                    <div className="leave-info-box">
                                        <div className='d-flex align-items-center justify-content-between'>
                                            <div className='d-flex'>
                                                <img
                                                    src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                                    alt=''
                                                    style={{ width: '34px', height: '34px' }}
                                                    className='rounded-circle'
                                                />
                                                <div className='ms-3'>
                                                    <p className='fw-bold mb-1 text-sm'> Barry Cuda</p>
                                                    <p className='text-muted mb-0 text-sm'>barrycuda@example.com</p>
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <Form.Select aria-label="Default select example" className='border'>
                                                    <option value="1"> Active</option>
                                                    <option value="2" selected>In Active</option>
                                                </Form.Select>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Title>
                                <Card.Title>
                                    <div className="leave-info-box">
                                        <div className='d-flex align-items-center justify-content-between'>
                                            <div className='d-flex'>
                                                <img
                                                    src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                                    alt=''
                                                    style={{ width: '34px', height: '34px' }}
                                                    className='rounded-circle'
                                                />
                                                <div className='ms-3'>
                                                    <p className='fw-bold mb-1 text-sm'> Barry Cuda</p>
                                                    <p className='text-muted mb-0 text-sm'>barrycuda@example.com</p>
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <Form.Select aria-label="Default select example" className='border'>
                                                    <option value="1"> Active</option>
                                                    <option value="2">In Active</option>
                                                </Form.Select>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Title>
                                <Card.Title>
                                    <div className="leave-info-box">
                                        <div className='d-flex align-items-center justify-content-between'>
                                            <div className='d-flex'>
                                                <img
                                                    src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                                    alt=''
                                                    style={{ width: '34px', height: '34px' }}
                                                    className='rounded-circle'
                                                />
                                                <div className='ms-3'>
                                                    <p className='fw-bold mb-1 text-sm'> Barry Cuda</p>
                                                    <p className='text-muted mb-0 text-sm'>barrycuda@example.com</p>
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <Form.Select aria-label="Default select example" className='border'>
                                                    <option value="1"> Active</option>
                                                    <option value="2" selected>In Active</option>
                                                </Form.Select>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Title>
                            </Card.Body>
                        </Card>          
                    </Col>
                    {/* <Col md={'12'} lg={'6'} className='dashboard_secondcard mb-4'>
                        <Card>
                            <Card.Header>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <span className="d-block">Payments</span>
                                    </div>
                                    <div>
                                        <button className="btn btn-sm btn-info">View All</button>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body className=''>
                                <MDBTable small bordered>
                                    <MDBTableHead>
                                        <tr>
                                        <th scope='col'>Id</th>
                                        <th scope='col'>Client</th>
                                        <th scope='col'>Payment Type</th>
                                        <th scope='col'>Date</th>
                                        <th scope='col'>Amount</th>
                                        
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        <tr>
                                            <th className='text-primary'>#INV-0001</th>
                                            <td>Global Technologies</td>
                                            <td>Paypal</td>
                                            <td>24/01/2024</td>
                                            <td>₹10,380</td>
                                        </tr>
                                        <tr>
                                            <th className='text-primary'>#INV-0002</th>
                                            <td>Global Technologies</td>
                                            <td>Paypal</td>
                                            <td>24/01/2024</td>
                                            <td>₹10,380</td>
                                        </tr>
                                        <tr>
                                            <th className='text-primary'>#INV-0003</th>
                                            <td>Global Technologies</td>
                                            <td>Paypal</td>
                                            <td>24/01/2024</td>
                                            <td>₹10,380</td>
                                        </tr>
                                        <tr>
                                            <th className='text-primary'>#INV-0004</th>
                                            <td>Global Technologies</td>
                                            <td>Paypal</td>
                                            <td>24/01/2024</td>
                                            <td>₹10,380</td>
                                        </tr>
                                        <tr>
                                            <th className='text-primary'>#INV-0005</th>
                                            <td>Global Technologies</td>
                                            <td>Paypal</td>
                                            <td>24/01/2024</td>
                                            <td>₹10,380</td>
                                        </tr>
                                    </MDBTableBody>
                                </MDBTable>
                            </Card.Body>
                        </Card>          
                    </Col> */}
                    <Col md={'12'} lg={'8'} className='dashboard_secondcard mb-4'>
                        <Card>
                            <Card.Header>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <span className="d-block">Over Time</span>
                                    </div>
                                    <div>
                                        <button className="btn btn-sm btn-info">View All</button>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body className=''>
                                <MDBTable small bordered>
                                    <MDBTableHead>
                                        <tr>
                                        <th scope='col'>Name</th>
                                        <th scope='col'>OT Hours</th>
                                        <th scope='col'>Description</th>
                                        <th scope='col'>Status</th>
                                        
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        <tr>
                                            <th className='text-primary'><Link to='#' className='d-block'>John Doe</Link></th>
                                            <td>5 hrs.</td>
                                            <td>Lorem ipsum dollar</td>
                                            <td>
                                                <MDBBadge color='danger' pill className='text-sm'>
                                                    Pending
                                                </MDBBadge>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className='text-primary'><Link to='#' className='d-block'>John Doe</Link></th>
                                            <td>5 hrs.</td>
                                            <td>Lorem ipsum dollar</td>
                                            <td>
                                                <MDBBadge color='danger' pill className='text-sm'>
                                                    Pending
                                                </MDBBadge>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className='text-primary'><Link to='#' className='d-block'>John Doe</Link></th>
                                            <td>5 hrs.</td>
                                            <td>Lorem ipsum dollar</td>
                                            <td>
                                                <MDBBadge color='danger' pill className='text-sm'>
                                                    Pending
                                                </MDBBadge>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className='text-primary'><Link to='#' className='d-block'>John Doe</Link></th>
                                            <td>5 hrs.</td>
                                            <td>Lorem ipsum dollar</td>
                                            <td>
                                                <MDBBadge color='danger' pill className='text-sm'>
                                                    Pending
                                                </MDBBadge>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className='text-primary'><Link to='#' className='d-block'>John Doe</Link></th>
                                            <td>5 hrs.</td>
                                            <td>Lorem ipsum dollar</td>
                                            <td>
                                                <MDBBadge color='danger' pill className='text-sm'>
                                                    Pending
                                                </MDBBadge>
                                            </td>
                                        </tr>
                                    </MDBTableBody>
                                </MDBTable>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Row>
        </>

)};

export default HRHome;
