import React, { useState, useEffect } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import DatePicker from "react-datepicker";
import PhoneInput from 'react-phone-number-input';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-phone-number-input/style.css';
import axios from 'axios';
import config from '../config';
import { Button } from 'primereact/button';

function Profileinformation({ userId, userDetails, setVisibleModal1 }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        birthday: new Date(),
        gender: '',
        country: '',
        address: '',
        city: '',
        pincode: '',
        forte: '',
        other_skills: ''
    });

    useEffect(() => {
        if (userDetails) {
            setFormData({
                name: userDetails.userDetails.name || '',
                email: userDetails.userDetails.email_address || '',
                phone: userDetails.userDetails.phone || '',
                birthday: userDetails.userDetails.date_of_birth ? new Date(userDetails.userDetails.date_of_birth) : new Date(),
                gender: userDetails.userDetails.gender || '',
                country: userDetails.userDetails.country || '',
                address: userDetails.userDetails.address || '',
                city: userDetails.userDetails.city || '',
                pincode: userDetails.userDetails.pincode || '',
                forte: userDetails.userDetails.forte || '',
                other_skills: userDetails.userDetails.other_skills || ''
            });
        }
    }, [userDetails]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDateChange = (date) => {
        setFormData(prevState => ({
            ...prevState,
            birthday: date
        }));
    };

    const handlePhoneChange = (value) => {
        setFormData(prevState => ({
            ...prevState,
            phone: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${config.apiBASEURL}/user/updatebasic/${userId}`, formData);
            console.log(response.data);
            setVisibleModal1(false);
        } catch (error) {
            console.error('Error updating user details:', error);
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Col Col='12' lg='12' className='mb-4'>
                    <Card className='addEm shadow-0 p-0'>
                        <Card.Body className='p-0'>
                            <Row className="mb-3">
                                <Col lg={4} md={6}>
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        value={formData.name} 
                                        name="name"
                                        placeholder="Full Name" 
                                        onChange={handleChange} 
                                    />
                                </Col>
                                <Col lg={4} md={6}>
                                    <Form.Label>Email <span className='text-danger'>*</span></Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        value={formData.email} 
                                        name="email"
                                        placeholder="Enter Email" 
                                        disabled 
                                    />
                                </Col>
                                <Col lg={4} md={6}>
                                    <Form.Label>Phone</Form.Label>
                                    <PhoneInput
                                        international
                                        defaultCountry="IN"
                                        value={formData.phone}
                                        onChange={handlePhoneChange}
                                        required
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col lg={4} md={6}>
                                    <Form.Label>Birthday</Form.Label>
                                    <br />
                                    <DatePicker
                                        showIcon
                                        selected={formData.birthday}
                                        onChange={handleDateChange}
                                    />
                                </Col>
                                <Col lg={4} md={6}>
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Select 
                                        aria-label="Default select example" 
                                        name="gender"
                                        value={formData.gender} 
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" disabled>Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </Form.Select>
                                </Col>
                                <Col lg={4} md={6}>
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        value={formData.country} 
                                        name="country"
                                        placeholder="Country" 
                                        onChange={handleChange} 
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col lg={6} md={6}>
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        value={formData.address} 
                                        name="address"
                                        placeholder="Type your address" 
                                        onChange={handleChange} 
                                    />
                                </Col>
                                <Col lg={3} md={6}>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        value={formData.city} 
                                        name="city"
                                        placeholder="City" 
                                        onChange={handleChange} 
                                    />
                                </Col>
                                <Col lg={3} md={6}>
                                    <Form.Label>Postal Code</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        value={formData.pincode} 
                                        name="pincode"
                                        placeholder="post/zip code" 
                                        onChange={handleChange} 
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col lg={6} md={6}>
                                    <Form.Label>Forte</Form.Label>
                                    <Form.Control 
                                        as="textarea" 
                                        aria-label="With textarea" 
                                        name="forte"
                                        value={formData.forte}
                                        onChange={handleChange}
                                        className='h-auto' 
                                    />
                                </Col>
                                <Col lg={6} md={6}>
                                    <Form.Label>Other Skills</Form.Label>
                                    <Form.Control 
                                        as="textarea" 
                                        aria-label="With textarea" 
                                        name="other_skills"
                                        value={formData.other_skills}
                                        onChange={handleChange}
                                        className='h-auto' 
                                    />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg='12' className='d-flex justify-content-end pt-3'>
                <Button type="button" className='btn btn-dark btn-lg me-2' onClick={() => setVisibleModal1(false)}>CANCEL</Button>
                    <button className='btn btn-primary btn-lg' type='submit'>SAVE</button>
                </Col>
            </Form>
        </>
    );
}

export default Profileinformation;
