import { useState } from "react";
import "./TaskForm.css";
import PropTypes from "prop-types";
import { Calendar, Clock, User, AlertCircle } from "lucide-react";

const TaskForm = ({ getData }) => {
  const [loading, setLoading] = useState(false);

  const addTask = async (obj) => {
    const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks`, {
      method: "POST",
      body: JSON.stringify(obj),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const respObj = await resp.json();
    if (respObj.status === "success") {
      console.log("Task added successfully");
      getData();
      return true;
    } else {
      alert(respObj.message);
      return false;
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    setLoading(true);

    const taskTitle = e.target.taskTitle.value.trim();
    const assignee = e.target.assignee.value.trim();
    const deadline = e.target.deadline.value;
    const priority = e.target.priority.value;

    if (!taskTitle || assignee.length < 3) {
      alert("Task Title and Assignee are required.");
      setLoading(false);
      return;
    }

    const dataObj = {
      taskTitle,
      assignee,
      deadline,
      priority,
      assignor: "Likhilesh",
    };

    const success = await addTask(dataObj);
    if (success) {
      e.target.reset();
    }
    setLoading(false);
  };

  return (
    <div className="task-form-container">
      <div className="form-header">
        <h2>Create New Task</h2>
        <p>Fill in the details below to create a new task</p>
      </div>

      <form onSubmit={handleAddTask}>
        <div className="form-group">
          <label>
            <AlertCircle size={16} className="inline mr-2" />
            Task Title
          </label>
          <input
            type="text"
            name="taskTitle"
            placeholder="Enter task title"
            required
            minLength={3}
          />
        </div>

        <div className="form-group">
          <label>
            <User size={16} className="inline mr-2" />
            Assignee
          </label>
          <input
            type="email"
            name="assignee"
            placeholder="Enter assignee email"
            required
          />
        </div>

        <div className="form-group">
          <label>
            <Calendar size={16} className="inline mr-2" />
            Deadline
          </label>
          <input
            type="datetime-local"
            name="deadline"
            min={new Date().toISOString().slice(0, 16)}
          />
        </div>

        <div className="form-group priority-select">
          <label>
            <Clock size={16} className="inline mr-2" />
            Priority
          </label>
          <select name="priority" defaultValue="normal">
            <option value="normal" className="priority-normal">
              Normal
            </option>
            <option value="low" className="priority-low">
              Low
            </option>
            <option value="high" className="priority-high">
              High
            </option>
            <option value="urgent" className="priority-urgent">
              Urgent
            </option>
          </select>
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Creating Task..." : "Create Task"}
        </button>
      </form>
    </div>
  );
};

TaskForm.propTypes = {
  getData: PropTypes.func.isRequired,
};

export default TaskForm;
