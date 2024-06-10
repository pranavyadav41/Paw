import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CheckIcon } from "@chakra-ui/icons";
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

  useEffect(() => {
    if (id) {
      getService(id).then((response) => setService(response?.data));
      getFeedbacks(id).then((response) => {
        setFeedbacks(response?.data);
      });
    }
  }, [id]);

  if (!service) return <div>Loading...</div>;

  return (
    <div className="relative flex flex-col justify-start items-center min-h-screen gap-3 container mx-auto">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 z-[-1]"
        style={{ backgroundImage: "url('/public/logo/pawBackground.jpg')" }}
      ></div>
      <div className="bg-[#9AD1AA] rounded-lg shadow-md p-6 md:w-[800px] relative z-10 mt-10">
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
      {feedbacks.length>0 && (<div className="relative w-full overflow-hidden bg-gradient-to-b from-transparent to-[#FFD788]/100 py-12">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-3xl font-semibold flex items-center text-[#3968b6]">
            Reviews from Pet Parents
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
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
      </div>)}
    </div>
  );
};

export default ServiceDetail;