import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
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
        required: false, // Optional, since not all items may expire
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