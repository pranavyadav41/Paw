import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

function FranchisePage() {
  return (
    <div className="relative flex flex-col justify-center min-h-screen bg-[#fffefe] overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/logo/pawBackground.jpg')",
          opacity: 0.3,
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10 , repeat: Infinity, repeatType: "reverse" }}
      ></motion.div>
      <div className="w-full max-w-6xl mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          <motion.div
            className="w-full lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              className="w-full max-w-md h-auto rounded-sm"
              src="public/logo/FranchisePage/home-1-shape-image-3.png"
              alt="Cute Yorkshire Terrier Dog"
            />
          </motion.div>
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex flex-col gap-4">
              <motion.h1
                className="font-bold text-2xl sm:text-3xl text-[#3968B6] text-center lg:text-left"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Take Your First Step Towards Success
              </motion.h1>
              <motion.p
                className="text-center lg:text-left"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                Start a Pet Spa in your city. For more details, please register
                by providing your contact information, and we will reach out to
                you via email.
              </motion.p>
            </div>
            <motion.div
              className="flex justify-center lg:justify-start mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <NavLink
                to="/franchise/register"
                className="bg-[#192955] hover:bg-blue-800 text-white font-medium py-2 px-7 rounded-3xl inline-block transition duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">Get started</span>
                <motion.div
                  className="absolute inset-0 bg-blue-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
              </NavLink>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default FranchisePage;