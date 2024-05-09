import React from "react";

interface Franchise{
  _id:string
  name:string,
  email:string,
  phone:string,
  city:string,
  district:string,
  state:string,
  pincode:string 
}

interface UserCard3Props {
  franchise:Franchise;
  state:(data: boolean) => void
}

const UserCard3:React.FC<UserCard3Props> = ({franchise,state}) => {

  const viewDetail =(franchiseId:string)=>{

    console.log(franchiseId)
    state(true)

  } 
  return (
    <div
      className="bg-[#191C24] rounded-lg shadow-md p-6 mb-4 w-full transition duration-300"
      style={{ transform: "scale(1.01)", transitionDuration: "300ms" }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
    >
      <div className="flex items-center justify-between ">
        <div className="flex flex-col gap-1">
          <h3 className="text-md font-medium text-white">
            <span className="text-gray-200">OWNER NAME: </span> 
            {franchise.name}
          </h3>
          <p className="text-md font-medium text-white">
            <span className="text-gray-200">LOCATION: </span>
            {franchise.city},{franchise.district}
          </p>
          <p className="text-md font-medium text-white">
            <span className="text-gray-200">STATUS: </span>
            BLOCKED
          </p>
        </div>
        <button onClick={()=>viewDetail(franchise._id)} className="bg-lime-600 hover:bg-lime-700 text-white font-semibold py-2 px-4 rounded">View Details</button>
      </div>
    </div>
  );
};

export default UserCard3;
