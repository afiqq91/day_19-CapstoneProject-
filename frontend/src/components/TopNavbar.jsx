import {
    FaBell,
    FaSearch,
    FaUserCircle
} from "react-icons/fa";

import "./navbar.css";

function TopNavbar() {

    return (

        <header className="top-navbar">

            

            <div className="navbar-right">

                <button className="notification-btn">

                    <FaBell />

                </button>

                <div className="profile">

                    <FaUserCircle />

                    <div>

                        <h6>Administrator</h6>

                        <small>System Admin</small>

                    </div>

                </div>

            </div>

        </header>

    );

}

export default TopNavbar;