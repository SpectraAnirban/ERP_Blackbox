import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Col, Card } from 'react-bootstrap';
import config from '../config';

function Bankinformation({ userId, bankInfo, setVisibleModal4 }) {
    const [formData, setFormData] = useState({
        bankName: '',
        bankAccountNo: '',
        ifscCode: '',
        branchName: '',
        accountHolderName: '',
    });

    // Populate form data with personalInfo on component mount or update
    useEffect(() => {
        if (bankInfo) {
            setFormData({
                bankName: bankInfo.bank_name || '',
                bankAccountNo: bankInfo.bank_account_no || '',
                ifscCode: bankInfo.ifsc_code || '',
                branchName: bankInfo.branch_name || '',
                accountHolderName: bankInfo.accountHolder_name || '',
            });
        }
    }, [bankInfo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${config.apiBASEURL}/profile/bankdetails/update?userId=${userId}`, {
                bank_name: formData.bankName,
                bank_account_no: formData.bankAccountNo,
                ifsc_code: formData.ifscCode,
                branch_name: formData.branchName,
                accountHolder_name: formData.accountHolderName
            });
            console.log('User details updated:', response.data);
            setVisibleModal4(false); // Close the modal on successful update
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
                            <Form.Group className="mb-3">
                                <Form.Label column lg={4} md={6} className='mb-3'>Bank Name <span className='text-danger'>*</span></Form.Label>
                                <Col lg={8} md={6} className='mb-3'>
                                    <Form.Control type="text" name="bankName" value={formData.bankName} onChange={handleChange} placeholder="Bank name" />
                                </Col>
                                <Form.Label column lg={4} md={6} className='mb-3'>Bank Account No. <span className='text-danger'>*</span></Form.Label>
                                <Col lg={8} md={6} className='mb-3'>
                                    <Form.Control type="number" name="bankAccountNo" value={formData.bankAccountNo} onChange={handleChange} placeholder="xxxxxxxxxxx" min="0" onKeyDown={(e) => e.key === 'e' || e.key === '-' || e.key === '.' ? e.preventDefault() : null} />
                                </Col>
                                <Form.Label column lg={4} md={6} className='mb-3'>IFSC Code<span className='text-danger'>*</span></Form.Label>
                                <Col lg={8} md={6} className='mb-3'>
                                    <Form.Control type="text" name="ifscCode" value={formData.ifscCode} onChange={handleChange} placeholder="ICIxxxxx" />
                                </Col>
                                <Form.Label column lg={4} md={6} className='mb-3'>Branch Name<span className='text-danger'>*</span></Form.Label>
                                <Col lg={8} md={6} className='mb-3'>
                                    <Form.Control type="text" name="branchName" value={formData.branchName} onChange={handleChange} placeholder="Branch name" />
                                </Col>
                                <Form.Label column lg={4} md={6} className='mb-3'>Account Holder Name<span className='text-danger'>*</span></Form.Label>
                                <Col lg={8} md={6} className='mb-3'>
                                    <Form.Control type="text" name="accountHolderName" value={formData.accountHolderName} onChange={handleChange} placeholder="Account holder name" />
                                </Col>
                            </Form.Group>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg='12' className='d-flex justify-content-end pt-3'>
                    <a href='/employee/profile' className='btn btn-dark btn-lg me-2'>CANCEL</a>
                    <button type="submit" className='btn btn-primary btn-lg'>SAVE</button>
                </Col>
            </Form>
        </>
    );
}

export default Bankinformation;
