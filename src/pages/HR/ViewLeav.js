// src/HREmployees.js
import React, { useState } from 'react';
import { Container, Row, Col, Breadcrumb, Form, Button, InputGroup, Card, Table } from 'react-bootstrap';

import CustomToast from '../../components/CustomToast';

const ViewLeav = () => {
    return (
    <>
        <Row className='body_content'>
            <Row className="mx-0 mb-4 justify-content-between">
                <Col md={6} lg={3} className='mb-3'>
                    <Breadcrumb>
                        <Breadcrumb.Item active>All Leaves</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
                <Col md={12} lg={12}>
                    
                </Col>
            </Row>
        </Row>
    </>
)};

export default ViewLeav;