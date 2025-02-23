import { Link } from "react-router";
import styles from "./Navbar.module.css";
import PropTypes from "prop-types";
import { Home, CheckSquare, LogIn, UserPlus, LogOut, User } from "lucide-react";

const Navbar = ({ currUser, handleLogout }) => {
    return (
        <nav className={styles.nav}>
            <div className={styles.userSection}>
                <User size={20} className={styles.userIcon} />
                <span className={styles.user}>
                    Welcome back, <strong>{currUser?.fullName}</strong>
                </span>
            </div>
            <div className={styles.navLinks}>
                <Link to="/" className={styles.link}>
                    <Home size={18} />
                    <span>Home</span>
                </Link>
                <Link to="/tasks" className={styles.link}>
                    <CheckSquare size={18} />
                    <span>Tasks</span>
                </Link>
                <Link to="/login" className={styles.link}>
                    <LogIn size={18} />
                    <span>Login</span>
                </Link>
                <Link to="/sign-up" className={styles.link}>
                    <UserPlus size={18} />
                    <span>Sign Up</span>
                </Link>
                <button className={styles.button} onClick={handleLogout}>
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </div>
        </nav>
    );
};

Navbar.propTypes = {
    currUser: PropTypes.object.isRequired,
    handleLogout: PropTypes.func.isRequired,
};

export default Navbar;