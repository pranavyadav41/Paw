import React, { useState, useEffect } from "react";
import UserCard3 from "./Card3";
import { getFranchises, blockFranchise, unBlockFranchise } from "../../api/admin";
import { toast } from "react-toastify";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Box,
} from "@chakra-ui/react";

interface franchise {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  district: string;
  city: string;
  pincode: string;
  state: string;
  isBlocked: boolean;
}

const FranchiseList = () => {
  const [franchises, setFranchises] = useState([]);
  const [selectedFranchise, setSelectedFranchise] = useState<any>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [state, setState] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(4);
  const [total, setTotal] = useState(0);

  const fetchFranchises = async () => {
    try {
      const response = await getFranchises(page, limit, searchTerm);
      console.log(response)
      setFranchises(response?.data.data);
      setTotal(response?.data.total);
      setState(false);
      const updatedFranchise = response?.data.data.find(
        (franchise: franchise) => franchise._id === selectedFranchise?._id
      );
      if (updatedFranchise) setSelectedFranchise(updatedFranchise);
    } catch (error) {
      console.error("Error fetching franchises:", error);
      toast.error("Failed to fetch franchises");
    }
  };

  useEffect(() => {
    fetchFranchises();
  }, [page, searchTerm, state]);

  const handle = (franchiseId: string) => {
    const data = franchises.find(
      (franchise: franchise) => franchise._id == franchiseId
    );
    if (data) {
      openModal(data);
    }
  };

  const handleBlock = (franchiseId: string, block: boolean) => {
    if (block == true) {
      unBlockFranchise({ franchiseId }).then((response) => {
        toast.success(response?.data, {
          position: "top-center",
        });
        setState(true);
      });
    }
    if (block == false) {
      blockFranchise({ franchiseId }).then((response) => {
        toast.success(response?.data, {
          position: "top-center",
        });
        setState(true);
      });
    }
  };

  const openModal = (franchise: franchise) => {
    setSelectedFranchise(franchise);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedFranchise(null);
    setModalIsOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6 bg-[#000000] min-h-screen w-full">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold mb-4 text-white">Franchise List</h2>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-3 py-2 border focus:outline-none rounded-md bg-black text-white"
          />
        </div>

        {franchises.map((franchise, index) => (
          <UserCard3 key={index} franchise={franchise} state={handle} />
        ))}

        <Flex justifyContent="center" mt={4}>
          <Box>
            <Button
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
              mr={2}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <Button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                colorScheme={page === pageNum ? "blue" : "gray"}
                mr={2}
              >
                {pageNum}
              </Button>
            ))}
            <Button
              disabled={page === totalPages}
              onClick={() => handlePageChange(page + 1)}
            >
              Next
            </Button>
          </Box>
        </Flex>
      </div>

      <Modal isOpen={modalIsOpen} onClose={closeModal} size="xl">
        <ModalOverlay />
        <ModalContent bg="#191C24">
          <ModalHeader textColor="white">Franchise Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedFranchise ? (
              <div className="flex flex-col gap-2">
                <h3 className="text-md font-medium text-white">
                  <span className="text-gray-200">NAME: </span>
                  {selectedFranchise.name}
                </h3>
                <p className="text-md font-medium text-white">
                  <span className="text-gray-200">EMAIL: </span>
                  {selectedFranchise.email}
                </p>
                <p className="text-md font-medium text-white">
                  <span className="text-gray-200">PHONE: </span>
                  {selectedFranchise.phone}
                </p>
                <h3 className="text-md font-medium text-white">
                  <span className="text-gray-200">CITY: </span>
                  {selectedFranchise.city}
                </h3>
                <p className="text-md font-medium text-white">
                  <span className="text-gray-200">DISTRICT: </span>
                  {selectedFranchise.district}
                </p>
                <p className="text-md font-medium text-white">
                  <span className="text-gray-200">STATE: </span>
                  {selectedFranchise.state}
                </p>
                <p className="text-md font-medium text-white">
                  <span className="text-gray-200">PINCODE: </span>
                  {selectedFranchise.pincode}
                </p>
              </div>
            ) : (
              <div>No franchise selected</div>
            )}
          </ModalBody>

          <ModalFooter>
            <div className="flex justify-start items-center">
              <Button
                colorScheme="blackAlpha"
                mr={3}
                onClick={closeModal}
                size="md"
              >
                Close
              </Button>
              <Button
                colorScheme={selectedFranchise?.isBlocked ? "red" : "green"}
                size="md"
                width="100px"
                onClick={() =>
                  handleBlock(
                    selectedFranchise._id,
                    selectedFranchise.isBlocked
                  )
                }
              >
                {selectedFranchise?.isBlocked ? "Unblock" : "Block"}
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default FranchiseList;