import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateInvoice = (order) => {

  const doc = new jsPDF();

  /* ===== Colors ===== */
  const sage = [143, 160, 123];
  const pink = [246, 193, 207];

  /* ===== Header ===== */
  doc.setFillColor(...sage);
  doc.rect(0, 0, 210, 30, "F");

  doc.setTextColor(255,255,255);
  doc.setFontSize(20);
  doc.text("Creamantra Ice Cream & Eatery", 105, 15, {align:"center"});

  doc.setFontSize(11);
  doc.text("Invoice Receipt",105,23,{align:"center"});

  /* ===== Customer Details ===== */

  doc.setTextColor(0,0,0);
  doc.setFontSize(12);

  doc.text(`Customer Name: ${order.name}`, 14, 45);
  doc.text(`Phone: ${order.phone}`, 14, 52);
  doc.text(`Address: ${order.address}`, 14, 59);
  doc.text(`Payment Mode: ${order.payment}`, 14, 66);

  /* ===== Product Table ===== */

  const tableData = order.items.map((item) => [
    item.name,
    item.quantity,
    `₹${item.price}`,
    `₹${item.quantity * item.price}`
  ]);

  autoTable(doc,{
    startY:75,
    head:[["Product","Qty","Price","Total"]],
    body:tableData,
    theme:"grid",
    headStyles:{
      fillColor:pink,
      textColor:[0,0,0]
    }
  });

  /* ===== Total ===== */

  const finalY = doc.lastAutoTable.finalY + 10;

  doc.setFontSize(14);
  doc.setTextColor(...sage);

  doc.text(`Total Amount: ₹${order.total}`, 14, finalY);

  /* ===== Thank You Message ===== */

  doc.setFontSize(12);
  doc.setTextColor(0,0,0);

  doc.text(
    "Thank you for ordering from Creamantra! 🍨",
    105,
    finalY + 20,
    {align:"center"}
  );

  doc.text(
    "We hope to serve you again soon.",
    105,
    finalY + 28,
    {align:"center"}
  );

  /* ===== Download PDF ===== */

  doc.save("Creamantra-Invoice.pdf");
};