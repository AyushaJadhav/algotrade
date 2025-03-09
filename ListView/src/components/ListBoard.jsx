// ListBoard.js
import React, { useState } from 'react';
import SearchAndGroup from './SearchAndGroup';
import TaskList from './TaskList';
import TableHeader from './TableHeader';

const ListBoard = () => {
    const [tasks, setTasks] = useState([
        { id: 1, sprint: 'Android Sprint 57', title: 'Design the vision', status: 'To Do', assignee: 'John Doe', category: 'Research' },
        { id: 2, sprint: 'Android Sprint 57', title: 'Do market research', status: 'In Progress', assignee: 'Jane Smith', category: 'Marketing' },
        { id: 3, sprint: 'iOS - Sprint 105', title: 'Build the product', status: 'Completed', assignee: 'Maya Johnson', category: 'Mobile' },
        { id: 4, sprint: 'iOS - Sprint 105', title: 'Create prototype', status: 'To Do', assignee: 'Julian Roche', category: 'Vision' },
    ]);

    const [users, setUsers] = useState(['John Doe', 'Jane Smith', 'Maya Johnson', 'Julian Roche']);
    const [searchTerm, setSearchTerm] = useState('');
    const [newUser, setNewUser] = useState('');
    const [activeFilter, setActiveFilter] = useState(null);

    const handleSearchChange = (event, newValue) => setSearchTerm(newValue);
    const handleGroupByChange = (filter) => setActiveFilter(filter);
    const clearFilter = () => setActiveFilter(null);

    const handleCreateUser = () => {
        if (newUser.trim()) {
            setUsers([...users, newUser.trim()]);
            setNewUser('');
        }
    };

    const handleAddTaskClick = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    };

    const handleStatusChange = (taskId, newStatus) => {
        setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)));
    };

    // Apply Filtering
    const filteredTasks = tasks.filter((task) => {
        const searchTermLower = searchTerm.toLowerCase();
        if (activeFilter) {
            return (
                (task.status === activeFilter || task.assignee === activeFilter || task.category === activeFilter) &&
                (task.title.toLowerCase().includes(searchTermLower) ||
                    task.assignee.toLowerCase().includes(searchTermLower) ||
                    task.category.toLowerCase().includes(searchTermLower))
            );
        } else {
            return (
                task.title.toLowerCase().includes(searchTermLower) ||
                task.assignee.toLowerCase().includes(searchTermLower) ||
                task.category.toLowerCase().includes(searchTermLower)
            );
        }
    });

    // Group by Sprint
    const groupedBySprint = filteredTasks.reduce((acc, task) => {
        acc[task.sprint] = acc[task.sprint] ||[];
        acc[task.sprint].push(task);
        return acc;
    }, {});

    return (
        <div style={{ padding: '20px' }}>
            <SearchAndGroup
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
                handleAddUserClick={handleCreateUser}
                newUser={newUser}
                setNewUser={setNewUser}
                handleCreateUser={handleCreateUser}
                groupBy={activeFilter}
                handleGroupByChange={handleGroupByChange}
                users={users}
                activeFilter={activeFilter}
                clearFilter={clearFilter}
            />

            <div className="right-side-panel">
                {/* ... (Your existing content within the right-side-panel) */}
            </div>

            {Object.entries(groupedBySprint).map(([sprint, taskList]) => (
                <div key={sprint} style={{ marginBottom: '20px' }}>
                    <h2>{sprint}</h2>
                    <TableHeader />
                    <TaskList
                        group={sprint}
                        taskList={taskList}
                        handleAddTaskClick={handleAddTaskClick}
                        handleDeleteTask={handleDeleteTask}
                        handleStatusChange={handleStatusChange}
                        users={users}
                    />
                </div>
            ))}
        </div>
    );
};

export default ListBoard;