import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Tag,
  Button,
} from "@chakra-ui/react";
import { CheckIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { IoMdAdd } from "react-icons/io";
import { deleteService,updateService} from "../../api/admin";
import { toast } from "react-toastify";

interface Service {
  _id: string;
  category: string;
  services: string[];
  price: {
    small: string;
    medium: string;
    large: string;
    xLarge: string;
  };
}

interface UserCardProps {
  service: Service;
  state: (data: boolean) => void;
}

const Card4: React.FC<UserCardProps> = ({ service, state }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedService, setEditedService] = useState<Service>(service);
  const [category, setCategory] = useState(service.category);
  const [serviceInput, setServiceInput] = useState("");
  const [services, setServices] = useState(service.services);
  const [prices, setPrices] = useState(service.price);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleEdit = () => {
    setEditedService(service);
    setCategory(service.category);
    setServices(service.services);
    setPrices(service.price);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addService = () => {
    if (serviceInput.trim() !== "") {
      setServices([...services, serviceInput]);
      setServiceInput("");
    }
  };

  const handleEditService = (index: number) => {
    setServiceInput(services[index]);
    setEditIndex(index);
  };

  const handleUpdateService = () => {
    if (editIndex !== null) {
      const updatedServices = [...services];
      updatedServices[editIndex] = serviceInput;
      setServices(updatedServices);
      setServiceInput("");
      setEditIndex(null);
    }
  };

  const handleDeleteService = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
     const updatedService = {
        _id: editedService._id,
        category,
        services,
        price: prices,
    };
    const response = await updateService({updatedService});
    if (response) {
      console.log(response)
      toast.success("Service updated successfully!", {
        position: "top-center",
      });
      state(true);
      closeModal();
    }
  };

  const handleDelete = async (serviceId: string) => {
    const response = await deleteService({ serviceId });
    if (response) {
      toast.success(response?.data, {
        position: "top-center",
      });
      state(true);
    }
  };

  return (
    <div className="bg-[#191C24] rounded-lg shadow-md p-6 mb-2 mt-2 transition duration-300 flex flex-col">
      {/* Content */}
      <div className="flex-1 flex gap-1">
        <div>
          <div className="flex justify-between items-center">
            <h3 className="text-md font-bold text-white text-xl">
              {service.category}
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-1 mt-2">
            {service.services.map((serviceItem, index) => (
              <div key={index} className="flex items-center gap-1">
                <CheckIcon color="#5F7093" boxSize={3} />
                <p className="text-[#5F7093] text-sm">{serviceItem}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 mt-3">
        {Object.entries(service.price).map(([size, price]) => (
          <div
            key={size}
            className="w-28 h-10 bg-black flex justify-center items-center"
          >
            <p className="text-gray-300 text-sm">
              {size.charAt(0).toUpperCase() + size.slice(1)}-
            </p>
            <p className="text-gray-300 text-sm">&#8377;{price}</p>
          </div>
        ))}

        <div className="flex gap-2 ml-3 mt-2.5">
          <EditIcon
            boxSize={4}
            color="green"
            cursor="pointer"
            onClick={handleEdit}
          />
          <DeleteIcon
            boxSize={4}
            color="red"
            cursor="pointer"
            onClick={() => handleDelete(service._id)}
          />
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} size="xl">
        <ModalOverlay />
        <ModalContent bg="#191C24">
          <ModalHeader color="white">Edit Service</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <FormControl>
              <FormLabel color="white">Category</FormLabel>
              <Input
                placeholder="Add Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                color="white"
              />
              {errors && <p className="text-red-500">{errors.category}</p>}
            </FormControl>
            {/* Services Field */}
            <FormControl mt={4}>
              <FormLabel color="white">Services</FormLabel>
              <InputGroup>
                <Input
                  placeholder="Add Services"
                  value={serviceInput}
                  onChange={(e) => setServiceInput(e.target.value)}
                  color="white"
                />
                <InputRightElement width="4.5rem">
                  {editIndex !== null ? (
                    <Button
                      colorScheme="teal"
                      size="xs"
                      onClick={handleUpdateService}
                    >
                      Update
                    </Button>
                  ) : (
                    <IoMdAdd onClick={addService} color="white" />
                  )}
                </InputRightElement>
              </InputGroup>
              {errors && <p className="text-red-500">{errors.services}</p>}
              {/* List of Services */}
              <VStack mt={4} align="stretch">
                {services.map((service, index) => (
                  <InputGroup key={index}>
                    {editIndex === index ? (
                      <Input
                        value={service}
                        onChange={(e) => setServiceInput(e.target.value)}
                        color="white"
                      />
                    ) : (
                      <Tag
                        size="lg"
                        variant=""
                        color="white"
                        bg="black"
                        gap="4"
                      >
                        {service}
                        <DeleteIcon
                          onClick={() => handleDeleteService(index)}
                        />
                        <EditIcon onClick={() => handleEditService(index)} />
                      </Tag>
                    )}
                  </InputGroup>
                ))}
              </VStack>
            </FormControl>
            {/* Price Fields */}
            <FormControl mt={4}>
              <FormLabel color="white">Price</FormLabel>
              <InputGroup>
                <Input
                  placeholder="Price(small)"
                  value={prices.small}
                  onChange={(e) =>
                    setPrices({ ...prices, small: e.target.value })
                  }
                  color="white"
                />
              </InputGroup>
              {errors && <p className="text-red-500">{errors.price}</p>}
              <InputGroup mt={2}>
                <Input
                  placeholder="Price(medium)"
                  value={prices.medium}
                  onChange={(e) =>
                    setPrices({ ...prices, medium: e.target.value })
                  }
                  color="white"
                />
              </InputGroup>
              {errors && <p className="text-red-500">{errors.price}</p>}
              <InputGroup mt={2}>
                <Input
                  placeholder="Price(large)"
                  value={prices.large}
                  onChange={(e) =>
                    setPrices({ ...prices, large: e.target.value })
                  }
                  color="white"
                />
              </InputGroup>
              {errors && <p className="text-red-500">{errors.price}</p>}
              <InputGroup mt={2}>
                <Input
                  placeholder="Price(xLarge)"
                  value={prices.xLarge}
                  onChange={(e) =>
                    setPrices({ ...prices, xLarge: e.target.value })
                  }
                  color="white"
                />
              </InputGroup>
              {errors && <p className="text-red-500">{errors.price}</p>}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" onClick={handleSubmit}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Card4;
