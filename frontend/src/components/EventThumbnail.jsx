import {
    FaCode,
    FaCloud,
    FaRobot,
    FaShieldAlt,
    FaCalendarAlt
} from "react-icons/fa";

function EventThumbnail({ category = "", title = "" }) {

    const value = (category + " " + title).toLowerCase();

    if (value.includes("java")) {
        return (
            <div className="thumb java">
                <FaCode />
            </div>
        );
    }

    if (value.includes("cloud")) {
        return (
            <div className="thumb cloud">
                <FaCloud />
            </div>
        );
    }

    if (value.includes("ai")) {
        return (
            <div className="thumb ai">
                <FaRobot />
            </div>
        );
    }

    if (value.includes("security")) {
        return (
            <div className="thumb security">
                <FaShieldAlt />
            </div>
        );
    }

    return (
        <div className="thumb default">
            <FaCalendarAlt />
        </div>
    );
}

export default EventThumbnail;