import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const MenuItem = ({name, icon, show, link}) => {
  const location = useLocation()
  const isActive = location.pathname === link

  return (
    <Link to={link} className={`flex items-center ${show ? 'px-8' : 'justify-center'} ${isActive ? 'bg-slate-950 text-white' : ''} rounded-md py-3 text-lg cursor-pointer my-1 hover:bg-slate-200 hover:text-black line-clamp-1`}>
      <span>{icon}</span>
      {
        show && (<div  className='ml-4 line-clamp-1'>{name}</div>)
      }
    </Link>
  )
}

export default MenuItem
