// routes/cartRoutes.js
import express from "express";
import {
    addToCart,
    getCart,
    incrementItem,
    decrementItem,
    removeFromCart,
    clearCart,
} from "../controllers/cartController.js";
import { requireSignIn } from "../middlewares/authMiddlewares.js";

const router = express.Router();

// Fetch user's cart
router.get("/", requireSignIn, getCart);

// Add product (or increment if exists)
router.post("/add", requireSignIn, addToCart);

// Increment quantity of existing product
router.put("/increment/:productId", requireSignIn, incrementItem);

// Decrement quantity of existing product
router.put("/decrement/:productId", requireSignIn, decrementItem);

// Clear all items
router.delete("/clear", requireSignIn, clearCart);

// Remove product from cart
router.delete("/:productId", requireSignIn, removeFromCart);


export default router;