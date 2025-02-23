import { useState } from "react";
import "./taskList.css";
import PropTypes from "prop-types";
import {
  Pencil,
  Trash2,
  CheckCircle,
  Clock,
  User,
  UserPlus,
} from "lucide-react";

const TaskList = ({ list, getData, filterObj, title }) => {
  const [editTask, setEditTask] = useState(null);
  const [editObject, setEditObject] = useState({});

  const handleEditField = (key, value) => {
    setEditObject((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleEditData = async () => {
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/tasks/${editObject._id}`,
        {
          method: "PATCH",
          credentials: "include",
          body: JSON.stringify(editObject),
          headers: { "content-type": "application/json" },
        }
      );

      const respObj = await resp.json();
      if (respObj.status === "success") {
        console.log("success :: updated");
        handleCancel();
        getData();
      } else {
        alert(respObj.message);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleCancel = () => {
    setEditTask(null);
    setEditObject({});
  };

  const handleDelete = async (taskId) => {
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/tasks/${taskId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (resp.status === 204) {
        console.log("success :: deleted");
        getData();
      } else {
        const error = await resp.json();
        alert(error.message || "Error deleting task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleMarkAsDone = async (taskId) => {
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/tasks/${taskId}`,
        {
          method: "PATCH",
          credentials: "include",
          body: JSON.stringify({ status: "done" }),
          headers: { "content-type": "application/json" },
        }
      );

      const respObj = await resp.json();
      if (respObj.status === "success") {
        console.log("success :: updated");
        getData();
      } else {
        alert(respObj.message);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const filteredList = list.filter((elem) => {
    const statusMatch = elem.status === filterObj.status;
    const priorityMatch =
      !filterObj.priority || elem.priority === filterObj.priority;
    return statusMatch && priorityMatch;
  });

  return (
    <div className="task-list">
      {filteredList.map((elem) => (
        <div key={elem._id} className={`task-card priority-${elem.priority}`}>
          <div className="task-card-header">
            <div className="task-titles">
              <h3 className="work-title">{elem.workTitle}</h3>
              <p className="task-title">{elem.taskTitle}</p>
            </div>
            <div className="priority-badge">{elem.priority}</div>
          </div>

          <div className="task-details">
            <div className="detail-item">
              <User size={16} />
              {elem._id === editTask ? (
                <input
                  type="text"
                  value={editObject?.assignee || ""}
                  onChange={(e) => handleEditField("assignee", e.target.value)}
                  placeholder="Assignee"
                />
              ) : (
                <span>{elem.assignee}</span>
              )}
            </div>

            <div className="detail-item">
              <UserPlus size={16} />
              <span>{elem.assignor}</span>
            </div>

            <div className="detail-item">
              <Clock size={16} />
              <span>{elem.deadline}</span>
            </div>
          </div>

          {elem._id === editTask ? (
            <div className="task-card-footer edit-mode">
              <select
                value={editObject?.priority || ""}
                onChange={(e) => handleEditField("priority", e.target.value)}
                className="priority-select"
              >
                <option value="normal">Normal</option>
                <option value="low">Low</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
              <div className="action-buttons">
                <button className="btn-save" onClick={handleEditData}>
                  Save
                </button>
                <button className="btn-cancel" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="task-card-footer">
              <div className="action-buttons">
                <button
                  className="btn-icon"
                  onClick={() => {
                    setEditObject(elem);
                    setEditTask(elem._id);
                  }}
                >
                  <Pencil size={16} />
                </button>
                <button
                  className="btn-icon delete"
                  onClick={() => handleDelete(elem._id)}
                >
                  <Trash2 size={16} />
                </button>
                {elem.status !== "done" && (
                  <button
                    className="btn-icon complete"
                    onClick={() => handleMarkAsDone(elem._id)}
                  >
                    <CheckCircle size={16} />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

TaskList.propTypes = {
  list: PropTypes.array.isRequired,
  getData: PropTypes.func.isRequired,
  filterObj: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default TaskList;
