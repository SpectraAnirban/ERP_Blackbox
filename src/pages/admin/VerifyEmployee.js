import React, { useState, useEffect } from 'react';
import { Row, Col, Breadcrumb, Card, Table, Form } from 'react-bootstrap';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { Calendar } from 'primereact/calendar';
import axios from 'axios';
import config from '../../config';
import '../../assets/css/verify.css';
import { useAuth } from '../../contexts/AuthContext';
import CustomToast from '../../components/CustomToast';

const VerifyEmployee = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [editModes, setEditModes] = useState({});
    const [formData, setFormData] = useState({});
    const [unverifiedEmployees, setUnverifiedEmployees] = useState([]);
    const [uniqueEmployeeIds, setUniqueEmployeeIds] = useState({});
    const [roles, setRoles] = useState([]);
    const [departments, setDepartments] = useState([]);
    const { userId: userId1 } = useAuth(); // Get userId from the context
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState({});

    const fetchUnverifiedEmployees = async () => {
        try {
            const response = await axios.get(`${config.apiBASEURL}/verify/unverified-employees`);
            setUnverifiedEmployees(response.data);
            const uniqueIds = {};
            for (const employee of response.data) {
                const idResponse = await axios.get(`${config.apiBASEURL}/verify/unique-employee-id`);
                uniqueIds[employee.user_id] = idResponse.data.employeeId;
            }
            setUniqueEmployeeIds(uniqueIds);
        } catch (error) {
            console.error('Error fetching unverified employees:', error);
        }
    };

    const fetchRoles = async () => {
        try {
            const response = await axios.get(`${config.apiBASEURL}/verify/roles?userId=${userId1}`);
            setRoles(response.data);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    const fetchDepartments = async () => {
        try {
            const response = await axios.get(`${config.apiBASEURL}/verify/departments`);
            setDepartments(response.data);
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${config.apiBASEURL}/verify/user-names?userId=${userId1}`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching user names:', error);
        }
    };

    useEffect(() => {
        fetchUnverifiedEmployees();
        fetchRoles();
        fetchDepartments();
        fetchUsers();
        const intervalId = setInterval(fetchUnverifiedEmployees, 300000);

        return () => clearInterval(intervalId);
    }, []);

    const handleEditClick = (employee) => {
        setEditModes((prevEditModes) => ({
            ...prevEditModes,
            [employee.user_id]: true,
        }));
        setFormData((prevFormData) => ({
            ...prevFormData,
            [employee.user_id]: {
                empId: employee.employee_id || uniqueEmployeeIds[employee.user_id],
                reportedBy: employee.reported_to || '',
                status: employee.Verification ? employee.Verification.status.toString() : '',
                date: employee.joining_date ? new Date(employee.joining_date) : null,
                department: employee.department || '',
                designation: employee.designation || '',
                role: employee.role_id || '',
                userId: employee.user_id,
            },
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [employee.user_id]: {}
        }));
    };

    const handleSaveClick = async (userId) => {
        const validationErrors = validateForm(userId);
        if (Object.keys(validationErrors).length > 0) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [userId]: validationErrors
            }));
            return;
        }

        try {
            const employeeData = formData[userId];
            const selectedRole = roles.find(role => role.role_id === employeeData.role);
            const roleName = selectedRole ? selectedRole.name : '';

            const payload = {
                userId: employeeData.userId,
                reportedTo: employeeData.reportedBy,
                joiningDate: employeeData.date,
                department: employeeData.department,
                designation: roleName, // Use role name as designation
                roleId: employeeData.role,
                employeeId: employeeData.empId,
            };

            await axios.post(
                `${config.apiBASEURL}/verify/update-user?verifierId=${userId1}`,
                payload,
                { headers: { 'Content-Type': 'application/json' } }
            );

            setEditModes((prevEditModes) => ({
                ...prevEditModes,
                [userId]: false,
            }));
            fetchUnverifiedEmployees();
        } catch (error) {
            console.error('Error saving employee data:', error);
        }
    };

    const handleCancelClick = (userId) => {
        setEditModes((prevEditModes) => ({
            ...prevEditModes,
            [userId]: false,
        }));
    };

    const handleFormChange = (userId, e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [userId]: {
                ...prevFormData[userId],
                [name]: value,
            },
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [userId]: {
                ...prevErrors[userId],
                [name]: ''
            }
        }));
    };

    const handleDateChange = (userId, date) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [userId]: {
                ...prevFormData[userId],
                date: date,
            },
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [userId]: {
                ...prevErrors[userId],
                date: ''
            }
        }));
    };

    const validateForm = (userId) => {
        const employeeData = formData[userId] || {};
        const newErrors = {};

        if (!employeeData.empId) newErrors.empId = 'Employee ID is required';
        if (!employeeData.reportedBy) newErrors.reportedBy = 'Reporting To is required';
        if (!employeeData.date) newErrors.date = 'Join Date is required';
        if (!employeeData.department) newErrors.department = 'Department is required';
        if (!employeeData.role) newErrors.role = 'Role is required';

        return newErrors;
    };

    return (
        <Row className='body_content'>
            <Row className='mx-0'>
                <Col md={6} lg={6} className='mb-4'>
                    <Breadcrumb>
                        <Breadcrumb.Item active>Verify</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
                <Col md={6} lg={6} className='mb-4 justify-content-end d-flex gap-2 tabbutton'>
                    <Button
                        onClick={() => setActiveIndex(0)}
                        className="w-2rem h-2rem"
                        rounded
                        outlined={activeIndex !== 0}
                        label="Employee"
                    >
                        <span className="p-badge">{unverifiedEmployees.length}</span>
                    </Button>
                    <Button onClick={() => setActiveIndex(1)} className="w-2rem h-2rem" rounded outlined={activeIndex !== 1} label="Client" badge="0" />
                </Col>
                <Card className='verify-table'>
                    <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                        <TabPanel>
                            <Table responsive hover>
                                <thead className="table-header">
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>EMP ID</th>
                                        <th>Reporting To</th>
                                        <th>Join Date</th>
                                        <th>Department</th>
                                        <th>Role</th>
                                        <th style={{ width: '150px' }} className='text-center'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {unverifiedEmployees.map(employee => {
                                        const userId = employee.user_id;
                                        const isEditMode = editModes[userId] || false;
                                        const employeeData = formData[userId] || {};
                                        const employeeErrors = errors[userId] || {};
                                        const isSaveDisabled = Object.keys(validateForm(userId)).length > 0;

                                        return (
                                            <tr key={userId}>
                                                <td>{employee.name}</td>
                                                <td>{employee.email_address}</td>
                                                <td>
                                                    <InputText
                                                        type="text"
                                                        className={`p-inputtext-sm ${employeeErrors.empId ? 'is-invalid' : ''}`}
                                                        placeholder="Employee ID"
                                                        value={employeeData.empId || uniqueEmployeeIds[userId]}
                                                        readOnly
                                                        name="empId"
                                                        onChange={(e) => handleFormChange(userId, e)}
                                                    />
                                                    {employeeErrors.empId && <div className="invalid-feedback">{employeeErrors.empId}</div>}
                                                </td>
                                                <td>
                                                    <Form.Select
                                                        aria-label="Default select example"
                                                        value={employeeData.reportedBy || ''}
                                                        name="reportedBy"
                                                        onChange={(e) => handleFormChange(userId, e)}
                                                        disabled={!isEditMode}
                                                        className={!isEditMode ? 'readonly' : employeeErrors.reportedBy ? 'is-invalid' : ''}
                                                    >
                                                        <option disabled value="">
                                                            Please Select
                                                        </option>
                                                        {users.map(user => (
                                                            <option key={user.user_id} value={user.name}>
                                                                {user.name}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                    {employeeErrors.reportedBy && <div className="invalid-feedback">{employeeErrors.reportedBy}</div>}
                                                </td>
                                                <td>
                                                    <Calendar
                                                        value={employeeData.date || null}
                                                        onChange={(e) => handleDateChange(userId, e.value)}
                                                        readOnlyInput={!isEditMode}
                                                        inputClassName={!isEditMode ? 'readonly' : employeeErrors.date ? 'is-invalid' : ''}
                                                    />
                                                    {employeeErrors.date && <div className="invalid-feedback">{employeeErrors.date}</div>}
                                                </td>
                                                <td>
                                                    <Form.Select
                                                        aria-label="Default select example"
                                                        value={employeeData.department || ''}
                                                        name="department"
                                                        onChange={(e) => handleFormChange(userId, e)}
                                                        disabled={!isEditMode}
                                                        className={!isEditMode ? 'readonly' : employeeErrors.department ? 'is-invalid' : ''}
                                                    >
                                                        <option disabled value="">
                                                            Select Department
                                                        </option>
                                                        {departments.map(department => (
                                                            <option key={department.id_department} value={department.id_department}>
                                                                {department.name}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                    {employeeErrors.department && <div className="invalid-feedback">{employeeErrors.department}</div>}
                                                </td>
                                                <td>
                                                    <Form.Select
                                                        aria-label="Default select example"
                                                        value={employeeData.role || ''}
                                                        name="role"
                                                        onChange={(e) => handleFormChange(userId, e)}
                                                        disabled={!isEditMode}
                                                        className={!isEditMode ? 'readonly' : employeeErrors.role ? 'is-invalid' : ''}
                                                    >
                                                        <option disabled value="">
                                                            Select Role
                                                        </option>
                                                        {roles.map(role => (
                                                            <option key={role.role_id} value={role.role_id}>
                                                                {role.name}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                    {employeeErrors.role && <div className="invalid-feedback">{employeeErrors.role}</div>}
                                                </td>
                                                <td>
                                                    {!isEditMode ? (
                                                        <Button icon="pi pi-user-edit"
                                                        rounded
                                                        outlined
                                                        severity="info" onClick={() => handleEditClick(employee)} />
                                                    ) : (
                                                        <div>
                                                            <Button icon="pi pi-save"
                                                            rounded
                                                            outlined
                                                            severity="success" onClick={() => handleSaveClick(userId)} disabled={isSaveDisabled} />
                                                            <Button icon="pi pi-times"
                                                            rounded
                                                            outlined
                                                            severity="danger" onClick={() => handleCancelClick(userId)} />
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </TabPanel>
                        <TabPanel header="Client">
                            <p>Client content</p>
                        </TabPanel>
                    </TabView>
                </Card>
            </Row>
        </Row>
    );
};

export default VerifyEmployee;
