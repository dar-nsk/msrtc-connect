import React, { useState, useEffect } from "react";
const API = import.meta.env.VITE_API_URL;

const TicketPricing = () => {
  const [form, setForm] = useState({
    source: "",
    destination: "",
    type: "",
    price: "",
  });

  const [pricing, setPricing] = useState([]);

  fetch(`${API}/api/pricing`);

  const fetchPricing = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setPricing(data);
  };

  useEffect(() => {
    fetchPricing();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    await fetch(`${API}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    fetchPricing();
  };

  const handleDelete = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchPricing();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Ticket Pricing</h2>

      {/* FORM */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">

        <input name="source" placeholder="Source"
          onChange={handleChange} className="p-2 border" />

        <input name="destination" placeholder="Destination"
          onChange={handleChange} className="p-2 border" />

        <select name="type" onChange={handleChange} className="p-2 border">
          <option value="">Select Type</option>
          <option>Ordinary</option>
          <option>Shivshahi</option>
          <option>Hirakani</option>
        </select>

        <input name="price" placeholder="Price"
          onChange={handleChange} className="p-2 border" />

      </div>

      <button
        onClick={handleAdd}
        className="bg-red-600 text-white px-4 py-2 mb-6"
      >
        Add / Update Price
      </button>

      {/* TABLE */}
      <table className="w-full">
        <thead>
          <tr>
            <th>Source</th>
            <th>Destination</th>
            <th>Type</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {pricing.map((p) => (
            <tr key={p._id}>
              <td>{p.source}</td>
              <td>{p.destination}</td>
              <td>{p.type}</td>
              <td>₹{p.price}</td>
              <td>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketPricing;