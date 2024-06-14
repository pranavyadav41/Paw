import React from 'react';
import { CheckIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';


interface Service {
  _id:string;
  category: string;
  services: string[];
  price: {
    small: string;
    medium: string;
    large: string;
    extraLarge: string;
  };
}

interface ServiceCardProps {
  service: Service;
  imgIndex:number
} 

const ServiceCard: React.FC<ServiceCardProps> = ({ service}) => {

  return (
    <Link to={`/service/${service._id}`} className="bg-[#6EC1E4] rounded-lg shadow-md p-6 mb-2 mt-2 transition duration-300 flex flex-col ">
      {/* Content */}
      <div className="flex-1 flex gap-1">
        <div className="mr-4 ">
          <img src="/public/logo/Homepage/pngFlying-fur-Service-IllustrationsArtboard-1.png" alt="Service Image" className="w-20 h-15 rounded-lg" />
        </div>
        <div>
          <div className="flex justify-between items-center">
            <h3 className="text-md font-bold text-white text-xl">{service.category}</h3>
            <div className="flex gap-2 ml-3">
              {/* Edit Icon */}
              {/* Include your edit icon component or element here */}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1 mt-2">
            {service.services.map((serviceItem, index) => (
              <div key={index} className="flex items-center gap-1">
                <CheckIcon color="white" boxSize={3} />
                <p className="text-[white] text-sm">{serviceItem}</p> 
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 mt-3">
        {Object.entries(service.price).map(([size, price]) => (
          <div key={size} className="w-28 h-10 bg-[#FFCC00] flex justify-center items-center rounded-">
            <p className="text-black text-sm">{size.charAt(0).toUpperCase() + size.slice(1)}-</p>
            <p className="text-black text-sm">&#8377;{price}</p>
          </div>
        ))}
      </div>
    </Link>
  );
};

export default ServiceCard;
