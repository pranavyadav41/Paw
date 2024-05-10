import UserCard3 from "./Card3";
import { useState, useEffect } from "react";
import { getFranchises } from "../../api/admin";
import { blockFranchise, unBlockFranchise } from "../../api/admin";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import "./modal.css";

const FranchiseList = () => {
  const [franchises, setFranchises] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFranchise, setSelectedFranchise] = useState<any>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [state, setState] = useState(false);

  const handle = (franchiseId: string) => {
    const data = franchises.find(
      (franchise: any) => franchise._id == franchiseId
    );
    if (data) {
      openModal(data);
    }
  };

  const handleBlock = (franchiseId: string, block: boolean) => {
    if (block == true) {
      console.log("hello");
      unBlockFranchise({ franchiseId }).then((response) => {
        console.log(response);
        setState(true);
      });
    }
    if (block == false) {
      blockFranchise({ franchiseId }).then((response) => {
        console.log(response);
        setState(true);
      });
    }
  };

  const openModal = (franchise: any) => {
    setSelectedFranchise(franchise);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedFranchise(null);
    setModalIsOpen(false);
  };

  useEffect(() => {
    getFranchises().then((response: any) => {
      setFranchises(response.data);
      setState(false);
    });
  }, [state]);

  const filteredUsers = franchises.filter((franchise: any) =>
    `${franchise.name} ${franchise.city} ${franchise.district}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-[#000000] min-h-screen w-full">
      <div className="container mx-auto px-4">
        <div className=" flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold mb-4 text-white">Franchise List</h2>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border focus:outline-none rounded-md bg-black text-white"
          />
        </div>

        {filteredUsers.map((franchise, index) => (
          <UserCard3 key={index} franchise={franchise} state={handle} />
        ))}
      </div>
      <Modal isOpen={modalIsOpen} onClose={closeModal} size="xl">
        <ModalOverlay />
        <ModalContent bg="#b4e0ab">
          <ModalHeader>Franchise Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedFranchise ? (
              <div className="flex flex-col gap-2">
                <h3 className="text-md font-medium text-gray-700">
                  <span className="text-gray-500">NAME: </span>
                  {selectedFranchise.name}
                </h3>
                <p className="text-md font-medium text-gray-700">
                  <span className="text-gray-500">EMAIL: </span>
                  {selectedFranchise.email}
                </p>
                <p className="text-md font-medium text-gray-700">
                  <span className="text-gray-500">PHONE: </span>
                  {selectedFranchise.phone}
                </p>
                <h3 className="text-md font-medium text-gray-700">
                  <span className="text-gray-600">CITY: </span>
                  {selectedFranchise.city}
                </h3>
                <p className="text-md font-medium text-gray-700">
                  <span className="text-gray-600">DISTRICT: </span>
                  {selectedFranchise.district}
                </p>
                <p className="text-md font-medium text-gray-700">
                  <span className="text-gray-600">STATE: </span>
                  {selectedFranchise.state}
                </p>
                <p className="text-md font-medium text-gray-700">
                  <span className="text-gray-600">PINCODE: </span>
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
