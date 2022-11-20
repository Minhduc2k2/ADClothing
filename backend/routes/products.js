import express from "express";
import { updateProduct, deleteProduct, selectProductsByCategory, selectAllProducts, createProduct, selectProduct } from "../controllers/productController.js";
import { verifyBuyer, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// select all products
router.get("/", selectAllProducts);

// select all products
router.get("/:id", selectProduct);

// select a product by category id
router.get("/category/:id", selectProductsByCategory);

// create a new product
router.post("/", createProduct);

// delete a product
router.delete("/:id", deleteProduct);

// update a product
router.put("/:id", updateProduct);



export default router;