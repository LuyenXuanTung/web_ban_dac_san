import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.jpg'
import {FaUser,FaAngleDown } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import category from '../data/category';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { setUserDetails } from "../store/userSlice";
import { toast } from 'react-toastify';
import SearchProduct from './SearchProduct';
import Cart from './Cart';



const Header = () => {

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
      <header className="h-20 bg-white fixed w-full z-50">
        <div className="h-full container mx-auto p-4 flex justify-between items-center">
          <div>
            <Link to={"/"}>
              <img src={logo} alt="logo" w={90} h={50} />
            </Link>
          </div>

          <SearchProduct />

          <div className="flex min-w-[220px] justify-end text-sm text-white items-center">
            {user?._id && (
              <Cart />
            )}

            <div className='className="p-3 rounded-full bg-green-600 cursor-pointer hover:bg-green-700'>
              {user?._id ? (
                <div className="showAcc relative">
                  <div className="block p-3">
                    <FaUser />
                  </div>
                  <div className="showAcc-list hidden absolute top-[100%] right-0 max-h-[200px] max-w-[200px] min-w-[170px] shadow-[0_0_10px_2px_rgba(0,0,0,0.2)] py-2 bg-white text-base rounded-lg">
                    <h3 className="text-center text-xl cursor-default text-green-600">
                      {user?.name}
                    </h3>
                    <div className="px-4 py-2 text-black w-full text-center hover:bg-slate-200">
                      Tài khoản
                    </div>
                    <div className="py-2 text-black w-full text-center hover:bg-slate-200">
                      Đơn hàng của bạn
                    </div>
                    <button
                      className="px-4 py-2 text-black w-full text-center hover:bg-slate-200 border-t-[1px] border-t-slate-400"
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </button>
                  </div>
                </div>
              ) : (
                <Link to={"/login"} className="block p-3">
                  {" "}
                  <FaUser />
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="bg-slate-100 md:h-fit w-full shadow-md">
          <div className="container mx-auto px-4 flex justify-between items-center h-full">
            <div className="category max-w-[250px] bg-green-600 text-white p-2 relative">
              <h3 className="flex items-center cursor-default">
                <span className="text-2xl p-1">
                  <IoMdMenu />
                </span>
                <div className="ml-3 font-semibold">Chuyên mục</div>
                <span className="ml-6 text-sm px-2">
                  <FaAngleDown />
                </span>
              </h3>

              <div className="category-list hidden absolute top-[100%] left-0 bg-white text-black w-full shadow-xl pb-4">
                {category.map((c, index) => {
                  return (
                    <div className="py-2 px-4 border-t-[1px] border-slate-200 cursor-pointer hover:bg-slate-200 ">
                      <h3>{c}</h3>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-12 text-black">
              <Link
                to={"/"}
                className="hover:text-green-600 cursor-pointer font-semibold"
              >
                Trang chủ
              </Link>
              <Link
                to={"/product"}
                className="hover:text-green-600 cursor-pointer font-semibold"
              >
                Sản phẩm
              </Link>
              <div className="hover:text-green-600 cursor-pointer font-semibold">
                Giới thiệu
              </div>
              <div className="hover:text-green-600 cursor-pointer font-semibold">
                Liên hệ
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header
