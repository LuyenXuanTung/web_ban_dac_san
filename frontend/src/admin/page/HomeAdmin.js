import React, { useState } from 'react'
import Header from '../components/Header'
import { Outlet, redirect } from 'react-router-dom'
import SideBar from '../components/SideBar'
import { useSelector } from 'react-redux'




function HomeAdmin() {

  const [navbarWidth, setNavbarWidth] = useState(true)
  const user = useSelector((state) => state?.user?.user)
  if(user?.role !== "ADMIN"){
    redirect("/")
  }
  

  const handleNavbar  = () =>{
    setNavbarWidth(prev => !prev)
  }

  return (
    <div>
      <SideBar show={navbarWidth}/>
      <Header show={navbarWidth} handleNavbar={handleNavbar}/>
      <div className={`${navbarWidth ? 'pl-64' : 'pl-16'} bg-gray-200 min-h-[100vh] pt-16 transition-all`}>
        <Outlet/>
      </div>
    </div>
    
  )
}

export default HomeAdmin
