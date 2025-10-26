import fs from "fs";
import PDFDocument from "pdfkit";
import path from "path"

const fontPath = path.resolve("assets/fonts/DejaVuSans.ttf");
const logoPath = path.resolve("assets/logo.png");

export function generateInvoice(invoice, pathh) {     
    const doc = new PDFDocument({ size: "A4", margin: 50 });

    doc.registerFont("Deja", fontPath);
    doc.font("Deja"); 


    generateHeader(doc, invoice);
    generateCustomerInformation(doc, invoice);
    generateInvoiceTable(doc, invoice);
    generateFooter(doc);

    doc.pipe(fs.createWriteStream(pathh));
    doc.end();
}

function generateHeader(doc, invoice) {
  doc
    .image(logoPath, 50, 45, { width: 60 })
    .fillColor("#444444")
    .fontSize(20)
    .text(invoice.company.name || "Your Company", 120, 57)
    .fontSize(10)
    .text(invoice.company.email || "", 200, 50, { align: "right" })
    .text(invoice.company.address || "", 200, 65, { align: "right" })
    .text(invoice.company.city || "", 200, 80, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Invoice", 50, 160);

  generateHr(doc, 185);

  const top = 200;

  doc
    .fontSize(10)
    .text("Invoice Number:", 50, top)
    .font("Helvetica-Bold")
    .text(invoice.number, 150, top)
    .font("Helvetica")
    .text("Invoice Date:", 50, top + 15)
    .text(formatDate(invoice.issueDate), 150, top + 15)
    .text("Due Date:", 50, top + 30)
    .text(formatDate(invoice.dueDate), 150, top + 30)

    .font("Helvetica-Bold")
    .text(invoice.customer.name, 300, top)
    .font("Helvetica")
    .text(invoice.customer.email || "", 300, top + 15)
    .text(invoice.customer.address || "", 300, top + 30)
    .moveDown();

  generateHr(doc, 252);
}

function generateInvoiceTable(doc, invoice) {
  const tableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    tableTop,
    "Item",
    "Qty",
    "Price",
    "Line Total"
  );
  generateHr(doc, tableTop + 20);
  doc.font("Helvetica");

  let y = tableTop + 30;

  invoice.items.forEach((item) => {
    generateTableRow(
      doc,
      y,
      item.name,
      item.qty.toString(),
      formatCurrency(item.price),
      formatCurrency(item.lineTotal)
    );
    y += 25;
  });

  generateHr(doc, y);

  const subtotal = invoice.items.reduce((sum, i) => sum + i.lineTotal, 0);
  const taxAmount = subtotal * (invoice.taxRate / 100);
  const total = subtotal + taxAmount - invoice.discount;

  y += 20;
  generateTableRow(doc, y, "", "", "Subtotal", formatCurrency(subtotal));
  y += 20;
  generateTableRow(doc, y, "", "", "Tax", formatCurrency(taxAmount));
  y += 20;
  generateTableRow(doc, y, "", "", "Discount", formatCurrency(invoice.discount));
  y += 25;
  doc.font("Helvetica-Bold");
  generateTableRow(doc, y, "", "", "Total", formatCurrency(total));
  doc.font("Helvetica");
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text("Payment is due within 15 days. Thank you for your business.", 50, 780, {
      align: "center",
      width: 500,
    });
}

function generateTableRow(doc, y, item, qty, price, lineTotal) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(qty, 250, y, { width: 90, align: "right" })
    .text(price, 350, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function formatCurrency(amount) {
  return "Rs. " + amount.toFixed(2);
}

function formatDate(date) {
  if (!date) return "-";
  const d = new Date(date);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}
