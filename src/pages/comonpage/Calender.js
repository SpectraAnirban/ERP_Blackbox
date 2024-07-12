import React, { useState, useEffect } from 'react';
import { Col, Row, Card, Breadcrumb, ListGroup } from 'react-bootstrap';
import { Scheduler } from "@aldabil/react-scheduler";
import config from '../../config';
import '../../assets/css/calender.css';

const Calendar = () => {
    const [events, setEvents] = useState([]);
    const [activeHolidays, setActiveHolidays] = useState([]);
    const [userBirthdays, setUserBirthdays] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

    useEffect(() => {
        fetchHolidaysAndBirthdays();
    }, []);

    const fetchHolidaysAndBirthdays = async () => {
        try {
            const response = await fetch(`${config.apiBASEURL}/holiday/get`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            const formattedEvents = data.activeHolidays.map(holiday => ({
                event_id: holiday.holiday_id,
                title: holiday.holiday_name,
                start: new Date(holiday.holiday_date),
                end: new Date(holiday.holiday_date),
                user_id: 1, // Assuming user_id for all holidays is 1
                holiday: true // Assuming all holidays are displayed as holidays
            }));
            setEvents(formattedEvents);
            setActiveHolidays(data.activeHolidays);
            setUserBirthdays(data.userBirthdays);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error if needed
        }
    };

    const handleAddEvent = (event) => {
        console.log("Adding event:", event);
        // Implement your logic for adding events here if necessary
    };

    const handleEditEvent = (event) => {
        console.log("Editing event:", event);
        // Implement your logic for editing events here if necessary
    };

    const handleDeleteEvent = (eventId) => {
        console.log("Deleting event ID:", eventId);
        // Implement your logic for deleting events here if necessary
    };

    const renderEvent = (event) => {
        const isHoliday = event.holiday ? "holiday-event" : "";
        return (
            <div className={`rbc-event-content ${isHoliday}`}>
                {event.title}
            </div>
        );
    };

    const formatHolidayDate = (date) => {
        const d = new Date(date);
        const day = d.getDate().toString().padStart(2, '0');
        const month = d.toLocaleString('default', { month: 'short' });
        return `${day} ${month}`;
    };

    const groupBirthdaysByMonth = () => {
        const grouped = userBirthdays.reduce((acc, user) => {
            const month = new Date(user.date_of_birth).getMonth();
            if (!acc[month]) {
                acc[month] = [];
            }
            acc[month].push(user);
            return acc;
        }, {});
        return grouped;
    };

    const renderUserBirthdays = () => {
        const currentYear = (new Date()).getFullYear();
        return userBirthdays.map(user => ({
            event_id: user.user_id,
            title: "Birthday",
            start: new Date(`${currentYear}-${user.date_of_birth.substring(5, 10)}`), // Set the current year
            end: new Date(`${currentYear}-${user.date_of_birth.substring(5, 10)}`), // Set the current year
            user_id: user.user_id,
            holiday: false, // Birthdays are not holidays
            name: user.name, // Include user's name
            formattedDateOfBirth: formatHolidayDate(user.date_of_birth) // Format date of birth
        }));
    };

    const groupedBirthdays = groupBirthdaysByMonth();

    return (
        <>
            <Row className='body_content'>
                <Row className="mx-0 mb-5 justify-content-between">
                    <Col md={'12'} lg={'12'} className='mb-4'>
                        <Breadcrumb>
                            <Breadcrumb.Item active>Calendar</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col md={'12'} lg={'9'}>
                        <Card className='text-center p-3'>
                            <Scheduler
                                view="month"
                                events={[...events, ...renderUserBirthdays()]} // Merge activeHolidays and userBirthdays
                                renderEvent={renderEvent}
                                onConfirm={(event, action) => {
                                    console.log("Event confirmed:", event, action);
                                    if (action === "create") {
                                        handleAddEvent(event);
                                    } else if (action === "edit") {
                                        handleEditEvent(event);
                                    }
                                }}
                                onDelete={(eventId) => {
                                    console.log("Event deleted:", eventId);
                                    handleDeleteEvent(eventId);
                                }}
                                onViewChange={(view) => {
                                    const viewDate = view.start;
                                    setCurrentMonth(new Date(viewDate).getMonth());
                                }}
                                deletable={(event) => event.holiday}
                                editable={(event) => event.holiday}
                                fields={[
                                    {
                                        name: "user_id",
                                        type: "select",
                                        options: [
                                            { id: 1, text: "John", value: 1 },
                                            { id: 2, text: "Mark", value: 2 }
                                        ],
                                        config: { label: "User", required: true, errMsg: "Please select a user" }
                                    },
                                    {
                                        name: "title",
                                        type: "input",
                                        config: { label: "Description", multiline: true, rows: 4 }
                                    }
                                ]}
                            />
                        </Card>
                    </Col>
                    <Col md={'12'} lg={'3'}>
                        <Card className='text-center p-3 mb-3 cardHight'>
                            <Card.Header className='text-start ps-2'><b>Holidays</b></Card.Header>
                            <Card.Body className='ps-2 pe-2'>
                                <div className='dobStyle'>
                                    <ListGroup variant="flush">
                                        <ul className='scrollHoliday p-0'>
                                            {activeHolidays.map(holiday => (
                                                <li key={holiday.holiday_id}>
                                                    <span className="badge-soft-danger rounded-circle">{formatHolidayDate(holiday.holiday_date)}</span> {holiday.holiday_name}
                                                </li>
                                            ))}
                                        </ul>
                                    </ListGroup>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card className='text-center p-3 h-auto'>
                            <Card.Header className='text-start ps-2'><b>Birthday</b></Card.Header>
                                <Card.Body className='ps-2 pe-2'>
                                {groupedBirthdays[currentMonth] ? (
                                    <div className='dobStyle'>
                                        <ListGroup variant="flush">
                                            <ul className='p-0'>
                                                {groupedBirthdays[currentMonth].map(user => (
                                                    <li key={user.user_id}><span className="badge-soft-danger rounded-circle">{formatHolidayDate(user.date_of_birth)}</span> {user.name}</li>
                                                ))}
                                            </ul>
                                        </ListGroup>
                                    </div>
                                ) : (
                                    <p>No birthdays this month</p>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Row>
        </>
    );
};

export default Calendar;
