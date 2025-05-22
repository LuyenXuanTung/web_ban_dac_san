import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.jpg'
import icon from '../../assets/icon.png'
import MenuItem from './MenuItem'
import { IoMdHome } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FaClipboardList,FaWarehouse  } from "react-icons/fa6";
import { RiDiscountPercentFill } from "react-icons/ri";
import { IoCubeSharp } from 'react-icons/io5';



const SideBar = ({show}) => {


  return (
    <div className={`fixed top-0 left-0 ${show ? 'w-64' : 'w-16'} max-w-[260px] bg-white z-10 transition-all`}>
        <div className={`w-full h-16 flex shadow-lg items-center justify-center `}>
            <Link to={"/admin"}>
              <img src={show ? logo : icon} alt="logo"className='h-12 w-full transition-[opacity_0.3s_ease-in-out] object-content'/>
            </Link>
          </div>
      
      <div className='hide-scroll w-full overflow-auto p-2' style={{ height: 'calc(100vh - 16px)' }}>
        <MenuItem name={show && "Thống kê"} icon={ <IoMdHome/>} show={show} link={'/admin'}/>
        <MenuItem name={show && "Người dùng"} icon={<FaUser/>} show={show} link={'/admin/user'}/>
        <MenuItem name={show && "Sản phẩm"} icon={<IoCubeSharp/>} show={show} link={'/admin/product'}/>
        <MenuItem name={show && "Kho hàng"} icon={<FaWarehouse/>} show={show} link={'/admin/warehouse'}/>
        <MenuItem name={show && "Khuyến mãi"} icon={<RiDiscountPercentFill/>} show={show} link={'/admin/promotion'}/>
        <MenuItem name={show && "Đơn hàng"} icon={<FaClipboardList/>} show={show} link={'/admin/order'}/>
      </div>
    </div>
  )
}

export default SideBar
