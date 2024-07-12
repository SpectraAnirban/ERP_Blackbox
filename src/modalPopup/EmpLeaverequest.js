import { Col, Form, Row, Card, Alert } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import config from '../config';
import { useAuth } from "../contexts/AuthContext";

function EmpLeaverequest() {
    const [leaveType, setLeaveType] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const { userId } = useAuth(); 
    const [totalDays, setTotalDays] = useState(0);
    const [remainingLeaves, setRemainingLeaves] = useState(0);
    const [leaveReason, setLeaveReason] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [leaveTypes, setLeaveTypes] = useState([]);
    const [leaveData, setLeaveData] = useState({ remaining_days: 0 });

    useEffect(() => {
        const fetchLeaveTypes = async () => {
            try {
                const response = await axios.get(`${config.apiBASEURL}/leavetype/get`);
                setLeaveTypes(response.data);
            } catch (error) {
                console.error('Error fetching leave types:', error);
                setErrorMessage('Error fetching leave types. Please try again.');
            }
        };

        fetchLeaveTypes();
    }, []);

    const fetchLeaveData = async (userId, leaveType) => {
        try {
            const url = `${config.apiBASEURL}/leaves/leave-req/remaining/${userId}/${encodeURIComponent(leaveType)}`;
            console.log('Fetching leave data from:', url);
    
            const response = await axios.get(url);
    
            if (response.status !== 200) {
                throw new Error('Failed to fetch remaining leaves for leave type');
            }
    
            const data = response.data;
            console.log('Fetched leave data:', data);
            setLeaveData(data);
            setRemainingLeaves(data.remaining_days);
        } catch (error) {
            console.error('Error fetching leave data:', error);
            setErrorMessage('Error fetching leave data. Please try again.');
        }
    };

    const handleLeaveTypeChange = (e) => {
        const selectedLeaveType = e.target.value;
        setLeaveType(selectedLeaveType);
        const selectedLeaveTypeData = leaveTypes.find(type => type.name === selectedLeaveType);
        if (selectedLeaveTypeData) {
            fetchLeaveData(userId, selectedLeaveType);
        } else {
            setRemainingLeaves(0);
        }
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
        calculateTotalDays(date, endDate);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        calculateTotalDays(startDate, date);
    };

    const calculateTotalDays = (fromDate, toDate) => {
        if (fromDate && toDate) {
            const differenceInDays = Math.floor((toDate - fromDate) / (24 * 60 * 60 * 1000)) + 1;
            setTotalDays(differenceInDays);
        }
    };

    const handleSave = async (event) => {
        event.preventDefault();
    
        if (totalDays > remainingLeaves) {
            setErrorMessage('Error: Total days requested exceed remaining leaves balance.');
            return;
        }
    
        setErrorMessage('');
    
        const formData = {
            user_id: userId,
            leave_id: leaveTypes.find(type => type.name === leaveType)?.id_leave,
            leave_name: leaveType,
            reason: leaveReason,
            dates: generateDateRange(startDate, endDate),
            duration: 'Full-day',
            total_days: totalDays,
            status: 'pending',
            comment: leaveReason,
        };
    
        console.log('Request Payload:', formData); // Log the payload
    
        try {
            // Check if any leave request exists with the same user, leave type, and dates
            const existingLeaveRequest = await axios.get(`${config.apiBASEURL}/leaves/leave-req/get`, {
                params: {
                    user_id: userId,
                    leave_id: formData.leave_id,
                    dates: JSON.stringify(formData.dates) // Convert dates array to JSON string for comparison
                }
            });
    
            if (existingLeaveRequest.data.length > 0) {
                // Check for overlapping dates
                const overlappingRequest = existingLeaveRequest.data.find(request => {
                    // Convert stored dates from string to array for comparison
                    const storedDates = JSON.parse(request.dates);
                    // Check if there's any overlap between stored and new dates
                    return formData.dates.some(date => storedDates.includes(date));
                });
    
                if (overlappingRequest) {
                    setErrorMessage('Error: A similar leave request already exists for the selected dates.');
                    return;
                }
            }
    
            // If no duplicate or overlapping leave request found, proceed to add the leave request
            const response = await axios.post(`${config.apiBASEURL}/leaves/leave-req/add`, formData);
    
            if (!response.data) {
                throw new Error('Empty response received from server');
            }
    
            console.log('Leave request added successfully:', response.data);
    
            // Update remaining leaves
            const updatedRemainingLeaves = remainingLeaves - totalDays;
            await axios.put(`${config.apiBASEURL}/leavetype/update/${leaveType}`, {
                remainingLeaves: updatedRemainingLeaves
            });
    
            // Update the remaining leaves state
            setRemainingLeaves(updatedRemainingLeaves);
    
        } catch (error) {
            console.error('Error adding leave request:', error.message);
            setErrorMessage('Error adding leave request. Please try again.');
        }
    };
    

    const generateDateRange = (startDate, endDate) => {
        const dateRange = [];
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            dateRange.push(currentDate.toISOString().split('T')[0]);
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dateRange;
    };

    return (
        <>
            <Form>
                <Col col='12' lg='12' className='mb-4'>
                    <Card className='addEm shadow-0 p-0'>
                        <Card.Body className='p-0'>
                            <Row className="mb-3">
                                <Col lg={4} md={6}>
                                    <Form.Label>Leave Type <span className='text-danger'>*</span></Form.Label>
                                    <Form.Select aria-label="Default select example" onChange={handleLeaveTypeChange} value={leaveType} required>
                                        <option>Select Leave Type</option>
                                        {leaveTypes.map((type) => (
                                            <option key={type.id_leave} value={type.name}>{type.name}</option>
                                        ))}
                                    </Form.Select>
                                </Col>

                                <Col lg={4} md={6} className='mb-3'>
                                    <Form.Label>From<span className='text-danger'>*</span></Form.Label>
                                    <br />
                                    <DatePicker
                                        showIcon
                                        selected={startDate}
                                        onChange={handleStartDateChange}
                                        minDate={new Date()} // Restrict past dates
                                    />
                                </Col>

                                <Col lg={4} md={6} className='mb-3'>
                                    <Form.Label>To<span className='text-danger'>*</span></Form.Label>
                                    <br/>
                                    <DatePicker
                                        showIcon
                                        selected={endDate}
                                        onChange={handleEndDateChange}
                                        minDate={startDate || new Date()} // Restrict past dates and enforce start date limit
                                    />
                                </Col>

                                <Col lg={4} md={6} className='mb-3'>
                                    <Form.Label>Number of days<span className='text-danger'>*</span></Form.Label>
                                    <Form.Control type="number" value={totalDays} placeholder="Total days" disabled />
                                </Col>

                                <Col lg={4} md={6} className='mb-3'>
                                    <Form.Label>Remaining Leaves<span className='text-danger'>*</span></Form.Label>
                                    <Form.Control type="number" value={leaveData.remaining_days} placeholder="" disabled />
                                </Col>

                                <Col lg={12} md={12} className='mb-3'>
                                    <Form.Label>Leave Reason<span className='text-danger'>*</span></Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Leave a comment here"
                                        className='h-auto'
                                        rows={3}
                                        value={leaveReason}
                                        onChange={(e) => setLeaveReason(e.target.value)}
                                    />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>

                {errorMessage && (
                    <Alert variant="danger" className="mt-3">
                        {errorMessage}
                    </Alert>
                )}

                <Col lg='12' className='d-flex justify-content-end pt-3'>
                    <a href='/Allemployess' className='btn btn-dark btn-lg me-2'>CANCEL</a>
                    <button
                        className='btn btn-primary btn-lg'
                        onClick={handleSave}
                        disabled={totalDays > remainingLeaves}
                    >
                        SAVE
                    </button>
                </Col>
            </Form>
        </>
    );
}

export default EmpLeaverequest;
