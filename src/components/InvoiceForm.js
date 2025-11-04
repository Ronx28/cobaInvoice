import React, { useState } from "react";

const InvoiceForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    clientName: "",
    date: "",
    items: [{ description: "", quantity: 1, unitPrice: 0 }],
  });

  const handleChange = (e, index = null, field = null) => {
    if (index !== null) {
      const newItems = [...form.items];
      newItems[index][field] = e.target.value;
      setForm({ ...form, items: newItems });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const addItem = () => {
    setForm({
      ...form,
      items: [...form.items, { description: "", quantity: 1, unitPrice: 0 }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const total = form.items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );
    onSubmit({ ...form, total });
  };

  return (
    <form className="invoice-form" onSubmit={handleSubmit}>
      <h2>Invoice Form</h2>

      <label>Client Name</label>
      <input
        type="text"
        name="clientName"
        value={form.clientName}
        onChange={handleChange}
        required
      />

      <label>Date</label>
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
      />

      <h3>Items</h3>
      {form.items.map((item, index) => (
        <div className="item-row" key={index}>
          <input
            type="text"
            placeholder="Description"
            value={item.description}
            onChange={(e) => handleChange(e, index, "description")}
            required
          />
          <input
            type="number"
            placeholder="Qty"
            value={item.quantity}
            onChange={(e) => handleChange(e, index, "quantity")}
            required
          />
          <input
            type="number"
            placeholder="Unit Price"
            value={item.unitPrice}
            onChange={(e) => handleChange(e, index, "unitPrice")}
            required
          />
        </div>
      ))}

      <button type="button" onClick={addItem} className="btn-secondary">
        + Add Item
      </button>
      <button type="submit" className="btn-primary">
        Preview Invoice
      </button>
    </form>
  );
};

export default InvoiceForm;
