import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { fetchBooking, changeStatus, getService } from "../../api/franchise";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import GetDirection from "../../Components/common/getDirection";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

Modal.setAppElement("#root");

interface Address {
  houseName: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  location: [longitude: number, latitude: number];
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [franchiseLocation, setFranchiseLocation] = useState({
    longitude: 0,
    latitude: 0,
  });
  const [userLocation, setUserLocation] = useState({
    longitude: 0,
    latitude: 0,
  });

  console.log("parent",franchiseLocation,userLocation)

  let { franchiseInfo } = useSelector(
    (state: RootState) => state.franchiseAuth
  );

  useEffect(() => {
    if (franchiseInfo && booking) {
      setFranchiseLocation({
        longitude: franchiseInfo.location.coordinates[0],
        latitude: franchiseInfo.location.coordinates[1],
      });
      setUserLocation({
        longitude: booking.address.location[0],
        latitude: booking.address.location[1],
      });
    }
  }, [franchiseInfo, booking]);

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative container mx-auto p-6 min-h-screen w-full flex flex-col items-center ">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50 z-0"
        style={{ backgroundImage: "url('/logo/pawBackground.jpg')" }}
      ></div>
      <h2 className="text-3xl font-bold mb-6 text-center z-10 text-[#3968B6]">
        Booking Details
      </h2>
      <div className="relative z-10 bg-gray-100 shadow-md rounded-lg p-6 md:w-[80%] w-full md:h-[500px]   grid grid-cols-1 md:grid-cols-2 gap-8">
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
              <strong>Scheduled Date:</strong>{" "}
              {new Date(booking.scheduledDate).toLocaleDateString()}
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
          <button
            className="rounded-md mt-2 text-blue-600 flex items-center gap-2"
            onClick={openModal}
          >
            <FaMapLocationDot />
            Get direction
          </button>
          {booking.bookingStatus === "Pending" && (
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
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <button
                className="bg-[#9AD1AA] text-white text-sm md:text-base px-3 py-1 rounded-md hover:bg-green-300"
                onClick={handleStatusChange}
              >
                Update Status
              </button>
            </div>
          )}
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
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Get Direction Modal"
          className="h-[full] md:w-[30%] w-[95%] bg-white rounded-lg shadow-lg mx-auto my-8 outline-none"
          style={{
            overlay: {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              zIndex: 1000,
            },
            content: {
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              outline: "none",
              zIndex: 1001,
              maxHeight: "80vh",
              overflowY: "auto",
            },
          }}
        >
          <div style={{ height: "60%" }}>
            
           <GetDirection
              userLocation={userLocation}
              providerLocation={franchiseLocation}
            />
          </div>
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-red-600 text-lg"
          >
            &times;
          </button>
        </Modal>
      </div>
    </div>
  );
};

export default BookingDetails;
