// src/pages/MyAccountPage.jsx

import React from "react";
import "../styles/MyAccountPage.css"; // Import CSS for styling

const MyAccountPage = () => {
    // Dummy user data to show visual layout (replace with real user data later)
    const user = {
        name: "Rahul Sharma",
        email: "rahul@example.com",
        address: "123, Sector 21, New Delhi",
        phone: "+91 9876543210",
    };

    return (
        <div className="account-page">
            <h2>My Account</h2>

            <div className="account-info">
                {/* Display user basic information */}
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Address:</strong> {user.address}</p>
            </div>

            {/* Action buttons (not functional yet) */}
            <div className="account-actions">
                <button>Edit Profile</button>
                <button>Order History</button>
                <button>Logout</button>
            </div>
        </div>
    );
};

export default MyAccountPage;