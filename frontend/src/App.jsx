import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Events from "./pages/Events";
import MyBookings from "./pages/MyBookings";
import AdminDashboard from "./pages/AdminDashboard";
import AdminEvents from "./pages/AdminEvents";
import AdminCreateEvent from "./pages/AdminCreateEvent";
import AdminEditEvent from "./pages/AdminEditEvent";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/events"
          element={<Events />}
        />

        <Route
          path="/my-bookings"
          element={<MyBookings />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/events"
          element={<AdminEvents />}
        />

        <Route
          path="/admin/events/create"
          element={<AdminCreateEvent />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/admin/events/edit/:id"
          element={<AdminEditEvent />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;