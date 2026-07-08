import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

import {
    FaArrowLeft,
    FaPlus,
    FaSearch,
    FaCalendarAlt,
    FaEdit,
    FaTrash
} from "react-icons/fa";

import "./AdminEvents.css";

function AdminEvents() {

    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {

        try {

            const response = await api.get("/events");
            setEvents(response.data);

        } catch (error) {

            console.error(error);

        }
    };

    const deleteEvent = async (id) => {

        if (!window.confirm("Delete this event?")) return;

        try {

            await api.delete(`/events/${id}`);

            fetchEvents();

        } catch (error) {

            console.error(error);

            alert("Delete Failed");

        }
    };

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.venue.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div className="container-fluid py-4">

            {/* Header */}

            <div className="page-header">

                <div>

                    <h2>Event Management</h2>

                    <p>
                        Manage all events from one place.
                    </p>

                </div>

                <div className="header-buttons">

                    <button
                        className="btn btn-light"
                        onClick={() => navigate("/admin")}
                    >
                        <FaArrowLeft />
                        Dashboard
                    </button>

                    <button
                        className="btn btn-success"
                        onClick={() =>
                            navigate("/admin/events/create")
                        }
                    >
                        <FaPlus />
                        Create Event
                    </button>

                </div>

            </div>

            {/* Top Row */}

            <div className="row mb-4">

                <div className="col-md-3">

                    <div className="summary-card">

                        <div className="summary-icon">

                            <FaCalendarAlt />

                        </div>

                        <div>

                            <small>Total Events</small>

                            <h2>{events.length}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-9">

                    <div className="search-card">

                        <FaSearch />

                        <input
                            type="text"
                            placeholder="Search event or venue..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                    </div>

                </div>

            </div>

            {/* Event Table */}

            <div className="modern-table-card">

                <div className="table-title">

                    <h5>Event List</h5>

                    <span>{filteredEvents.length} Events</span>

                </div>

                <table className="table modern-table">

                    <thead>

                        <tr>

                            <th>Title</th>

                            <th>Venue</th>

                            <th>Price</th>

                            <th>Seats</th>

                            <th width="180">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredEvents.map((event) => (

                            <tr key={event.id}>

                                <td>

                                    <strong>
                                        {event.title}
                                    </strong>

                                </td>

                                <td>{event.venue}</td>

                                <td>

                                    RM{" "}

                                    {Number(event.price).toLocaleString(
                                        "en-MY",
                                        {
                                            minimumFractionDigits:2,
                                            maximumFractionDigits:2
                                        }
                                    )}

                                </td>

                                <td>

                                    {event.seatsAvailable}

                                </td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() =>
                                            navigate(`/admin/events/edit/${event.id}`)
                                        }
                                    >

                                        <FaEdit />

                                        {" "}Edit

                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            deleteEvent(event.id)
                                        }
                                    >

                                        <FaTrash />

                                        {" "}Delete

                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default AdminEvents;