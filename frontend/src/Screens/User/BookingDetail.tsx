import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import {
  fetchBooking,
  getService,
  getFranchise,
  checkDate,
} from "../../api/user";
import { FaCheckCircle, FaTimesCircle, FaCommentAlt } from "react-icons/fa";

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

  useEffect(() => {
    if (id) {
      fetchBooking(id).then((response) => {
        setBooking(response?.data);
      });
    }
  }, [id]);

  useEffect(() => {
    if (booking?.serviceId) {
      getService(booking.serviceId).then((response) => {
        setService(response?.data);
      });
    }

    if (booking?.franchiseId) {
      getFranchise(booking.franchiseId).then((response) => {
        console.log(response);
        setFranchise(response?.data);
      });
    }
  }, [booking?.serviceId, booking?.franchiseId]);

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

  const handleCancel = () => {
    const currentDate = new Date();

    checkDate(booking._id, currentDate).then((response) => {
      setSameDate(response?.data);
      setIsModalOpen(true);
    });
  };

  const confirmCancel = ()=>{

    

  }

  return (
    <div className="relative container mx-auto py-8 min-h-screen w-full  flex flex-col items-center">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: "url('/public/logo/pawBackground.jpg')" }}
      />
      <h2 className="lg:text-3xl text-xl font-semibold lg:font-bold mb-6 text-center text-[#3968B6] z-10">
        Booking Details
      </h2>
      <div className="relative bg-gray-100  rounded-lg p-8 w-[90%] md:w-[80%] lg:w-[70%]">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="flex flex-col space-y-4 md:col-span-2">
            <div className="flex items-center space-x-2">
              <p className="text-gray-600">
                <strong className="text-gray-800">Name:</strong> {booking.name}
              </p>
            </div>
            <p className="text-gray-600">
              <strong className="text-gray-800">Phone:</strong> {booking.phone}
            </p>
            <p className="text-gray-600">
              <strong className="text-gray-800">Booking Date:</strong>{" "}
              {new Date(booking.bookingDate).toLocaleDateString()}
            </p>
            <p className="text-gray-600">
              <strong className="text-gray-800">Slot:</strong>{" "}
              {convertTo12HourFormat(booking.startTime)} -{" "}
              {convertTo12HourFormat(booking.endTime)}
            </p>
            <p className="text-gray-800">
                <strong className="text-gray-800">Total: </strong>
                ₹{booking.totalAmount}
              </p>
            <div className="flex items-center space-x-1">
              <p className="text-gray-800">
                <strong className="text-gray-800">Status: </strong>
                {booking.bookingStatus}
              </p>
              {booking.bookingStatus === "Completed" ? (
                <FaCheckCircle className="text-green-500" />
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
          </div>
          {service && (
            <div className="md:col-span-1 flex flex-col space-y-6 bg-gray-200 p-4 lg:w-[500px] rounded-lg">
              <h3 className="text-xl font-bold text-gray-800">
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
            </div>
          )}
        </div>
        {franchise && (
          <div className="flex flex-col lg:flex-row gap-3 items-center">
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Franchise Details
              </h3>
              <p className="text-gray-600">
                <strong className="text-gray-800">Phone:</strong>{" "}
                {franchise.phone}
              </p>
              <div className="flex justify-start mt-4">
                <button className="bg-blue-800 text-white px-6 py-1 md:py-2 rounded-md hover:bg-blue-600 flex items-center space-x-2">
                  <FaCommentAlt />
                  <span>Chat with Us</span>
                </button>
              </div>
            </div>
            <div className="md:mr-36 md:mt-28">
              {booking.bookingStatus !== "Completed" && (
                <button
                  className="bg-red-500 text-white px-6 py-1  md:py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
                  onClick={handleCancel}
                >
                  Cancel Booking
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Cancel Booking Modal"
        className="relative md:w-1/3 mx-auto my-24 bg-white rounded-lg shadow-lg p-6"
        overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-40"
      >
        <h2 className="text-xl font-bold mb-4">Cancel Booking</h2>
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
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </button>
          <button
            className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500"
            onClick={() => ""}
          >
            Confirm Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default BookingDetails;
