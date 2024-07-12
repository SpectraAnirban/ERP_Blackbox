import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField } from '@mui/material';
import { Button } from 'primereact/button';
import { Col, Row } from 'react-bootstrap';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';
import config from '../config';

const TaskModal = ({ open, onClose, onSave, initialData }) => {
  const [task, setTask] = useState(initialData || { subTasks: [] });
  const [statusOptions, setStatusOptions] = useState([]);
  const [subTaskStatusOptions, setSubTaskStatusOptions] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  const [projectQuery, setProjectQuery] = useState('');
  const [userQuery, setUserQuery] = useState('');

  useEffect(() => {
    setTask(initialData || { subTasks: [] });
  }, [initialData]);

  useEffect(() => {
    setStatusOptions([
      { name: 'To Do', code: 'todo' },
      { name: 'In Progress', code: 'in progress' },
      { name: 'In Review', code: 'in review' },
      { name: 'Completed', code: 'completed' }
    ]);

    setSubTaskStatusOptions([
      { name: 'Urgent', code: 'urgent' },
      { name: 'Priority', code: 'priority' },
      { name: 'Low', code: 'low' },
      { name: 'Medium', code: 'medium' },
      { name: 'High', code: 'high' },
      { name: 'Critical', code: 'critical' }
    ]);
  }, []);

  useEffect(() => {
    if (projectQuery) {
      fetchProjects(projectQuery);
    }
  }, [projectQuery]);

  useEffect(() => {
    if (userQuery) {
      fetchUsers(userQuery);
    }
  }, [userQuery]);

  const fetchProjects = async (query) => {
    try {
      const response = await axios.get(`${config.apiBASEURL}/tasks/search-projects?query=${query}`);
      setProjectOptions(response.data.projects.map(project => ({
        label: project.project_name,
        value: project.project_id
      })));
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchUsers = async (query) => {
    try {
      const response = await axios.get(`${config.apiBASEURL}/tasks/search-users?query=${query}`);
      setUserOptions(response.data.users.map(user => ({
        label: user.name,
        value: user.user_id
      })));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubTaskChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSubTasks = [...task.subTasks];
    updatedSubTasks[index][name] = value;
    setTask((prevTask) => ({
      ...prevTask,
      subTasks: updatedSubTasks,
    }));
  };

  const addSubTask = () => {
    setTask((prevTask) => ({
      ...prevTask,
      subTasks: [...prevTask.subTasks, { subtask_description: '', status: '', deadline: null }]
    }));
  };

  const handleSave = () => {
    onSave(task);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} className='FormModal'>
      <Box sx={{ p: 4, backgroundColor: 'white' }}>
        <h2>{initialData ? 'Edit Task' : 'Add Task'}</h2>
        <div className='scrollModal'>
          <TextField
            label="Task Name"
            name="task_name"
            value={task.task_name || ''}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Task Description"
            name="task_description"
            value={task.task_description || ''}
            onChange={handleChange}
            fullWidth
          />
          {/* <label>Status</label> */}
           <Dropdown 
            value={task.status || ''} 
            onChange={(e) => handleChange({ target: { name: 'status', value: e.value.code } })} 
            options={statusOptions}
            optionLabel="name" 
            placeholder="Select a Status"
            fullWidth
            className='mb-3'
          />
          <Row>
            <Col md={6} lg={6}>
              <TextField
                label="Search Projects"
                value={projectQuery}
                onChange={(e) => setProjectQuery(e.target.value)}
                fullWidth
              />
            </Col>
            <Col md={6} lg={6}>
              <Dropdown 
                value={task.project_id || ''} 
                onChange={(e) => handleChange({ target: { name: 'project_id', value: e.value } })} 
                options={projectOptions}
                optionLabel="label" 
                placeholder="Select a Project"
                fullWidth
                className='mb-3'
              />
            </Col>
          </Row>
          {/* <label>Project</label> */}
          
          
          <Row>
            <Col md={6} lg={6}>
              <TextField
                label="Search Users"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                fullWidth
              />
            </Col>
            <Col md={6} lg={6}>
              <Dropdown 
                value={task.user_id || ''} 
                onChange={(e) => handleChange({ target: { name: 'user_id', value: e.value } })} 
                options={userOptions}
                optionLabel="label" 
                placeholder="Select a User"
                fullWidth
              />
            </Col>
          </Row>
          {/* <label>Assigned To</label> */}
          
          
          <div className='loopRow'>
            {task.subTasks.map((subTask, index) => (
              <React.Fragment key={index}>
                <Row>
                <Col md={12} lg={12} className='mt-3'>
                  <TextField
                    label="Add Sub Task"
                    name="subtask_description"
                    value={subTask.subtask_description || ''}
                    onChange={(e) => handleSubTaskChange(index, e)}
                    fullWidth
                  />
                </Col>
                <Col md={6} lg={6}>
                  <label>Status</label>
                  <Dropdown 
                    value={subTask.status || ''} 
                    onChange={(e) => handleSubTaskChange(index, { target: { name: 'status', value: e.value.code } })} 
                    options={subTaskStatusOptions}
                    optionLabel="name" 
                    placeholder="Select a Status"
                    fullWidth
                  />
                </Col>
                <Col md={6} lg={6}>
                  <label>Deadline</label>
                  <Calendar 
                    value={subTask.deadline || null} 
                    onChange={(e) => handleSubTaskChange(index, { target: { name: 'deadline', value: e.value } })} 
                    placeholder="dd/MM/yyyy" 
                    fullWidth
                  />
                </Col>
                </Row>
              </React.Fragment>
            ))}
            <Button severity="help" label="Subtask" icon="pi pi-plus" onClick={addSubTask} className='me-2' />
          </div>
        </div>
        <div className="d-flex justify-content-end mt-3">
          <Button label="Cancel" severity="secondary"  onClick={onClose} className='me-2' />
          <Button label="Save" severity="info" onClick={handleSave} />
        </div>
      </Box>
    </Modal>
  );
};

export default TaskModal;
