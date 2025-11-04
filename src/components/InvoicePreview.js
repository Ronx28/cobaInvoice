import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../assets/MMT.png";

const InvoicePreview = ({ invoiceData, onBack }) => {
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Logo kiri atas
    doc.addImage(logo, "PNG", 15, 10, 25, 25);

    // Judul tengah
    doc.setFontSize(20);
    doc.text("INVOICE", 105, 25, { align: "center" });

    // Info dasar
    doc.setFontSize(11);
    doc.text(`Client: ${invoiceData.clientName}`, 15, 45);
    doc.text(`Date: ${invoiceData.date}`, 15, 52);

    // Table
    const tableColumn = ["Description", "Quantity", "Unit Price", "Total"];
    const tableRows = invoiceData.items.map((item) => [
      item.description,
      item.quantity,
      `Rp ${item.unitPrice.toLocaleString("id-ID")}`,
      `Rp ${(item.quantity * item.unitPrice).toLocaleString("id-ID")}`,
    ]);
    tableRows.push(["", "", "Total", `Rp ${invoiceData.total.toLocaleString("id-ID")}`]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 70,
      headStyles: { fillColor: [40, 116, 166] },
      styles: { fontSize: 10, halign: "center" },
    });

    doc.save(`Invoice_${invoiceData.clientName || "MMT"}.pdf`);
  };

  return (
    <div className="invoice-preview">
      <div className="invoice-header">
        <img src={logo} alt="Logo" className="invoice-logo" />
        <h2>Invoice Preview</h2>
      </div>

      <p><strong>Client:</strong> {invoiceData.clientName}</p>
      <p><strong>Date:</strong> {invoiceData.date}</p>

      <table className="preview-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item, index) => (
            <tr key={index}>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>Rp {item.unitPrice.toLocaleString("id-ID")}</td>
              <td>Rp {(item.quantity * item.unitPrice).toLocaleString("id-ID")}</td>
            </tr>
          ))}
          <tr className="total-row">
            <td colSpan="3"><strong>Total</strong></td>
            <td><strong>Rp {invoiceData.total.toLocaleString("id-ID")}</strong></td>
          </tr>
        </tbody>
      </table>

      <div className="button-group">
        <button className="btn-secondary" onClick={onBack}>
          ← Back
        </button>
        <button className="btn-primary" onClick={downloadPDF}>
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default InvoicePreview;
