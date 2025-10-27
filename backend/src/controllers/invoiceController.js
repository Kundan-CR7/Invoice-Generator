import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import PDFDocument from "pdfkit";
import { generateInvoice } from "../utils/invoiceTemplate.js";
import path from "path";
import fs from "fs"; 

export const generateInvoicePDF = async (req, res) => {
  try {
    const { id } = req.params;

    const invoice = await prisma.invoice.findUnique({
    where: { id },
    select: {
        id: true,
        number: true,
        issueDate: true,
        dueDate: true,
        taxRate: true,
        discount: true,
        items: true,
        company: { select: { name: true, email: true, address: true, logoUrl:true } },
        customer: { select: { name: true, email: true, address: true } },
    },
    });

    if (!invoice) return res.status(404).json({ error: "Invoice not found" });

    const filePath = path.resolve(`invoice-${invoice.number}.pdf`);

    generateInvoice(invoice, filePath);

    setTimeout(() => {
      res.download(filePath, () => fs.unlinkSync(filePath)); 
    }, 1000);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const createInvoice = async (req, res) => {
    try {
        const { companyId, customerId, items, taxRate = 0, discount = 0, dueDate } = req.body;

        if (!companyId || !customerId || !items || items.length === 0)
        return res.status(400).json({ error: "Company ID, customer ID, and items are required" });

        // ✅ Generate a unique invoice number using timestamp
        const invoiceNumber = `INV-${Date.now()}`;

        // Calculate totals
        let subtotal = 0;
        const invoiceItems = items.map(item => {
        const lineTotal = item.price * item.qty;
        subtotal += lineTotal;
        return { ...item, lineTotal };
        });

        const taxAmount = subtotal * (taxRate / 100);
        const total = subtotal + taxAmount - discount;

        const invoice = await prisma.invoice.create({
        data: {
            number: invoiceNumber,
            companyId,
            customerId,
            issueDate: new Date(),
            dueDate: dueDate ? new Date(dueDate) : null,
            taxRate,
            discount,
            items: invoiceItems,
            status: "DRAFT",
        },
    });

    res.status(201).json({ invoice, totals: { subtotal, taxAmount, discount, total } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const getInvoicesByCompany = async (req, res) => {
    try {
        const { companyId } = req.params;
        const invoices = await prisma.invoice.findMany({
        where: { companyId },
        include: { company: true, customer: true },
        orderBy: { issueDate: "desc" },
        });
        res.json(invoices);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

export const getAllInvoices = async (req, res) => {
    try {
        const invoices = await prisma.invoice.findMany({
        include: { company: true, customer: true },
        orderBy: { issueDate: "desc" },
        });
        res.json(invoices);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

export const getInvoiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await prisma.invoice.findUnique({
        where: { id },
        include: { company: true, customer: true },
        });
        res.json(invoice);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
