// src/HREmployees.js
import React, { useState, useEffect } from "react";
import { Row, Col, Breadcrumb, Form, Card, Table } from 'react-bootstrap';
import { Calendar } from 'primereact/calendar';
import '../../assets/css/tasksheet.css';

const Tasksheet = () => {
    const [date, setDate] = useState(null);
    const [datesData, setDatesData] = useState([]);

    useEffect(() => {
        const currentDate = new Date();
        setDate(currentDate);
        setDatesData(generateInitialData(currentDate));
    }, []);

    // Function to format date and get day
    const formatDateAndDay = (inputDate) => {
        const options = { year: 'numeric', day: 'numeric', month: 'long', weekday: 'long' };
        const formattedDate = new Date(inputDate).toLocaleDateString('en-US', options);
        return formattedDate;
    };

    // Sample data for employees and their tasks
    const employeeData = [
        { name: 'Employee 1', tasks: ["Task 1", "Task 2", "Task 3"] },
        { name: 'Employee 2', tasks: ["Task 1", "Task 2"] },
        { name: 'Employee 3', tasks: ["Task 1", "Task 2", "Task 3", "Task 4"] },
        { name: 'Employee 4', tasks: ["Task 1", "Task 2", "Task 3", "Task 4"] },
        { name: 'Employee 5', tasks: ["Task 1", "Task 2", "Task 3", "Task 4"] },
        { name: 'Employee 6', tasks: ["Task 1", "Task 2", "Task 3", "Task 4"] },
        { name: 'Employee 7', tasks: ["Task 1", "Task 2", "Task 3", "Task 4"] },
        { name: 'Employee 8', tasks: ["Task 1", "Task 2", "Task 3", "Task 4"] },
        { name: 'Employee 9', tasks: ["Task 1", "Task 2", "Task 3", "Task 4"] },
        { name: 'Employee 10', tasks: ["Task 1", "Task 2", "Task 3", "Task 4"] }
        // Add more employees as needed
    ];

    // Function to generate initial data for each date
    const generateInitialData = (selectedDate) => {
        if (!selectedDate) return [];
        const dates = [];
        const month = selectedDate.getMonth();
        const year = selectedDate.getFullYear();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        for (let i = 1; i <= daysInMonth; i++) {
            const dateObj = {
                date: new Date(year, month, i),
                tasks: employeeData.map(emp => emp.tasks)
            };
            dates.push(dateObj);
        }
        return dates;
    };

    // Function to update tasks data when date changes
    const handleDateChange = (e) => {
        const selectedDate = e.value;
        setDate(selectedDate);
        setDatesData(generateInitialData(selectedDate));
    };

    // Render table rows for each date and employee
    const renderRows = () => {
        return datesData.map((dateObj, rowIndex) => (
            <tr key={rowIndex}>
                <td>
                    <div className="p-3">
                        {formatDateAndDay(dateObj.date)}
                    </div>
                </td>
                {employeeData.map((employee, empIndex) => (
                    <td key={empIndex}>
                        <div className="ad_tdata">
                            {dateObj.tasks[empIndex].map((task, taskIdx) => (
                                <p key={taskIdx}>{task}</p>
                            ))}
                        </div>
                    </td>
                ))}
            </tr>
        ));
    };

    return (
        <>
            <Row className='body_content'>
                <Row className="mx-0 mb-4 justify-content-between">
                    <Col md={6} lg={3} className='mb-3'>
                        <Breadcrumb>
                            <Breadcrumb.Item active>Task Sheet</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col md={12} lg={12}>
                        <Card className=''>
                            <Card.Header className="p-0">
                                <Row className="m-0 justify-content-start mb-4 p-4 ">
                                    <Col lg='2' className="d-flex align-items-center">
                                        <label htmlFor="buttondisplay" className="font-bold w-75">
                                            Filter by date
                                        </label>
                                        <Calendar value={date} onChange={handleDateChange} view="month" dateFormat="mm/yy" placeholder="MM/YYYY" />
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Card.Body className="p-0 task-body">
                                <Table responsive className="admin_task" size="sm" striped bordered>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            {employeeData.map((employee, idx) => (
                                                <th key={idx}>{employee.name}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {date && renderRows()}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Row>
        </>
    );
};

export default Tasksheet;
