import React, { useState, useEffect } from "react";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Col, Row, Card, Table, Badge, Form } from 'react-bootstrap';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Dialog } from 'primereact/dialog';
import Servicelist from '../../modalPopup/Servicelist';
import CustomToast from '../../components/CustomToast';

const ClientHome = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
    }, []);

    return (
        <>
            <Row className='body_content'>
                <Row className='justify-content-between'>
                    <Col md={8} lg={8} className='mb-4'>
                        <Breadcrumb className='align-items-center'>
                            <Breadcrumb.Item active>Select your Service</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col> 
                    <Col md={4} lg={4} className='text-end'>
                        <Button icon="pi pi-plus" size='sm' label="Add Service" severity="help" onClick={() => setVisible(true)} className='me-1 ms-1' />
                    </Col>
                </Row>
            </Row>
            <Dialog header="Select Service" visible={visible} style={{ width: '40vw' }} onHide={() => setVisible(false)}>
                <Servicelist />
            </Dialog>
        </>
    );
};

export default ClientHome;
