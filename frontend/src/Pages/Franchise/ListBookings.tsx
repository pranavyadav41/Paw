import { useEffect, useState } from "react";
import { getBookings, getService } from "../../api/franchise";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";
import { motion } from "framer-motion";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url('/logo/pawBackground.jpg')" }}
      ></div>
      <div className="relative container mx-auto p-6 max-w-6xl z-10">
        <motion.h2 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="md:text-4xl text-2xl font-bold mb-8 text-center text-[#3968B6] shadow-text"
        >
          My Bookings
        </motion.h2>
        {isLoading ? (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-xl"
          >
            Loading...
          </motion.p>
        ) : bookings.length === 0 ? (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-xl font-semibold text-gray-600"
          >
            No bookings available.
          </motion.p>
        ) : (
          <>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-4 lg:grid-cols-1"
            >
              {bookings.map((booking: any) => (
                <motion.div
                  key={booking._id}
                  variants={itemVariants}
                  className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold mb-2 md:mb-0">
                      Status:
                      {(booking.bookingStatus.toLowerCase() === "pending") && (
                        <span className="text-yellow-500 ml-2">{booking.bookingStatus}</span>
                      )}
                      {booking.bookingStatus === "Completed" && (
                        <span className="text-green-600 ml-2">{booking.bookingStatus}</span>
                      )}
                      {booking.bookingStatus === "Cancelled" && (
                        <span className="text-red-500 ml-2">{booking.bookingStatus}</span>
                      )}
                    </h3>
                    <motion.button 
                      className="bg-[#88c699] text-white px-5 py-2 rounded-full hover:bg-green-400 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link to={`/franchise/bookingDetail/${booking._id}`}>
                        View Details
                      </Link>
                    </motion.button>
                  </div>
                  <div className="text-gray-600 flex flex-col gap-2">
                    <p className="flex items-center">
                      {/* <i className="fas fa-calendar-alt mr-2 text-[#88c699]"></i> */}
                      <strong>Scheduled on:</strong>{" "}
                      {new Date(booking.scheduledDate).toLocaleDateString()}
                    </p>
                    <p className="flex items-center">
                      {/* <i className="fas fa-clock mr-2 text-[#88c699]"></i> */}
                      <strong>Slot:</strong>{" "}
                      {convertTo12HourFormat(booking.startTime)} -{" "}
                      {convertTo12HourFormat(booking.endTime)}
                    </p>
                    <p className="flex items-center">
                      {/* <i className="fas fa-user mr-2 text-[#88c699]"></i> */}
                      <strong>Name:</strong> {booking.name}
                    </p>
                    <p className="flex items-center">
                      {/* <i className="fas fa-phone mr-2 text-[#88c699]"></i> */}
                      <strong>Phone:</strong> {booking.phone}
                    </p>
                    <p className="flex items-center">
                      {/* <i className="fas fa-concierge-bell mr-2 text-[#88c699]"></i> */}
                      <strong>Service:</strong>{" "}
                      {services[booking.serviceId] || booking.serviceId}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            {totalPages > 1 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 flex justify-center"
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`mx-1 px-4 py-2 rounded-full ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-[#3968B6] text-white hover:bg-blue-600"
                  }`}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`mx-1 px-4 py-2 rounded-full ${
                      currentPage === page
                        ? "bg-[#3968B6] text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`mx-1 px-4 py-2 rounded-full ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-[#3968B6] text-white hover:bg-blue-600"
                  }`}
                >
                  Next
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyBookings;