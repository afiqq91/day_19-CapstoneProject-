import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] =
        useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {

        e.preventDefault();

        if (password !== confirmPassword) {

            alert("Passwords do not match");

            return;
        }

        try {

            await api.post("/auth/register", {
                fullName,
                email,
                password,
            });

            alert(
                "Registration Successful. Please Login."
            );

            navigate("/");

        } catch (error) {

            console.error(error);

            alert("Registration Failed");
        }
    };

    return (
        <div className="container mt-5">

            <div
                className="card shadow p-4 mx-auto"
                style={{ maxWidth: "600px" }}
            >

                <h2 className="text-center mb-4">
                    User Registration
                </h2>

                <form onSubmit={handleRegister}>

                    <div className="mb-3">

                        <label>
                            Full Name
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            value={fullName}
                            onChange={(e) =>
                                setFullName(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>

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

                    <div className="mb-3">

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

                    <div className="mb-4">

                        <label>
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="btn btn-success w-100 mb-3"
                    >
                        Register
                    </button>

                    <button
                        type="button"
                        className="btn btn-secondary w-100"
                        onClick={() =>
                            navigate("/")
                        }
                    >
                        Back To Login
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Register;