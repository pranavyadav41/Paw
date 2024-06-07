import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CheckIcon } from "@chakra-ui/icons";
import { getService } from "../../api/user";

interface Service {
  category: string;
  services: string[];
  price: {
    small: string;
    medium: string;
    large: string;
    extraLarge: string;
  };
}

const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Service | null>(null);

  useEffect(() => {
    if (id) {
      getService(id).then((response) => setService(response?.data));
    }
  }, [id]);

  if (!service) return <div>Loading...</div>;

  return (
    <>
     <div className="relative flex flex-col justify-start items-center min-h-screen gap-3">
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70 z-[-1]"
    style={{ backgroundImage: "url('/public/logo/pawBackground.jpg')" }}
  ></div>
  <h1 className="text-2xl font-semibold mt-8">Service Details</h1>
  <div className="bg-[#bee4b1] rounded-lg shadow-md p-6 w-[800px] relative z-10">
    <div className="flex gap-4">
      <img
        src="/public/logo/newOne.png"
        alt="Service Image"
        className="w-40 h-40 rounded-lg"
      />
      <div>
        <h2 className="text-xl font-bold text-white">{service.category}</h2>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {service.services.map((serviceItem, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckIcon color="#5F7093" boxSize={4} />
              <p className="text-[#5F7093] text-md">{serviceItem}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="grid grid-cols-4 gap-3 mt-6">
      {Object.entries(service.price).map(([size, price]) => (
        <div
          key={size}
          className="bg-white flex justify-center items-center h-10 rounded-[5px] p-2"
        >
          <p className="text-black text-md">
            {size.charAt(0).toUpperCase() + size.slice(1)} -{" "}
          </p>
          <p className="text-black text-md">&#8377;{price}</p>
        </div>
      ))}
    </div>
  </div>
</div>

    </>
  );
};

export default ServiceDetail;
