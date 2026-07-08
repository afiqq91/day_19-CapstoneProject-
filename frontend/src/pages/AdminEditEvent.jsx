import { useEffect, useState } from "react";
import api from "../services/api";
import {
    useNavigate,
    useParams,
} from "react-router-dom";

function AdminEditEvent() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [event, setEvent] = useState({
        title: "",
        description: "",
        category: "",
        venue: "",
        eventDate: "",
        price: "",
        capacity: "",
        seatsAvailable: "",
        status: "ACTIVE",
    });

    useEffect(() => {
        fetchEvent();
    }, []);

    const fetchEvent = async () => {

        try {

            const response =
                await api.get(`/events/${id}`);

            setEvent(response.data);

        } catch (error) {

            console.error(error);

            alert("Failed to load event");
        }
    };

    const handleChange = (e) => {

        setEvent({
            ...event,
            [e.target.name]: e.target.value,
        });
    };

    const updateEvent = async (e) => {

        e.preventDefault();

        try {

            await api.put(
                `/events/${id}`,
                {
                    ...event,
                    price: Number(event.price),
                    capacity: Number(event.capacity),
                    seatsAvailable: Number(
                        event.seatsAvailable
                    ),
                }
            );

            alert("Event Updated");

            navigate("/admin/events");

        } catch (error) {

            console.error(error);

            alert("Update Failed");
        }
    };

    return (
        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>Edit Event</h2>

                <div className="d-flex gap-2">

                    <button
                        className="btn btn-secondary"
                        onClick={() =>
                            navigate("/admin")
                        }
                    >
                        Dashboard
                    </button>

                    <button
                        className="btn btn-dark"
                        onClick={() =>
                            navigate("/admin/events")
                        }
                    >
                        Manage Events
                    </button>

                </div>

            </div>

            <form onSubmit={updateEvent}>

                <div className="mb-3">
                    <label className="form-label">
                        Title
                    </label>

                    <input
                        type="text"
                        name="title"
                        value={event.title}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Description
                    </label>

                    <textarea
                        name="description"
                        value={event.description}
                        onChange={handleChange}
                        className="form-control"
                        rows="3"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Category
                    </label>

                    <input
                        type="text"
                        name="category"
                        value={event.category}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Venue
                    </label>

                    <input
                        type="text"
                        name="venue"
                        value={event.venue}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Event Date
                    </label>

                    <input
                        type="datetime-local"
                        name="eventDate"
                        value={event.eventDate}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Price (RM)
                    </label>

                    <input
                        type="number"
                        step="0.01"
                        name="price"
                        value={event.price}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Capacity
                    </label>

                    <input
                        type="number"
                        name="capacity"
                        value={event.capacity}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Available Seats
                    </label>

                    <input
                        type="number"
                        name="seatsAvailable"
                        value={event.seatsAvailable}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-warning"
                >
                    Update Event
                </button>

            </form>

        </div>
    );
}

export default AdminEditEvent;