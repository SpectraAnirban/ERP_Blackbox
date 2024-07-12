import React, { useState } from "react";
import { Row, Col, Breadcrumb, Card, Table } from 'react-bootstrap';
import { MDBBadge } from 'mdb-react-ui-kit';
import { Dialog } from 'primereact/dialog';
import Addovertime from '../../modalPopup/Addovertime';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

const Overtime = () => {
    const [visible, setVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState('Approved');
    const [selectedStatus, setSelectedStatus] = useState(status);

    const statuses = [
        { label: 'Approved', value: 'Approved' },
        { label: 'Pending', value: 'Pending' },
        { label: 'Rejected', value: 'Rejected' },
    ];

    const handleEditClick = () => {
        setEditMode(true);
        setSelectedStatus(status);
    };

    const handleSaveClick = () => {
        setStatus(selectedStatus);
        setEditMode(false);
    };

    return (
        <>
            <Row className='body_content'>
                <Row className='mx-0'>
                    <Col md={6} lg={9} className='mb-4'>
                        <Breadcrumb>
                            <Breadcrumb.Item active>Overtime</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col md={6} lg={3} className='mb-4 d-flex justify-content-end'>
                        <Button className='btn btn-primary h-auto' onClick={() => setVisible(true)}> Add Overtime</Button>
                    </Col>
                    <Col md={12} lg={12}>
                        <Card className='verify-table'>
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th scope='col'>#</th>
                                        <th scope='col'>Name</th>
                                        <th scope='col'>OT Date</th>
                                        <th scope='col'>OT Hours</th>
                                        <th scope='col'>Description</th>
                                        <th scope='col'>Status</th>
                                        <th scope='col'>Approved By</th>
                                        <th scope='col'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>John Doe</td>
                                        <td>04/03/2024</td>
                                        <td>5 hrs.</td>
                                        <td>Lorem ipsum dollar</td>
                                        <td>
                                            {editMode ? (
                                                <Dropdown 
                                                    value={selectedStatus} 
                                                    options={statuses} 
                                                    onChange={(e) => setSelectedStatus(e.value)} 
                                                    placeholder="Select a Status" 
                                                />
                                            ) : (
                                                <MDBBadge color={status === 'Approved' ? 'success' : status === 'Pending' ? 'warning' : 'danger'} pill>
                                                    {status}
                                                </MDBBadge>
                                            )}
                                        </td>
                                        <td>
                                            <div className='d-flex align-items-center justify-content-start'>
                                                <img
                                                    src='https://mdbootstrap.com/img/new/avatars/6.jpg'
                                                    alt=''
                                                    style={{ width: '35px', height: '35px' }}
                                                    className='rounded-circle'
                                                />
                                                <div className='ms-3'>
                                                    <p className='fw-bold mb-1'>Alex Ray</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {editMode ? (
                                                <Button
                                                    icon="pi pi-save"
                                                    rounded
                                                    outlined
                                                    severity="success"
                                                    onClick={handleSaveClick}
                                                />
                                            ) : (
                                                <Button
                                                    icon="pi pi-user-edit"
                                                    rounded
                                                    outlined
                                                    severity="info"
                                                    onClick={handleEditClick}
                                                />
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                </Row>
            </Row>
            <Dialog header="Add Overtime" visible={visible} style={{ width: '20vw' }} onHide={() => setVisible(false)}>
                <Addovertime />
            </Dialog>
        </>
    );
};

export default Overtime;
