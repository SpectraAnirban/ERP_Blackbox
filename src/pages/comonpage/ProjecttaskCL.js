import React, { useState, useEffect } from 'react';
import { Col, Row, Card, CardHeader, CardBody } from 'react-bootstrap';
import Task from '../../components/Task';
import TaskModal from '../../components/TaskModal';
import '../../assets/css/project_task.css';
import { Button } from 'primereact/button';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import config from '../../config';

const initialColumns = {
  todo: [],
  inProgress: [],
  inReview: [],
  completed: [],
};

const ProjectTaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [columns, setColumns] = useState(initialColumns);
  const { userId } = useAuth(); // Get userId from the context

  const fetchTasks = async () => {
    try {
      if (!userId) {
        console.error('userId is undefined');
        return;
      }

      const response = await axios.get(`${config.apiBASEURL}/tasks/fetchallemployeetasks`);
      const fetchedTasks = response.data.tasks;

      console.log('Fetched Tasks:', fetchedTasks);

      // Clear columns to avoid accumulating old tasks
      const newColumns = {
        todo: [],
        inProgress: [],
        inReview: [],
        completed: [],
      };

      // Set tasks into columns based on their status
      fetchedTasks.forEach(task => {
        if (task.status && newColumns[task.status]) {
          newColumns[task.status].push(task);
        }
      });

      console.log('New Columns:', newColumns);

      setColumns(newColumns);
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    // Fetch tasks when component mounts
    fetchTasks();
  }, [userId]);

  const handleAddTask = () => {
    setCurrentTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = async (task) => {
    try {
      if (currentTask) {
        // Update task
        await axios.put(`${config.apiBASEURL}/tasks/edit-task`, task, {
          params: { task_id: currentTask.task_id } // Use task_id here
        });
      } else {
        // Add new task
        await axios.post(`${config.apiBASEURL}/tasks/add-task`, task);
      }
      setIsModalOpen(false);
      // Fetch updated tasks
      fetchTasks();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };
  

  const handleChangeTaskStatus = async (taskId, newStatus) => {
    try {
      await axios.put(`${config.apiBASEURL}/tasks/update-task-status`, { status: newStatus }, {
        params: { task_id: taskId }
      });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <Row className="body_content">
      <Row>
        <Col md={12} lg={12} className="mb-4 ps-4 d-flex justify-content-end">
          <Button label="Add Task" severity="secondary" icon="pi pi-plus" size="small" onClick={handleAddTask} />
        </Col>
        <Row className="kanban-board">
          {Object.keys(columns).map((columnId) => (
            <Col md={12} lg={3} key={columnId} className='pjtaskscroll'>
              <Card className='shadow-none mb-3'>
                <CardHeader>{columnId.replace(/([A-Z])/g, ' $1').toUpperCase()}</CardHeader>
                <CardBody>
                  {columns[columnId].map((task) => (
                    <Task
                      task={task}
                      key={task.task_id} // Use task_id as key
                      onEdit={handleEditTask}
                      onChangeStatus={handleChangeTaskStatus}
                    />
                  ))}
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
        <TaskModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveTask}
          initialData={currentTask}
        />
      </Row>
    </Row>
  );
};

export default ProjectTaskBoard;
