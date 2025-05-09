import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SummaryApi from "../common";

const SignUp = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [err, setErr] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

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
        [name]: value,
      };
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (
      data.email === "" ||
      data.name === "" ||
      data.password === "" ||
      data.confirmPassword === ""
    ) {
      toast.error("Vui lòng nhập đầy đủ các trường");
    } else {
      if (data.password === data.confirmPassword) {
        const dataResponse = await fetch(SummaryApi.signUp.url,
          {
            method: SummaryApi.signUp.method,
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify(data)
          }
        )

        const reponse = await dataResponse.json()
       
        if(reponse.success){
          toast.success(reponse.message)
          navigate('/login')
        }
  
        if(reponse.error){
          toast.error(reponse.message)
        }
       

      } else {
        toast.error("Vui lòng kiểm tra lại mật khẩu");
      }
    }
      
    
  }

  return (
    <section id="signin">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto shadow-2xl rounded-lg">
          <h1 className="text-center uppercase text-2xl font-semibold">
            Đăng ký
          </h1>
          <form
            className="pt-6 flex flex-col gap-2"
            onSubmit={handleSubmit}
          >
            <div>
              <label>
                Tên <span className="text-red-600 font-semibold">*</span>{" "}
              </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="Nhập tên"
                  name="name"
                  
                  value={data.name}
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
             {
                err.name && (
                  <label className="text-red-600">
                  {err.name}
                </label>
                )
             }
                
            </div>

            <div>
              <label>
                Email <span className="text-red-600 font-semibold">*</span>{" "}
              </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
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
              <label>
                Mật khẩu <span className="text-red-600 font-semibold">*</span>{" "}
              </label>
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
            </div>

            <div>
              <label>
                Xác nhận mật khẩu{" "}
                <span className="text-red-600 font-semibold">*</span>{" "}
              </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="nhập xác nhận mật khẩu"
                  name="confirmPassword"
                  
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
                <span
                  className="cursor-pointer text-xl"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {
                err.confirmPassword && (
                  <label className="text-red-600">
                  {err.confirmPassword}
                </label>
                )
             }
            </div>

            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 w-full max-w-[150px] mx-auto block mt-5 rounded-full hover:scale-110 transition-all">
              Đăng ký
            </button>
          </form>

          <p className="my-5 text-center">
            Bạn đã có tài khoản ?{" "}
            <Link
              to={"/login"}
              className="text-green-600 hover:text-green-700 hover:underline"
            >
              Đăng nhập
            </Link>{" "}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
