import { useState, useEffect } from "react";
import {
  Button,
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
  VStack,
  InputGroup,
  Tag,
  InputRightElement,
} from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { addServices } from "../../api/admin";
import Card4 from "./Card4";
import { getServices } from "../../api/admin";
import { toast } from "react-toastify";

interface Errors {
  category?: string;
  services?: string;
  price?: string;
}

interface Service {
  category: string;
  services: string[];
  price: {
    small: string;
    medium: string;
    large: string;
    xLarge: string; 
  };
}

const Service = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [category, setCategory] = useState("");
  const [service, setService] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [state, setState] = useState(false);
  const [prices, setPrices] = useState<{
    small: string;
    medium: string;
    large: string;
    extraLarge: string;
  }>({ small: "", medium: "", large: "", extraLarge: "" });
  const [editIndex, setEditIndex] = useState<any>(null);
  const [dServices, setDservices] = useState([]);

  const addService = () => {
    if (service.trim() !== "") {
      setServices([...services, service]);
      setService("");
      setEditIndex(null);
    }
  };
  const handleEditService = (index: number) => {
    setEditIndex(index);
    setService(services[index]);
  };

  const handleDeleteService = (index: number) => {
    const newServices = [...services];
    newServices.splice(index, 1);
    setServices(newServices);
  };

  const handleUpdateService = () => {
    if (service.trim() !== "") {
      const newServices = [...services];
      newServices[editIndex] = service;
      setServices(newServices);
      setService("");
      setEditIndex(null);
    }
  };

  const validateForm = () => {
    const newErrors: Errors = {};

    if (!category.trim()) {
      newErrors.category = "Category is required";
    }

    if (!services.length) {
      newErrors.services = "Atlease one service is required";
    }

    if (!prices.small.trim()) {
      newErrors.price = "Price  is required";
    }
    if (!prices.medium.trim()) {
      newErrors.price = "Price  is required";
    }
    if (!prices.large.trim()) {
      newErrors.price = "Price  is required";
    }
    if (!prices.extraLarge.trim()) {
      newErrors.price = "Price  is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    let submit: boolean = validateForm();

    let lcategory = category.toLowerCase();

    const service = {
      category: lcategory,
      services: services,
      price: {
        small: prices.small,
        medium: prices.medium,
        large: prices.large,
        xLarge: prices.extraLarge,
      },
    };

    if (submit) {
      const response = await addServices({ service });
      toast.success(response?.data.message, {
        position:"top-center",
      });
      setCategory("");
      setServices([]);
      setPrices({ small: "", medium: "", large: "", extraLarge: "" });
      setIsModalOpen(false);
      setState(true)
    }
  };

  useEffect(() => {
    getServices().then((response) => {
      setDservices(response?.data);
      setState(false)
    });
  }, [state]);

  const handle = (data: boolean) => {
    setState(data);
  };
  return (
    <>
      <div className="p-4 bg-black min-h-screen w-full ">
        <div className="container mx-auto px-4">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold mb-4 text-white">Services</h2>
            <Button colorScheme="green" onClick={() => setIsModalOpen(true)}>
              Add Service
            </Button>
          </div>
          {isModalOpen && (
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              size="xl"
            >
              <ModalOverlay />
              <ModalContent bg="#191C24">
                <ModalHeader color="white">Add Service</ModalHeader>
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
                    {errors && (
                      <p className="text-red-500">{errors.category}</p>
                    )}
                  </FormControl>
                  {/* Services Field */}
                  <FormControl mt={4}>
                    <FormLabel color="white">Services</FormLabel>
                    <InputGroup>
                      <Input
                        placeholder="Add Services"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
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
                    {errors && (
                      <p className="text-red-500">{errors.services}</p>
                    )}
                    {/* List of Services */}
                    <VStack mt={4} align="stretch">
                      {services.map((service, index) => (
                        <InputGroup key={index}>
                          {editIndex === index ? (
                            <Input
                              value={service}
                              onChange={(e) => setService(e.target.value)}
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
                              <EditIcon
                                onClick={() => handleEditService(index)}
                              />
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
                        value={prices.extraLarge}
                        onChange={(e) =>
                          setPrices({ ...prices, extraLarge: e.target.value })
                        }
                        color="white"
                      />
                    </InputGroup>
                    {errors && <p className="text-red-500">{errors.price}</p>}
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <button
                    className="bg-lime-600 hover:bg-lime-700 text-white font-semibold py-2 px-4 rounded"
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
          <div className="grid grid-cols-2 gap-5 mt-5">
            {dServices.map((service, index) => (
              <Card4 key={index} state={handle} service={service} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Service;
