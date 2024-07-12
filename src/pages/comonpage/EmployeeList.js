import React, { useState, useEffect } from "react";
import { Container, Row, Col, Breadcrumb, Form, InputGroup, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';
import '../../assets/css/profile.css';
import config from "../../config";
const EmployeeList = () => {
    const [visible, setVisible] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [searchParams, setSearchParams] = useState({ id: '', employeeName: '' });

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            try {
                const response = await axios.get(`${config.apiBASEURL}/user/getAllUserDetails`);
                setEmployees(response.data);
                setFilteredEmployees(response.data); // Initially set filtered employees to all employees
            } catch (error) {
                console.error('Error fetching employee details:', error);
            }
        };

        fetchEmployeeDetails();
    }, []);

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchParams({ ...searchParams, [name]: value });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const { id, employeeName } = searchParams;
        const filtered = employees.filter(employee =>
            (id === '' || employee.employee_id.includes(id)) &&
            (employeeName === '' || employee.name.toLowerCase().includes(employeeName.toLowerCase()))
        );
        setFilteredEmployees(filtered);
    };

    return (
        <>
            <Row className='body_content'>
                <Row className='mx-0'>
                    <Card className='shadow-0 mb-4'>
                        <Row className="mx-0 justify-content-between align-items-center m-0 pt-3">
                            <Col md={6} lg={3} className='mb-4'>
                                <Breadcrumb>
                                    <Breadcrumb.Item active>Associate</Breadcrumb.Item>
                                </Breadcrumb>
                            </Col>
                            <Col md={12} lg={6}>
                                <Form onSubmit={handleSearch}>
                                    <InputGroup className="mb-3 em_filter">
                                        <Form.Control
                                            name="id"
                                            type="text"
                                            placeholder="Employee ID"
                                            value={searchParams.id}
                                            onChange={handleSearchChange}
                                            className="me-2"
                                        />
                                        <Form.Control
                                            name="employeeName"
                                            type="text"
                                            placeholder="Employee Name"
                                            value={searchParams.employeeName}
                                            onChange={handleSearchChange}
                                            className=""
                                        />
                                        {/* <Form.Select name="designation" aria-label="Select Designation">
                                            <option disabled defaultValue>Select Designation</option>
                                            <option value="Web Developer">Web Developer</option>
                                            <option value="Android Developer">Android Developer</option>
                                            <option value="Designer">Designer</option>
                                        </Form.Select> */}
                                        <Button variant="primary" type="submit" className="">Search</Button>

                                    </InputGroup>
                                </Form>
                            </Col>
                        </Row>
                    </Card>

                    <Row className="mx-0 justify-content-start m-0 p-0">
                        {filteredEmployees.map(employee => (
                            <Col md={6} lg={3} className='mb-2' key={employee.user_id} onClick={() => { setVisible(true); setSelectedEmployee(employee); }}>
                                <Card className='emp_list_card'>
                                    <Card.Img variant="top" src={require("../../assets/images/no_user.png")}  alt={employee.name} /> {/* Placeholder image */}
                                    <Card.Body>
                                        <Card.Title className='mb-0'>
                                            <Link to=''>
                                                {employee.name} <br />
                                                <small className="empRoll mt-3">{employee.role_name}</small>
                                                <small className='text-success mt-3'>Active</small>
                                            </Link>
                                        </Card.Title>

                                        <div className='add_edit'>
                                            <Link
                                                to=''
                                                className='text-info'
                                                onClick={() => { setVisible(true); setSelectedEmployee(employee); }}
                                            ><b>View</b></Link>
                                        </div>
                                        <div className="text-muted d-flex justify-content-between align-items-center footer-cd-emp mt-4">
                                            <div>
                                                <p className='m-0 text-dark'>ID : <span>{employee.employee_id}</span></p>
                                            </div>
                                            <div>
                                                <p className='m-0 text-dark'>Join : <span>{new Date(employee.date_of_birth).toLocaleDateString()}</span></p>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Row>
            </Row>

            {selectedEmployee && (
                <Dialog header="Profile Details" visible={visible} style={{ width: '25vw' }} onHide={() => setVisible(false)}>
                    <ul className="profilemodal modalscroll2">
                        <li><div className="empl_imagee"><img src={require("../../assets/images/no_user.png")} alt={selectedEmployee.name} /></div></li> {/* Placeholder image */}
                        <li><span>Name : </span> {selectedEmployee.name}</li>
                        <li><span>Designation : </span> {selectedEmployee.role_name}</li>
                        <li><span>Date of Birth : </span> {new Date(selectedEmployee.date_of_birth).toLocaleDateString()}</li>
                        <li><span>Employee ID : </span> {selectedEmployee.employee_id}</li>
                        <li><span>Address : </span> {selectedEmployee.address}</li>
                        <li><span>City : </span> {selectedEmployee.city}</li>
                        <li><span>Pincode : </span> {selectedEmployee.pincode}</li>
                        <li><span>State : </span> {selectedEmployee.state}</li>
                        <li><span>Country : </span> {selectedEmployee.country}</li>
                        <li><span>Phone : </span> {selectedEmployee.phone}</li>
                        <li><span>Email : </span> {selectedEmployee.email_address}</li>
                        <li><span>Official Email : </span> {selectedEmployee.official_email_address}</li>
                        <li><span>Gender : </span> {selectedEmployee.gender}</li>
                        <li><span>Forte : </span> {selectedEmployee.forte}</li>
                        <li><span>Other Skills : </span> {selectedEmployee.other_skills}</li>
                        <li><span>PAN Card No : </span> {selectedEmployee.pan_card_no}</li>
                        <li><span>Passport No : </span> {selectedEmployee.passport_no}</li>
                        <li><span>Aadhar No : </span> {selectedEmployee.aadhar_no}</li>
                        <li><span>Nationality : </span> {selectedEmployee.nationality}</li>
                        <li><span>Religion : </span> {selectedEmployee.religion}</li>
                        <li><span>Marital Status : </span> {selectedEmployee.marital_status}</li>
                        {selectedEmployee.employment_of_spouse && (
                            <li><span>Employment of Spouse : </span> {selectedEmployee.employment_of_spouse}</li>
                        )}
                        {selectedEmployee.no_of_children && (
                            <li><span>No of Children : </span> {selectedEmployee.no_of_children}</li>
                        )}
                    </ul>
                </Dialog>
            )}
        </>
    );
};

export default EmployeeList;