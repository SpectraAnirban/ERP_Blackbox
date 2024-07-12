import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Breadcrumb, Form, Button, InputGroup, Card, Table, Dropdown } from 'react-bootstrap';
import config from '../../config';
import { useAuth } from '../../contexts/AuthContext';

import { TabView, TabPanel } from 'primereact/tabview';
import { MDBProgress, MDBProgressBar } from 'mdb-react-ui-kit';
import { InputSwitch } from "primereact/inputswitch";

import { Dialog } from 'primereact/dialog';
import Profileinformation from '../../modalPopup/Profileinformation';
import Personalinformations from '../../modalPopup/Personalinformations';
import Emergencycontact from '../../modalPopup/Emergencycontact';
import Bankinformation from '../../modalPopup/Bankinformation';
import EducationInformation from '../../modalPopup/EducationInformation';
import { FiEdit3 } from "react-icons/fi";
import axios from 'axios';

const EmpProfileEdit = () => {
    const [checked, setChecked] = useState(true);
    const [visibleModal1, setVisibleModal1] = useState(false);
    const [visibleModal2, setVisibleModal2] = useState(false);
    const [visibleModal3, setVisibleModal3] = useState(false);
    const [visibleModal4, setVisibleModal4] = useState(false);
    const [visibleModal5, setVisibleModal5] = useState(false);
    const { userId } = useAuth(); // Get userId from the context 
    const [userDetails, setUserDetails] = useState({});
    const [emergencyContacts, setEmergencyContacts] = useState([]);
    const [educationalInfo, setEducationalInfo] = useState([]);
    const [bankDetails, setBankDetails] = useState(null);
    const [personalInfo, setPersonalInfo] = useState([]);
    const [eduInfo, setEduInfo] = useState([]);
    const [bankInfo, setBankInfo] = useState([]);
    const [employeeId, setEmployeeId] = useState('');
    const [employeeName, setEmployeeName] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');

    const effectiveUserId = selectedUserId || userId; // Use selectedUserId if available, otherwise use userId

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`${config.apiBASEURL}/profile/personal?userId=${effectiveUserId}`);
                setUserDetails(response.data);
                setChecked(response.data.user.is_active); 
            } catch (error) {
                console.error('Error fetching user details:', error);
                // Handle error as needed
            }
        };

        fetchUserDetails();
    }, [effectiveUserId]);

    useEffect(() => {
        const fetchEmergencyContacts = async () => {
            try {
                const response = await axios.get(`${config.apiBASEURL}/profile/emergency?userId=${effectiveUserId}`);
                setEmergencyContacts(response.data.emergencyContacts);
            } catch (error) {
                console.error('Error fetching emergency contacts:', error);
                // Handle error as needed
            }
        };

        fetchEmergencyContacts();
    }, [effectiveUserId]);

    useEffect(() => {
        const fetchEducationalInfo = async () => {
            try {
                const response = await axios.get(`${config.apiBASEURL}/profile/eduinfo?userId=${effectiveUserId}`);
                setEducationalInfo(response.data.educationalInfo);
            } catch (error) {
                console.error('Error fetching educational information:', error);
                // Handle error as needed
            }
        };

        fetchEducationalInfo();
    }, [effectiveUserId]);

    useEffect(() => {
        const fetchBankDetails = async () => {
            try {
                const response = await axios.get(`${config.apiBASEURL}/profile/bank-details?userId=${effectiveUserId}`);
                setBankDetails(response.data.bankDetails);
            } catch (error) {
                console.error('Error fetching bank details:', error);
                // Handle error as needed
            }
        };

        fetchBankDetails();
    }, [effectiveUserId]);

    let primaryContact = null;
    let secondaryContact = null;

    if (emergencyContacts.length > 0) {
        if (emergencyContacts.length === 1) {
            primaryContact = emergencyContacts[0];
        } else if (emergencyContacts.length === 2) {
            primaryContact = emergencyContacts[0];
            secondaryContact = emergencyContacts[1];
        }
    }

    useEffect(() => {
        const personalInfoDetails = async () => {
            try {
                const response = await axios.get(`${config.apiBASEURL}/profile/getuserdetails?userId=${effectiveUserId}`);
                setPersonalInfo(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
                // Handle error as needed
            }
        };

        personalInfoDetails();
    }, [effectiveUserId]);

    useEffect(() => {
        const bankInfoDetails = async () => {
            try {
                const response = await axios.get(`${config.apiBASEURL}/profile/getbankdetails?userId=${effectiveUserId}`);
                setBankInfo(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
                // Handle error as needed
            }
        };

        bankInfoDetails();
    }, [effectiveUserId]);

    const openModalWithUserId = () => {
        setVisibleModal2(true);
    }

    const openModalWithUser = () => {
        setVisibleModal3(true);
    }

    const openModalWith = () => {
        setVisibleModal4(true);
    }

    const openModalWithedu = () => {
        setVisibleModal5(true);
    }

    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(`${config.apiBASEURL}/user/search?employee_name=${employeeName}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching users:', error);
            setSearchResults([]);
        }
    };

    const handleUserSelect = (userId) => {
        setSelectedUserId(userId);
    };

    const handleStatusChange = async (newValue) => {
        try {
            await axios.put(`${config.apiBASEURL}/user/update-status/${effectiveUserId}`, { is_active: newValue });
            setChecked(newValue);
        } catch (error) {
            console.error('Error updating user status:', error);
            // Handle error as needed
        }
    };
    return (
        <>
            <Row className='body_content'>
                <Row className="mx-0 mb-4 justify-content-between">
                    <Card className='shadow-0 mb-4'>
                        <Row className="mx-0 justify-content-between align-items-center m-0 pt-3">
                            <Col md={6} lg={8} className='mb-3'>
                                <Breadcrumb>
                                    <Breadcrumb.Item active>EMP Profile Edit</Breadcrumb.Item>
                                </Breadcrumb>
                            </Col>
                            <Col md={12} lg={4}>
                                <Form onSubmit={handleSearch} className='d-flex'>
                                    <InputGroup className="mb-3 em_filter">
                                        <Form.Control
                                            name="employeeName"
                                            type="text"
                                            placeholder="Employee Name"
                                            className="me-0"
                                            value={employeeName}
                                            onChange={(e) => setEmployeeName(e.target.value)}
                                        />
                                        <Button variant="primary" type="submit">
                                            Search
                                        </Button>
                                    </InputGroup>
                                    {searchResults.length > 0 && (
                                        <Dropdown className="select-Userstyle">
                                            <Dropdown.Toggle  id="dropdown-basic">
                                                Select User
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                {searchResults.map(user => (
                                                    <Dropdown.Item key={user.user_id} onClick={() => handleUserSelect(user.user_id)}>
                                                        {user.name}
                                                    </Dropdown.Item>
                                                ))}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    )}
                                </Form>
                            </Col>
                        </Row>
                    </Card>
                    <Row className="mx-0 justify-content-between">
                        <Card className='addEm p-0 profile_caed shadow-0'>
                            <Card.Body>
                                <Row>
                                    <Col lg='6' md='6' className='position-relative'>
                                        <div className='d-flex align-items-center'>
                                            <img
                                                src='https://mdbootstrap.com/img/Photos/Avatars/man2.jpg'
                                                alt=''
                                                style={{ width: '120px', height: '120px' }}
                                                className='rounded-circle'
                                            />
                                            <div className='ms-3'>
                                                <h3 className='fw-bold mb-0 text-black'>{userDetails.userDetails?.name} <small className='digi'>{userDetails.user?.department || 'Not Specified'}</small></h3>
                                                <p className='text-muted mb-1'><small>{userDetails.userDetails?.forte || 'Not Provided Yet'}</small></p>
                                                {/* <p className='text-muted mb-3'><small>{userDetails.user?.role|| 'Not Provided Yet'}</small></p> */}
                                                <p className='text-black mb-0'><b> ID : <span>{userDetails.userDetails?.employee_id || 'Not Provided Yet'}</span></b></p>
                                                <p className='text-black mb-0'><small>Date of Join : {new Date(userDetails.user?.joining_date || 'Not Provided Yet').toLocaleDateString()}</small></p>
                                            </div>
                                        </div>
                                        <div className='activEmp'>
                                            <small>Active / Inactive : </small>
                                            <InputSwitch checked={checked} onChange={(e) => handleStatusChange(e.value)} />
                                        </div>
                                    </Col>
                                    <Col lg='6' md='6' className='border-start ps-lg-5'>
                                        <table className='table pro_table'>
                                            <tr>
                                                <th>Phone :</th>
                                                <td><a href='#!' className='p-0 m-0'>{userDetails.userDetails?.phone}</a></td>
                                            </tr>
                                            <tr>
                                                <th>Email :</th>
                                                <td><a href='#!' className='p-0 m-0'>{userDetails.userDetails?.email_address}</a></td>
                                            </tr>
                                            <tr>
                                                <th>Birthday :</th>
                                                <td>

                                                    {new Date(userDetails.userDetails?.date_of_birth).toLocaleDateString()}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Address :</th>
                                                <td>{userDetails.userDetails?.address}</td>
                                            </tr>
                                            <tr>
                                                <th>Pincode :</th>
                                                <td>
                                                    {userDetails.userDetails?.pincode}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>City :</th>
                                                <td>
                                                    {userDetails.userDetails?.city}</td>
                                            </tr>
                                            <tr>
                                                <th>Gender :</th>
                                                <td>{userDetails.userDetails?.gender}</td>
                                            </tr>
                                            <tr>
                                                <th>Reports to</th>
                                                <td>
                                                    <div className='d-flex align-items-center p-0'>
                                                        <img
                                                            src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                                            alt=''
                                                            style={{ width: '25px', height: '25px' }}
                                                            className='rounded-circle'
                                                        />
                                                        <div className='ms-2'>
                                                            <p className='mb-1'>{userDetails.user?.reported_to}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </Col>
                                    {/* <div className='pro-edit'>
                                        <a href='#!' className='edit-icon' onClick={() => setVisibleModal1(true)}>
                                            <FiEdit3 />
                                        </a>
                                    </div> */}
                                </Row>
                            </Card.Body>
                        </Card>
                    </Row>

                    <Row className="mx-0 justify-content-between mt-3">
                        <Card className='addEm p-0 shadow-0 HRempdetailsDiv'>
                            <TabView>
                                <TabPanel header="Profile">
                                    <Row className='mx-0 justify-content-between'>
                                        <Col lg='6' md='6' className='pcl-card border-end pe-lg-5 mb-3'>
                                            <Card className='shadow-0'>
                                                <Card.Body>
                                                    <Card.Title>Personal Informations</Card.Title>
                                                    <table className='table pro_table'>
                                                        <tr>
                                                            <th>Pan card No. :</th>
                                                            <td>{userDetails.userDetails?.pan_card_no}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Passport No. :</th>
                                                            <td>{userDetails.userDetails?.passport_no}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Aadhar No. :</th>
                                                            <td>{userDetails.userDetails?.aadhar_no}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Nationality :</th>
                                                            <td>{userDetails.userDetails?.nationality}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Religion :</th>
                                                            <td>{userDetails.userDetails?.religion}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Marital status :</th>
                                                            <td>{userDetails.userDetails?.marital_status || 'Not set'}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Employment of spouse :</th>
                                                            <td>{userDetails.userDetails?.employment_of_spouse || 'Not set'}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>No. of children :</th>
                                                            <td>{userDetails.userDetails?.no_of_children || 'Not set'}</td>
                                                        </tr>
                                                    </table>
                                                    <div className='pro-edit'>
                                                        <a className='edit-icon' onClick={openModalWithUserId}>
                                                            <FiEdit3 />
                                                        </a>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col lg='6' md='6' className='pcl-card mb-3'>
                                            <Card className='shadow-0'>
                                                <Card.Body>
                                                    <Card.Title>Emergency Contacts</Card.Title>
                                                    <table className='table pro_table'>

                                                        <tr>
                                                            <th colSpan={1} className='text-secondary'>Primary</th>
                                                        </tr>
                                                        {primaryContact ? (
                                                            <>
                                                                <tr>
                                                                    <th>Name :</th>
                                                                    <td>{primaryContact.name}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Relationship :</th>
                                                                    <td>{primaryContact.relationship}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Phone :</th>
                                                                    <td>{primaryContact.phone}</td>
                                                                </tr>
                                                            </>
                                                        ) : (
                                                            <tr>
                                                                <td colSpan={2}>Primary emergency contact not added</td>
                                                            </tr>
                                                        )}
                                                        <tr>
                                                            <th colSpan={1} className='text-secondary'>Secondary</th>
                                                        </tr>
                                                        {secondaryContact ? (
                                                            <>
                                                                <tr>
                                                                    <th>Name :</th>
                                                                    <td>{secondaryContact.name}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Relationship :</th>
                                                                    <td>{secondaryContact.relationship}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Phone :</th>
                                                                    <td>{secondaryContact.phone}</td>
                                                                </tr>
                                                            </>
                                                        ) : (
                                                            <tr>
                                                                <td colSpan={2}>Secondary emergency contact not added</td>
                                                            </tr>
                                                        )}

                                                    </table>
                                                    <div className='pro-edit'>
                                                        <a href='#!' className='edit-icon' onClick={openModalWithUser}>
                                                            <FiEdit3 />
                                                        </a>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <hr />
                                        <Col lg='6' md='6' className='pcl-card border-end pe-lg-5 mb-3'>
                                            <Card className='shadow-0'>
                                                <Card.Body>
                                                    <Card.Title>Bank Information</Card.Title>
                                                    <table className='table pro_table'>

                                                        <tr>
                                                            <th>Bank Name:</th>
                                                            <td>{bankDetails ? bankDetails.bank_name : 'Not set'}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Bank Account No.:</th>
                                                            <td>{bankDetails ? bankDetails.bank_account_no : 'Not set'}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>AccounT Holders Name:</th>
                                                            <td>{bankDetails ? bankDetails.accountHolder_name : 'Not set'}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>IFSC Code:</th>
                                                            <td>{bankDetails ? bankDetails.ifsc_code : 'Not set'}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Branch Name:</th>
                                                            <td>{bankDetails ? bankDetails.branch_name : 'Not set'}</td>
                                                        </tr>

                                                    </table>
                                                    <div className='pro-edit'>
                                                        <a href='#!' className='edit-icon' onClick={openModalWith}>
                                                            <FiEdit3 />
                                                        </a>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col lg='6' md='6' className='pcl-card mb-3'>
                                            <Card className='shadow-0'>
                                                <Card.Body>
                                                    <Card.Title>Education Information</Card.Title>
                                                    <table className='table pro_table'>

                                                        {educationalInfo.length > 0 ? (
                                                            educationalInfo.map((info, index) => (
                                                                <tr key={index}>
                                                                    <td colSpan={2}>
                                                                        <h6>{info.institute}</h6>
                                                                        <p>{info.degree_name}</p>
                                                                        <small>{info.year_of_passing}</small>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td colSpan={2}>Education information not added</td>
                                                            </tr>
                                                        )}

                                                    </table>
                                                    <div className='pro-edit'>
                                                        <a href='#!' className='edit-icon' onClick={openModalWithedu}>
                                                            <FiEdit3 />
                                                        </a>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </TabPanel>
                                <TabPanel header="Projects">
                                    <Row className='mx-0 justify-content-between'>
                                        <Col lg='4' md='6' className='profile-card  mb-3'>
                                            <Card>
                                                <Card.Header>
                                                    <div className="d-flex justify-content-between">
                                                        <div>
                                                            <span class="d-block">Project Name</span>
                                                        </div>
                                                        <div>
                                                            <span class="text-success"></span>
                                                        </div>
                                                    </div>
                                                </Card.Header>
                                                <Card.Body>
                                                    <div className='d-lg-flex d-md-flex justify-content-between align-items-center project-date text-center'>
                                                        <h6>Deadline: <span>17/02/2024</span></h6>
                                                        <h6>Project Leader
                                                            <span>
                                                                <img
                                                                    src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                                                    alt=''
                                                                    style={{ width: '25px', height: '25px' }}
                                                                    className='rounded-circle'
                                                                />
                                                                <small className='ms-1 text-black'>John Doe</small>
                                                            </span>
                                                        </h6>
                                                    </div>

                                                    <MDBProgress height='15' className='mt-3'>
                                                        <MDBProgressBar width='30' bgColor='success' valuemin={0} valuemax={100}>30%</MDBProgressBar>
                                                        <MDBProgressBar bgColor='warning' width='22' valuemin={0} valuemax={100}>22%</MDBProgressBar>
                                                        <MDBProgressBar bgColor='purple' width='24' valuemin={0} valuemax={100}>24%</MDBProgressBar>
                                                        <MDBProgressBar bgColor='danger' width='21' valuemin={0} valuemax={100}>21%</MDBProgressBar>
                                                        <MDBProgressBar bgColor='info' width='10' valuemin={0} valuemax={100}>10%</MDBProgressBar>
                                                    </MDBProgress>

                                                    <Table size="sm" className='profile-table mt-3 mb-0'>
                                                        <tbody>
                                                            <tr>
                                                                <td><i className="fa-regular fa-circle-dot text-danger me-2"></i>Pending</td>
                                                                <td><span>2</span></td>
                                                            </tr>
                                                            <tr>
                                                                <td><i className="fa-regular fa-circle-dot text-warning me-2"></i> Progress</td>
                                                                <td><span>1</span></td>
                                                            </tr>
                                                            <tr>
                                                                <td> <i className="fa-regular fa-circle-dot text-success me-2"></i> Completed</td>
                                                                <td><span>2</span></td>
                                                            </tr>
                                                            <tr>
                                                                <td><i className="fa-regular fa-circle-dot text-info me-2"></i> Review</td>
                                                                <td><span>1</span></td>
                                                            </tr>
                                                            <tr>
                                                                <td><i className="fa-regular fa-circle-dot text-purple me-2"></i> On Hold</td>
                                                                <td><span>3</span></td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>

                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col lg='4' md='6' className='profile-card  mb-3'>
                                            <Card>
                                                <Card.Header>
                                                    <div className="d-flex justify-content-between">
                                                        <div>
                                                            <span class="d-block">Project Name</span>
                                                        </div>
                                                        <div>
                                                            <span class="text-success"></span>
                                                        </div>
                                                    </div>
                                                </Card.Header>
                                                <Card.Body>
                                                    <div className='d-lg-flex d-md-flex justify-content-between align-items-center project-date text-center'>
                                                        <h6>Deadline: <span> 2/03/2024</span></h6>
                                                        <h6>Project Leader
                                                            <span>
                                                                <img
                                                                    src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                                                    alt=''
                                                                    style={{ width: '25px', height: '25px' }}
                                                                    className='rounded-circle'
                                                                />
                                                                <small className='ms-1 text-black'>John Doe</small>
                                                            </span>
                                                        </h6>
                                                    </div>

                                                    <MDBProgress height='15' className='mt-3'>
                                                        <MDBProgressBar width='30' bgColor='success' valuemin={0} valuemax={100}>30%</MDBProgressBar>
                                                        <MDBProgressBar bgColor='warning' width='22' valuemin={0} valuemax={100}>22%</MDBProgressBar>
                                                        <MDBProgressBar bgColor='purple' width='24' valuemin={0} valuemax={100}>24%</MDBProgressBar>
                                                        <MDBProgressBar bgColor='danger' width='21' valuemin={0} valuemax={100}>21%</MDBProgressBar>
                                                        <MDBProgressBar bgColor='info' width='10' valuemin={0} valuemax={100}>10%</MDBProgressBar>
                                                    </MDBProgress>

                                                    <Table size="sm" className='profile-table mt-3 mb-0'>
                                                        <tbody>
                                                            <tr>
                                                                <td><i className="fa-regular fa-circle-dot text-danger me-2"></i>Pending</td>
                                                                <td><span>2</span></td>
                                                            </tr>
                                                            <tr>
                                                                <td><i className="fa-regular fa-circle-dot text-warning me-2"></i> Progress</td>
                                                                <td><span>1</span></td>
                                                            </tr>
                                                            <tr>
                                                                <td> <i className="fa-regular fa-circle-dot text-success me-2"></i> Completed</td>
                                                                <td><span>2</span></td>
                                                            </tr>
                                                            <tr>
                                                                <td><i className="fa-regular fa-circle-dot text-info me-2"></i> Review</td>
                                                                <td><span>1</span></td>
                                                            </tr>
                                                            <tr>
                                                                <td><i className="fa-regular fa-circle-dot text-purple me-2"></i> On Hold</td>
                                                                <td><span>3</span></td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>

                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col lg='4' md='6' className='profile-card  mb-3'>
                                            <Card>
                                                <Card.Header>
                                                    <div className="d-flex justify-content-between">
                                                        <div>
                                                            <span class="d-block">Project Name</span>
                                                        </div>
                                                        <div>
                                                            <span class="text-success"></span>
                                                        </div>
                                                    </div>
                                                </Card.Header>
                                                <Card.Body>
                                                    <div className='d-lg-flex d-md-flex justify-content-between align-items-center project-date text-center'>
                                                        <h6>Deadline: <span>17/02/2024</span></h6>
                                                        <h6>Project Leader
                                                            <span>
                                                                <img
                                                                    src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                                                    alt=''
                                                                    style={{ width: '25px', height: '25px' }}
                                                                    className='rounded-circle'
                                                                />
                                                                <small className='ms-1 text-black'>John Doe</small>
                                                            </span>
                                                        </h6>
                                                    </div>

                                                    <MDBProgress height='15' className='mt-3'>
                                                        <MDBProgressBar width='30' bgColor='success' valuemin={0} valuemax={100}>30%</MDBProgressBar>
                                                        <MDBProgressBar bgColor='warning' width='22' valuemin={0} valuemax={100}>22%</MDBProgressBar>
                                                        <MDBProgressBar bgColor='purple' width='24' valuemin={0} valuemax={100}>24%</MDBProgressBar>
                                                        <MDBProgressBar bgColor='danger' width='21' valuemin={0} valuemax={100}>21%</MDBProgressBar>
                                                        <MDBProgressBar bgColor='info' width='10' valuemin={0} valuemax={100}>10%</MDBProgressBar>
                                                    </MDBProgress>

                                                    <Table size="sm" className='profile-table mt-3 mb-0'>
                                                        <tbody>
                                                            <tr>
                                                                <td><i className="fa-regular fa-circle-dot text-danger me-2"></i>Pending</td>
                                                                <td><span>2</span></td>
                                                            </tr>
                                                            <tr>
                                                                <td><i className="fa-regular fa-circle-dot text-warning me-2"></i> Progress</td>
                                                                <td><span>1</span></td>
                                                            </tr>
                                                            <tr>
                                                                <td> <i className="fa-regular fa-circle-dot text-success me-2"></i> Completed</td>
                                                                <td><span>2</span></td>
                                                            </tr>
                                                            <tr>
                                                                <td><i className="fa-regular fa-circle-dot text-info me-2"></i> Review</td>
                                                                <td><span>1</span></td>
                                                            </tr>
                                                            <tr>
                                                                <td><i className="fa-regular fa-circle-dot text-purple me-2"></i> On Hold</td>
                                                                <td><span>3</span></td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>

                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </TabPanel>
                                <TabPanel header="Bank & Statutory(Admin Only)">
                                    <Form>
                                        <Row className='mx-0 justify-content-between'>
                                            <Col className='pcl-card mb-3'>
                                                <Card className='shadow-0'>
                                                    <Card.Body>
                                                        <Card.Title>Basic Salary Information</Card.Title>
                                                        <Row>
                                                            <Col lg='4' md='6'>
                                                                <Form.Label>Salary basis *</Form.Label>
                                                                <Form.Select size="lg">
                                                                    <option selected disabled>Please Select</option>
                                                                    <option>Monthly</option>
                                                                    <option>Weekly</option>
                                                                    <option>Hourly</option>
                                                                    <option>Daily</option>
                                                                </Form.Select>
                                                            </Col>
                                                            <Col lg='4' md='6'>
                                                                <Form.Label>Salary amount (₹) <small className='text-secondary'>Per month</small></Form.Label>
                                                                <Form.Control aria-label="Amount (to the nearest dollar)" placeholder='0.00' />
                                                            </Col>
                                                            <Col lg='4' md='6'>
                                                                <Form.Label>Payment type</Form.Label>
                                                                <Form.Select size="lg">
                                                                    <option selected disabled>Please Select</option>
                                                                    <option>Bank transfer</option>
                                                                    <option>Check</option>
                                                                    <option>Cash</option>
                                                                </Form.Select>
                                                            </Col>
                                                        </Row>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </Row>

                                        <Row className='mx-0 justify-content-between'>
                                            <Col className='pcl-card mb-3'>
                                                <Card className='shadow-0'>
                                                    <Card.Body>
                                                        <Card.Title>PF Information</Card.Title>
                                                        <Row>
                                                            <Col lg='4' md='6'>
                                                                <Form.Label>PF contribution</Form.Label>
                                                                <Form.Select size="lg">
                                                                    <option selected disabled>Please Select</option>
                                                                    <option>Yes</option>
                                                                    <option>No</option>
                                                                </Form.Select>
                                                            </Col>
                                                            <Col lg='4' md='6'>
                                                                <Form.Label>PF No. *</Form.Label>
                                                                <Form.Select size="lg">
                                                                    <option selected disabled>Please Select</option>
                                                                    <option>Yes</option>
                                                                    <option>No</option>
                                                                </Form.Select>
                                                            </Col>
                                                            <Col lg='4' md='6'>
                                                                <Form.Label>Salary amount (₹) <small className='text-secondary'>Per month</small></Form.Label>
                                                                <Form.Control aria-label="Amount (to the nearest dollar)" placeholder='0.00' />
                                                            </Col>
                                                            <Col lg='4' md='6'>
                                                                <Form.Label>Payment type</Form.Label>
                                                                <Form.Select size="lg">
                                                                    <option selected disabled>Please Select</option>
                                                                    <option>Bank transfer</option>
                                                                    <option>Check</option>
                                                                    <option>Cash</option>
                                                                </Form.Select>
                                                            </Col>
                                                        </Row>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </Form>
                                </TabPanel>
                                <TabPanel header="Assets">
                                    <p className="m-0">
                                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti
                                        quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
                                        culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
                                        Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                                    </p>
                                </TabPanel>
                            </TabView>
                        </Card>
                    </Row>
                </Row>
                {/*-- Modal part ---*/}

                <Dialog header="Profile Information" aria-labelledby="proIn" visible={visibleModal1} style={{ width: '50vw' }} onHide={() => setVisibleModal1(false)}>
                    <Profileinformation />
                </Dialog>

                <Dialog header="Personal Informations" visible={visibleModal2} style={{ width: '50vw' }} onHide={() => setVisibleModal2(false)}>
                    {visibleModal2 && <Personalinformations userId={effectiveUserId} personalInfo={personalInfo} setVisibleModal2={setVisibleModal2} />}
                </Dialog>

                <Dialog header="Emergency Contact" visible={visibleModal3} style={{ width: '50vw' }} onHide={() => setVisibleModal3(false)}>
                    {visibleModal3 && <Emergencycontact userId={effectiveUserId} emergencyContacts={emergencyContacts} setVisibleModal3={setVisibleModal3} />}
                </Dialog>

                <Dialog header="Bank information" visible={visibleModal4} style={{ width: '50vw' }} onHide={() => setVisibleModal4(false)}>
                    {visibleModal4 && <Bankinformation userId={effectiveUserId} bankInfo={bankInfo} setVisibleModal4={setVisibleModal4} />}
                </Dialog>

                <Dialog header="Education Information" visible={visibleModal5} style={{ width: '40vw' }} onHide={() => { if (!visibleModal5) return; setVisibleModal5(false); }}>
                    {visibleModal5 && <EducationInformation userId={effectiveUserId} educationalInfo={educationalInfo} setVisibleModal5={setVisibleModal5} />}
                </Dialog>

            </Row>
        </>
    )
};

export default EmpProfileEdit;