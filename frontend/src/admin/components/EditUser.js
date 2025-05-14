import React, { useState } from 'react'
import role from '../../data/role'
import {IoMdClose} from 'react-icons/io'
import SummaryApi from '../../common'
import { toast } from 'react-toastify'


const EditUser = ({onclose, data, callFunc, label,change}) => {
  const [userRole, setUserRole] = useState(data.role)


    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value)
        
      }
        
      const updateUserRole = async () =>{
        const dataApi = await fetch(SummaryApi.updateRoleUser.url,{
            method: SummaryApi.updateRoleUser.method,
            headers:{
                "content-type":"application/json" 
            },
            credentials: 'include',
            body: JSON.stringify({
                userId: data._id,
                role: userRole
            })
        })

        const response = await dataApi.json()

        if(response.success){
            toast.success(response.message)
            onclose()
            callFunc()
        }

        if(response.error){
            toast.error(response.message)
           }
      }

      const hanleDeleteUser = async (status) =>{
        const dataApi = await fetch(SummaryApi.deleteUser.url,{
            method: SummaryApi.deleteUser.method,
            headers:{
                "content-type":"application/json" 
            },
            credentials: 'include',
            body: JSON.stringify({
                deleteUserId: data._id,
                status
            })
        })

        const response = await dataApi.json()

        if(response.success){
            toast.success(response.message)
            onclose()
            callFunc()
        }

        if(response.error){
            toast.error(response.message)
        }
      }
  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 w-full h-full z-[11] flex justify-center items-center bg-slate-200 bg-opacity-70">
      <div className="w-full bg-white shadow-md p-4 max-w-sm">
        <button
          className="ml-auto block text-lg rounded-full p-1 hover:bg-red-700 hover:text-white"
          onClick={onclose}
        >
          <IoMdClose />
        </button>
        {label && <h1 className="pb-4 text-lg font-medium">{label}</h1>}

        <p>Tên: {data.name}</p>
        <p>Email: {data.email} </p>

        {change === "UPDATE" && (
          <>
            <div className="flex items-center justify-between my-3">
              <p>Quyền truy cập: </p>
              <select
                className="border px-4 py-1"
                value={userRole}
                onChange={handleOnChangeSelect}
              >
                {Object.values(role).map((r) => {
                  return (
                    <option value={r.value} key={r.value}>
                      {r.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <button
              className="w-fit mx-auto block py-1 px-4 rounded-full bg-red-600 hover:bg-red-700 text-white"
              onClick={updateUserRole}
            >
              Cập nhật
            </button>
          </>
        )}

        {change === "DELETE" && (
          <>
            <h2 className='text-lg text-red-600 font-semibold my-3'>
              {
                data.status === true ? 'Bạn có chắc chắn xóa người dùng này?' : 'Bạn có muốn khôi phục người dùng này?'
              }
              
              </h2>
            <button
              className="w-fit mx-auto block py-1 px-4 rounded-full bg-red-600 hover:bg-red-700 text-white"
              onClick={() => hanleDeleteUser(data.status ? false : true)}
            >
              {
                data.status === true ? 'Xóa' : "Khôi phục"
              }
              
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default EditUser
