import express from "express";
import { createInvoice, getInvoicesByCompany, getInvoiceById, getAllInvoices, generateInvoicePDF } from "../controllers/invoiceController.js";

const router = express.Router();

router.get("/", getAllInvoices);
router.post("/", createInvoice);
router.get("/company/:companyId", getInvoicesByCompany);
router.get("/view/:id", getInvoiceById);
router.get("/pdf/:id", generateInvoicePDF);

export default router;
