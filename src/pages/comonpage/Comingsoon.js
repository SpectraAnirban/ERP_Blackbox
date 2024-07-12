import React, { useState } from 'react';
import { Container, Row, Col, Breadcrumb, Form, InputGroup, Card, Table } from 'react-bootstrap';

const Comingsoon = () => {

    return (
        <>
            <Row className='body_content commingsoon'>
                <Row className="justify-content-end">
                    <Col md={6} lg={7} xl={7}>
                        <h2>Coming Soon</h2>
                        <p>Our ERP is under construction. Stay tuned for something amazing!.</p>
                        <div class="countdown d-flex">
                            <div class="single-count-content">
                                <span class="count">00</span><p class="text">Days</p>
                            </div>
                            <div class="single-count-content">
                                <span class="count">00</span>
                                <p class="text">Hours</p>
                            </div>
                            <div class="single-count-content">
                                <span class="count">00</span>
                                <p class="text">Minutes</p>
                            </div>
                            <div class="single-count-content">
                                <span class="count">00</span>
                                <p class="text">Seconds</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Row>
        </>
)};

export default Comingsoon;