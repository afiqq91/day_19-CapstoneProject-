import Sidebar from "./Sidebar";
import "./layout.css";

function AdminLayout({ children }) {
    return (
        <div className="app-layout">

            <Sidebar />

            <div className="main-wrapper">

                <main className="main-content">

                    {children}

                </main>

            </div>

        </div>
    );
}

export default AdminLayout;