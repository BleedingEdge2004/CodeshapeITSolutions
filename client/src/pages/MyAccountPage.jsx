// src/pages/MyAccountPage.jsx

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MyAccountPage.css"; // Import CSS for styling
import { FaEdit, FaHistory, FaLock } from "react-icons/fa";

const MyAccountPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) navigate("/login"); // Redirect to login if not authenticated
    }, [navigate]);
    return (
        <div className="account-page">
            <h2>My Account</h2>

            {/* <div className="account-info"> */}
                {/* Display user basic information */}
                {/* <p><strong>Name:</strong> {user.name}</p> */}
                {/* <p><strong>Email:</strong> {user.email}</p> */}
                {/* <p><strong>Phone:</strong> {user.phone}</p> */}
                {/* <p><strong>Address:</strong> {user.address}</p> */}
            {/* </div> */}

            {/* Action buttons (not functional yet) */}
            <div className="account-actions">
                <button><FaEdit/> Edit Profile</button>
                <button><FaHistory /> Order History</button>
                <button><FaLock />Logout</button>
            </div>
        </div>
    );
};

export default MyAccountPage;