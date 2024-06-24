import { FaUsers, FaChartLine } from 'react-icons/fa';
import { useState } from 'react';
import ServiceManagement from '../../Components/franchise/Services';
import Analytics from '../../Components/franchise/Chart';

function Dashboard() {
  const [selectedComponent, setSelectedComponent] = useState(<Analytics />);
  const [activeItem, setActiveItem] = useState('Analytics');

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
      component: <ServiceManagement />,
    },
  ];

  const handleItemClick = (component:any, title:any) => {
    setSelectedComponent(component);
    setActiveItem(title);
  };

  return (
    <div className="pt-16 w-full min-h-screen text-white relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: "url('/public/logo/pawBackground.jpg')" }}
      ></div>
      <div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row justify-center items-start h-auto md:h-[500px]">
        <div className="w-full md:w-1/4 lg:w-1/4 mb-8 md:mb-0">
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-6 w-full md:w-[350px]">
            {dashboardItems.map(({ icon: Icon, title, description, component }, index) => (
              <div
                key={index}
                className={`bg-gray-800 bg-opacity-90 rounded-lg p-4 md:p-6 flex flex-col items-center text-center hover:bg-opacity-70 transition-opacity duration-300 cursor-pointer ${
                  activeItem === title ? 'border-2 border-blue-500' : ''
                }`}
                onClick={() => handleItemClick(component, title)}
              >
                <Icon className="text-3xl md:text-4xl mb-2 md:mb-4 text-blue-500" />
                <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">{title}</h3>
                <p className="text-xs md:text-sm text-gray-400 hidden md:block">{description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-3/4 lg:w-3/4">
          <div className="p-4 md:p-6 bg-gray-800 bg-opacity-90 rounded-lg h-[300px] md:h-[500px] w-full flex justify-start overflow-auto">
            {selectedComponent || <p className="text-gray-400">Select an option to get started</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;