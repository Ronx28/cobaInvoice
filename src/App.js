import React, { useState } from "react";
import InvoiceForm from "./components/InvoiceForm";
import InvoicePreview from "./components/InvoicePreview";
import "./components/Invoice.css";

function App() {
  const [invoiceData, setInvoiceData] = useState(null);

  const handleFormSubmit = (data) => {
    setInvoiceData(data);
  };

  return (
    <div className="app-container">
      {!invoiceData ? (
        <InvoiceForm onSubmit={handleFormSubmit} />
      ) : (
        <InvoicePreview invoiceData={invoiceData} onBack={() => setInvoiceData(null)} />
      )}
    </div>
  );
}

export default App;
