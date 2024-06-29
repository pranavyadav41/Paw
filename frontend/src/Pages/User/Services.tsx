import React, { useState, useEffect } from "react";
import ServiceCard from "../../Components/user/serviceCard";
import { getServices } from "../../api/admin";
import { motion } from "framer-motion";

const Services: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices();
        console.log("Services response:", response);
        if (Array.isArray(response?.data)) {
          setServices(response.data);
        } else {
          console.error("Unexpected response structure:", response);
          setError("Unexpected data structure received");
          setServices([]);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        setError("Failed to fetch services");
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    console.log("Current services state:", services);
  }, [services]);

  if (loading) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="text-2xl text-blue-600 font-semibold min-h-screen"
      >
        Loading...
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="text-2xl text-red-600 font-semibold min-h-screen"
      >
        {error}
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center relative">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/logo/pawBackground.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.3,
          zIndex: -1,
        }}
      ></div>
      <div className="mt-5 z-10 flex flex-col sm:flex-row items-center">
        <h1 className="text-2xl sm:text-3xl text-[#3968B6] font-semibold text-center sm:text-left mb-2 sm:mb-0">
          Inclusions & Pricelist
        </h1>
        <img
          className="opacity-50 w-24 sm:w-auto"
          src="/logo/Homepage/WFF.png"
          alt=""
        />
      </div>
      {Array.isArray(services) && services.length > 0 ? (
        <div className="w-full sm:w-[83%] h-full bg-transparent grid grid-cols-1 sm:grid-cols-2 gap-3 p-2 sm:p-5 z-10">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} imgIndex={index} />
          ))}
        </div>
      ) : (
        <div className="text-center mt-10 text-lg font-medium">
          No services available
        </div>
      )}
      <div className="flex justify-center mt-10 sm:mt-20 w-full">
        <img
          src="/logo/FranchisePage/footer-bottom-image-removebg.png"
          alt="Footer Image"
          style={{
            width: "100%",
            height: "auto",
            backgroundColor: "transparent",
          }}
        />
      </div>
    </div>
  );
};

export default Services;
