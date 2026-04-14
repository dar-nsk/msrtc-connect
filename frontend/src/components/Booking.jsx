import React, { useState } from "react";
import { useEffect } from "react";
import bus from "../assets/bus.png";
import jsPDF from "jspdf";
const user = JSON.parse(localStorage.getItem("user"));
const API = import.meta.env.VITE_API_URL;



const Booking = () => {

  const user = JSON.parse(localStorage.getItem("user"));
  const [form, setForm] = useState({
    from: "",
    to: "",
    date: "",
    gender: "Male",
    age: "",
    disabled: false,
  });

  const [buses, setBuses] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const [pricing, setPricing] = useState([]);

  const [bookingStatus, setBookingStatus] = useState({});
const [tickets, setTickets] = useState({});

useEffect(() => {
    fetchPricing();
  }, []);



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ?  checked : name === "age"
        ? Number(value): value,
    });
  };


const generateReceipt = (ticket) => {
  if (!ticket) {
    alert("No ticket found ❌");
    return;
  }

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("MSRTC Ticket Receipt", 20, 20);

  doc.setFontSize(12);
  doc.text(`Name: ${ticket.userName}`, 20, 40);
  doc.text(`From: ${ticket.source}`, 20, 50);
  doc.text(`To: ${ticket.destination}`, 20, 60);
  doc.text(`Date: ${ticket.date}`, 20, 70);
  doc.text(`Seats: ${ticket.seatsBooked}`, 20, 80);
  doc.text(`Total Paid: ₹${ticket.totalPrice}`, 20, 90);
  doc.text(`Status: ${ticket.status}`, 20, 100);

  doc.save("MSRTC_Receipt.pdf");
};

  const [ticket, setTicket] = useState(null);

  const handleBooking = async (busId) => {
  try {
    const res = await fetch(`${API}/api/bookings/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user?._id || "Guest",
        userName: user?.name,
        busId,
        seats: 1,
        gender: form.gender,
        age: Number(form.age),
        isDisabled: form.disabled,
        price: getPrice(buses.find(b => b._id === busId))
      }),
    });

    const data = await res.json();

    // ✅ HANDLE ERROR FIRST
    if (!res.ok) {
      alert(data.message || "Booking failed ❌");
      console.log(data);
      return;
    }

    // 🟢 FREE TICKET
    if (data.booking && data.booking.totalPrice === 0) {
      setBookingStatus((prev) => ({
      ...prev,
      [busId]: "paid",
    }));

    setTickets((prev) => ({
      ...prev,
      [busId]: {
        ...data.booking,
        status: "SUCCESS",
      },
    }));
      alert("Free ticket booked 🎉");
      return;
    }

    // 💳 CREATE ORDER
    const orderRes = await fetch(`${API}/api/bookings/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: data.booking.totalPrice,
      }),
    });

    const orderData = await orderRes.json();

    // 💥 OPEN RAZORPAY
    const options = {
  key: "rzp_test_SXMNfgtI9F2cIj",
  amount: orderData.amount,
  currency: "INR",
  order_id: orderData.id,
  name: "MSRTC Booking",
  description: "Bus Ticket Payment",

  handler: async function (response) {
    alert("Payment Successful ✅");

    // ✅ Update UI
    setBookingStatus((prev) => ({
      ...prev,
      [busId]: "paid",
    }));

    setTickets((prev) => ({
      ...prev,
      [busId]: {
        ...data.booking,
        status: "SUCCESS",
      },
    }));

    // ✅ SEND EMAIL (🔥 CORRECT PLACE)
    try {
      await fetch(`${API}/api/bookings/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: user.email,
          userName: user?.name,
          booking: data.booking,
        }),
      });

      console.log("Email sent ✅");

    } catch (err) {
      console.error("Email error:", err);
    }
  },

  theme: {
    color: "#3399cc",
  },

  method: {
    upi: true,
    card: true,
    netbanking: true,
    wallet: true,
  },
};

const rzp = new window.Razorpay(options);
rzp.open();

  } catch (error) {
    console.error("Error:", error);
  }
};

  // 🔥 FETCH FROM BACKEND
  const handleSearch = async () => {
    if (!form.from || !form.to || !form.date) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(`${API}/api/bus/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: form.from,
          destination: form.to,
          busType: "All",
        }),
      });

      const data = await res.json();
      setBuses(data);
      setShowResults(true);

    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  };

  const fetchPricing = async () => {
  try {
    const res = await fetch(`${API}/api/pricing`);
    const data = await res.json();
    setPricing(data);
  } catch (err) {
    console.error("Error fetching pricing:", err);
  }
};

  const getPrice = (busItem) => {
  const match = pricing.find(
    (p) =>
      p.source === busItem.source &&
      p.destination === busItem.destination &&
      p.type === busItem.type
  );

  let price = match ? match.price : 0;

  // 🎯 Apply your conditions
  if (form.disabled) return 0;
  if (form.age > 60) return 0;
  if (form.gender === "Female") return price * 0.5;

  return price;
};

  return (
    <div className="min-h-screen bg-gray-100 pb-24">

      {/* HEADER */}
      <div className="bg-red-600 text-white p-4 text-xl font-bold text-center shadow">
        MSRTC Online Booking 🚍
      </div>

      {/* SEARCH CARD */}
      <div className="max-w-4xl mx-auto bg-white p-6 mt-6 rounded-2xl shadow-lg">
        
        <h2 className="text-lg font-semibold mb-4">Plan Your Journey</h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="from"
            placeholder="From"
            className="p-3 border rounded-lg"
            onChange={handleChange}
          />
          <input
            type="text"
            name="to"
            placeholder="To"
            className="p-3 border rounded-lg"
            onChange={handleChange}
          />
        </div>

        <input
          type="date"
          name="date"
          className="p-3 border rounded-lg w-full mt-4"
          onChange={handleChange}
        />

        {/* FILTERS */}
        <div className="mt-4 grid grid-cols-3 gap-4">
          
          <select
            name="gender"
            className="p-2 border rounded-lg"
            onChange={handleChange}
          >
            <option>Male</option>
            <option>Female</option>
          </select>

          <input
            type="number"
            name="age"
            placeholder="Age"
            className="p-2 border rounded-lg"
            onChange={handleChange}
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="disabled"
              onChange={handleChange}
            />
            Disabled
          </label>
        </div>

        <button
          onClick={handleSearch}
          className="mt-5 w-full bg-red-600 text-white p-3 rounded-xl hover:bg-red-700 transition"
        >
          Search Buses
        </button>
      </div>

      {/* MESSAGE BEFORE SEARCH */}
      {!showResults && (
        <p className="text-center mt-6 text-gray-500">
          Please search for buses to see available options 🚍
        </p>
      )}

      {/* RESULTS */}
      {showResults && (
        <div className="max-w-4xl mx-auto mt-6 space-y-4">

          {buses.length === 0 ? (
            <p className="text-center text-red-500">
              No buses found for this route ❌
            </p>
          ) : (
            buses.map((busItem) => (
            <div
              key={busItem._id}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
            >
              
              {/* LEFT SIDE - BUS DETAILS */}
              <div className="text-left">
                <h3 className="font-bold text-black text-lg">
                  {busItem.busName}
                </h3>
                <p className="text-gray-700">
                  {busItem.source} → {busItem.destination}
                </p>
                <p className="text-sm text-gray-500">
                  {busItem.departureTime} - {busItem.arrivalTime}
                </p>
              </div>

              {/* RIGHT SIDE - PRICE + BUTTONS */}
              <div className="text-right">
                <p className="text-lg font-bold text-green-600">
                  ₹{getPrice(busItem)}
                </p>

                {/* BOOK BUTTON */}
                <button
                onClick={() => handleBooking(busItem._id)}
                disabled={bookingStatus[busItem._id] === "paid"}
                className={`px-4 py-2 rounded mt-2 text-white ${
                  bookingStatus[busItem._id] === "paid"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600"
                }`}
              >
                {bookingStatus[busItem._id] === "paid" ? "Booked" : "Book"}
              </button>

                {/* RECEIPT BUTTON */}
                <button
                onClick={() => generateReceipt(tickets[busItem._id])}
                disabled={bookingStatus[busItem._id] !== "paid"}
                className={`px-4 py-2 rounded mt-2 ml-2 text-white ${
                  bookingStatus[busItem._id] === "paid"
                    ? "bg-green-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Receipt
              </button>
              </div>

            </div>
          ))
          )}

        </div>
      )}


      {/* BUS ANIMATION */}
      {!ticket && (

      <div className="w-full h-20 overflow-hidden bg-gray-200 mt-10">
        <img src={bus} alt="bus" className="animate-bus h-16" />
      </div>
      )}

    </div>
  );
};

export default Booking;