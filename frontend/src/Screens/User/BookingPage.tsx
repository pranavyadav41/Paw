import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookingService: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [typeOfService, setTypeOfService] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);
  const [timeSlot, setTimeSlot] = useState<string>("");
  const [showMap, setShowMap] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      name,
      phone,
      address,
      typeOfService,
      date,
      timeSlot,
    });
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/public/logo/pawBackground.jpg')",opacity:"0.4" }}
      ></div>
      <div className="relative flex flex-col md:flex-row w-full max-w-6xl md:mb-20">
        <div className="bg-[#9ad1aa] rounded-lg shadow-lg p-6 md:p-8 md:mr-8 md:w-2/3">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-green-700">
            Book a Service
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <div className="flex items-center space-x-2">
                <select
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1 block w-full p-2 border rounded-lg"
                  required
                >
                  <option value="">Select Address</option>
                  <option value="address1">Address 1</option>
                  <option value="address2">Address 2</option>
                </select>
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-md flex items-center"
                >
                  Add
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Type of Service</label>
              <input
                type="text"
                value={typeOfService}
                onChange={(e) => setTypeOfService(e.target.value)}
                className="mt-1 block w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <DatePicker
                selected={date}
                onChange={(date: Date | null) => setDate(date)}
                className="mt-1 block w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Preferred Time Slot</label>
              <input
                type="text"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="md:col-span-2 mt-4">
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setShowMap(!showMap)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  Mark Google Location
                </button>
              </div>
              {showMap && (
                <div className="mt-4 w-full">
                  {/* Replace this div with actual Google Maps integration */}
                  <div className="w-full h-64 bg-gray-200 flex justify-center items-center">
                    Google Maps Placeholder
                  </div>
                </div>
              )}
            </div>
            <div className="md:col-span-2 flex justify-center mt-4">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full"
              >
                Book Now
              </button>
            </div>
          </form>
        </div>
        <div className="md:w-1/3 md:ml-8 mt-8 md:mt-0 hidden md:block">
          <h3 className="text-xl font-bold mb-4">Why Choose Our Service?</h3>
          <p className="text-gray-700 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor
            euismod tellus, vel vulputate lacus bibendum sed.
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>Professional and experienced technicians</li>
            <li>Affordable pricing</li>
            <li>Convenient scheduling</li>
            <li>Satisfaction guaranteed</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookingService;
