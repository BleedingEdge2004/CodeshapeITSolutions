// MyAccountPage.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../utils/api.js"
import "../styles/MyAccountPage.css"; // Keep your existing enhanced CSS

const MyAccountPage = () => {
    const [userData, setUserData] = useState(null); // Store user info
    const navigate = useNavigate();

    // Fetch user info on component mount
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${API}/user/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUserProfile();
    }, []);

    // Handle logout - clears token and redirects
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    // Navigate to Edit Profile
    const handleEditProfile = () => {
        navigate("/edit-profile");
    };

    // Navigate to Order History
    const handleOrderHistory = () => {
        navigate("/order-history");
    };

    return (
        <div className="account-page">
            <h2>My Account</h2>

            <div className="account-info">
                <p><strong>Name:</strong> {userData?.name || "Loading..."}</p>
                <p><strong>Email:</strong> {userData?.email || "Loading..."}</p>
                <p><strong>Phone:</strong> {userData?.phone || "Not Provided"}</p>
                <p><strong>Address:</strong> {userData?.address || "Not Provided"}</p>
                <p><strong>Pincode:</strong> {userData?.pincode || "Not Provided"}</p>
            </div>

            <div className="account-actions">
                <button onClick={handleEditProfile}>Edit Profile</button>
                <button onClick={handleOrderHistory}>Order History</button>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default MyAccountPage;