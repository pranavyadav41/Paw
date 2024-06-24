import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { IoMdCheckmark } from "react-icons/io";
import { getFeedbacks, getService } from "../../api/user";
import FeedbackCard from "../../Components/user/feedbackCard";

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

interface Feedback {
  name: string;
  feedback: string;
  rating: number;
  images: string[];
}

const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      getService(id).then((response) => setService(response?.data));
      getFeedbacks(id).then((response) => setFeedbacks(response?.data));
    }
  }, [id]);

  const handleBooknow = ()=>{

    navigate('/booking')

  }

  if (!service) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return ( 
    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative" style={{backgroundImage: "url('/public/logo/pawBackground.jpg')"}}>
      <div className="absolute inset-0 bg-white bg-opacity-60"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#6EC1E4] shadow-xl rounded-lg overflow-hidden md:max-w-5xl md:ml-24"
          onClick={handleBooknow}
        >
          <div className="md:flex">
            <div className="md:flex-shrink-0 ml-5"> 
              <img
                className="h-48 w-full object-cover md:h-full md:w-48"
                src="/public/logo/Homepage/pngFlying-fur-Service-IllustrationsArtboard-1.png"
                alt="Service Image"
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-lg md:text-3xl text-white font-bold">
                {service.category}
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {service.services.map((serviceItem, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <IoMdCheckmark className="text-white" />
                    <p className="text-white">{serviceItem}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-[#6EC1E4] px-4 py-4 sm:px-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {Object.entries(service.price).map(([size, price]) => (
                <div
                  key={size}
                  className="bg-yellow-500 rounded-lg shadow px-4 py-2 text-center"
                >
                  <p className="text-black text-sm">{size.charAt(0).toUpperCase() + size.slice(1)}</p>
                  <p className="text-lg font-semibold text-black">₹{price}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {feedbacks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12"
          >
            <h2 className="lg:text-3xl text-xl font-semibold text-center text-blue-900 mb-6">Reviews from Pet Parents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {feedbacks.map((feedback, index) => (
                <FeedbackCard
                  key={index}
                  name={feedback.name}
                  review={feedback.feedback}
                  rating={feedback.rating}
                  images={feedback.images}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ServiceDetail;