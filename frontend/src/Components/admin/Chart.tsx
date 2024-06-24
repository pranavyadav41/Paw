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
import {
  monthlyReport,
  weeklyReport,
  yearlyReport,
  getStats,
  getFranchisesData,
  franchiseweeklyReport,
  franchisemonthlyReport,
  franchiseyearlyReport,
  franchiseStats,
} from "../../api/admin";

interface report {
  name: string;
  totalBookings: number;
  totalEarnings: number;
}

interface franchise {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  district: string;
  city: string;
  pincode: string;
  state: string;
  isBlocked: boolean;
}

const MyAreaChart = () => {
  const [dateRange, setDateRange] = useState("weekly");
  const [report, setReport] = useState<report[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [franchiseCount, setFranchiseCount] = useState(0);
  const [franchises, setFranchises] = useState<franchise[]>([]);
  const [selectedFranchise, setSelectedFranchise] = useState<string | null>(
    null
  );
  const [franchiseStat, setFranchiseStat] = useState<{
    totalBooking: number;
    totalEarning: number;
  }>({ totalBooking: 0, totalEarning: 0 });

  const handleDateRangeChange = (range: string) => {
    setDateRange(range);
  };

  useEffect(() => {
    if (selectedFranchise) {
      if (dateRange === "weekly") {
        franchiseweeklyReport(selectedFranchise).then((response) => {
          0;
          setReport(response?.data);
        });
      } else if (dateRange === "monthly") {
        franchisemonthlyReport(selectedFranchise).then((response) =>
          setReport(response?.data)
        );
      } else if (dateRange === "yearly") {
        franchiseyearlyReport(selectedFranchise).then((response) =>
          setReport(response?.data)
        );
      }
    }
  }, [selectedFranchise, dateRange]);

  useEffect(() => {
    if (!selectedFranchise) {
      if (dateRange === "weekly") {
        weeklyReport().then((response) => {
          setReport(response?.data);
        });
      } else if (dateRange === "monthly") {
        monthlyReport().then((response) => setReport(response?.data));
      } else if (dateRange === "yearly") {
        yearlyReport().then((response) => setReport(response?.data));
      }
    }
  }, [dateRange, selectedFranchise]);

  useEffect(() => {
    getStats().then((response) => {
      setTotalCount(response?.data.totalcount);
      setFranchiseCount(response?.data.totalfranchises);
    });

    getFranchisesData().then((response) => {
      setFranchises(response?.data);
    });
  }, []);

  useEffect(() => {
    if (selectedFranchise) {
      franchiseStats(selectedFranchise).then((response) => {
        console.log(response?.data);
        setFranchiseStat(response?.data);
      });
    }
  }, [selectedFranchise]);

  return (
    <div className="flex">
      <div className="flex flex-col items-center gap-5">
        <AreaChart
          width={700}
          height={400}
          data={report}
          margin={{ top: 10, right: 40, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorTotalBookings" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorTotalEarnings" x1="0" y1="0" x2="0" y2="1">
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
      <div className="flex flex-col gap-3">
        <div className="p-1">
          <select
            className="px-9 py-2 bg-[#0F141B] text-white"
            onChange={(e) => setSelectedFranchise(e.target.value)}
          >
            <option value="">Total analytics</option>
            {franchises.map((franchise: franchise) => (
              <option key={franchise._id} value={franchise._id}>
                {franchise.name} - {franchise.city}, {franchise.district}
              </option>
            ))}
          </select>
        </div>
        {!selectedFranchise && <div className="p-6 mt-1 bg-gray-800 bg-opacity-50 rounded-lg max-w-md w-[350px] h-[270px]">
          <h2 className="text-2xl font-bold mb-4">Quick Stats</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <p className="text-gray-400">Total Bookings</p>
              <p className="text-3xl font-bold">{totalCount}</p>
            </div>
            <div>
              <p className="text-gray-400">Total Franchises</p>
              <p className="text-3xl font-bold">{franchiseCount}</p>
            </div>
          </div>
        </div>}
       {selectedFranchise && <div className="p-6 mt-1 bg-gray-800 bg-opacity-50 rounded-lg max-w-md w-[350px] h-[270px]">
          <h2 className="text-2xl font-bold mb-4">Franchise Stats</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <p className="text-gray-400">Total Bookings</p>
              <p className="text-3xl font-bold">{franchiseStat.totalBooking}</p>
            </div>
            <div>
              <p className="text-gray-400">Total Earning</p>
              <p className="text-3xl font-bold">{franchiseStat.totalEarning}</p>
            </div>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default MyAreaChart;
