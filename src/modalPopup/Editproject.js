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

const Editproject = ({ users, projectDetails, onHide }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [company, setCompany] = useState('');
    const [selectedPriority, setSelectedPriority] = useState(null);
    const [selectedLeader, setSelectedLeader] = useState(null);
    const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [projectFilesLink, setProjectFilesLink] = useState('');
    const [formValid, setFormValid] = useState(false);
    const [errors, setErrors] = useState({});

    const priorities = [
        { name: 'High', code: 'HIG' },
        { name: 'Medium', code: 'MED' },
        { name: 'Low', code: 'LOW' },
        { name: 'Urgent', code: 'URG' }
    ];

    useEffect(() => {
        if (projectDetails) {
            setProjectName(projectDetails.project_name);
            setCompany(projectDetails.client);
            setStartDate(new Date(projectDetails.start_date));
            setEndDate(new Date(projectDetails.end_date));
            setSelectedPriority(priorities.find(p => p.name === projectDetails.priority));
            setSelectedLeader(users.find(user => user.user_id === projectDetails.lead_id) || null);
            setSelectedTeamMembers(projectDetails.members.map(member => users.find(user => user.user_id === member.id)) || []);
            setDescription(projectDetails.description);
            setProjectFilesLink(projectDetails.project_files);
        }
    }, [projectDetails, users]);

    useEffect(() => {
        const validateForm = () => {
            const errors = {};
            if (!projectName) errors.projectName = "Project Name is required";
            if (!company) errors.company = "Client is required";
            if (!startDate) errors.startDate = "Start Date is required";
            if (!endDate) errors.endDate = "End Date is required";
            if (!selectedPriority) errors.selectedPriority = "Priority is required";
            if (!selectedLeader) errors.selectedLeader = "Project Leader is required";
            if (selectedTeamMembers.length === 0) errors.selectedTeamMembers = "At least one Team Member is required";
            if (!description) errors.description = "Description is required";
            if (!projectFilesLink) errors.projectFilesLink = "Project Files Link is required";

            setErrors(errors);
            setFormValid(Object.keys(errors).length === 0);
        };

        validateForm();
    }, [projectName, company, startDate, endDate, selectedPriority, selectedLeader, selectedTeamMembers, description, projectFilesLink]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const leaderId = selectedLeader ? selectedLeader.user_id : '';
        const memberIds = selectedTeamMembers.map(member => member.user_id);

        try {
            const response = await axios.put(`${config.apiBASEURL}/project/updateProject/${projectDetails.project_id}`, {
                project_name: projectName,
                client: company,
                start_date: startDate,
                end_date: endDate,
                priority: selectedPriority.name,
                lead_id: leaderId,
                member_ids: memberIds,
                description,
                project_files: projectFilesLink
            });
            console.log('Project updated:', response.data);
            onHide(); // Close the modal after updating
        } catch (error) {
            console.error('Error updating project:', error);
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
                            {errors.projectName && <small className="p-error">{errors.projectName}</small>}
                        </div>
                    </Col>
                    <Col lg={6} className='plr addprof mb-2'>
                        <div className="flex flex-column gap-2">
                            <label htmlFor="company" className='mb-2'>Client</label>
                            <InputText id="company" aria-describedby="company-help" value={company} onChange={(e) => setCompany(e.target.value)} />
                            {errors.company && <small className="p-error">{errors.company}</small>}
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
                        {errors.startDate && <small className="p-error">{errors.startDate}</small>}
                    </Col>
                    <Col lg={6} className='plr addprof mb-2'>
                        <label htmlFor="endDate" className='mb-2'>End Date</label>
                        <DatePicker
                            showIcon
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            className='w-100'
                        />
                        {errors.endDate && <small className="p-error">{errors.endDate}</small>}
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
                        {errors.selectedPriority && <small className="p-error">{errors.selectedPriority}</small>}
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
                            {errors.selectedLeader && <small className="p-error">{errors.selectedLeader}</small>}
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
                            {errors.selectedTeamMembers && <small className="p-error">{errors.selectedTeamMembers}</small>}
                        </div>
                    </Col>
                    <Col lg={12} className='plr addprof mb-3'>
                        <Form.Label>Description <span className='text-danger'>*</span></Form.Label>
                        <Form.Control as="textarea" rows={4} aria-label="Description" className='h-auto m-0' value={description} onChange={(e) => setDescription(e.target.value)} />
                        {errors.description && <small className="p-error">{errors.description}</small>}
                    </Col>
                    <Col lg={12} className='plr addprof mb-3'>
                        <Form.Label>Project Files Link <span className='text-danger'>*</span></Form.Label>
                        <InputText id="projectFilesLink" aria-describedby="projectFilesLink-help" value={projectFilesLink} onChange={(e) => setProjectFilesLink(e.target.value)} />
                        {errors.projectFilesLink && <small className="p-error">{errors.projectFilesLink}</small>}
                    </Col>
                    {formValid && (
                        <Col lg='12' className='d-flex justify-content-end mt-4'>
                            <button type="button" className='btn btn-dark btn-lg me-2' onClick={onHide}>CANCEL</button>
                            <button type="submit" className='btn btn-primary btn-lg'>SUBMIT</button>
                        </Col>
                    )}
                </Row>
            </Form>
        </Container>
    );
};

export default Editproject;
