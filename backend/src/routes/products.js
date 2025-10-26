import express from "express";
import { createProduct, getProductsByCompany,getAllProducts,getProductById } from "../controllers/productController.js";

const router = express.Router();

router.get('/',getAllProducts)
router.get("/company/:companyId", getProductsByCompany);
router.post("/", createProduct);
router.get('/:id',getProductById)

export default router;
