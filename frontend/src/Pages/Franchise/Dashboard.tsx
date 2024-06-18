import { FaUsers, FaChartLine } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import ServiceManagement from '../../Components/franchise/Services';
import { useSelector } from 'react-redux';
import { getProfile } from "../../api/franchise";
import { getServices } from "../../api/admin";
import { RootState } from '../../redux/store';
import Analytics from '../../Components/franchise/Chart';

interface Service {
  serviceName: string;
  serviceId: string;
  timeToComplete: any;
  _id: string;
}

function Dashboard() {
  const [selectedComponent, setSelectedComponent] = useState(<Analytics />);
  const [state, setState] = useState(false);
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [availableServices, setAvailableServices] = useState<Service[]>([]);
  const [services, setServices] = useState([]);

  const { franchiseInfo } = useSelector(
    (state: RootState) => state.franchiseAuth
  );

  let available = {
    opening: openingTime,
    closing: closingTime,
    available: availableServices
  }

  useEffect(() => {
    getProfile(franchiseInfo._id).then((response) => {
      setOpeningTime(response?.data.openingTime);
      setClosingTime(response?.data.closingTime);
      setAvailableServices(response?.data.services);
      setState(false);
    });
  }, [state]);

  useEffect(() => {
    getServices().then((response) => {
      setServices(response?.data);
    });
  }, []);

  const handleState = (data: boolean) => {
    setState(data);
  };

  const dashboardItems = [
    {
      icon: FaChartLine,
      title: 'Analytics',
      description: 'Track site performance',
      component: <Analytics />,
    },
    {
      icon: FaUsers,
      title: 'Service Management',
      description: 'Add, edit, or remove services',
      component: <ServiceManagement services={services} available={available} Id={franchiseInfo._id} state={handleState} />,
    },
  ];

  const handleItemClick = (component: any) => {
    setSelectedComponent(component);
  };

  return (
    <div className="pt-16 w-full min-h-screen text-white relative overflow-hidden">
     <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: "url('/public/logo/pawBackground.jpg')" }}
      ></div>

      <div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row justify-center items-center h-[500px]">
        <div className="w-full md:w-1/4 lg:w-1/4 mb-8 md:mb-0">
          <div className="grid grid-cols-1 gap-6 w-[350px]">
            {dashboardItems.map(({ icon: Icon, title, description, component }, index) => (
              <div
                key={index}
                className="bg-gray-800 bg-opacity-80 rounded-lg p-6 flex flex-col items-center text-center hover:bg-opacity-70 transition-opacity duration-300 cursor-pointer"
                onClick={() => handleItemClick(component)}
              >
                <Icon className="text-4xl mb-4 text-blue-500" />
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-sm text-gray-400">{description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-3/4 lg:w-3/4">
          <div className="p-6 bg-gray-800 bg-opacity-80 rounded-lg h-[500px] w-full flex justify-start ">
            {selectedComponent || <p className="text-gray-400">Select an option to get started</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
