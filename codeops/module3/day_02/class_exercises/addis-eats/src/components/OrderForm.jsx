import React, { useState } from 'react'

function OrderForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Summit",
  });

  function handleChange(e) {
    setForm(prevForm => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!/^\d{10}$/.test(form.phone)) {
      alert("Please enter a valid 10-digit phone number (e.g. 0912345678)");
      return;
    }

    alert(`🎉 Order successfully placed for ${form.name} in ${form.area}!`);
    setForm({ name: "", phone: "", area: "Summit" });
  }

  return (
    <section className="order-card">
      <h2>Place Your Order</h2>
      <form onSubmit={handleSubmit} className="order-form">
        <div className="form-field">
          <label htmlFor="customer-name">Full Name</label>
          <input
            id="customer-name"
            name="name"
            value={form.name}
            onChange={handleChange}
            type="text"
            placeholder="e.g. Bonsa Abebe"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="customer-phone">Phone Number</label>
          <input
            id="customer-phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            type="tel"
            placeholder="e.g. 0911223344 (10 digits)"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="customer-area">Delivery Area</label>
          <select id="customer-area" name="area" value={form.area} onChange={handleChange}>
            <option value="Bole">Bole</option>
            <option value="BoleMedhanialem">Bole Medhanialem</option>
            <option value="Akaki">Akaki</option>
            <option value="Gullele">Gullele</option>
            <option value="Piassa">Piassa</option>
            <option value="Summit">Summit</option>
          </select>
        </div>

        <button type="submit" className="submit-order-btn">
          Confirm & Submit Order
        </button>
      </form>
    </section>
  )
}

export default OrderForm
