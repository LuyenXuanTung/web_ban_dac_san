import React, { useEffect, useState } from 'react'
import moment from 'moment'
import {MdModeEdit} from 'react-icons/md'
import { MdDeleteForever,MdRestoreFromTrash } from "react-icons/md";
import SummaryApi from '../../common'
import { toast } from 'react-toastify'
import EditUser from '../components/EditUser'


const User = () => {
    const [allUsers, setAllUsers] = useState([])
    const [openUpdateRole, setOpenUpdateRole] = useState(false)
    const [openDeleteUser, setOpenDeleteUser] = useState(false)
    const [updateUserDetails, setUpdateUserDetails] = useState({
        _id:'',
        email: '',
        name: "",
        role: ""
    })

    const fetchAllUsers = async () => {
        const dataApi = await fetch(SummaryApi.getAllUser.url,{
            method: SummaryApi.getAllUser.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            }
        })

        const response = await dataApi.json()

        if(response.success){
            setAllUsers(response.data)
        }

        if(response.error){
            toast.error(response.message)
        }
    }

    useEffect(() => {
        fetchAllUsers()
    },[])

  return (
    <>
    <div className='p-4 w-full'>
      <table className="w-full userTable">
        <thead>
          <tr className='bg-black text-white'>
            <th>STT</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Quyền</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user, index) => {
            
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.role}</td>
                {/* <td>{moment(user?.createdAt).format("DD-MM-YYYY HH:mm")}</td> */}
                <td>{user?.status ? "Đang hiệu lực" : "Vô hiệu hóa"}</td>
                <td className='flex gap-1 items-center justify-center'>
                  <button
                    className="bg-green-100 hover:bg-green-500 hover:text-white rounded-full p-2 cursor-pointer"
                    onClick={() => {
                      setOpenUpdateRole(true)
                      setUpdateUserDetails(user)
                    }}
                  >
                    <MdModeEdit />
                  </button>
                  <button
                    className="bg-red-100 hover:bg-red-500 hover:text-white rounded-full p-2 cursor-pointer"
                    onClick={() => {
                      setOpenDeleteUser(true)
                      setUpdateUserDetails(user)
                    }}
                  >
                    {
                      user?.status ? (
                        <MdDeleteForever />
                      ): (
                        <MdRestoreFromTrash  />
                      )
                    }
                    
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {openUpdateRole && <EditUser onclose={() => setOpenUpdateRole(false)} 
        data = {updateUserDetails} 
        callFunc={fetchAllUsers} 
        label = "Quyền truy cập"
        change='UPDATE'
        />}
        {openDeleteUser && <EditUser onclose={() => setOpenDeleteUser(false)} 
        data = {updateUserDetails} 
        callFunc={fetchAllUsers} 
        label = "Xóa người dùng"
        change='DELETE'
        />}
    </div>
   </>
  )
}

export default User
