import { useEffect, useState } from "react";
import { getBookings, getService } from "../../api/user";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";

const MyBookings = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [bookings, setBookings] = useState<any>([]);
  const [services, setServices] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (userInfo) {
      getBookings(userInfo._id)
        .then((response) => setBookings(response?.data))
        .catch((error) => console.error("Error fetching bookings:", error));
    }
  }, [userInfo]);
 
  useEffect(() => {
    if (bookings.length > 0) {
      bookings.forEach((booking: any) => {
        getService(booking.serviceId)
          .then((response) => {
            setServices((prevServices) => ({
              ...prevServices,
              [booking.serviceId]: response?.data.category,
            })); 
          })
          .catch((error) =>
            console.error(`Error fetching service ${booking.serviceId}:`, error)
          );
      });
    }
  }, [bookings]);

  const convertTo12HourFormat = (time: string) => {
    const [hour, minute] = time.split(":").map(Number);
    const period = hour >= 12 ? "PM" : "AM";
    const adjustedHour = hour % 12 || 12; // Convert "0" hour to "12"
    return `${adjustedHour}:${minute < 10 ? "0" + minute : minute} ${period}`;
  };

  return ( 
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: "url('/public/logo/pawBackground.jpg')" }}
      ></div>
      <div className="relative container mx-auto p-6 max-w-6xl z-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#3968B6]">
          My Bookings
        </h2>
        <div className="grid gap-3 lg:grid-cols-1">
          {bookings.map((booking: any) => (
            <div
              key={booking._id}
              className="bg-gray-100 shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">
                  Status:
                  {(booking.bookingStatus === "pending" || booking.bookingStatus === "Pending" ) && (
                    <span className="text-yellow-500"> {booking.bookingStatus}</span>
                  )}
                  {booking.bookingStatus === "Completed" && (
                    <span className="text-green-600"> {booking.bookingStatus}</span>
                  )}
                  {booking.bookingStatus === "Cancelled" && (
                    <span className="text-red-500"> {booking.bookingStatus}</span>
                  )}
                </h3>
               <button 
                  className="bg-[#88c699] text-white lg:px-5 lg:py-2 px-3 py-1 rounded hover:bg-green-400  transition-colors"
                  // onClick={() => handleViewDetails(booking._id)}
                ><Link to={`/bookingDetail/${booking._id}`}>View Details</Link>
                  
                </button>
              </div>
              <div className="text-gray-600 flex flex-col gap-1">
                <p>
                  <strong>Scheduled on:</strong>{" "}
                  {new Date(booking.scheduledDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Slot:</strong>{" "}
                  {convertTo12HourFormat(booking.startTime)} -{" "}
                  {convertTo12HourFormat(booking.endTime)}
                </p>
                <p>
                  <strong>Name:</strong> {booking.name}
                </p>
                <p>
                  <strong>Phone:</strong> {booking.phone}
                </p>
                <p>
                  <strong>Service:</strong>{" "}
                  {services[booking.serviceId] || booking.serviceId}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
