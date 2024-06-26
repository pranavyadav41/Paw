import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import { motion } from "framer-motion";
import {
  fetchBooking,
  getService,
  getFranchise,
  checkDate,
  confirmCancel,
  submitFeedback,
  checkFeedback,
} from "../../api/user";
import { FaCheckCircle, FaTimesCircle, FaCommentAlt } from "react-icons/fa";
import { FcClock } from "react-icons/fc";
import { toast } from "react-toastify";
import ReviewComponent from "../../Components/user/feedback";
import Chat from "../../Components/user/Chat";

Modal.setAppElement("#root");

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
  scheduledDate: string;
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

interface Franchise {
  name: string;
  phone: string;
  email: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  openingTime: string;
  closingTime: string;
}

const BookingDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<Booking>();
  const [service, setService] = useState<Service>();
  const [franchise, setFranchise] = useState<Franchise>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sameDate, setSameDate] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [reviewCheck, setReviewCheck] = useState(false);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    if (id) {
      fetchBooking(id).then((response) => {
        setBooking(response?.data);
      });
    }
  }, [id, shouldFetch]);

  useEffect(() => {
    if (booking?.serviceId) {
      getService(booking.serviceId).then((response) => {
        setService(response?.data);
      });
    }

    if (booking?.franchiseId) {
      getFranchise(booking.franchiseId).then((response) => {
        setFranchise(response?.data);
      });
      checkFeedback(booking.userId, booking.serviceId).then((response) => {
        setReviewCheck(response?.data);
      });
    }
  }, [booking?.serviceId, booking?.franchiseId, shouldFetch]);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };
 
  const slideIn = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="text-2xl text-blue-600 font-semibold"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  const convertTo12HourFormat = (time: string) => {
    const [hour, minute] = time.split(":").map(Number);
    const period = hour >= 12 ? "PM" : "AM";
    const adjustedHour = hour % 12 || 12;
    return `${adjustedHour}:${minute < 10 ? "0" + minute : minute} ${period}`;
  };

  const handleCancel = () => {
    const currentDate = new Date();

    checkDate(booking._id, currentDate).then((response) => {
      setSameDate(response?.data);
      setIsModalOpen(true);
    });
  };

  const ConfirmCancel = () => {
    confirmCancel(
      booking._id,
      booking.userId,
      booking.totalAmount,
      sameDate
    ).then((response) => {
      toast.success(response?.data.message, {
        position: "top-center",
      });
      setIsModalOpen(false);
    });
    setShouldFetch((prev) => !prev);
  };

  const handleFeedback = async (data: {
    serviceRating: number;
    review: string;
    images: File[];
  }) => {
    const formData = new FormData();
    formData.append("serviceRating", data.serviceRating.toString());
    formData.append("review", data.review);
    data.images.forEach((image) => {
      formData.append("images", image, image.name);
    });
    formData.append("name", booking.name);
    formData.append("serviceId", booking.serviceId);
    formData.append("userId", booking.userId);

    const response = await submitFeedback(formData);
    if (response) {
      toast.success(response?.data.message, {
        position: "top-center",
      });
      setShouldFetch((prev) => !prev);
    }
  };

  return (
    <div className="relative container mx-auto py-8 min-h-screen w-full flex flex-col items-center bg-gradient-to-br from-blue-50 to-purple-100">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url('/logo/pawBackground.jpg')" }}
      />
      <motion.h2
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="lg:text-3xl text-2xl font-bold mb-8 text-center text-[#3968B6] z-10"
      >
        Booking Details
      </motion.h2>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={slideIn}
        className="relative bg-white shadow-2xl rounded-lg p-8 w-[95%] md:w-[85%] lg:w-[75%]"
      >
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <motion.div
            variants={fadeIn}
            className="flex flex-col space-y-4 md:col-span-2"
          >
            <div className="flex items-center space-x-2">
              <p className="text-gray-600">
                <strong className="text-gray-800">Name:</strong> {booking.name}
              </p>
            </div>
            <p className="text-gray-600">
              <strong className="text-gray-800">Phone:</strong> {booking.phone}
            </p>
            <p className="text-gray-600">
              <strong className="text-gray-800">Booked On:</strong>{" "}
              {new Date(booking.bookingDate).toLocaleDateString()}
            </p>
            <p className="text-gray-600">
              <strong className="text-gray-800">Scheduled On:</strong>{" "}
              {new Date(booking.scheduledDate).toLocaleDateString()}
            </p>
            <p className="text-gray-600">
              <strong className="text-gray-800">Slot:</strong>{" "}
              {convertTo12HourFormat(booking.startTime)} -{" "}
              {convertTo12HourFormat(booking.endTime)}
            </p>
            <p className="text-gray-800">
              <strong className="text-gray-800">Total: </strong>₹
              {booking.totalAmount}
            </p>
            <div className="flex items-center space-x-1">
              <p className="text-gray-800">
                <strong className="text-gray-800">Status: </strong>
                {booking.bookingStatus}
              </p>
              {booking.bookingStatus === "Completed" ? (
                <FaCheckCircle className="text-green-500" />
              ) : booking.bookingStatus === "Pending" ? (
                <FcClock className="text-black" />
              ) : (
                <FaTimesCircle className="text-red-500" />
              )}
            </div>
            <div className="text-gray-600">
              <strong className="text-gray-800">Address:</strong>
              <p>
                {booking.address.houseName}, {booking.address.area}
              </p>
              <p>
                {booking.address.city}, {booking.address.state}
              </p>
              <p>{booking.address.pincode}</p>
            </div>
          </motion.div>
          {service && (
            <motion.div
              variants={fadeIn}
              className="md:col-span-1 flex flex-col space-y-6 bg-gray-100 p-6 lg:w-[500px] rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-bold text-gray-800 border-b pb-2">
                Service Details
              </h3>
              <p className="text-gray-600">
                <strong className="text-gray-800">Category:</strong>{" "}
                {service.category}
              </p>
              <div>
                <p className="text-gray-600 mb-2">
                  <strong className="text-gray-800">Services:</strong>
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  {service.services.map((serviceItem, index) => (
                    <div
                      key={index}
                      className="bg-white p-2 rounded-md text-gray-600 shadow"
                    >
                      {serviceItem}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
        {franchise && (
          <motion.div
            variants={fadeIn}
            className="flex flex-col lg:flex-row gap-6 items-center mt-8"
          >
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Franchise Details
              </h3>
              <p className="text-gray-600">
                <strong className="text-gray-800">Phone:</strong>{" "}
                <a
                  href={`tel:${franchise.phone}`}
                  className="text-blue-600 hover:underline"
                >
                  {franchise.phone}
                </a>
              </p>
            </div>
            <div className="flex space-x-4">
              {booking.bookingStatus === "Pending" && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors duration-300 shadow-md"
                  onClick={handleCancel}
                >
                  Cancel Booking
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-800 text-white px-6 py-2 rounded-md hover:bg-blue-600 flex items-center space-x-2 shadow-md"
                onClick={() => setShowChat(!showChat)}
              >
                <FaCommentAlt />
                <span>Chat with Us</span>
              </motion.button>
            </div>
          </motion.div>
        )}
        {booking.bookingStatus === "Completed" && !reviewCheck && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <ReviewComponent onSubmit={handleFeedback} />
          </motion.div>
        )}
      </motion.div>

      {showChat && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="mt-8 w-full md:w-2/3 lg:w-1/2"
        >
          <Chat userId={booking.userId} franchiseId={booking.franchiseId} />
        </motion.div>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Cancel Booking Modal"
        className="relative w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto my-24 bg-white rounded-lg shadow-xl p-8"
        overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50"
      >
        <h2 className="text-2xl font-bold mb-6">Cancel Booking</h2>
        {sameDate ? (
          <p className="text-gray-700 mb-4">
            If you cancel the booking on the same day it is scheduled, a 15% fee
            will be deducted from the total amount, and the remaining amount
            will be credited to your account.
          </p>
        ) : (
          <p className="text-gray-700 mb-4">
            Are you sure you want to cancel this booking?
          </p>
        )}
        <div className="flex justify-end space-x-4 mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500 transition-colors duration-300"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
            onClick={ConfirmCancel}
          >
            Confirm Cancel
          </motion.button>
        </div>
      </Modal>
    </div>
  );
};

export default BookingDetails;
