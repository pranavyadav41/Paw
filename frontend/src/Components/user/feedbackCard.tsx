import React, { useState } from 'react';
import { HiUserGroup } from "react-icons/hi2";

interface FeedbackCardProps {
  name: string;
  review: string;
  rating: number;
  images: string[];
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ name, review, rating, images }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <span
      key={index}
      className={`inline-block w-5 h-5 ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
      aria-hidden="true"
    >
      {index < rating ? '★' : '☆'}
    </span>
  ));

  const limitedImages = images.slice(0, 4);
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((currentImageIndex - 1 + limitedImages.length) % limitedImages.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % limitedImages.length);
  };

  return (
    <div className="bg-[#3968b6] rounded-bl-3xl rounded-sm  shadow-md  w-full h-full md:w-[380px] md:h-[550px] overflow-hidden flex flex-col">
      <div className="flex items-center p-4">
        <HiUserGroup className="text-xl text-white mr-2" />
        <h3 className="text-xl text-white font-semibold">{name}</h3>
      </div>
      <div className="flex justify-between items-center p-5">
        <div className="flex">{stars}</div>
      </div>
      <div className="p-4 flex-grow overflow-y-auto">
        <p className="text-white text-md">{review}</p>
      </div>
      {limitedImages.length > 0 && (
        <div className="p-4">
          <div className="flex flex-wrap gap-2">
            {limitedImages.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Review Image ${index}`}
                className="w-20 h-20 rounded-md object-cover cursor-pointer"
                onClick={() => openModal(index)}
              />
            ))}
          </div>
        </div>
      )}

{showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="relative w-[70%] h-[70%] flex justify-center">
            <img
              src={limitedImages[currentImageIndex]}
              alt={`Review Image ${currentImageIndex}`}
              className="max-w-full max-h-full object-contain"
            />
            <button
              className="absolute top-0 right-0 p-2 text-white hover:text-gray-300"
              onClick={closeModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <button
              className="absolute top-1/2 left-0 p-2 text-white hover:text-gray-300 transform -translate-y-1/2"
              onClick={handlePrevImage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              className="absolute top-1/2 right-0 p-2 text-white hover:text-gray-300 transform -translate-y-1/2"
              onClick={handleNextImage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackCard;