import React from 'react'
import { motion } from "framer-motion";
import StatCard from '../components/analyst/StatCard';
import SalesOverviewChart from '../components/analyst/SalesOverviewChart';


const DashBoard = () => {
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
  					<StatCard name='Total Sales' 
            // icon={Zap}
             value='$12,345' color='#6366F1' />
  					<StatCard name='New Users' 
            // icon={Users} 
            value='1,234' color='#8B5CF6' />
  					<StatCard name='Total Products' 
            // icon={ShoppingBag}
             value='567' color='#EC4899' />
  					<StatCard name='Conversion Rate'
            //  icon={BarChart2}
             value='12.5%' color='#10B981' />
  				</motion.div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					  <SalesOverviewChart />
					  {/* <CategoryDistributionChart /> */}
					  {/* <SalesChannelChart /> */}
				</div>
      </div>
    </div>
  )
}

export default DashBoard
