import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid'; // Importation de uuidv4
import "../styles/TodoList.css";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks && Array.isArray(JSON.parse(storedTasks)) && JSON.parse(storedTasks).length > 0) {
      console.log('storedTasks: '+storedTasks);
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleNewTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleNewTaskDescriptionChange = (e) => {
    setNewTaskDescription(e.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const task = {
        id: uuidv4(), // Utilisation de uuidv4 pour générer un identifiant unique
        title: newTask,
        description: newTaskDescription,
        completed: false,
      };
      setTasks(prevTasks => [...prevTasks, task]);
      setNewTask('');
      setNewTaskDescription('');
      toast.success('Tâche ajoutée avec succès', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
  };

  const handleDeleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    toast.error('Tâche supprimée avec succès', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  };

  const handleToggleComplete = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="todo-list-container">
      <h2>Todo List</h2>
      <div className="task-input">
        <input
          type="text"
          placeholder="Nouvelle tâche"
          value={newTask}
          onChange={handleNewTaskChange}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTaskDescription}
          onChange={handleNewTaskDescriptionChange}
        />
        <button onClick={handleAddTask}>Ajouter</button>
      </div>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div className="task-info">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </div>
            <div className="task-actions">
              <button onClick={() => handleDeleteTask(task.id)}>Supprimer</button>
              <button onClick={() => handleToggleComplete(task.id)}>
                {task.completed ? 'Démarquer' : 'Terminer'}
              </button>
            </div>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default TodoList;
