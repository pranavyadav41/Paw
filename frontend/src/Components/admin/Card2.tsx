import { approveRequest } from "../../api/admin"
import { rejectRequest } from "../../api/admin"

interface Request{
  _id:string
  name:string,
  email:string,
  phone:string,
  city:string,
  district:string,
  state:string,
  pincode:string
} 
interface UserCard2Props {
  state:(data:boolean)=>void
  request:Request
}

const UserCard2: React.FC<UserCard2Props> = ({
  state,
  request
}) => {

  const handleApprove = async(reqId:string)=>{

    const response = await approveRequest({reqId})

    if(response){
      console.log(response)
      state(true)
    }

  }

  const handleReject = async(reqId:string)=>{
    console.log("clicked")

    const response=await rejectRequest({reqId})

    if(response){
      console.log(response)
      state(true)
    }

  }
  return (
    <div
    className="bg-[#191C24] rounded-lg shadow-md p-6 mb-4  transition duration-300"
    style={{ transform: 'scale(1.01)', transitionDuration: '300ms' }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.01)'}
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

        <button onClick={()=>handleApprove(request._id)} className="bg-lime-600 hover:bg-lime-700 text-white font-semibold py-2 px-4 rounded">Approve</button>
        <button onClick={()=>handleReject(request._id)} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded">Reject</button>

        </div>
      </div>
    </div>
  );
};

export default UserCard2;
