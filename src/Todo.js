import React, { useState } from "react";
import './todocss.css';
import PomodoroTimer from "./components/pomodarotimer";
import { useGoogleCalendar } from "./components/googlesignin";
import './google.css';

function Todo() {
  const [tasks, settasks] = useState([
    "Brush the teeth",
    "Bath",
    "Walk the dog",
    "Go to work"
  ]);
  const [newtasks, setnewtasks] = useState("");
  const { signIn, addEventToCalendar,gapiInitialized } = useGoogleCalendar();

  function handlechange(event) {
    setnewtasks(event.target.value);
  }

  function moveup(index) {
    if (index === 0) return;
    const updatedTasks = [...tasks];
    [updatedTasks[index - 1], updatedTasks[index]] = [updatedTasks[index], updatedTasks[index - 1]];
    settasks(updatedTasks);
  }

  function movedown(index) {
    if (index === tasks.length - 1) return;
    const updatedTasks = [...tasks];
    [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
    settasks(updatedTasks);
  }

  function addtask() {
    if (newtasks.trim() !== "") {
      settasks(prev => [...prev, newtasks]);
      setnewtasks("");
    }
  }

  function delete_task(index) {
    const updatedtask = tasks.filter((_, i) => i !== index);
    settasks(updatedtask);
  }

  async function handleAddToCalendar(task) {
    try {
      await addEventToCalendar({
        summary: task,
        description: "Task from ToDo App",
        start: new Date().toISOString(),
        end: new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 mins later
      });
    } catch (error) {
      console.error("Calendar error:", error);
      alert("Failed to add event to calendar.");
    }
  }
  
  return (
    <div className="todo-list">
      <h1 className="Head">TO DO LIST</h1>
      <input type="text" placeholder="Enter a new task" value={newtasks} onChange={handlechange} />
      <button onClick={addtask} className="Add-button">Add</button>
      <button onClick={signIn}  className="google-signin-button">
      <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google logo" />
        Sign in with Google
        </button>
      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            <span className="text">{task}</span>
            <button className="delete-button" onClick={() => delete_task(index)}>Delete</button>
            <button className="move-up" onClick={() => moveup(index)}>☝️</button>
            <button className="move-down" onClick={() => movedown(index)}>👇</button>
            <button
                className="calendar-button"
                onClick={() => handleAddToCalendar(task)}
                disabled={!gapiInitialized} 
            >
  Add to Calendar
</button>

          </li>
        ))}
      </ol>
      <PomodoroTimer />
      <a href="https://pranavcv.neocities.org">Privacy policies</a><br/>
      <a href="https://www.termsfeed.com/live/872ca9eb-1cac-4aa5-b8fa-3c2fd85cf3f5">Terms and conditions</a>
    </div>
    
    
  );
}
export default Todo;


