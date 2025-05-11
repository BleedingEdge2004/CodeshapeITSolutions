import express from "express";
import {
  getUserCart,
  updateUserCart,
  getUserFavorites,
  toggleFavorite,
  getUserProfile,
  updateUserProfile,
  getUserOrders
} from "../controllers/userController.js";
import { requireSignIn } from "../middlewares/authMiddlewares.js";

const router = express.Router();

// Cart routes
router.get("/cart", requireSignIn, getUserCart);
router.post("/cart", requireSignIn, updateUserCart);

// Favorites routes
router.get("/favorites", requireSignIn, getUserFavorites);
router.post("/favorites", requireSignIn, toggleFavorite);

// Profile routes
router.get("/profile", requireSignIn, getUserProfile);
router.put("/profile", requireSignIn, updateUserProfile);

// Orders routes
router.get("/orders", requireSignIn, getUserOrders);

export default router;