// src/pages/EditProfilePage.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/EditProfilePage.css";
import { useNavigate } from "react-router-dom";

const EditProfilePage = () => {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        pincode: "",
        phone: "",
        email: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("https://codeshapeitsolutions.onrender.com/api/user/profile", {
                    headers: { Authorization: `Bearer ${ token }` },
        });
    setFormData(res.data);
} catch (err) {
    console.error("Error fetching profile:", err);
    if (err.response?.status === 401) navigate("/login");
}
    };

fetchProfile();
  }, [navigate]);

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSave = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem("token");
        await axios.put("https://codeshapeitsolutions.onrender.com/api/user/profile", formData, {
            headers: { Authorization: `Bearer ${ token }` },
});
alert("Profile updated successfully!");
navigate("/account");
    } catch (err) {
    console.error("Error saving profile:", err);
    alert("Failed to update profile");
}
  };

return (
    <div className="edit-profile-page">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSave}>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
            />
            <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <button type="submit">Save Changes</button>
        </form>
    </div>
);
};

export default EditProfilePage;