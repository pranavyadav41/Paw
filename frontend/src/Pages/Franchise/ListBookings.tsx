import { useEffect, useState } from "react";
import { getBookings, getService } from "../../api/franchise";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";

const MyBookings = () => {
  const { franchiseInfo } = useSelector(
    (state: RootState) => state.franchiseAuth
  );
  const [bookings, setBookings] = useState<any>([]);
  const [services, setServices] = useState<{ [key: string]: string }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBookings = async (page: number) => {
    if (franchiseInfo) {
      setIsLoading(true);
      try {
        const response = await getBookings(franchiseInfo._id, page);
        const sortedBookings = response?.data.bookings.sort((a: any, b: any) => {
          if (
            a.bookingStatus.toLowerCase() === "pending" &&
            b.bookingStatus.toLowerCase() !== "pending"
          ) {
            return -1;
          }
          if (
            a.bookingStatus.toLowerCase() !== "pending" &&
            b.bookingStatus.toLowerCase() === "pending"
          ) {
            return 1;
          }
          return (
            new Date(b.bookingDate).getTime() -
            new Date(a.bookingDate).getTime()
          );
        });
        setBookings(sortedBookings);
        setCurrentPage(response?.data.currentPage);
        setTotalPages(response?.data.totalPages);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchBookings(currentPage);
  }, [franchiseInfo, currentPage]);

  useEffect(() => {
    if (bookings.length > 0) {
      const newServices: { [key: string]: string } = {};
      const fetchServices = async () => {
        for (const booking of bookings) {
          if (!services[booking.serviceId]) {
            try {
              const response = await getService(booking.serviceId);
              newServices[booking.serviceId] = response?.data.category;
            } catch (error) {
              console.error(`Error fetching service ${booking.serviceId}:`, error);
            }
          }
        }
        setServices((prevServices) => ({ ...prevServices, ...newServices }));
      };
      fetchServices();
    }
  }, [bookings]);

  const convertTo12HourFormat = (time: string) => {
    const [hour, minute] = time.split(":").map(Number);
    const period = hour >= 12 ? "PM" : "AM";
    const adjustedHour = hour % 12 || 12;
    return `${adjustedHour}:${minute < 10 ? "0" + minute : minute} ${period}`;
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: "url('/public/logo/pawBackground.jpg')" }}
      ></div>
      <div className="relative container mx-auto p-6 max-w-6xl z-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#3968B6]">
          All Bookings
        </h2>
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <>
            <div className="grid gap-3 lg:grid-cols-1">
              {bookings.map((booking: any) => (
                <div
                  key={booking._id}
                  className="bg-gray-100 shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">
                      Status:
                      {(booking.bookingStatus === "pending" ||
                        booking.bookingStatus === "Pending") && (
                        <span className="text-yellow-500">
                          {" "}
                          {booking.bookingStatus}
                        </span>
                      )}
                      {booking.bookingStatus === "Completed" && (
                        <span className="text-green-500">
                          {" "}
                          {booking.bookingStatus}
                        </span>
                      )}
                      {booking.bookingStatus === "Cancelled" && (
                        <span className="text-red-500">
                          {" "}
                          {booking.bookingStatus}
                        </span>
                      )}
                    </h3>
                    <button className="bg-[#88c699] text-white font-semibold px-4 py-1 rounded hover:bg-green-400 transition-colors">
                      <Link to={`/franchise/bookingDetail/${booking._id}`}>
                        View Details
                      </Link>
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
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gray-400 text-white"
                }`}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`mx-1 px-3 py-1 rounded ${
                    currentPage === page
                      ? "bg-[#3968B6] text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gray-400 text-white"
                }`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
