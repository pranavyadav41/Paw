import React from "react";
import { FaTimes } from "react-icons/fa";

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative max-w-4xl max-h-4xl"> {/* Add max-width and max-height */}
        <FaTimes
          className="absolute top-2 right-2 text-white cursor-pointer"
          onClick={onClose}
          size={24}
        />
        <img
          src={imageUrl}
          alt="Full Size"
          className="max-w-full max-h-full object-contain" 
        />
      </div>
    </div>
  );
};

export default ImageModal;