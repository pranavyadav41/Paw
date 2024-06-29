import { useEffect, useState } from "react";
import { getBookings, getService } from "../../api/user";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";
import { motion } from "framer-motion";

const MyBookings = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [bookings, setBookings] = useState<any[]>([]);
  const [services, setServices] = useState<{ [key: string]: string }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBookings = async (page: number) => {
    if (userInfo) {
      setIsLoading(true);
      try {
        const response = await getBookings(userInfo._id, page);
        const sortedBookings = response?.data.bookings.sort(
          (a: any, b: any) => {
            if (
              a.bookingStatus.toLowerCase() === "pending" &&
              b.bookingStatus.toLowerCase() !== "pending"
            ) {
              return -1;
            } else if (
              a.bookingStatus.toLowerCase() !== "pending" &&
              b.bookingStatus.toLowerCase() === "pending"
            ) {
              return 1;
            }
            return (
              new Date(b.scheduledDate).getTime() -
              new Date(a.scheduledDate).getTime()
            );
          }
        );
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
  }, [userInfo, currentPage]);

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
              console.error(
                `Error fetching service ${booking.serviceId}:`,
                error
              );
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
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      className="relative min-h-screen bg-gradient-to-br from-blue-50 to-purple-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url('/logo/pawBackground.jpg')" }}
      ></div>
      <div className="relative container mx-auto p-6 max-w-6xl">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#3968B6]"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          My Bookings
        </motion.h2>
        {isLoading ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="text-2xl text-blue-600 font-semibold flex items-center justify-center"
          >
            Loading...
          </motion.div>
        ) : bookings.length === 0 ? (
          <motion.p
            className="text-center text-xl text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No bookings found.
          </motion.p>
        ) : (
          <>
            <motion.div
              className="grid gap-4 lg:grid-cols-1"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {bookings.map((booking: any) => (
                <motion.div
                  key={booking._id}
                  className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
                  variants={itemVariants}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h3 className="text-xl font-semibold mb-2 md:mb-0">
                      Status:
                      {booking.bookingStatus.toLowerCase() === "pending" && (
                        <span className="text-yellow-500 ml-2">
                          {booking.bookingStatus}
                        </span>
                      )}
                      {booking.bookingStatus === "Completed" && (
                        <span className="text-green-600 ml-2">
                          {booking.bookingStatus}
                        </span>
                      )}
                      {booking.bookingStatus === "Cancelled" && (
                        <span className="text-red-500 ml-2">
                          {booking.bookingStatus}
                        </span>
                      )}
                    </h3>
                    <motion.button
                      className="bg-[#88c699] text-white px-5 py-2 rounded-full hover:bg-green-400 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link to={`/bookingDetail/${booking._id}`}>
                        View Details
                      </Link>
                    </motion.button>
                  </div>
                  <div className="text-gray-600 flex flex-col gap-2">
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
                </motion.div>
              ))}
            </motion.div>
            {totalPages > 1 && (
              <motion.div
                className="mt-8 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={`mx-1 px-4 py-2 rounded-full ${
                    currentPage === 1
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
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
                  )
                )}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={`mx-1 px-4 py-2 rounded-full ${
                    currentPage === totalPages
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default MyBookings;
