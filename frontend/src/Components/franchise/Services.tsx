import React, { useState, useEffect } from "react";
import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import Modal from "react-modal";
import { Button } from "@chakra-ui/react";
import ServiceCard from "../franchise/ServiceCard";
import { useSelector } from 'react-redux';
import { getProfile } from "../../api/franchise";
import { getServices } from "../../api/admin";
import { RootState } from '../../redux/store';
import {
  addServices,
  deleteService,
  setTime,
  editTime,
} from "../../api/franchise";
import { toast } from "react-toastify";
 
interface TimeToComplete {
  hours: number;
  minutes: number;
}

interface AvailableService {
  serviceId: string;
  serviceName: string;
  timeToComplete: TimeToComplete;
  _id: string;
}

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

const Services: React.FC = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [availableServices, setAvailableServices] = useState<AvailableService[]>([]);
  const [currentService, setCurrentService] = useState<AvailableService | null>(null);
  const [editHours, setEditHours] = useState(0);
  const [editMinutes, setEditMinutes] = useState(0);
  const [services, setServices] = useState([]);
  const [state,setState]=useState(false)

  const { franchiseInfo } = useSelector(
    (state: RootState) => state.franchiseAuth
  );

  useEffect(() => {
    getProfile(franchiseInfo._id).then((response) => {
      console.log("calledddddd")
      setOpeningTime(response?.data.openingTime);
      setClosingTime(response?.data.closingTime);
      setAvailableServices(response?.data.services);
      setState(false)
    });
  }, [franchiseInfo._id,state]);

  useEffect(() => {
    getServices().then((response) => {
      setServices(response?.data);
    });
  }, []);


  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openEditModal(service: AvailableService) {
    setCurrentService(service);
    setEditHours(service.timeToComplete.hours);
    setEditMinutes(service.timeToComplete.minutes);
    setEditModalIsOpen(true);
  }

  function closeEditModal() {
    setEditModalIsOpen(false);
  }

  async function handleAddService(
    service: Service,
    hours: number,
    minutes: number
  ) {
    const serviceDetail: { serviceId: string; serviceName: string } = {
      serviceId: service._id,
      serviceName: service.category,
    };
    const time = { hours, minutes };

    const response = await addServices(franchiseInfo._id, serviceDetail, time);

    if (response) {
      toast.success(response.data, { position: "top-center" });
      setState(true)
    }
  }

  const handleDelete = async (serviceId: string) => {
    const response = await deleteService(franchiseInfo._id, serviceId);

    if (response) {
      toast.success(response.data, { position: "top-center" });
      setState(true)
    }
    
  };

  const handleSetTime = async () => {
    const response = await setTime(franchiseInfo._id, openingTime, closingTime);

    if (response) {
      toast.success(response.data, { position: "top-center" });
      setState(true)
    }
    
  };

  const handleUpdateServiceTime = async (serviceId: string) => {
    if (!currentService) return;

    // const updatedService = {
    //   ...currentService,
    //   timeToComplete: { hours: editHours, minutes: editMinutes },
    // };

    const response = await editTime(franchiseInfo._id, serviceId, editHours, editMinutes);

    if (response) {
      toast.success(response.data, { position: "top-center" });
      setEditModalIsOpen(false);
      setState(true)
    } 
  };

  return (
    <div className="flex flex-col items-center md:items-end">
      <div className=" bg-transparent w-full md:w-[1100px] md:h-full rounded-md relative p-2 right-4 border-slate-400 shadow-lg overflow-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="flex gap-4 mb-4 md:mb-0">
            <div className="flex flex-col">
              <label
                htmlFor="opening-time"
                className="text-sm font-semibold text-slate-100"
              >
                Opening Time
              </label>
              <input
                type="time"
                id="opening-time"
                value={openingTime}
                onChange={(e) => setOpeningTime(e.target.value)}
                className="mt-1 py-2 w-32 text-center border rounded-md shadow-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="closing-time"
                className="text-sm font-semibold text-slate-100"
              >
                Closing Time
              </label>
              <input
                type="time"
                id="closing-time"
                value={closingTime}
                onChange={(e) => setClosingTime(e.target.value)}
                className="mt-1 py-2 w-32 text-center border rounded-md shadow-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <Button
              className="mt-5 md:mt-8 px-6"
              colorScheme="blue"
              size="xs"
              onClick={handleSetTime}
            >
              SET TIME
            </Button>
          </div>
          <button
            onClick={openModal}
            className="bg-gray-900 hover:bg-blue-500 text-white px-5 py-1 rounded-md shadow-md flex items-center gap-2"
          >
            <AddIcon />
            Add Service
          </button>
        </div>
        {availableServices.length === 0 ? (
          <div className="flex items-center justify-center h-80">
            <h1 className="font-semibold text-lg">No services</h1>
          </div>
        ) : (
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableServices.map((service) => (
              <div
                key={service._id}
                className="bg-[#6EC1E4] shadow-md rounded-lg overflow-hidden flex"
              >
                <div className="flex items-center">
                  <div className="relative mr-2 ml-2">
                    <img
                      src="/logo/Homepage/pngFlying-fur-Service-IllustrationsArtboard-1.png"
                      alt="Service Image"
                      className="w-20 h-15 rounded-lg mb-10"
                    />
                  </div>
                </div>
                <div className="flex-1 p-4">
                  <h3 className="text-base font-semibold leading-6 text-white">
                    Service: {service.serviceName}
                  </h3>
                  <p className="mt-1 text-md text-white">
                    Time to Complete: {service.timeToComplete.hours}h{" "}
                    {service.timeToComplete.minutes}m
                  </p>
                  <div className="mt-4 flex justify-end gap-3">
                    <button
                      className="text-sm font-medium text-black hover:text-green-900"
                      onClick={() => openEditModal(service)}
                    >
                      <EditIcon />
                    </button>
                    <button
                      className="text-sm font-medium text-black hover:text-red-900"
                      onClick={() => handleDelete(service.serviceId)}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              maxWidth: "95%",
              maxHeight: "80vh",
              overflowY: "auto",
              backgroundColor: "#CCCCCC",
              zIndex:1000
            },
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex:999
            },
          }}
          contentLabel="Add Service Modal"
        >
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <h2 className="text-2xl font-bold mb-4 md:mb-0">Add Service</h2>
            <button
              onClick={closeModal}
              className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded-md"
            >
              Close
            </button>
          </div>
          <div className="mt-4">
            {services.map((service) => (
              <ServiceCard
                // key={service._id}
                service={service}
                onAddService={handleAddService}
              />
            ))}
          </div>
        </Modal>
        <Modal
          isOpen={editModalIsOpen}
          onRequestClose={closeEditModal}
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              maxWidth: "95%",
              maxHeight: "80vh",
              overflowY: "auto",
              backgroundColor: "#CCCCCC",
              zIndex:1000
            },
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex:999
            },
          }}
          contentLabel="Edit Service Time Modal"
        >
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <h2 className="text-xl font-bold mb-4 md:mb-0">
              Edit Service Time
            </h2>
            <Button colorScheme="red" size="xs" onClick={closeEditModal}>
              Close
            </Button>
          </div>
          {currentService && (
            <div className="mt-4">
              <div className="flex flex-col mb-4">
                <label className="text-sm font-semibold text-slate-700">
                  Service: {currentService.serviceName}
                </label>
              </div>
              <div className="flex flex-col mb-4">
                <label className="text-sm font-semibold text-slate-700">
                  Hours
                </label>
                <input
                  type="number"
                  value={editHours}
                  onChange={(e) => setEditHours(parseInt(e.target.value))}
                  className="mt-1 p-2 border rounded-md shadow-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="text-sm font-semibold text-slate-700">
                  Minutes
                </label>
                <input
                  type="number"
                  value={editMinutes}
                  onChange={(e) => setEditMinutes(parseInt(e.target.value))}
                  className="mt-1 p-2 border rounded-md shadow-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <Button
                colorScheme="teal"
                size="sm"
                onClick={() =>
                  handleUpdateServiceTime(currentService.serviceId)
                }
              >
                Save
              </Button>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Services;
