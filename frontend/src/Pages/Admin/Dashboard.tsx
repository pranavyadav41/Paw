import MyAreaChart from '../../Components/admin/Chart';


function Dashboard() {


  // const dashboardItems = [
  //   { icon: FaUsers, title: 'User Management', description: 'Add, edit, or remove users' },
  //   { icon: FaCalendarAlt, title: 'Appointments', description: 'View and manage schedules' },
  //   { icon: FaChartLine, title: 'Analytics', description: 'Track site performance' },
  //   { icon: FaCog, title: 'Settings', description: 'Configure site options' },
  // ];

  return (
    <div className="pt-16 w-full min-h-screen text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black z-10"></div>
      
      <div className="relative z-20 container mx-auto px-4 py-10 flex flex-col justify-center items-center h-full">
        
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {dashboardItems.map(({ icon: Icon, title, description }, index) => (
            <div 
              key={index}
              className="bg-black bg-opacity-50 rounded-lg p-6 flex flex-col items-center text-center hover:bg-opacity-70 transition-opacity duration-300"
            >
              <Icon className="text-4xl mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-sm text-gray-400">{description}</p>
            </div>
          ))}
        </div> */}
        
       <MyAreaChart/>
      </div>
    </div>
  );
};

export default Dashboard;
