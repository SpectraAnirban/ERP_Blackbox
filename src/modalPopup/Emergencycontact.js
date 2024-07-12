import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import config from '../config';
function Emergencycontact({ userId, emergencyContacts, setVisibleModal3 }) {
    const [contacts, setContacts] = useState([]);

    // Populate form data with emergency contacts on component mount or update
    useEffect(() => {
        if (emergencyContacts && emergencyContacts.length > 0) {
            setContacts(emergencyContacts);
        } else {
            // If no emergency contacts are present, initialize with one empty contact
            setContacts([{ name: '', relationship: '', phone: '' }]);
        }
    }, [emergencyContacts]);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedContacts = [...contacts];
        updatedContacts[index] = { ...updatedContacts[index], [name]: value };
        setContacts(updatedContacts);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Prepare data to send to the backend
            const data = {
                emergencyContacts: contacts.map(contact => ({
                    name: contact.name,
                    relationship: contact.relationship,
                    phone: contact.phone
                }))
            };

            // Send PUT request to update emergency contacts
            await axios.put(`${config.apiBASEURL}/profile/emergencycontacts/update?userId=${userId}`, data);

            // Optionally handle success (e.g., show success message)
            console.log('Emergency contacts updated successfully');

            // Close modal or perform any other action
            setVisibleModal3(false);
        } catch (error) {
            console.error('Error updating emergency contacts:', error);
            // Handle error (e.g., show error message)
        }
    };

    const addContact = () => {
        setContacts([...contacts, { name: '', relationship: '', phone: '' }]);
    };

    const removeContact = (index) => {
        const updatedContacts = [...contacts];
        updatedContacts.splice(index, 1);
        setContacts(updatedContacts);
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                {contacts.map((contact, index) => (
                    <Col key={index} lg='12' className='mb-4'>
                        <Card className='addEm shadow-0 p-0'>
                            <Card.Body className='p-0'>
                                <Card.Title>
                                    <small className='text-secondary'>Emergency Contact {index + 1}</small>
                                    {contacts.length > 1 && (
                                        <Button variant="danger" size="sm" className="float-end" onClick={() => removeContact(index)}>
                                            Remove
                                        </Button>
                                    )}
                                </Card.Title>
                                <Row className="mb-3">
                                    <Col lg={4} md={6}>
                                        <Form.Label>Name <span className='text-danger'>*</span></Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={contact.name}
                                            onChange={(e) => handleChange(e, index)}
                                            placeholder="Name"
                                        />
                                    </Col>
                                    <Col lg={4} md={6}>
                                        <Form.Label>Relationship <span className='text-danger'>*</span></Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="relationship"
                                            value={contact.relationship}
                                            onChange={(e) => handleChange(e, index)}
                                            placeholder="Relationship"
                                        />
                                    </Col>
                                    <Col lg={4} md={6}>
                                        <Form.Label>Phone No.<span className='text-danger'>*</span></Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="phone"
                                            value={contact.phone}
                                            onChange={(e) => handleChange(e, index)}
                                            placeholder="+91-xxxxxxxxx01"
                                        />
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
                <Col lg='12' className='d-flex justify-content-end pt-3'>

                    <Button variant="primary" size="lg" type="submit">SAVE</Button>
                    {contacts.length < 2 && (
                        <Button variant="success" size="lg" className='ms-2' onClick={addContact}>Add Contact</Button>
                    )}
                </Col>
            </Form>
        </>
    );
}

export default Emergencycontact;
