import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { weeklyReport, monthlyReport, yearlyReport,getStats} from "../../api/franchise";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface report {
  name: String;
  totalBookings: number;
  totalEarnings: number;
}

const MyAreaChart = () => {
  const [dateRange, setDateRange] = useState("weekly");
  const [report, setReport] = useState<report[]>([]);
  const [totalCount,setTotalCount] = useState(0)
  const [appointments,setAppointments] = useState(0)

  const { franchiseInfo } = useSelector(
    (state: RootState) => state.franchiseAuth
  );

  const handleDateRangeChange = (range: any) => {
    setDateRange(range);
  };

  useEffect(() => {

    getStats(franchiseInfo._id).then((response) => {
      setTotalCount(response?.data.totalcount)
      setAppointments(response?.data.appointments)
    })


    if (dateRange == "weekly") {
      weeklyReport(franchiseInfo._id).then((response) => {
        console.log(response?.data);

        setReport(response?.data);
      });
    } else if (dateRange == "monthly") {
      monthlyReport(franchiseInfo._id).then((response) =>
        setReport(response?.data)
      );
    } else if (dateRange == "yearly") {
      yearlyReport(franchiseInfo._id).then((response) =>
        setReport(response?.data)
      );
    }
  }, [dateRange]);

  return (
    <div className="flex">
      <div className="flex flex-col  items-center">
        <ResponsiveContainer width={700} height={400}>
          <AreaChart
            width={730}
            height={400}
            data={report}
            margin={{ top: 10, right: 40, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id="colorTotalBookings"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient
                id="colorTotalEarnings"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="totalBookings"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorTotalBookings)"
            />
            <Area
              type="monotone"
              dataKey="totalEarnings"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorTotalEarnings)"
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="mt-4">
          <div className="flex space-x-2 mt-1"> 
            <button
              className={`px-2 py-1 rounded ${
                dateRange === "weekly"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 text-gray-400"
              }`}
              onClick={() => handleDateRangeChange("weekly")}
            >
              Weekly
            </button>
           
            <button
              className={`px-2 py-1 rounded ${
                dateRange === "yearly"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 text-gray-400"
              }`}
              onClick={() => handleDateRangeChange("yearly")}
            >
              Yearly 
            </button>
             <button
              className={`px-2 py-1 rounded ${
                dateRange === "monthly"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 text-gray-400"
              }`}
              onClick={() => handleDateRangeChange("monthly")}
            >
              Monthly
            </button>
          </div>
        </div>
      </div>
      <div className=" p-6 mt-2 bg-gray-800 bg-opacity-50 rounded-lg max-w-md w-[350px] h-[270px]">
        <h2 className="text-2xl font-bold mb-4">Quick Stats</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <p className="text-gray-400">Total Bookings</p>
            <p className="text-3xl font-bold">{totalCount}</p>
          </div>
          <div>
            <p className="text-gray-400">Today's Appointments</p>
            <p className="text-3xl font-bold">{appointments}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAreaChart;




