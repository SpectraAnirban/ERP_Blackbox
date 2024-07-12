import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import "react-datepicker/dist/react-datepicker.css";
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import { Calendar } from 'primereact/calendar';
import { Link } from 'react-router-dom';

function Emergencycontact() {
    const [startDate, setStartDate] = useState(new Date());
    const [date, setDate] = useState(null);
    return(
        <>
            <Form>
                    <Col Col='12' lg='12' className='mb-4'>
                        <Card className='addEm shadow-0 p-0'>
                            <Card.Body className='p-0'>
                                <Row className="mb-3">
                                    <Col lg={12} className='mb-3'>
                                        <Form.Label>Employee Name<span className='text-danger'></span></Form.Label>
                                        <Form.Control type="text" value='Jon Dow' disabled />
                                    </Col>
                                    <Col lg={12} className='mb-3'>
                                        <Form.Label>Overtime Date<span className='text-danger'>*</span></Form.Label>
                                        <DatePicker
                                            showIcon
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                        />
                                    </Col>

                                    <Col lg={12} className='mb-3'>
                                        <Form.Label>Start Time<span className='text-danger'>*</span></Form.Label>
                                        <Calendar value={date} onChange={(e) => setDate(e.value)} showIcon timeOnly icon={() => <i className="pi pi-clock" />} />
                                    </Col>
                                    <Col lg={12} className='mb-3'>
                                        <Form.Label>End Time<span className='text-danger'>*</span></Form.Label>
                                        <Calendar value={date} onChange={(e) => setDate(e.value)} showIcon timeOnly icon={() => <i className="pi pi-clock" />} />
                                    </Col>
                                    <Col lg={12}>
                                        <Form.Label>Description *<span className='text-danger'>*</span></Form.Label>
                                        <Form.Control as="textarea" aria-label="Description" className='h-auto' />
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg='12' className='d-flex justify-content-end'>
                        <Link to='/Allemployess' className='btn btn-dark btn-md me-2'>CANCEL</Link>
                        <button className='btn btn-primary btn-md'> Submit</button>
                    </Col>
                </Form>
        </>
    )
  }
  
  export default Emergencycontact