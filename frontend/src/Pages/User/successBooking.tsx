import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import { motion, Variants } from "framer-motion";
import animation from "../../assets/successPage.json";

const SuccessBooking: React.FC = () => {
  const location = useLocation();
  const bookingId = location.state;

  const fadeInUp: any = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren: Variants = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      className="flex items-start justify-center min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="flex flex-col md:flex-row md:items-center md:justify-center bg-slate-100 p-10 rounded-md md:h-[420px] md:mt-20 shadow-lg"
        variants={staggerChildren}
        initial="initial"
        animate="animate"
      >
        <motion.div className="md:mr-8 mb-8 md:mb-0" variants={fadeInUp}>
          <div className="w-96 h-96">
            <Lottie animationData={animation} loop={true} />
          </div>
        </motion.div>
        <motion.div className="rounded-lg p-8 max-w-md text-center" variants={fadeInUp}>
          <motion.div className="flex gap-2 justify-center" variants={fadeInUp}>
            <h2 className="text-3xl font-bold mb-4 text-[#4AAE88]">
              Booking Successful
            </h2>
            <img
              className="h-8"
              src="/logo/checkout/success-svgrepo-com.svg"
              alt=""
            />
          </motion.div>
          <motion.p 
            className="text-gray-600 mb-8 text-lg font-semibold bg-[#D7EBE9] py-3 mx-auto rounded-md px-2 shadow-md"
            variants={fadeInUp}
          >
            Booking ID: {bookingId}
          </motion.p>
          <motion.div className="flex justify-center space-x-4" variants={fadeInUp}>
            <motion.button
              className="bg-[#0F689D] hover:bg-blue-900 text-white text-base font-semibold py-2 px-5 rounded-full transition-colors duration-300 shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/myBookings">My Bookings</Link>
            </motion.button>
            <motion.button
              className="text-black font-semibold py-2 px-4 rounded-full underline decoration-black underline-offset-4 transition-all duration-300 hover:bg-gray-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/">Go back to home</Link>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SuccessBooking;