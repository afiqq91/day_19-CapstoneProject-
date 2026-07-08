import {
    FaCalendarAlt,
    FaClipboardList,
    FaUsers,
    FaMoneyBillWave,
} from "react-icons/fa";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import AdminLayout from "../components/AdminLayout";
import DashboardCard from "../components/DashboardCard";
import RecentEventsCard from "../components/RecentEventsCard";
import LatestBookingsCard from "../components/LatestBookingsCard";

function AdminDashboard() {

    const [report, setReport] = useState({});
    const [bookings, setBookings] = useState([]);
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        fetchReport();
        fetchBookings();
        fetchUsers();
        fetchEvents();

    }, []);

    const fetchReport = async () => {

        try {

            const response = await api.get("/bookings/report");
            setReport(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const fetchBookings = async () => {

        try {

            const response = await api.get("/bookings");
            setBookings(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const fetchUsers = async () => {

        try {

            const response = await api.get("/users");
            setUsers(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const fetchEvents = async () => {

        try {

            const response = await api.get("/events");
            setEvents(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const logout = () => {

        localStorage.clear();
        navigate("/");

    };

    return (

        <AdminLayout>

            <div className="dashboard-wrapper">

                {/* Header */}

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h1 className="fw-bold">
                            Dashboard
                        </h1>

                    </div>

                </div>

                {/* Welcome Banner */}

                <div className="card shadow-sm border-0 mb-4">

                    <div className="card-body">

                        <h4 className="fw-bold">
                            Welcome Administrator 👋
                        </h4>

                        <p className="text-muted mb-0">

                            You are currently managing

                            <strong> {events.length}</strong> events,

                            <strong> {report.totalBookings || 0}</strong> bookings and generating

                            <strong>

                                {" "}RM{" "}

                                {Number(report.totalRevenue || 0).toLocaleString(
                                    "en-MY",
                                    {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }
                                )}

                            </strong>

                            {" "}in revenue.

                        </p>

                    </div>

                </div>

                {/* KPI Cards */}

                <div className="row g-4 mb-5">

                    <div className="col-md-3">

                        <DashboardCard
                            title="Total Events"
                            value={events.length}
                            icon={<FaCalendarAlt />}
                            color="blue"
                            trend="Updated today"
                        />

                    </div>

                    <div className="col-md-3">

                        <DashboardCard
                            title="Total Bookings"
                            value={report.totalBookings || 0}
                            icon={<FaClipboardList />}
                            color="green"
                            trend="Live"
                        />

                    </div>

                    <div className="col-md-3">

                        <DashboardCard
                            title="Total Users"
                            value={users.length}
                            icon={<FaUsers />}
                            color="orange"
                            trend="Registered"
                        />

                    </div>

                    <div className="col-md-3">

                        <DashboardCard
                            title="Revenue"
                            value={`RM ${Number(
                                report.totalRevenue || 0
                            ).toLocaleString("en-MY")}`}
                            icon={<FaMoneyBillWave />}
                            color="dark"
                            trend="Total Revenue"
                        />

                    </div>

                </div>

                {/* Recent Events */}

                <div className="row g-4 mb-4">

                    <div className="col-12">

                        <RecentEventsCard
                            events={events}
                        />

                    </div>

                </div>

                {/* Latest Bookings */}

                <div className="row g-4">

                    <div className="col-12">

                        <LatestBookingsCard
                            bookings={bookings}
                            users={users}
                            events={events}
                        />

                    </div>

                </div>

                {/* Footer */}

                <div className="text-center text-muted mt-5">

                    <hr />

                    <small>

                        © 2026 Capstone Project - Event Booking Management System

                        <br />

                        Capstone Project - React, Spring Boot, MongoDB & JWT Authentication

                    </small>

                </div>

            </div>

        </AdminLayout>

    );

}

export default AdminDashboard;