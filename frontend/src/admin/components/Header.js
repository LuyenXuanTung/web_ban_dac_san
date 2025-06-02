import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../../common';
import { setUserDetails } from "../../store/userSlice";
import { toast } from 'react-toastify';



const Header = ({show, wFull, wShort, handleNavbar}) => {

  const user = useSelector((state) => state?.user?.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  
  const handleLogout = async () => {
    const dataApi = await fetch(SummaryApi.logOut.url,{
      method: SummaryApi.logOut.method,
      credentials: 'include'
    })

    const dataResponse = await dataApi.json()

    if(dataResponse.success){
      toast.success(dataResponse.message)
      navigate('/')
      dispatch(setUserDetails(null))
      localStorage.removeItem('user')
    }
  }

  return (
    <>
      <header className={`fixed top-0 ${show ? 'pl-64' : 'pl-16'} h-16 bg-white w-full z-1 transition-all`}>
        <div className="h-full px-4 flex justify-between items-center">
          <div className='text-black text-2xl cursor-pointer p-2 hover:rounded-full hover:bg-slate-200'
            onClick={handleNavbar}
          >
            <IoMdMenu />
          </div>

          <div className="flex min-w-[220px] text-sm justify-center text-white items-center">
           
              <div className='className="p-3 rounded-full bg-green-600 cursor-pointer hover:bg-green-700'>
                {user?._id && (
                  <div className="showAcc relative">
                    <div className="block p-3">
                      <FaUser />
                    </div>
                    <div className="showAcc-list hidden absolute top-[100%] left-0 max-h-[200px] max-w-[200px] min-w-[170px] shadow-[0_0_10px_2px_rgba(0,0,0,0.2)] py-2 bg-white text-base rounded-lg">
                      <button
                        className="px-4 py-2 text-black w-full text-center hover:bg-slate-200"
                        onClick={handleLogout}
                      >
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className='text-base'>
                <div className='text-black pl-4 line-clamp-1 capitalize'>{user?.name}</div>
                <div className='text-black pl-4'>{user?.role === "ADMIN" && 'Quản trị viên'}</div>
              </div>

          </div>
        </div>
      </header>
    </>
  );
}

export default Header
