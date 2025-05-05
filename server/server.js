// This code sets up a basic Express.js server with MongoDB connection and routes for handling product and authentication-related requests. It also includes middleware for parsing JSON bodies and enabling CORS (Cross-Origin Resource Sharing) for the server.
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
// Middleware to enable CORS and parse JSON bodies


const app = express();
app.use(cors());
app.use(express.json());
// Middleware to parse JSON bodies
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
// Middleware to parse URL-encoded bodies
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// Middleware to handle authentication routes
app.get("/", (req, res) => res.send("API Running"));
// Connect to MongoDB using Mongoose
// This code connects to a MongoDB database using Mongoose, enabling CORS for the server, and setting up routes for handling product and authentication-related requests in an Express.js application. It also includes error handling for the database connection and starts the server on a specified port.
mongoose.connect(process.env.MONGO_URI, {
})
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error(err));
// Start the server on the specified port
// This code starts the server on the specified port, logging a message to the console when the server is running. The port is either taken from the environment variable PORT or defaults to 5000 if not specified.
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));