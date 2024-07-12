import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card } from 'primereact/card';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Password } from 'primereact/password';
import Form from 'react-bootstrap/Form';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/login.css';
import config from '../config';
import CustomToast from '../components/CustomToast';
function Signup() {
    const [value, setValue] = useState(''); // phone number
    const [value2, setValue2] = useState(''); // password
    const [userType, setUserType] = useState('Client');
    const navigate = useNavigate(); // Hook for navigation
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const formFields = {};
        formData.forEach((value, key) => {
            formFields[key] = value;
        });

        if (value2 !== formFields.cpassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post(`${config.apiBASEURL}/auth/register`, {
                username: formFields.name,
                password: value2,
                email_address: formFields.email,
                name: formFields.name,
                phone_no: value,
                user_type: userType
            });

            if (response.status === 201) {
                alert('User registered successfully');
                navigate('/'); // Redirect to login page
            }
        } catch (error) {
            console.error('Error registering user:', error);
            alert('Error registering user');
        }
    };

    return (
        <>
            <Container className='login-card'>
                <Row className="mx-0">
                    <Col md='6' lg='3' className='w-440'>
                        <Card title="Register">
                            <div className='user-Select'>
                                <Form.Select aria-label="User Type" value={userType} onChange={e => setUserType(e.target.value)}>
                                    <option value="Client">Client</option>
                                    <option value="Employee">Employee</option>

                                </Form.Select>
                            </div>
                            <form className='mt-4' onSubmit={handleSubmit}>
                                <Col lg='12' md='12' className='mb-3'>
                                    <span className='fnameinp'>
                                        <label htmlFor="name"><i className='pi pi-user pe-2'></i>Full Name <span>*</span></label>
                                        <InputText
                                            type="text"
                                            name="name"
                                            placeholder="Enter Employee / Client / Company name"
                                            required
                                        />
                                    </span>
                                </Col>
                                <Col lg='12' className='mb-3 p-0'>
                                    <span className='fnameinp'>
                                        <label htmlFor="email"><i className='pi pi-envelope pe-2'></i>Email <span>*</span></label>
                                        <InputText
                                            type="email"
                                            name="email"
                                            placeholder="jon@test.com"
                                            required
                                        />
                                    </span>
                                </Col>
                                <Col lg='12' className='mb-3 p-0'>
                                    <span className='fnameinp'>
                                        <label htmlFor="phone"><i className='pi pi-phone pe-2'></i>Phone No.<span>*</span></label>
                                        <PhoneInput
                                            international
                                            defaultCountry="IN"
                                            value={value}
                                            onChange={setValue}
                                            required
                                        />
                                    </span>
                                </Col>
                                <Col lg='12' className='mb-3 p-0'>
                                    <label htmlFor="password"><i className='pi pi-lock pe-2'></i>Password <span>*</span></label>
                                    <Password
                                        value={value2}
                                        placeholder="Password"
                                        onChange={(e) => setValue2(e.target.value)}
                                        toggleMask
                                        className='w-100 d-block'
                                        required
                                    />
                                </Col>
                                <Col lg='12' className='mb-3 p-0'>
                                    <span className='fnameinp'>
                                        <label htmlFor="cpassword"><i className='pi pi-lock pe-2'></i>Confirm Password <span>*</span></label>
                                        <InputText
                                            type="password"
                                            name="cpassword"
                                            placeholder="***********"
                                            required
                                        />
                                    </span>
                                </Col>
                                <Col className='text-center mt-4'><Button label="Signup" type="submit" className='loginbtn' /></Col>
                            </form>
                            <p className='mt-4 text-center'>Already have an account? <Link to='/'>Login</Link></p>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Signup;
