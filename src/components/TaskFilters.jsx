import PropTypes from "prop-types";
import "./TaskFilters.css";
import { Filter, AlertTriangle, CheckCircle2, Clock, ArrowDown } from 'lucide-react';

const TaskFilters = ({ setFiltersObj }) => {
    const handleFilter = (key, value) => {
        setFiltersObj((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    return (
        <div className="filters-section">
            <div className="filters-header">
                <div className="filters-title">
                    <Filter size={20} />
                    <h2>Filter Tasks</h2>
                </div>
            </div>
            
            <div className="filters-content">
                <div className="filter-group">
                    <div className="filter-label">
                        <ArrowDown size={16} />
                        <span>Priority Level</span>
                    </div>
                    <div className="priority-options">
                        <button
                            className="priority-option all"
                            onClick={() => handleFilter("priority", "")}
                        >
                            <Clock size={16} />
                            <span>All Tasks</span>
                        </button>
                        <button
                            className="priority-option urgent"
                            onClick={() => handleFilter("priority", "urgent")}
                        >
                            <AlertTriangle size={16} />
                            <span>Urgent</span>
                        </button>
                        <button
                            className="priority-option high"
                            onClick={() => handleFilter("priority", "high")}
                        >
                            <AlertTriangle size={16} />
                            <span>High</span>
                        </button>
                        <button
                            className="priority-option normal"
                            onClick={() => handleFilter("priority", "normal")}
                        >
                            <Clock size={16} />
                            <span>Normal</span>
                        </button>
                        <button
                            className="priority-option low"
                            onClick={() => handleFilter("priority", "low")}
                        >
                            <CheckCircle2 size={16} />
                            <span>Low</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

TaskFilters.propTypes = {
    setFiltersObj: PropTypes.func.isRequired,
};

export default TaskFilters;