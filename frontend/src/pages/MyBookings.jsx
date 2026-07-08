import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./MyBookings.css";

function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [events, setEvents] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchBookings();
        fetchEvents();
    }, []);

    const fetchBookings = async () => {
        try {
            const userId =
                localStorage.getItem("userId");

            const response =
                await api.get(
                    `/bookings/user/${userId}`
                );

            setBookings(response.data);

        } catch (error) {
            console.error(error);
        }
    };

    const fetchEvents = async () => {
        try {
            const response =
                await api.get("/events");

            setEvents(response.data);

        } catch (error) {
            console.error(error);
        }
    };

    const getEventTitle = (eventId) => {

        const event = events.find(
            (e) => e.id === eventId
        );

        return event
            ? event.title
            : "Unknown Event";
    };

    const cancelBooking = async (bookingId) => {

        if (
            !window.confirm(
                "Cancel this booking?"
            )
        ) {
            return;
        }

        try {

            await api.put(
                `/bookings/${bookingId}/cancel`
            );

            alert("Booking Cancelled");

            fetchBookings();

        } catch (error) {

            console.error(error);

            alert("Cancel Failed");
        }
    };

    const logout = () => {

        localStorage.clear();

        navigate("/");
    };

    const totalBookings =
        bookings.length;

    const totalSeats =
        bookings.reduce(
            (sum, booking) =>
                sum + booking.numberOfSeats,
            0
        );

    const totalSpent =
        bookings.reduce(
            (sum, booking) =>
                sum + booking.totalPrice,
            0
        );

    return (

        <div className="bookings-page">

            <div className="container py-5">

                {/* Header */}

                <div className="bookings-header">

                    <div className="bookings-title">

                        <h1>
                            📋 My Bookings
                        </h1>

                        <p>
                            View and manage your event reservations.
                        </p>

                    </div>

                    <div className="bookings-actions">

                        <button
                            className="btn btn-primary"
                            onClick={() => navigate("/events")}
                        >
                            Back To Events
                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={logout}
                        >
                            Logout
                        </button>

                    </div>

                </div>

                {/* Summary Cards */}

                <div className="row g-4 mb-4">

                    <div className="col-md-4">

                        <div className="booking-summary-card booking-summary-blue">

                            <div className="booking-summary-content">

                                <h6>
                                    Total Bookings
                                </h6>

                                <h2>
                                    {totalBookings}
                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="booking-summary-card booking-summary-green">

                            <div className="booking-summary-content">

                                <h6>
                                    Seats Reserved
                                </h6>

                                <h2>
                                    {totalSeats}
                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="booking-summary-card booking-summary-dark">

                            <div className="booking-summary-content">

                                <h6>
                                    Total Spent
                                </h6>

                                <h2>
                                    {new Intl.NumberFormat("en-MY", {
                                        style: "currency",
                                        currency: "MYR"
                                    }).format(totalSpent)}
                                </h2>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Empty State */}

                {bookings.length === 0 ? (

                    <div className="empty-bookings">

                        <div className="empty-icon">
                            🎫
                        </div>

                        <h2>No Bookings Yet</h2>

                        <p>
                            Browse available events and reserve your first seat.
                        </p>

                        <button
                            className="btn btn-primary"
                            onClick={() => navigate("/events")}
                        >
                            Browse Events
                        </button>

                    </div>

                ) : (

                    <div className="row g-4">

                        {bookings.map((booking) => (

                            <div
                                key={booking.id}
                                className="col-lg-4 col-md-6"
                            >

                                <div className="booking-card">

                                    <div className="booking-status">

                                        <span
                                            className={`status-pill ${booking.bookingStatus === "CONFIRMED"
                                                ? "status-active"
                                                : "status-inactive"
                                                }`}
                                        >
                                            {booking.bookingStatus}
                                        </span>

                                    </div>

                                    <h3 className="booking-title">

                                        {getEventTitle(booking.eventId)}

                                    </h3>

                                    <div className="booking-divider"></div>

                                    <div className="booking-info">

                                        <div>

                                            <span>🎟 Seats Reserved</span>

                                            <strong>

                                                {booking.numberOfSeats}

                                            </strong>

                                        </div>

                                        <div>

                                            <span>💰 Total Price</span>

                                            <strong>

                                                {new Intl.NumberFormat("en-MY", {
                                                    style: "currency",
                                                    currency: "MYR"
                                                }).format(booking.totalPrice)}

                                            </strong>

                                        </div>

                                    </div>

                                    <div className="booking-reference">

                                        <span>

                                            Booking Reference

                                        </span>

                                        <small>

                                            {booking.id}

                                        </small>

                                    </div>

                                    {booking.bookingStatus === "CONFIRMED" && (

                                        <button
                                            className="cancel-btn"
                                            onClick={() =>
                                                cancelBooking(booking.id)
                                            }
                                        >
                                            Cancel Booking
                                        </button>

                                    )}

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>

    );
}

export default MyBookings;