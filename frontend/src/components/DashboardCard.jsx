import "./DashboardCard.css";

function DashboardCard({ title, value, icon, color, trend }) {
    return (
        <div className="dashboard-card">

            <div className="dashboard-card-header">

                <div className={`icon ${color}`}>
                    {icon}
                </div>

                <span>{title}</span>

            </div>

            <h2>{value}</h2>

            <p className="trend">
                {trend}
            </p>

        </div>
    );
}

export default DashboardCard;