import { CheckIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";

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

interface UserCardProps {
  service: Service;
  state: (data: boolean) => void;
}

const Card4: React.FC<UserCardProps> = ({ service, state }) => {
  const handleEdit = () => {
    // Handle edit action here
    console.log("Edit clicked");
  };

  const handleDelete = () => {
    // Handle delete action here
    console.log("Delete clicked");
  };

  return (
    <div className="bg-[#191C24] rounded-lg shadow-md p-6 mb-4 transition duration-300">
      <div className="flex items-start flex-col gap-2">
        <div className="flex justify-between items-center w-full">
          <h3 className="text-md font-bold text-white text-xl">{service.category}</h3>
          <div className="flex gap-3 ml-3">
            {/* Edit Icon */}
            <EditIcon
              boxSize={4}
              color="#5F7093"
              cursor="pointer"
              onClick={handleEdit}
            />
            {/* Delete Icon */}
            <DeleteIcon
              boxSize={4}
              color="#5F7093"
              cursor="pointer"
              onClick={handleDelete}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {service.services.map((serviceItem, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckIcon color="#5F7093" />
              <p className="text-[#5F7093]">{serviceItem}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mt-3">
          {Object.entries(service.price).map(([size, price]) => (
            <div key={size} className="w-32 h-16 bg-black flex justify-center items-center rounded-md">
              <p className="text-gray-300">{size.charAt(0).toUpperCase() + size.slice(1)}-</p>
              <p className="text-gray-300">&#8377;{price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card4;
