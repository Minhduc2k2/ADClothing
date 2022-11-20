import express from "express";
import { createCategory, deleteCategory, updateCategory, selectAllCategories } from "../controllers/categoryController.js";

import { verifyBuyer, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// select all categories
router.get("/", selectAllCategories);

// create category
router.post("/", createCategory);

// delete category
router.delete("/:id", deleteCategory);

// update name category
router.patch("/:id", updateCategory);

export default router;