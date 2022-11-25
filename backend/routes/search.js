import express from "express";
import { searchProduct } from "../controllers/productController.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// select all products
router.get("/product", searchProduct);


export default router;
