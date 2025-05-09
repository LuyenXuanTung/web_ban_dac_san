import React, { useState } from 'react'
import {IoMdClose} from 'react-icons/io'
import { toast } from 'react-toastify';
import SummaryApi from '../../common';
import fetchAllProduct from '../../helpers/fetchAllProduct';

const UpdateQuantity = ({setOpenUpdateQuantity, callFunction , data}) => {
    const [quantity, setQuantity] = useState(data.quantity)
    const productId = data?._id
    const handleQuantity = (e) => {
        const {value} = e.target
        
        if (value < 0) {
            toast.error("Số lượng không được âm")
            return
        }
        else{
            setQuantity(0)
        }
        setQuantity(value)
    }

   
    const handleUpdateQuantity = async () => {
        const dataApi = await fetch(SummaryApi.updateQuantityProduct.url, {
          method: SummaryApi.updateQuantityProduct.method,
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ productId, quantity }),
        });
    
        const dataResponse = await dataApi.json();
    
        if (dataResponse.success) {
          toast.success(dataResponse.message);
          fetchAllProduct(callFunction);
          setOpenUpdateQuantity(false);
        }
    
        if (dataResponse.error) {
          toast.error(dataResponse.message);
        }
      }
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold">Cập nhật số lượng</h2>
              <div className='p-1 hover:text-red-600 cursor-pointer' 
              onClick={setOpenUpdateQuantity}
              ><IoMdClose /></div>
            </div>
            <h2 className="text-lg mb-2">Tên sản phẩm: {data.name}</h2>
            <input type="number" name='quantity' value={quantity} placeholder="Nhập số lượng" className="border p-2 mb-4 w-full" onChange={handleQuantity} />
            <button className="bg-blue-500 text-white px-4 py-2 rounded" 
            onClick={handleUpdateQuantity}
            >Cập nhật</button>
          </div>
        </div>
  )
}

export default UpdateQuantity
