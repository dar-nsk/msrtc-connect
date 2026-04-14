import { FaCar, FaMoneyBillWave, FaSuitcase } from "react-icons/fa";

function BusTypes() {
  return (
    <section className="py-16 text-center bg-gradient-to-b from-white to-orange-50">

      {/* Heading */}
      <h2 className="text-4xl font-bold mb-2">Our Bus Types</h2>
      <p className="text-gray-500 mb-12">
        MSRTC offers a variety of bus types for your travel needs.
      </p>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8 px-10">

        {/* Card 1 */}
        <div className="bg-white rounded-2xl shadow-lg p-4 hover:scale-105 transition duration-300">
          <img
            src="/images/ordinary.jpg"
            className="w-full h-56 object-cover rounded-xl"
          />
          <h3 className="text-xl font-bold mt-4">Ordinary</h3>

          <div className="flex items-center justify-center gap-2 mt-4 bg-gray-100 rounded-full py-2 px-4 w-fit mx-auto">
            <FaMoneyBillWave className="text-yellow-500" />
            <span>Budget</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl shadow-lg p-4 hover:scale-105 transition duration-300">
          <img
            src="/images/shivshahi.jpg"
            className="w-full h-56 object-cover rounded-xl"
          />
          <h3 className="text-xl font-bold mt-4">Shivshahi</h3>

          <div className="flex items-center justify-center gap-2 mt-4 bg-gray-100 rounded-full py-2 px-4 w-fit mx-auto">
            <FaCar className="text-red-500" />
            <span>Luxury</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl shadow-lg p-4 hover:scale-105 transition duration-300">
          <img
            src="/images/hirakani.jpg"
            className="w-full h-56 object-cover rounded-xl"
          />
          <h3 className="text-xl font-bold mt-4">Hirakani</h3>

          <div className="flex items-center justify-center gap-2 mt-4 bg-gray-100 rounded-full py-2 px-4 w-fit mx-auto">
            <FaSuitcase className="text-green-500" />
            <span>Semi-Luxury</span>
          </div>
        </div>

      </div>

      {/* Button */}
      <button className="mt-12 bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full shadow-lg transition">
        View All Bus Types →
      </button>

    </section>
  );
}

export default BusTypes;