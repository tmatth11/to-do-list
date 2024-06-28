import React, { useState, useEffect } from 'react';

function ToDoList() {

    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== '') {
            setTasks(t => {
                const updatedTasks = [...t, newTask];
                localStorage.setItem('tasks', JSON.stringify(updatedTasks));
                return updatedTasks;
            });
            setNewTask('');
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        }
    }

    return (
        <div className="to-do-list">
            <h1>To-Do List</h1>

            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter a task"
                    value={newTask}
                    onChange={handleInputChange}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            addTask();
                        }
                    }}
                />
                <button
                    className="add-button"
                    onClick={addTask}
                >
                    Add
                </button>
            </div>

            <ol>
                {tasks.map((task, index) => {
                    return (
                        <li key={index}>
                            <span className="text">{task}</span>
                            <div className='button-container'>
                                <button
                                    className="delete-button"
                                    onClick={() => deleteTask(index)}
                                >
                                    Delete
                                </button>
                                <button
                                    className="move-button"
                                    onClick={() => moveTaskUp(index)}
                                >
                                    ⬆️
                                </button>
                                <button
                                    className="move-button"
                                    onClick={() => moveTaskDown(index)}
                                >
                                    ⬇️
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}

export default ToDoList;