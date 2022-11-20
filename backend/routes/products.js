import express from "express";
import { updateProduct, deleteProduct, selectProductsByCategory, selectAllProducts, createProduct } from "../controllers/productController.js";
import { verifyBuyer, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// select all products
router.get("/", selectAllProducts);

// create a new product
router.post("/", createProduct);

// delete a product
router.delete("/:id", deleteProduct);

// update a product
router.put("/:id", updateProduct);

// select a product by category id
router.get("/:id", selectProductsByCategory);


export default router;