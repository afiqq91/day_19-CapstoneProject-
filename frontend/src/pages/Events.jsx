import { useEffect, useState } from "react";
import api from "../services/api";
import "./Events.css";

function Events() {

    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [seatSelections, setSeatSelections] = useState({});
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 6;

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

    const bookEvent = async (eventId, numberOfSeats) => {

        try {

            const userId = localStorage.getItem("userId");

            await api.post("/bookings", {

                userId,

                eventId,

                numberOfSeats,

            });

            alert("Booking Successful");

            fetchEvents();

        } catch (error) {

            console.error(error);

            alert("Booking Failed");

        }

    };

    const logout = () => {

        localStorage.clear();

        window.location.href = "/";

    };

    const filteredEvents = events.filter((event) =>

        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||

        event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||

        event.venue.toLowerCase().includes(searchTerm.toLowerCase())

    );

    const indexOfLastItem = currentPage * itemsPerPage;

    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentEvents = filteredEvents.slice(

        indexOfFirstItem,

        indexOfLastItem

    );

    const totalPages = Math.max(

        1,

        Math.ceil(filteredEvents.length / itemsPerPage)

    );

    const getCategoryClass = (category) => {

        switch (category) {

            case "Technology":
                return "category-tech";

            case "Training":
                return "category-training";

            case "Business":
                return "category-business";

            case "Education":
                return "category-education";

            case "Seminar":
                return "category-seminar";

            default:
                return "category-default";

        }

    };

    const getBannerClass = (category) => {

        switch (category) {

            case "Technology":
                return "banner-tech";

            case "Training":
                return "banner-training";

            case "Business":
                return "banner-business";

            case "Education":
                return "banner-education";

            case "Seminar":
                return "banner-seminar";

            default:
                return "banner-default";

        }

    };

    return (

        <div className="events-page">

            <div className="container">

                {/* Header */}

                <div className="events-header">

                    <div className="events-title">

                        <h1>🎟 Discover Events</h1>

                        <p>

                            Find conferences, workshops, seminars and networking opportunities across Malaysia.

                        </p>

                    </div>

                    <div className="events-actions">

                        <button
                            className="btn btn-primary"
                            onClick={() => window.location.href = "/my-bookings"}
                        >
                            My Bookings
                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={logout}
                        >
                            Logout
                        </button>

                    </div>

                </div>

                {/* Search */}

                <div className="search-card">

                    <input

                        type="text"

                        className="form-control"

                        placeholder="🔍 Search events, category or venue..."

                        value={searchTerm}

                        onChange={(e) => {

                            setSearchTerm(e.target.value);

                            setCurrentPage(1);

                        }}

                    />

                </div>

                {/* Event Cards */}

                <div className="row g-4">

                    {currentEvents.length === 0 ? (

                        <div className="col-12">

                            <div className="empty-events">

                                <h3>No Events Found</h3>

                                <p>
                                    Try searching using another keyword.
                                </p>

                            </div>

                        </div>

                    ) : (

                        currentEvents.map((event) => (

                            <div
                                key={event.id}
                                className="col-lg-4 col-md-6"
                            >

                                <div className="event-card">

                                    <div
                                        className={`event-banner ${getBannerClass(
                                            event.category
                                        )}`}
                                    ></div>

                                    <div className="event-body">

                                        <div className="event-top">

                                            <span
                                                className={`category-pill ${getCategoryClass(
                                                    event.category
                                                )}`}
                                            >
                                                {event.category}
                                            </span>

                                            <span
                                                className={`status-pill ${event.status === "ACTIVE"
                                                    ? "status-active"
                                                    : "status-inactive"
                                                    }`}
                                            >
                                                {event.status}
                                            </span>

                                        </div>

                                        <h3 className="event-title">

                                            {event.title}

                                        </h3>

                                        <div className="event-info">

                                            <div>

                                                📍 {event.venue}

                                            </div>

                                            <div>

                                                📅{" "}

                                                {new Date(
                                                    event.eventDate
                                                ).toLocaleDateString()}

                                            </div>

                                        </div>

                                        <div className="event-divider"></div>

                                        <div className="event-summary">

                                            <div className="price-box">

                                                <span className="price-label">

                                                    Price

                                                </span>

                                                <span className="price">
                                                    {new Intl.NumberFormat("en-MY", {
                                                        style: "currency",
                                                        currency: "MYR",
                                                        minimumFractionDigits: 2,
                                                    }).format(event.price)}
                                                </span>

                                            </div>

                                            <div className="seats-box">

                                                <span className="seats-label">

                                                    Seats Left

                                                </span>

                                                <div className="seats-value">

                                                    {event.seatsAvailable}

                                                </div>

                                            </div>

                                        </div>

                                        <div className="booking-form">

                                            <label>

                                                Seats To Book

                                            </label>

                                            <select
                                                className="form-select"
                                                value={
                                                    seatSelections[event.id] || 1
                                                }
                                                onChange={(e) =>
                                                    setSeatSelections({
                                                        ...seatSelections,
                                                        [event.id]: Number(
                                                            e.target.value
                                                        ),
                                                    })
                                                }
                                            >
                                                {[...Array(
                                                    Math.min(
                                                        event.seatsAvailable,
                                                        10
                                                    )
                                                )].map((_, index) => (

                                                    <option
                                                        key={index + 1}
                                                        value={index + 1}
                                                    >
                                                        {index + 1}
                                                    </option>

                                                ))}
                                            </select>

                                            <button
                                                className="book-btn"
                                                disabled={
                                                    event.seatsAvailable === 0
                                                }
                                                onClick={() =>
                                                    bookEvent(
                                                        event.id,
                                                        seatSelections[
                                                        event.id
                                                        ] || 1
                                                    )
                                                }
                                            >
                                                {event.seatsAvailable === 0
                                                    ? "Sold Out"
                                                    : "Book Event"}
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))

                    )}

                </div>

                {/* Pagination */}

                <div className="pagination-card">

                    <button
                        className="btn btn-secondary"
                        disabled={currentPage === 1}
                        onClick={() =>
                            setCurrentPage(currentPage - 1)
                        }
                    >
                        ← Previous
                    </button>

                    <span>

                        Page <strong>{currentPage}</strong> of{" "}
                        <strong>{totalPages}</strong>

                    </span>

                    <button
                        className="btn btn-secondary"
                        disabled={currentPage === totalPages}
                        onClick={() =>
                            setCurrentPage(currentPage + 1)
                        }
                    >
                        Next →
                    </button>

                </div>

            </div>
        </div>
    );
}

export default Events;
