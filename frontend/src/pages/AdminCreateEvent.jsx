import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

import {
    FaArrowLeft,
    FaList,
    FaCalendarPlus,
    FaSave,
    FaTimes
} from "react-icons/fa";

import "./AdminCreateEvent.css";

function AdminCreateEvent() {

    const navigate = useNavigate();

    const [event, setEvent] = useState({
        title: "",
        description: "",
        category: "",
        venue: "",
        eventDate: "",
        price: "",
        capacity: "",
    });

    const handleChange = (e) => {

        setEvent({
            ...event,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post("/events", {
                ...event,
                price: Number(event.price),
                capacity: Number(event.capacity),
                seatsAvailable: Number(event.capacity),
                status: "ACTIVE",
            });

            alert("Event Created Successfully!");

            navigate("/admin/events");

        } catch (error) {

            console.error(error);

            alert("Create Event Failed");

        }

    };

    return (

        <div className="container-fluid px-4 py-5">

            {/* Header */}

            <div className="create-header">

                <div>


                    <h2>

                        <FaCalendarPlus />

                        Create Event

                    </h2>

                    <p>

                        Create a new event by filling in all required information.

                    </p>

                </div>

                <div className="header-buttons">

                    <button
                        type="button"
                        className="btn btn-light"
                        onClick={() => navigate("/admin")}
                    >

                        <FaArrowLeft />

                        Dashboard

                    </button>

                    <button
                        type="button"
                        className="btn btn-dark"
                        onClick={() => navigate("/admin/events")}
                    >

                        <FaList />

                        Manage Events

                    </button>

                </div>

            </div>

            {/* Form */}

            <form onSubmit={handleSubmit}>

                <div className="create-card">

                    <div className="card-title">

                        <h4>Event Information</h4>

                        <p>
                            Complete all required fields before creating the event.
                        </p>

                    </div>

                    <div className="row">

                        <div className="col-12 mb-4">

                            <div className="row">

                                {/* Event Title */}

                                <div className="col-6 mb-4">

                                    <label>Event Title</label>

                                    <input
                                        type="text"
                                        name="title"
                                        className="form-control modern-input"
                                        placeholder="Advanced Java Workshop"
                                        value={event.title}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                {/* Category */}

                                <div className="col-md-6 mb-4">

                                    <label>Category</label>

                                    <select
                                        name="category"
                                        className="form-select modern-input"
                                        value={event.category}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">
                                            Select Category
                                        </option>

                                        <option value="Technology">
                                            Technology
                                        </option>

                                        <option value="Education">
                                            Education
                                        </option>

                                        <option value="Training">
                                            Training
                                        </option>

                                        <option value="Seminar">
                                            Seminar
                                        </option>

                                        <option value="Workshop">
                                            Workshop
                                        </option>

                                        <option value="Conference">
                                            Conference
                                        </option>

                                        <option value="Networking">
                                            Networking
                                        </option>

                                    </select>

                                </div>

                            </div>

                            <div className="mb-4">

                                <label>Description</label>

                                <textarea
                                    rows="4"
                                    name="description"
                                    className="form-control modern-input"
                                    placeholder="Describe your event..."
                                    value={event.description}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="row">

                                <div className="col-md-6 mb-4">

                                    <label>Venue</label>

                                    <input
                                        type="text"
                                        name="venue"
                                        className="form-control modern-input"
                                        placeholder="Kuala Lumpur Convention Centre"
                                        value={event.venue}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-4">

                                    <label>Event Date & Time</label>

                                    <input
                                        type="datetime-local"
                                        name="eventDate"
                                        className="form-control modern-input"
                                        value={event.eventDate}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                            </div>

                            <div className="row">

                                <div className="col-md-6 mb-4">

                                    <label>Ticket Price (RM)</label>

                                    <input
                                        type="number"
                                        step="0.01"
                                        name="price"
                                        className="form-control modern-input"
                                        placeholder="199.00"
                                        value={event.price}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-4">

                                    <label>Capacity</label>

                                    <input
                                        type="number"
                                        name="capacity"
                                        className="form-control modern-input"
                                        placeholder="150"
                                        value={event.capacity}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                            </div>

                            <hr />

                            <div className="form-buttons">

                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => navigate("/admin/events")}
                                >
                                    <FaTimes />
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-success"
                                >
                                    <FaSave />
                                    Create Event
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AdminCreateEvent;