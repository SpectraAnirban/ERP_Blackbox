import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { Dropdown } from 'primereact/dropdown';
import { InputText } from "primereact/inputtext";
import { MultiSelect } from 'primereact/multiselect';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import config from '../config';

const Addprojects = ({ users, onHide }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [company, setCompany] = useState('');
    const [selectedPriority, setSelectedPriority] = useState(null);
    const [selectedLeader, setSelectedLeader] = useState(null);
    const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [projectFilesLink, setProjectFilesLink] = useState(''); // State for project files link
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

    const priorities = [
        { name: 'High', code: 'HIG' },
        { name: 'Medium', code: 'MED' },
        { name: 'Low', code: 'LOW' },
        { name: 'Urgent', code: 'URG' }
    ];

    useEffect(() => {
        const validateForm = () => {
            if (
                projectName &&
                company &&
                startDate &&
                endDate &&
                selectedPriority &&
                selectedLeader &&
                selectedTeamMembers.length > 0 &&
                description &&
                projectFilesLink
            ) {
                setIsSubmitEnabled(true);
            } else {
                setIsSubmitEnabled(false);
            }
        };

        validateForm();
    }, [
        projectName,
        company,
        startDate,
        endDate,
        selectedPriority,
        selectedLeader,
        selectedTeamMembers,
        description,
        projectFilesLink
    ]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Extract user IDs and prepare project data
        const leaderId = selectedLeader ? selectedLeader.user_id : '';
        const memberIds = selectedTeamMembers.map(member => member.user_id);

        const projectData = {
            project_name: projectName,
            client: company,
            start_date: startDate.toISOString().split('T')[0],
            end_date: endDate.toISOString().split('T')[0],
            priority: selectedPriority ? selectedPriority.name : '',
            lead_id: leaderId,
            description: description,
            project_files: projectFilesLink,
            member_ids: memberIds
        };

        try {
            const response = await axios.post(`${config.apiBASEURL}/project/addProject`, projectData);
            console.log('Project created successfully:', response.data);
            onHide(); // Close the modal after updating
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    return (
        <Container fluid className='p-0'>
            <Form onSubmit={handleSubmit}>
                <Row className="mx-0">
                    <Col lg={6} className='plr addprof mb-2'>
                        <div className="flex flex-column gap-2">
                            <label htmlFor="projectName" className='mb-2'>Project Name</label>
                            <InputText id="projectName" aria-describedby="projectName-help" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                        </div>
                    </Col>
                    <Col lg={6} className='plr addprof mb-2'>
                        <div className="flex flex-column gap-2">
                            <label htmlFor="company" className='mb-2'>Client</label>
                            <InputText id="company" aria-describedby="company-help" value={company} onChange={(e) => setCompany(e.target.value)} />
                        </div>
                    </Col>
                    <Col lg={6} className='plr addprof mb-2'>
                        <label htmlFor="startDate" className='mb-2'>Start Date</label>
                        <DatePicker
                            showIcon
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            className='w-100'
                        />
                    </Col>
                    <Col lg={6} className='plr addprof mb-2'>
                        <label htmlFor="endDate" className='mb-2'>End Date</label>
                        <DatePicker
                            showIcon
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            className='w-100'
                        />
                    </Col>
                    <Col lg={6} className='plr addprof mb-2'>
                        <label htmlFor="priority" className='mb-2'>Priority</label>
                        <Dropdown
                            value={selectedPriority}
                            onChange={(e) => setSelectedPriority(e.value)}
                            options={priorities}
                            optionLabel="name"
                            placeholder="Select Priority Type"
                            className="w-full md:w-14rem"
                        />
                    </Col>
                    <Col lg={6} className='plr addprof mb-2'>
                        <div className="flex flex-column gap-2">
                            <label htmlFor="pLeader" className='mb-2'>Add Project Leader</label>
                            <Dropdown
                                value={selectedLeader}
                                onChange={(e) => setSelectedLeader(e.value)}
                                options={users}
                                optionLabel="name"
                                placeholder="Select a Project Leader"
                                className="w-full md:w-14rem"
                            />
                        </div>
                    </Col>
                    <Col lg={12} className='plr addprof mb-2'>
                        <div>
                            <label htmlFor="teamMembers" className='mb-2 d-block w-100'>Add Team Members</label>
                            <MultiSelect
                                value={selectedTeamMembers}
                                options={users}
                                onChange={(e) => setSelectedTeamMembers(e.value)}
                                optionLabel="name"
                                placeholder="Select Team Members"
                                className="w-full md:w-14rem"
                                display="chip"
                            />
                        </div>
                    </Col>
                    <Col lg={12} className='plr addprof mb-3'>
                        <Form.Label>Description <span className='text-danger'>*</span></Form.Label>
                        <Form.Control as="textarea" rows={4} aria-label="Description" className='h-auto m-0' value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Col>
                    <Col lg={12} className='plr addprof mb-3'>
                        <Form.Label>Project Files Link <span className='text-danger'>*</span></Form.Label>
                        <InputText id="projectFilesLink" aria-describedby="projectFilesLink-help" value={projectFilesLink} onChange={(e) => setProjectFilesLink(e.target.value)} />
                    </Col>
                    <Col lg='12' className='d-flex justify-content-end mt-4'>
                        <button type="button" className='btn btn-dark btn-lg me-2' onClick={onHide}>CANCEL</button>
                        <button type="submit" className='btn btn-primary btn-lg' disabled={!isSubmitEnabled}>SUBMIT</button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default Addprojects;
