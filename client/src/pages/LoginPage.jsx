// src/pages/LoginPage.jsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Add Link for routing
import "../styles/AuthPage.css";

const LoginPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Submit login form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const { data } = await axios.post("/api/auth/login", formData);
            localStorage.setItem("token", data.token); // Store token
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <h2>Login</h2>
            {error && <p className="error-msg">{error}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />
                <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                <small
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: "pointer", textAlign: "right", color: "#007bff" }}
                >
                    {showPassword ? "Hide Password" : "Show Password"}
                </small>

                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Log In"}
                </button>
            </form>

            {/* Switch to Register link */}
            <p style={{ marginTop: "20px", fontSize: "14px" }}>
                Don't have an account?{" "}
                <Link to="/register" style={{ color: "#007bff", textDecoration: "none" }}>
                    Register here
                </Link>
            </p>
        </div>
    );
};

export default LoginPage;