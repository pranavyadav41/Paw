import React, { useState } from "react";
import Modal from "react-modal";
import { approveRequest, rejectRequest } from "../../api/admin";
import { toast } from "react-toastify";

interface Request {
  _id: string;
  name: string;
  email: string;
  phone: string;
  area:string;
  city: string;
  district: string;
  state: string;
  pincode: string;
}

interface UserCard2Props {
  state: (data: boolean) => void;
  request: Request;
}

const UserCard2: React.FC<UserCard2Props> = ({ state, request }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reason, setReason] = useState("");

  const handleApprove = async (reqId: string) => {
    const response = await approveRequest({ reqId });

    if (response) {
      toast.success(response.data, {
        position: "top-center",
      });
      state(true);
    }
  };

  const handleReject = async (reqId: string, reason: string) => {
    const response = await rejectRequest({ reqId,reason});

    if (response) {
      toast.success(response.data.message, {
        position: "top-center",
      });
      state(true);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = () => {
    handleReject(request._id, reason);
    closeModal();
  };

  return (
    <div
      className="bg-[#191C24] rounded-lg shadow-md p-6 mb-4 transition duration-300"
      style={{ transform: "scale(1.01)", transitionDuration: "300ms" }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
    >
      <div className="flex items-start flex-col gap-2">
        <div className="flex flex-col gap-1">
          <h3 className="text-md font-medium text-white">
            <span className="text-gray-200">NAME: </span>
            {request.name}
          </h3>
          <p className="text-md font-medium text-white">
            <span className="text-gray-200">EMAIL: </span>
            {request.email}
          </p>
          <p className="text-md font-medium text-white">
            <span className="text-gray-200">PHONE: </span>
            {request.phone}
          </p>
          <h3 className="text-md font-medium text-white">
            <span className="text-gray-200">AREA: </span>
            {request.area}
          </h3>
          <h3 className="text-md font-medium text-white">
            <span className="text-gray-200">CITY: </span>
            {request.city}
          </h3>
          <p className="text-md font-medium text-white">
            <span className="text-gray-200">DISTRICT: </span>
            {request.district}
          </p>
          <p className="text-md font-medium text-white">
            <span className="text-gray-200">STATE: </span>
            {request.state}
          </p>
          <p className="text-md font-medium text-white">
            <span className="text-gray-200">PINCODE: </span>
            {request.pincode}
          </p>
        </div>
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => handleApprove(request._id)}
            className="bg-lime-600 hover:bg-lime-700 text-white font-semibold py-2 px-4 rounded"
          >
            Approve
          </button>
          <button
            onClick={openModal}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
          >
            Reject
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Reject Reason"
        style={{
          content: {
            width: "500px",
            height: "300px",
            margin: "auto",
            padding: "20px",
            borderRadius: "8px",
            background: "#1f2937",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <h2 className="text-lg font-semibold text-white">
          Reason for Rejection
        </h2>
        <textarea
          className="w-full mt-2 p-2 border rounded"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter reason for rejection"
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSubmit}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded mr-2"
          >
            Submit
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default UserCard2;
