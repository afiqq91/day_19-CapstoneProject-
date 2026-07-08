import {
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaUsers,
    FaMoneyBillWave
} from "react-icons/fa";

import "./RecentEventsCard.css";
import EventThumbnail from "./EventThumbnail";

function RecentEventsCard({ events = [] }) {

    return (

        <div className="modern-card">

            <div className="modern-card-header">

                <div className="title">

                    <FaCalendarAlt />

                    <h4>Recent Events</h4>

                </div>

                <button className="view-btn">

                    Showing latest 5 events

                </button>

            </div>

            <div className="event-list">

                {[...events]
    .sort(
        (a, b) =>
            new Date(b.eventDate) - new Date(a.eventDate)
    )
    .slice(0, 5)
    .map((event) => {

        const date = new Date(event.eventDate);

        const month = date.toLocaleString("en-US", {
            month: "short",
        }).toUpperCase();

        const day = date.getDate();

        return (

            <div
                className="modern-event-row"
                key={event.id}
            >

                <div className="event-left">

                    <EventThumbnail
                        category={event.category}
                        title={event.title}
                    />

                    <div className="event-date">

                        <span>{month}</span>

                        <strong>{day}</strong>

                    </div>

                </div>

                <div className="event-info">

                    <div className="event-top">

                        <h5>{event.title}</h5>

                        <span className="status active">

                            {event.status}

                        </span>

                    </div>

                    <div className="event-meta">

                        <span>

                            <FaMapMarkerAlt />

                            {event.venue}

                        </span>

                        <span>

                            <FaUsers />

                            {event.capacity} Seats

                        </span>

                        <span className="available">

                            {event.seatsAvailable} Available

                        </span>

                    </div>

                    <div className="event-price">

                        <FaMoneyBillWave />

                        RM {event.price.toFixed(2)}

                    </div>

                </div>

            </div>

        );

    })}

            </div>

        </div>

    );

}

export default RecentEventsCard;