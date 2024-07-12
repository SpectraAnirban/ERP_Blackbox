import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Card from 'react-bootstrap/Card';
import { Calendar } from 'primereact/calendar';
import Table from 'react-bootstrap/Table';
import '../../assets/css/table.css';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import EmpPayslip from '../../modalPopup/EmpPayslip';
import { CardBody } from "react-bootstrap";

const Tasksheet = () => {

    const [visible, setVisible] = useState(false);
    const today = new Date(); // Get today's date
    const [date, setDate] = useState(today); // Set initial value to today's date
    const [filteredData, setFilteredData] = useState([]);

    // Sample table data
    const tableData = [
        { day: 1, mon: '', 
        tue: '', 
        wed: '', 
        thu: '', 
        fri: '', 
        sat: '', 
        sun: 'Full Day' },
        // Add more rows as needed
    ];

    // Function to handle date change
    const handleDateChange = (e) => {
        const selectedDate = e.value;
        if (selectedDate.getMonth() === 11) { // December
            selectedDate.setFullYear(selectedDate.getFullYear() + 1); // Increment year by 1
            selectedDate.setMonth(0); // Set month to January
        }
        setDate(selectedDate);
    };

    // Generate days of the month
    const daysOfMonth = [...Array(31).keys()].map(day => day + 1);

    // Function to get the day name for a given date
    const getDayName = (date) => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return days[date.getDay()];
    };

    return (
        <>
        <Row className='body_content'>
            <Row>
                <Col md='7' lg='10' className=''>
                    <Breadcrumb>
                        <Breadcrumb.Item active>Tasksheet</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
                <Col md='3' lg='2' className='text-end'>
                    
                </Col>
                <Col md='12' lg='12' className='mt-5'>
                    <Card className=''>
                        <Card.Header className="border-0 d-flex`">
                            <div style={{ width: '350px' }}>
                                <ul className="daycount">
                                    <li>
                                        <span>Full Day : </span>
                                        <span>1 days</span>
                                    </li>
                                    <li>
                                        <span>Haf Day : </span>
                                        <span>0 days</span>
                                    </li>
                                    <li>
                                        <span>Absent : </span>
                                        <span>0 days</span>
                                    </li>
                                    <li>
                                        <span>Over Time <small>( 0hrs.) </small> : </span>
                                        <span>0 days</span>
                                    </li>
                                    <li>
                                        <span><b>Total</b></span>
                                        <span><b>1 days</b></span>
                                    </li>
                                </ul>
                            </div>
                        </Card.Header>
                        <CardBody>
                            <div className='d-flex justify-content-start w-100 mb-4'>
                                <div style={{ width: '200px'}} className='me-3'>
                                    <Calendar 
                                        value={date} 
                                        onChange={handleDateChange} 
                                        view="month" 
                                        dateFormat="mm/yy" 
                                        placeholder="MM/YYYY" 
                                        monthNavigator={true} 
                                        showIcon={true} 
                                        highlight={true} 
                                    />
                                </div>
                                <Button label="Generate Payslip" icon="pi pi-wallet" severity="warning" onClick={() => setVisible(true)} />
                            </div>
                           
                           <Table responsive bordered className="tasktable d-block">
                                <thead>
                                    <tr>
                                        {daysOfMonth.map(day => (
                                            <th key={day} className={getDayName(new Date(2024, 3, day)) === 'Sun' ? 'sunday' : ''}>
                                                <div>
                                                    <div>{getDayName(new Date(2024, 3, day))}</div>
                                                    <div>{day}</div>
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {daysOfMonth.map(day => (
                                            <td key={day} className={getDayName(new Date(2024, 3, day)) === 'Sun' ? 'sunday' : ''}>
                                                 <div className="daydiv">
                                                   <span>{filteredData.find(row => row.day === day)?.mon || '-'}</span>
                                                    <span>{filteredData.find(row => row.day === day)?.tue || '-'}</span>
                                                    <span>{filteredData.find(row => row.day === day)?.wed || '-'}</span>
                                                    <span>{filteredData.find(row => row.day === day)?.thu || '-'}</span>
                                                    <span>{filteredData.find(row => row.day === day)?.fri || '-'}</span>
                                                    <span>{filteredData.find(row => row.day === day)?.sat || '-'}</span>
                                                    <span>{filteredData.find(row => row.day === day)?.sun || '-'}</span>
                                                </div> 
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Row>
        <Dialog className="slip_dig" visible={visible} style={{ width: '40vw' }} onHide={() => setVisible(false)}>
                <EmpPayslip />
        </Dialog>
        </>
    )
}

export default Tasksheet;