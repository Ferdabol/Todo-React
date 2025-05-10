import React, { useState, useEffect } from "react";

type Task = {
  text: string;
  completed: boolean;
};

function TodoList() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      const newTaskObj: Task = {
        text: newTask,
        completed: false,
      };
      setTasks((t) => [...t, newTaskObj]);
      setNewTask("");
    }
  }

  function deleteTask(index: number) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function completedTask(index: number) {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  }

  return (
    <div className="todo-list">
      <h1>To Do List</h1>

      <div>
        <input
          type="text"
          placeholder="Enter a Task..."
          value={newTask}
          onChange={handleInputChange}
        />

        <button className="add-button" onClick={addTask}>
          Add Task
        </button>
      </div>

      <h2>TO BE COMPLETED</h2>
      <ol>
        {tasks.map((task, index) =>
          !task.completed ? (
            <li key={index} className={task.completed ? "completed-task" : ""}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => completedTask(index)}
              />

              <span
                className="text"
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  marginLeft: "8px",
                }}
              >
                {task.text}
              </span>

              <button className="delete-button" onClick={() => deleteTask(index)}>
                Delete
              </button>
            </li>
          ) : null
        )}
      </ol>

      <h2>COMPLETED</h2>
      <ol>
        {tasks.map((task, index) =>
          task.completed ? (
            <li key={index} className={task.completed ? "completed-task" : ""}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => completedTask(index)}
              />
              <span
                className="text"
                style={{
                  textDecoration: "line-through",
                  marginLeft: "8px",
                }}
              >
                {task.text}
              </span>
              <button className="delete-button" onClick={() => deleteTask(index)}>
                Delete
              </button>
            </li>
          ) : null
        )}
      </ol>
    </div>
  );
  }

export default TodoList;