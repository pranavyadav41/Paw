import ServiceCard from "../../Components/user/serviceCard";
import { getServices } from "../../api/admin";
import { useState, useEffect } from "react";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices();
        setServices(response?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }; 
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center relative">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/public/logo/pawBackground.jpg')",
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
          src="/public/logo/Homepage/WFF.png"
          alt=""
        />
      </div>
      <div className="w-full sm:w-[83%] h-full bg-transparent grid grid-cols-1 sm:grid-cols-2 gap-3 p-2 sm:p-5 z-10">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} imgIndex={index} />
        ))}
      </div>
      {!loading && (
        <div className="flex justify-center mt-10 sm:mt-20 w-full">
          <img
            src="/public/logo/FranchisePage/footer-bottom-image-removebg.png"
            alt="Footer Image"
            style={{
              width: "100%",
              height: "auto",
              backgroundColor: "transparent",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Services;