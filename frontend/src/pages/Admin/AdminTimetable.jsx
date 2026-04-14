import React, { useState, useEffect } from "react";
const API = import.meta.env.VITE_API_URL;

const Timetable = () => {
  const [city, setCity] = useState("");
  const [file, setFile] = useState(null);
  const [timetables, setTimetables] = useState([]);

   fetch(`${API}/api/timetables`);
  // 🔹 Fetch all timetables
  const fetchTimetables = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTimetables(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTimetables();
  }, []);

  // 🔹 Upload (Add / Update)
  const handleUpload = async () => {
    if (!city || !file) {
      alert("Please select city and upload PDF");
      return;
    }

    try {
      await fetch(`${API_URL}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          city: city,
          fileName: file.name, // important: matches public folder file
        }),
      });

      fetchTimetables(); // refresh list

      setCity("");
      setFile(null);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Delete
  const handleDelete = async (cityName) => {
    try {
      await fetch(`${API_URL}/${cityName}`, {
        method: "DELETE",
      });

      fetchTimetables();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F9] p-6 md:p-10">
      
      {/* HEADER */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Update Bus Timetable (PDF)
      </h2>

      {/* UPLOAD SECTION */}
      <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-[#A32020]">
          Upload / Update Timetable PDF
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          
          <input
            type="text"
            placeholder="Enter City (e.g. Pune)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-[#A32020]"
          />

          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="p-2 border rounded-lg"
          />

          <button
            onClick={handleUpload}
            className="bg-[#A32020] text-white rounded-lg px-4 py-2 font-semibold hover:bg-red-700"
          >
            Upload PDF
          </button>

        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
        <h3 className="text-xl font-semibold mb-4 text-[#A32020]">
          Available Timetables
        </h3>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="py-3">City</th>
              <th>File</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {timetables.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-400">
                  No PDFs uploaded yet
                </td>
              </tr>
            ) : (
              timetables.map((t, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 font-medium">{t.city}</td>
                  <td>{t.fileName}</td>
                  <td>
                    {new Date(t.updatedAt).toLocaleString()}
                  </td>
                  <td className="flex gap-3 py-3">

                    {/* 🔥 IMPORTANT CHANGE HERE */}
                    <a
                      href={`/timetables/${t.fileName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </a>

                    <button
                      onClick={() => handleDelete(t.city)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Timetable;