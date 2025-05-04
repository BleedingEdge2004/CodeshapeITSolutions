// This file contains the authentication controller functions for user registration and login.
// It handles the logic for creating new users and validating existing users during login, including generating JWT tokens for authenticated users.
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import jwt from 'jsonwebtoken';

// @route   POST /api/auth/register
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({ name, email, password });
        const token = generateToken(user._id, user.role);

        res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Registration failed', error: err.message });
    }
};


// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password)))
            return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });
        res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Login failed', error: err.message });
    }
};
