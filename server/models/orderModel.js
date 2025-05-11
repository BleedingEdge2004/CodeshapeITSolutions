import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: { type: Number, required: true },
            },
        ],
        totalPrice: {
            type: Number,
            required: true,
        },
        paymentStatus: {
            type: String,
            default: "Pending", // or 'Paid'
        },
        deliveryStatus: {
            type: String,
            default: "Processing", // or 'Shipped', 'Delivered'
        },
    },
    { timestamps: true }
);

export default mongoose.model("Order", orderSchema);