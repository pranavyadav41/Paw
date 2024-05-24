import ServiceCard from "../../Components/user/serviceCard";
import { getServices } from "../../api/admin";
import { useState, useEffect } from "react";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    try {
      getServices().then((response) => {
        setServices(response?.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center relative">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/public/logo/pawBackground.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.4,
          zIndex: -1,
        }}
      ></div>
      <div className="mt-5 z-10">
        <h1 className="text-2xl font-semibold">Inclusions and Pricelist</h1>
      </div>
      <div className="w-[83%] h-full bg-transparent grid grid-cols-2 gap-3 p-5 z-10">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} imgIndex={index} />
        ))}
      </div>
    </div>
  );
};

export default Services;
