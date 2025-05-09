import React, { useEffect, useState } from 'react'
import {MdModeEdit} from 'react-icons/md'
import SummaryApi from '../../common';
import moment from 'moment';
import formatPrice from '../../helpers/formatMoney';
import statusOrder from '../../data/statusOrder';
import UpdateOrder from '../components/UpdateOrder';


const Order = () => {

    const [allOrder, setAllOrder] = useState([])
    const [openUpdateOrder,setOpenUpdateOrder] = useState(false)
    const [updateOrder, setUpdateOrder] = useState({})

    const fetchOrder = async () => {
        const dataApi = await fetch(SummaryApi.allOrder.url,{
            method: SummaryApi.allOrder.method,
            credentials:'include',
            headers: {
                'content-type': "application/json"
            }
        })

        const dataResponse = await dataApi.json()
        

        if(dataResponse.success){
            setAllOrder(dataResponse.data)
        }


        

    }

    useEffect(() => {
        fetchOrder()
    },[])

  return (
    <>
      <div className='p-4 w-full'>
        <table className="w-full userTable">
          <thead>
            <tr className='bg-black text-white'>
              <th>STT</th>
              <th>Người đặt hàng</th>
              <th>Ngày đặt hàng</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {allOrder.map((order, index) => {
              
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{order?.user?.name}</td>
                  <td>
                      {moment(order?.createdAt).format("DD-MM-YYYY HH:mm")}
                  </td>
                  <td>{formatPrice(order?.total_price)}</td>
                  <td>{statusOrder.map(status => status.value === order?.status && status.name)}</td>
                  <td>
                    <button
                      className="bg-green-100 hover:bg-green-500 hover:text-white rounded-full p-2 cursor-pointer"
                      onClick={() => {
                        setOpenUpdateOrder(true)
                        setUpdateOrder(order)
                      }}
                    >
                      <MdModeEdit />
                    </button>
                  </td>
                  
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {
        openUpdateOrder && <UpdateOrder onclose={() => setOpenUpdateOrder(false)} 
        data={updateOrder}
        />
      }
    </>
  )
}

export default Order
