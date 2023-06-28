import  { useState, useEffect } from 'react';
import "./App.css"

const TodoApp = () => {
  const [tasks, setTasks] = useState(null);
  const [newTask, setNewTask] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      setTasks([]);
    }
  }, []);

  useEffect(() => {
    if (tasks !== null) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleNewTaskChange = ({ target: { value } }) => {
    setNewTask(value);
  };

  const handleNewTaskDescriptionChange = ({ target: { value } }) => {
    setNewTaskDescription(value);
  };

  const handleNewTaskSubmit = (event) => {
    event.preventDefault();
    if (newTask.trim() !== '') {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: Date.now(), title: newTask, description: newTaskDescription, completed: false },
      ]);
      setNewTask('');
      setNewTaskDescription('');
    }
  };

  const handleTaskDelete = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleTaskComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  if (tasks === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='container'>
        <h1 className='center'>Todo List</h1>
        <form onSubmit={handleNewTaskSubmit}>
          <input
            type="text"
            placeholder="Enter a new task title"
            value={newTask}
            onChange={handleNewTaskChange}
          /><br /><br />
          <textarea
            placeholder="Enter a new task description"
            value={newTaskDescription}
            onChange={handleNewTaskDescriptionChange}
          ></textarea><br /><br />
          <button type="submit">Add Task</button>
        </form>
        <div className="task-container">
          {tasks.map((task) => (
            <div key={task.id} className={`task ${task.completed ? 'completed' : ''}`}>
              <h2>{task.title}</h2>
              <p>{task.description}</p>
              <div>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleTaskComplete(task.id)}
                />
                <button onClick={() => handleTaskDelete(task.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TodoApp;
