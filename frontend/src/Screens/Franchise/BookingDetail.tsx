import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { fetchBooking, changeStatus, getService } from "../../api/franchise";
import { FaCheckCircle, FaTimesCircle} from "react-icons/fa";

Modal.setAppElement("#root"); // Ensure to set the app element for accessibility

interface Address {
  houseName: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
}

interface Booking {
  _id: string;
  name: string;
  phone: string;
  franchiseId: string;
  bookingDate: Date;
  startTime: string;
  endTime: string;
  userId: string;
  address: Address;
  serviceId: string;
  sizeOfPet: "small" | "medium" | "large" | "xLarge";
  bookingStatus: string;
  totalAmount: string;
}

interface Service {
  category: string;
  price: {
    small: string;
    medium: string;
    large: string;
    xLarge: string;
  };
  services: string[];
  _id: string;
}

const BookingDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState(false);
  const [booking, setBooking] = useState<Booking>();
  const [service, setService] = useState<Service>();
  const [newStatus, setNewStatus] = useState<string>("");

  useEffect(() => {
    if (id) {
      fetchBooking(id).then((response) => {
        console.log(response);
        setBooking(response?.data);
      });
    }
    setState(false);
  }, [id, state]);

  useEffect(() => {
    if (booking) {
      getService(booking.serviceId).then((response) => setService(response?.data));
    }
  }, [booking]);

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const convertTo12HourFormat = (time: string) => {
    const [hour, minute] = time.split(":").map(Number);
    const period = hour >= 12 ? "PM" : "AM";
    const adjustedHour = hour % 12 || 12; // Convert "0" hour to "12"
    return `${adjustedHour}:${minute < 10 ? "0" + minute : minute} ${period}`;
  };

  const handleStatusChange = async () => {
    const response = await changeStatus(booking._id, newStatus);

    toast.success(response?.data.message, { position: "top-center" });
    setState(true);
  };

  return (
    <div className="relative container mx-auto p-6 min-h-screen w-full flex flex-col items-center">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50 z-0"
        style={{ backgroundImage: "url('/logo/pawBackground.jpg')" }}
      ></div>
      <h2 className="text-3xl font-bold mb-6 text-center z-10 text-[#3968B6]">
        Booking Details
      </h2>
      <div className="relative z-10 bg-gray-100 shadow-md rounded-lg p-6 md:w-[80%] w-full  grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="flex flex-col space-y-4">
            <p className="text-gray-800">
              <strong>Name:</strong> {booking.name}
            </p>
            <p className="text-gray-800">
              <strong>Phone:</strong> {booking.phone}
            </p>
            <p className="text-gray-800">
              <strong>Booking Date:</strong>{" "}
              {new Date(booking.bookingDate).toLocaleDateString()}
            </p>
            <p className="text-gray-800">
              <strong>Slot:</strong> {convertTo12HourFormat(booking.startTime)}{" "}
              - {convertTo12HourFormat(booking.endTime)}
            </p>
            <p className="text-gray-800 flex items-center gap-1">
              <strong>Booking Status:</strong> {booking.bookingStatus}
              {booking.bookingStatus === "Completed" ? (
                <FaCheckCircle className="text-green-500" />
              ) : (
                <FaTimesCircle className="text-red-500" />
              )}
            </p>
           
            <p className="text-gray-800">
              <strong>Address:</strong>
              <br />
              {booking.address.houseName}, {booking.address.area}
              <br />
              {booking.address.city}, {booking.address.state}
              <br />
              {booking.address.pincode}
            </p>
          </div>
          <div className="mt-6 flex items-center space-x-4">
            <label htmlFor="status" className="text-gray-800">
              <strong>Change Status:</strong>
            </label>
            <select
              id="status"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="border border-gray-300 rounded-sm px-4 py-1"
            >
              <option value="">Select</option>
              {booking.bookingStatus === "Pending" && (
                <option value="Completed">Completed</option>
              )}
              {booking.bookingStatus === "Completed" && (
                <option value="Pending">Pending</option>
              )}
            </select>
            <button
              className="bg-blue-800 text-white text-sm md:text-base px-3 py-1 rounded-md hover:bg-blue-600"
              onClick={handleStatusChange}
            >
              Update Status
            </button>
          </div>
        </div>
        {service && (
          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-bold mb-4">Service Details</h3>
            <p className="text-gray-800">
              <strong>Category:</strong> {service.category}
            </p>
            <p className="text-gray-800">
              <strong>Price:</strong> ₹{service.price[booking.sizeOfPet]}
            </p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {service.services.map((serviceName, index) => (
                <div
                  key={index}
                  className="bg-gray-200 rounded-md p-2 flex items-center justify-center"
                >
                  <span className="text-gray-800">{serviceName}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingDetails;