import { CheckIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { deleteService } from "../../api/admin";
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
  const handleEdit = () => {
    // Handle edit action here
    console.log("Edit clicked");
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
          <div className="flex justify-between items-center ">
            <h3 className="text-md font-bold text-white text-xl">
              {service.category}
            </h3>
            {/* <div className="flex gap-2 ml-3">
            <EditIcon
              boxSize={4}
              color="#5F7093"
              cursor="pointer"
              onClick={handleEdit}
            />
            <DeleteIcon
              boxSize={4}
              color="#5F7093" 
              cursor="pointer"
              onClick={handleDelete}
            />
          </div> */}
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
    </div>
  );
};

export default Card4;
