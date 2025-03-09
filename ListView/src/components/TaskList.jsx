
// TaskList.js
import React, { useState } from 'react';
import { Stack, Text, PrimaryButton, Panel, PanelType, TextField, Dropdown } from '@fluentui/react';
import TaskItem from './TaskItem';

const statusColors = {
    'To Do': '#f0f0f0',
    'In Progress': '#cce0ff',
    Completed: '#d4ffd4',
};

const categoryColors = {
    Research: '#fddede',
    Marketing: '#e6f7ff',
    Mobile: '#fff2cc',
    Vision: '#e8f5e9',
};

const TaskList = ({ group, taskList, handleAddTaskClick, handleDeleteTask, handleStatusChange, users }) => {
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskStatus, setNewTaskStatus] = useState('To Do');
    const [newTaskAssignee, setNewTaskAssignee] = useState(users[0] || '');
    const [newTaskCategory, setNewTaskCategory] = useState('Research');

    const handleCreateTask = () => {
        const newTask = {
            id: taskList.length + 1,
            sprint: group,
            title: newTaskTitle,
            status: newTaskStatus,
            assignee: newTaskAssignee,
            category: newTaskCategory,
        };
        handleAddTaskClick(newTask);
        setIsPanelOpen(false);
    };

    return (
        <div style={{ marginTop: '20px', border: '1px solid #ddd', borderRadius: '4px', padding: '10px' }}>
            <Stack horizontal verticalAlign="center" styles={{ root: { marginBottom: '10px' } }}>
                <Text variant="large">
                    {group} ({taskList.length} Tasks)
                </Text>
            </Stack>

            {taskList.map((task) => (
                <TaskItem key={task.id} task={task} handleDeleteTask={handleDeleteTask} handleStatusChange={handleStatusChange} />
            ))}

            <Stack horizontal styles={{ root: { marginTop: '10px' } }}>
                <div>
                    <PrimaryButton text="+ Create" onClick={() => setIsPanelOpen(!isPanelOpen)} />
                    <Panel
                        isOpen={isPanelOpen}
                        type={PanelType.small}
                        onDismiss={() => setIsPanelOpen(false)}
                        headerText="Create New Task"
                        styles={{
                            root: {
                                position: 'fixed', // Use fixed positioning to center on the viewport
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)', // Center the panel
                                zIndex: 1000,
                                width: '300px', // Adjust the width as needed
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add a subtle shadow
                                padding: '20px', // Add some padding for better appearance
                                backgroundColor: 'white', // Ensure the background is white
                            },
                        }}
                    >
                        <Stack tokens={{ childrenGap: 10 }}>
                            <TextField label="Title" value={newTaskTitle} onChange={(ev, newValue) => setNewTaskTitle(newValue)} />
                            <Dropdown
                                label="Status"
                                options={Object.keys(statusColors).map((status) => ({ key: status, text: status }))}
                                selectedKey={newTaskStatus}
                                onChange={(ev, item) => setNewTaskStatus(item.key)}
                            />
                            <Dropdown
                                label="Assignee"
                                options={users.map((user) => ({ key: user, text: user }))}
                                selectedKey={newTaskAssignee}
                                onChange={(ev, item) => setNewTaskAssignee(item.key)}
                            />
                            <Dropdown
                                label="Category"
                                options={Object.keys(categoryColors).map((category) => ({ key: category, text: category }))}
                                selectedKey={newTaskCategory}
                                onChange={(ev, item) => setNewTaskCategory(item.key)}
                            />
                            <PrimaryButton text="Create" onClick={handleCreateTask} />
                        </Stack>
                    </Panel>
                </div>
            </Stack>
        </div>
    );
};

export default TaskList;
