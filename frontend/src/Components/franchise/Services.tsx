import React, { useState } from 'react';
import { AddIcon } from "@chakra-ui/icons";
import Modal from 'react-modal';
import ServiceCard from '../franchise/ServiceCard'; // Make sure to import the ServiceCard component

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

interface ServicesProps {
  services: Service[];
}

const Services: React.FC<ServicesProps> = ({ services }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [franServices, setFranServices] = useState([])

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  function handleAddService() {
    // Add your logic for adding a new service here
  }

  return (
    <div className="flex flex-col items-end">
      <div className="bg-[#9ad1aa] w-full md:w-[800px] rounded-md relative p-4">
        <button
          onClick={openModal}
          className="absolute top-4 right-4 bg-blue-400 hover:bg-blue-500 text-white px-5 py-1 rounded-md shadow-md flex items-center gap-2"
        >
          <AddIcon />
          Add Service
        </button>
        {franServices.length === 0 && (
          <div className='flex items-center justify-center'>
            <h1 className='font-semibold text-lg'>No services</h1>
          </div>
        )}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={{
            content: {
              top: '55%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
             
              maxWidth: '95%',
              maxHeight: '80vh',
              overflowY: 'auto',
              backgroundColor: '#CCCCCC'
            }
          }}
          contentLabel="Add Service Modal"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Add Service</h2>
            <button
              onClick={closeModal}
              className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded-md"
            >
              Close
            </button>
          </div>
          <div className="mt-4">
            {services.map((service, index) => (
              <ServiceCard key={service._id} service={service} imgIndex={index} onAddService={handleAddService} />
            ))}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Services;
