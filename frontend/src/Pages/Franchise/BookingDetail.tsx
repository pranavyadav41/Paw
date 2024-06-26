import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { fetchBooking, changeStatus, getService } from "../../api/franchise";
import { FaCheckCircle, FaTimesCircle} from "react-icons/fa";
import { motion } from "framer-motion";

Modal.setAppElement("#root");

interface Address {
  houseName: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  location: [number, number];
}

interface Booking {
  _id: string;
  name: string;
  phone: string;
  franchiseId: string;
  bookingDate: Date;
  scheduledDate: Date;
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
      getService(booking.serviceId).then((response) =>
        setService(response?.data)
      );
    }
  }, [booking]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full"
        ></motion.div>
      </div>
    );
  }

  const convertTo12HourFormat = (time: string) => {
    const [hour, minute] = time.split(":").map(Number);
    const period = hour >= 12 ? "PM" : "AM";
    const adjustedHour = hour % 12 || 12;
    return `${adjustedHour}:${minute < 10 ? "0" + minute : minute} ${period}`;
  };

  const handleStatusChange = async () => {
    const response = await changeStatus(booking._id, newStatus);
    toast.success(response?.data.message, { position: "top-center" });
    setState(true);
  };

  return (
    <motion.div
      className="relative container mx-auto p-6 min-h-screen w-full flex flex-col items-center bg-gradient-to-br from-blue-50 to-purple-100"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 z-0"
        style={{ backgroundImage: "url('/logo/pawBackground.jpg')" }}
      ></div>
      <motion.h2
        className="text-4xl font-bold mb-8 text-center z-10 text-[#3968B6]"
        variants={itemVariants}
      >
        Booking Details
      </motion.h2>
      <motion.div
        className="relative z-10 bg-white shadow-xl rounded-lg p-8 md:w-[80%] w-full md:h-auto grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <div className="flex flex-col space-y-4">
            <motion.p className="text-gray-800" variants={itemVariants}>
              <strong>Name:</strong> {booking.name}
            </motion.p>
            <motion.p className="text-gray-800" variants={itemVariants}>
              <strong>Phone:</strong> {booking.phone}
            </motion.p>
            <motion.p className="text-gray-800" variants={itemVariants}>
              <strong>Booking Date:</strong>{" "}
              {new Date(booking.bookingDate).toLocaleDateString()}
            </motion.p>
            <motion.p className="text-gray-800" variants={itemVariants}>
              <strong>Scheduled Date:</strong>{" "}
              {new Date(booking.scheduledDate).toLocaleDateString()}
            </motion.p>
            <motion.p className="text-gray-800" variants={itemVariants}>
              <strong>Slot:</strong> {convertTo12HourFormat(booking.startTime)}{" "}
              - {convertTo12HourFormat(booking.endTime)}
            </motion.p>
            <motion.p className="text-gray-800 flex items-center gap-1" variants={itemVariants}>
              <strong>Booking Status:</strong> {booking.bookingStatus}
              {booking.bookingStatus === "Completed" ? (
                <FaCheckCircle className="text-green-500" />
              ) : (
                <FaTimesCircle className="text-red-500" />
              )}
            </motion.p>

            <motion.p className="text-gray-800" variants={itemVariants}>
              <strong>Address:</strong>
              <br />
              {booking.address.houseName}, {booking.address.area}
              <br />
              {booking.address.city}, {booking.address.state}
              <br />
              {booking.address.pincode}
            </motion.p>
          </div>

          {booking.bookingStatus === "Pending" && (
            <motion.div
              className="mt-6 flex items-center space-x-4"
              variants={itemVariants}
            >
              <label htmlFor="status" className="text-gray-800">
                <strong>Change Status:</strong>
              </label>
              <select
                id="status"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <motion.button
                className="bg-[#3968B6] text-white text-sm md:text-base px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                onClick={handleStatusChange}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Update Status
              </motion.button>
            </motion.div>
          )}
        </motion.div>
        {service && (
          <motion.div className="flex flex-col gap-3" variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-4">Service Details</h3>
            <motion.p className="text-gray-800" variants={itemVariants}>
              <strong>Category:</strong> {service.category}
            </motion.p>
            <motion.p className="text-gray-800" variants={itemVariants}>
              <strong>Price:</strong> ₹{service.price[booking.sizeOfPet]}
            </motion.p>
            <motion.div
              className="grid grid-cols-2 gap-4 mt-4"
              variants={containerVariants}
            >
              {service.services.map((serviceName, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-100 rounded-md p-3 flex items-center justify-center shadow-md"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, backgroundColor: "#f0f0f0" }}
                >
                  <span className="text-gray-800">{serviceName}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default BookingDetails;