import express from "express"
import PDFDocument from "pdfkit"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

import companyRoutes from "./routes/company.js";
import customerRoutes from "./routes/customers.js";
import productRoutes from "./routes/products.js";
import invoiceRoutes from "./routes/invoices.js";


const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/companies", companyRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/invoices", invoiceRoutes);

app.get('/', (req, res) => {
    res.send('Invoice Generator API is running');
});

const PORT = process.env.PORT || 3000

app.listen(PORT,() => {
    console.log(`Server is running on http://localhost:${PORT}`)
})