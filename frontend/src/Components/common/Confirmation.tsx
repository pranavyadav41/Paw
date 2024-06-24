import React from "react";
import { useNavigate } from "react-router-dom";

interface IncomingCallProps {
  from: string;
  roomId: string;
  onDecline: () => void;
}

const IncomingCallNotification: React.FC<IncomingCallProps> = ({
  from,
  roomId,
  onDecline,
}) => {
  const navigate = useNavigate();

  const handleAccept = () => {
    const role = from === "user" ? "provider" : "user";
    if (from === "user") {
      navigate(`franchise/videoChat?roomID=${roomId}&role=${role}`);
    } else if (from === "provider") {
      navigate(`/videoChat?roomID=${roomId}&role=${role}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Incoming Call</h2>
        <p className="text-gray-600 mb-6">Call from: {from}</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
          >
            Accept
          </button>
          <button
            onClick={onDecline}
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomingCallNotification;
