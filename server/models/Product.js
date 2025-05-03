const mongoose = require('mongoose');
// This code imports the Mongoose library, which is used to interact with MongoDB databases in Node.js applications.
// It also imports the Category model, which is used to define the structure of category documents in the database.
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    image: String, // optional image URL
}, { timestamps: true });
// This code defines a Mongoose schema for a "Product" model in a MongoDB database. The schema includes fields for the product's name, description, price, stock quantity, category (which references another model), and an optional image URL. The timestamps option automatically adds createdAt and updatedAt fields to the schema.

module.exports = mongoose.model('Product', productSchema);