import React from 'react'
import { motion } from "framer-motion";
import StatCard from '../components/analyst/StatCard';
import SalesOverviewChart from '../components/analyst/SalesOverviewChart';
import { FaRegMoneyBillAlt,FaShoppingBag  } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { FaClipboardList  } from "react-icons/fa6";
import SummaryApi from '../../common';
import formatPrice from '../../helpers/formatMoney';
import CategoryDistributionChart from '../components/analyst/CategoryDistributionChart';



const DashBoard = () => {

  let [data, setData] = React.useState({
    total_price: 0,
    total_product: 0,
    total_user: 0,
    total_order: 0,
  });


  const fetchData = async () => {
    const response = await fetch(SummaryApi.getDashBoard.url, {
      method: SummaryApi.getDashBoard.method,
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    const data = await response.json();
    
    
    if (data.success) {
      setData(data.data);
    } 
  }

  console.log(data);
  
  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='p-4'>
  				
      <div className=' hide-scroll py-4 px-1 h-[calc(100vh-100px)] overflow-y-scroll'>
        <h1 className='text-2xl font-semibold text-black'>Thống kê</h1>
        <motion.div
  					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8 mt-3'
  					initial={{ opacity: 0, y: 20 }}
  					animate={{ opacity: 1, y: 0 }}
  					transition={{ duration: 1 }}
  				>
  					<StatCard name='Doanh thu' 
            icon={FaRegMoneyBillAlt}
             value={formatPrice(data.total_price)} color='text-gray-100' />
  					<StatCard name='Người dùng' 
            icon={FiUsers} 
            value={data.total_user} color='text-gray-100' />
  					<StatCard name='Sản phẩm' 
            icon={FaShoppingBag}
             value={data.total_product} color='text-gray-100' />
  					<StatCard name='Đơn hàng'
             icon={FaClipboardList}
             value={data.total_order} color='text-gray-100' />
  				</motion.div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					  <SalesOverviewChart />
					  <CategoryDistributionChart />
				</div>
      </div>
    </div>
  )
}

export default DashBoard
