import React from "react";
import { FaTimes } from "react-icons/fa";

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative h-[70%] w-[80%]"> {/* Add max-width and max-height */}
        <FaTimes
          className="absolute top-3 right-5 text-white cursor-pointer"
          onClick={onClose}
          size={24}
        />
        <img
          src={imageUrl}
          alt="Full Size"
          className="w-full h-full object-contain" 
        />
      </div>
    </div>
  );
};

export default ImageModal;