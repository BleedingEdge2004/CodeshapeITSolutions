// models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: { // Added description
        type: String,
        required: true,
    },
    image: { // Added image path or URL
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    expiryDate: {
        type: Date,
        required: false,
    },
    requiresPrescription: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);
export default Product;