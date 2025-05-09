import express from "express";
import {
  getUserCart,
  updateUserCart,
  getUserFavorites,
  toggleFavorite
} from "../controllers/userController.js";
import { requireSignIn } from "../middlewares/authMiddlewares.js";

const router = express.Router();

// Cart routes
router.get("/cart", requireSignIn, getUserCart);
router.post("/cart", requireSignIn, updateUserCart);

// Favorites routes
router.get("/favorites", requireSignIn, getUserFavorites);
router.post("/favorites", requireSignIn, toggleFavorite);

export default router;