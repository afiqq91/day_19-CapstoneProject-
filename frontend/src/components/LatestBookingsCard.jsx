import {
    FaClipboardList
} from "react-icons/fa";

import "./LatestBookingsCard.css";

function LatestBookingsCard({
    bookings,
    users,
    events
}) {

    const getUserEmail = (userId) => {
        const user = users.find((u) => u.id === userId);
        return user ? user.email : userId;
    };

    const getEvent = (eventId) => {
        return events.find((e) => e.id === eventId);
    };

    return (

        <div className="booking-card">

            {/* Header */}

            <div className="booking-header">

                <div className="booking-title">

                    <FaClipboardList />

                    <h4>Latest Bookings</h4>

                </div>

                <span className="view-all">

                    Showing latest 5 bookings

                </span>

            </div>

            {/* Table */}

            <div className="booking-table-wrapper">

                <table className="booking-table">

                    <thead>

                        <tr>

                            <th>User</th>

                            <th>Event</th>

                            <th>Seats</th>

                            <th>Amount</th>

                            <th>Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        {[...bookings]
                            .sort(
                                (a, b) =>
                                    new Date(b.bookingDate) - new Date(a.bookingDate)
                            )
                            .slice(0, 5)
                            .map((booking) => {

                                const event = getEvent(booking.eventId);

                                return (

                                    <tr key={booking.id}>

                                        <td>

                                            {getUserEmail(booking.userId)}

                                        </td>

                                        <td>

                                            {event?.title}

                                        </td>

                                        <td>

                                            {booking.numberOfSeats}

                                        </td>

                                        <td>

                                            RM {(event?.price * booking.numberOfSeats).toFixed(2)}

                                        </td>

                                        <td>

                                            <span
                                                className={`booking-status ${booking.bookingStatus === "CONFIRMED"
                                                    ? "confirmed"
                                                    : "cancelled"
                                                    }`}
                                            >

                                                {booking.bookingStatus}

                                            </span>

                                        </td>

                                    </tr>

                                );

                            })}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default LatestBookingsCard;