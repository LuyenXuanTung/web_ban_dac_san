import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SummaryApi from "../../../common";
import { toast } from "react-toastify";
import { FaFilter } from "react-icons/fa";



const SalesOverviewChart = () => {
	const [startDate,setStartDate] = useState("2025-01-01");
	const [endDate, setEndDate] = useState("2025-12-31");
  const [salesData, setSalesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

	const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === "startDate") {
      setStartDate(value);
    } else if (name === "endDate") {
      setEndDate(value);
    }
  };


  const fetchSalesData = async () => {
    setIsLoading(true);
    const dataApi = await fetch(SummaryApi.getSalesByMonth.url, {
      method: SummaryApi.getSalesByMonth.method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ startDate, endDate }),
    });
    const data = await dataApi.json();
    if (data.success) {
      setSalesData(data.data);
      toast.success(data.message || "Lấy dữ liệu doanh thu thành công");
    }
    if (data.error) {
      toast.error(data.message || "Lỗi khi lấy dữ liệu doanh thu");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSalesData();
  }, []);

    const handleSubmit = (e) => {
      e.preventDefault();
      // Here you can handle the date filtering logic
      fetchSalesData();
    };

    return (
      isLoading ? (
        <>
          <motion.div
            className="bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex justify-center items-center h-80">
              <div className="text-gray-500 text-lg">Đang tải dữ liệu...</div>
            </div>
          </motion.div>
        </>
      ) : (
        <motion.div
          className="bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-black">Doanh thu</h2>
            <div className="flex gap-6">
              <input
                type="date"
                value={startDate}
                name="startDate"
                onChange={handleOnChange}
                className="bg-gray-100 border border-black rounded-md"
              />
              <input
                type="date"
                value={endDate}
                name="endDate"
                onChange={handleOnChange}
                className="bg-gray-100 border border-black rounded-md"
              />
            </div>
            <div
              onClick={handleSubmit}
              className="text-gray-800 py-2 px-3 border border-gray-500 rounded-md hover:bg-gray-400 hover:border-transparent hover:text-white cursor-pointer"
            >
              <FaFilter/>
            </div>
          </div>

          <div className="h-80">
            <ResponsiveContainer width={"100%"} height={"100%"}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                <XAxis dataKey={"month"} stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(31, 41, 55, 0.8)",
                    borderColor: "#4B5563",
                  }}
                  itemStyle={{ color: "#E5E7EB" }}
                />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#6366F1"
                  strokeWidth={3}
                  dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )
    );
  };

export default SalesOverviewChart
