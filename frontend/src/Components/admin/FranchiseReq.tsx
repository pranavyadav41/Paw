import UserCard2 from "./Card2";
import { useState, useEffect } from "react";
import { getRequests } from "../../api/admin";

const FranchiseReq = () => {
  const [requests, setRequests] = useState([]);
  const [state, setState] = useState(false);

  const handle = (data: boolean) => {
    setState(data);
  };

  useEffect(() => {
    getRequests().then((response) => {
      setRequests(response?.data);
      setState(false);
    });
  }, [state]);

  return (
    <div className="p-6 bg-[#000000] min-h-screen w-full">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4 text-white">
          Franchise requests
        </h2>
        <div className="grid grid-cols-3 gap-5">
          {requests.map((request, index) => (
            <UserCard2 key={index} state={handle} request={request} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FranchiseReq;
