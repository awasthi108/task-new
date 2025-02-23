import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskFilters from "../components/TaskFilters";
import TaskList from "../components/TaskList";
import Navbar from "../components/Navbar";
import { ListTodo, PlusCircle, X, CheckCircle2, Circle } from "lucide-react";
import "./TaskPage.css";
import PropTypes from "prop-types";

const TaskPage = ({ currUser, handleLogout }) => {
  const [list, setList] = useState([]);
  const [filtersObj, setFiltersObj] = useState({
    priority: "",
    status: "todo",
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const getData = async () => {
    const query = [];
    if (filtersObj.priority) {
      query.push(`priority=${filtersObj.priority}`);
    }
    console.log(query);
    const resp = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/tasks?${query}`,
      {
        credentials: "include",
      }
    );
    const respBody = await resp.json();
    const arrayOfTaskList = respBody.data.tasks;
    setList(arrayOfTaskList);
  };

  useEffect(() => {
    getData();
  }, [filtersObj]);

  return (
    <div className="task-page-container">
      <Navbar currUser={currUser} handleLogout={handleLogout} />

      <div className="task-page">
        <div className="dashboard-header">
          <div className="dashboard-title">
            <ListTodo size={32} />
            <h1>Task Manager</h1>
          </div>
          <button
            className="new-task-btn"
            onClick={() => setIsSidebarOpen(true)}
          >
            <PlusCircle size={20} />
            Create Task
          </button>
        </div>

        <div
          className={`sidebar-overlay ${isSidebarOpen ? "active" : ""}`}
          onClick={() => setIsSidebarOpen(false)}
        />

        <aside className={`task-sidebar ${isSidebarOpen ? "open" : ""}`}>
          <div className="sidebar-header">
            <h2>New Task</h2>
            <button
              className="close-sidebar"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X size={24} />
            </button>
          </div>
          <div className="form-wrapper">
            <TaskForm getData={getData} />
          </div>
        </aside>

        <main className="dashboard-content">
          <div className="filters-section">
            <TaskFilters setFiltersObj={setFiltersObj} />
          </div>

          <div className="tasks-grid">
            <section className="tasks-column todo-column">
              <div className="column-header">
                <div className="header-title">
                  <Circle size={20} />
                  <h2>Tasks To Do</h2>
                </div>
                <div className="task-counter">
                  {list.filter((task) => task.status === "todo").length}
                </div>
              </div>
              <div className="tasks-wrapper">
                <TaskList
                  list={list}
                  getData={getData}
                  filterObj={{ ...filtersObj, status: "todo" }}
                  title="Todo List"
                />
              </div>
            </section>

            <section className="tasks-column done-column">
              <div className="column-header">
                <div className="header-title">
                  <CheckCircle2 size={20} />
                  <h2>Completed</h2>
                </div>
                <div className="task-counter completed">
                  {list.filter((task) => task.status === "done").length}
                </div>
              </div>
              <div className="tasks-wrapper">
                <TaskList
                  list={list}
                  getData={getData}
                  filterObj={{ ...filtersObj, status: "done" }}
                  title="Done List"
                />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

TaskPage.propTypes = {
  currUser: PropTypes.object,
  handleLogout: PropTypes.func.isRequired,
};

export default TaskPage;
