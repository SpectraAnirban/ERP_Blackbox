import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { LiaCommentsSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import axios from 'axios';
import Empactivity from '../modalPopup/Empactivity';

const Task = ({ task, onEdit, onChangeStatus }) => {
  const [expanded, setExpanded] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [status, setStatus] = useState(null);
  const [visible, setVisible] = useState(false);
  const [commentCount, setCommentCount] = useState(task.comments ? task.comments.length : 0);

  const handleExpand = () => setExpanded(!expanded);
  const handleCommentsToggle = () => setCommentsOpen(!commentsOpen);

  const handleStatusChange = async (e) => {
    const newStatus = e.value;
    const currentStatus = task.status;

    const allowedTransitions = {
      todo: ['inProgress'],
      inProgress: ['inReview', 'completed'],
      inReview: ['inProgress', 'completed'],
      completed: ['inProgress', 'inReview']
    };

    if (allowedTransitions[currentStatus].includes(newStatus)) {
      await onChangeStatus(task.task_id, newStatus);
    } else {
      alert(`Cannot change status from ${currentStatus} to ${newStatus}`);
    }
  };

  const statusOptions = [
    { label: 'To Do', value: 'todo' },
    { label: 'In Progress', value: 'inProgress' },
    { label: 'In Review', value: 'inReview' },
    { label: 'Completed', value: 'completed' },
  ];

  const [isHidden, setIsHidden] = useState(true);

  const toggleHidden = () => setIsHidden(!isHidden);

  const displayStyle = { display: isHidden ? 'none' : 'block' };

  const updateCommentCount = (newCount) => {
    setCommentCount(newCount);
  };

  return (
    <div className="task">
      <h3><span>Task Name:  </span>{task.task_name}</h3>
      <p><span className='me-2'>Description : </span> {task.task_description}</p>
      <div className='ExpandableContent'>
        <p className='d-flex align-items-center'>
          <Link to={`#`} className='text-black d-block' onClick={toggleHidden}>
            <span className='me-2'>Sub-Tasks : </span>
            {isHidden ? <IoIosArrowDown /> : <IoIosArrowUp />}
            &nbsp; <small className='text-danger'>{task.subTasks ? task.subTasks.length : 0}</small>
          </Link>
        </p>

        <div style={displayStyle} className='extraTask'>
          <ol className='mt-3'>
            {task.subTasks && task.subTasks.map(subTask => (
              <li key={subTask.subtask_id}>
                <Link to={`#`}>{subTask.subtask_description}</Link>
                <span className='d-flex'>
                  <Link to={`#`} className='text-help' onClick={() => setVisible(true)}><LiaCommentsSolid />&nbsp; {commentCount}</Link>
                  &nbsp; | &nbsp;
                  <small className='text-danger'><b>{subTask.status}</b></small>
                  &nbsp; | &nbsp;
                  <small className='text-secondary'>Deadline : {subTask.deadline ? new Date(subTask.deadline).toLocaleDateString() : 'N/A'}</small>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <Button icon="pi pi-file-edit" className='taskBTN' rounded outlined onClick={() => onEdit(task)} />
      <hr />
      <Dropdown
        value={task.status}
        options={statusOptions}
        onChange={handleStatusChange}
        placeholder="Change Status"
        className="taskDropdown mt-2"
      />
      <Dialog header="Activity" visible={visible} style={{ width: '35vw' }} onHide={() => setVisible(false)}>
        <Empactivity taskId={task.task_id} updateCommentCount={updateCommentCount} />
      </Dialog>
      
    </div>
  );
};

export default Task;
