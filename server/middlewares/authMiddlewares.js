import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const requireSignIn = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization token missing or invalid format' });
        }

        const token = authHeader.split(' ')[1];

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode.id) {
            return res.status(401).json({ message: 'Invalid token payload missing user ID' });
        }
        req.user = decode;
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export const isAdmin = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role === 'admin') {
            next();
        } else {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }
    } catch (err) {
        console.error('Admin check failed:', err);
        return res.status(500).json({ message: 'Server error checking admin status' });
    }
};