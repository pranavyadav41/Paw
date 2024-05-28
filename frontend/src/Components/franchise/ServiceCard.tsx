import React, { useState } from 'react';
import { CheckIcon } from '@chakra-ui/icons';

interface Service {
  _id: string;
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
  onAddService: (service: Service, hours: number, minutes: number) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onAddService,
}) => {
  const [hours, setHours] = useState<number | ''>('');
  const [minutes, setMinutes] = useState<number | ''>('');
  const [error, setError] = useState<string>('');

  const handleAddService = () => {
    if (hours === '' || minutes === '') {
      setError('Please set both hours and minutes.');
    } else {
      setError('');
      onAddService(service, hours, minutes);
      setHours("")
      setMinutes("")
    }
  };

  return (
    <div className="bg-[#9ad1aa] rounded-lg shadow-md p-6 mb-4 transition duration-300 flex flex-col md:flex-row md:items-center lg:w-[800px]">
      <div className="flex items-center md:mr-4">
        <div className="mr-4">
          <img
            src="/public/logo/newOne.png"
            alt="Service Image"
            className="w-20 h-15 rounded-lg"
          />
        </div>
        <div>
          <div className="flex justify-between items-center">
            <h3 className="text-md font-bold text-white text-xl">
              {service.category}
            </h3>
            <div className="flex gap-3 ml-3">
              {/* Edit Icon */}
              {/* Include your edit icon component or element here */}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1 mt-2 md:mt-0">
            {service.services.map((serviceItem, index) => (
              <div key={index} className="flex items-center gap-1">
                <CheckIcon color="#5F7093" boxSize={3} />
                <p className="text-[#5F7093] text-sm">{serviceItem}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 mt-3">
            {Object.entries(service.price).map(([size, price]) => (
              <div
                key={size}
                className="w-28 h-10 bg-white flex justify-center items-center rounded-[5px]"
              >
                <p className="text-black text-sm">
                  {size.charAt(0).toUpperCase() + size.slice(1)}-
                </p>
                <p className="text-black text-sm">&#8377;{price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 md:mt-0 md:ml-auto">
        <label className="text-black text-sm mb-1">
          Set Time to Complete Task:
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(parseInt(e.target.value) || '')}
            placeholder="Hours"
            className="w-20 px-2 py-1 rounded-md border border-gray-300"
          />
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(parseInt(e.target.value) || '')}
            placeholder="Minutes"
            className="w-20 px-2 py-1 rounded-md border border-gray-300"
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        <button
          onClick={handleAddService}
          className="mt-4 bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-md shadow-md"
        >
          Add Service
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;