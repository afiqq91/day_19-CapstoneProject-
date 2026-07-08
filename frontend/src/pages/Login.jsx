import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response =
                await api.post("/auth/login", {
                    email,
                    password,
                });

            console.log(
                "LOGIN RESPONSE:",
                response.data
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "role",
                response.data.role
            );

            localStorage.setItem(
                "email",
                response.data.email
            );

            localStorage.setItem(
                "userId",
                response.data.userId
            );

            if (
                response.data.role === "ADMIN"
            ) {

                navigate("/admin");

            } else {

                navigate("/events");

            }

        } catch (error) {

            console.error(error);

            alert("Login Failed");
        }
    };

    return (
        <div className="container mt-5">

            <div
                className="card shadow p-4 mx-auto"
                style={{ maxWidth: "600px" }}
            >

                <h1 className="text-center mb-4">
                    Capstone - Event Booking System
                </h1>

                <form onSubmit={handleLogin}>

                    <div className="mb-3">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>

                    <div className="mb-4">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Login
                    </button>

                </form>

                <div className="text-center mt-4">

                    <p>
                        Don't have an account?
                    </p>

                    <button
                        className="btn btn-outline-success"
                        onClick={() =>
                            navigate("/register")
                        }
                    >
                        Register
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Login;