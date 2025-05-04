import mongoose from 'mongoose';
// This code imports the Mongoose library, which is used to interact with MongoDB databases in Node.js applications.
// It also imports the Category model, which is used to define the structure of category documents in the database.
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);
export default Category;
// This code defines a Mongoose schema for a "Category" model in a MongoDB database.