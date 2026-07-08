import {
    FaHome,
    FaCalendarAlt,
    FaPlusCircle,
    FaSignOutAlt,
    FaTicketAlt
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";

import "./Sidebar.css";

function Sidebar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.clear();

        navigate("/");

    };

    return (

        <aside className="sidebar">

            <div className="logo">

                <h4>EVENT BOOKING</h4>

                <p>Management System</p>

            </div>
            <nav>

                <NavLink to="/admin">
                    <FaHome />
                    Dashboard
                </NavLink>

                <NavLink to="/admin/events">
                    <FaCalendarAlt />
                    Manage Events
                </NavLink>

                <NavLink to="/admin/events/create">
                    <FaPlusCircle />
                    Create Event
                </NavLink>

            </nav>

            <button
                className="logout"
                onClick={logout}
            >

                <FaSignOutAlt />

                Logout

            </button>

        </aside>

    );

}

export default Sidebar;