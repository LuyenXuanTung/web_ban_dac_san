import React, { useContext, useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import SummaryApi from '../common';
import Context from '../context';
import CountProduct from '../context/countProduct';
import fetchCartItems from '../helpers/fetchCartItems';



const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  })
  const [showPassword,setShowPassword] = useState(false)
  const [err, setErr] = useState({
      email: "",
      password: "",
    });

    const { fetUserDetails } = useContext(Context)
    const { fetchCountProductInCart , setCartItems } = useContext(CountProduct)

  const handleOnChange = (e) => {
    const {name, value} = e.target

    if (value === "") {
      setErr((prev) => {
        return {
          ...prev,
          [name]: `Trường này không được để trống`,
        };
      });
    } else {
      setErr((prev) => {
        return {
          ...prev,
          [name]: "",
        };
      });
    }

    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
    
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.email === "" || data.password === "") {
      toast.error("Vui lòng nhập đầy đủ các trường");
    }
    else{

      const dataResponse = await fetch(SummaryApi.logIn.url,{
        method: SummaryApi.logIn.method,
        headers: {
          'content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
      })

      const reponse = await dataResponse.json()

      if(reponse.success){
        toast.success(reponse.message)
        fetUserDetails()
        fetchCountProductInCart()  
        fetchCartItems(setCartItems)
      }

      
      
      if(reponse.error){
        toast.error(reponse.message)
      }

    }
  };

  
  
  

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto shadow-2xl rounded-lg">
         
         <h1 className='text-center uppercase text-2xl font-semibold'>Đăng nhập</h1>
          <form className="pt-6 flex flex-col gap-2" 
          onSubmit={handleSubmit}
          >
            <div className="grid">
              <label>Email <span className='text-red-600 font-semibold'>*</span> </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="Nhập email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
              {
                err.email && (
                  <label className="text-red-600">
                  {err.email}
                </label>
                )
             }
            </div>
            <div>
              <label>Mật khẩu <span className='text-red-600 font-semibold'>*</span> </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
                <span
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {
                err.password && (
                  <label className="text-red-600">
                  {err.password}
                </label>
                )
             }
              <Link to={'/forgot-password'} className="block w-fit ml-auto hover:underline hover:text-green-600 mt-1">
                    Quên mật khẩu ?
              </Link>
            </div>

            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 w-full max-w-[150px] mx-auto block mt-5 rounded-full hover:scale-110 transition-all">
              Đăng nhập
            </button>
          </form>

            <p className="my-5 text-center">Bạn chưa có tài khoản ? <Link to={'/sign-up'} className="text-green-600 hover:text-green-700 hover:underline">Đăng ký</Link> </p>

        </div>
      </div>
    </section>
  )
}

export default Login
