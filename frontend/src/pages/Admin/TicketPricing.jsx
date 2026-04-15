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

  

  const fetchPricing = async () => {
    const res = await fetch(`${API}/api/pricing`);
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
    await fetch(`${API}/api/pricing/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    fetchPricing();
  };

  const handleDelete = async (id) => {
    await fetch(`${API}/api/pricing/${id}`, { method: "DELETE" });
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
      <table className="w-full border border-gray-300 border-collapse">
  <thead className="bg-gray-100">
    <tr>
      <th className="border p-2 text-left">Source</th>
      <th className="border p-2 text-left">Destination</th>
      <th className="border p-2 text-left">Type</th>
      <th className="border p-2 text-left">Price</th>
      <th className="border p-2 text-left">Action</th>
    </tr>
  </thead>

  <tbody>
    {pricing.map((p) => (
      <tr key={p._id} className="hover:bg-gray-50">
        <td className="border p-2">{p.source}</td>
        <td className="border p-2">{p.destination}</td>
        <td className="border p-2">{p.type}</td>
        <td className="border p-2">₹{p.price}</td>
        <td className="border p-2">
          <button
            onClick={() => handleDelete(p._id)}
            className="text-red-500 hover:underline"
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