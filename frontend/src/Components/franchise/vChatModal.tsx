import React from 'react';
import Modal from 'react-modal';

interface VideoChatModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
}

const VideoChatModal: React.FC<VideoChatModalProps> = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Video Chat Modal"
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
    >
      <div className="bg-white rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/3">
        <button
          onClick={onRequestClose}
          className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full"
        >
          X
        </button>
        <div className="p-4">{children}</div>
      </div>
    </Modal>
  );
};

export default VideoChatModal;
