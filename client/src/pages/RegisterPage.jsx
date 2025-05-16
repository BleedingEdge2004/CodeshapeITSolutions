// src/pages/RegisterPage.jsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Add Link
import { API } from "../utils/api.js"
import "../styles/AuthPage.css";

const RegisterPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Handle form changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Submit register form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const { data } = await axios.post(`${API}/auth/register`, formData);
            localStorage.setItem("token", data.token); // Store token
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <h2>Register</h2>
            {error && <p className="error-msg">{error}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    required
                />
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
                    {loading ? "Registering..." : "Create Account"}
                </button>
            </form>

            {/* Switch to Login link */}
            <p style={{ marginTop: "20px", fontSize: "14px" }}>
                Already have an account?{" "}
                <Link to="/login" style={{ color: "#007bff", textDecoration: "none" }}>
                    Log in here
                </Link>
            </p>
        </div>
    );
};

export default RegisterPage;