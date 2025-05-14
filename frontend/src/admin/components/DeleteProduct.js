import React from 'react'
import { IoMdClose } from "react-icons/io";
import SummaryApi from '../../common';
import { toast } from 'react-toastify';
import { fetchAllProductInAdmin } from '../../helpers/fetchAllProduct';


const DeleteProduct = ({data,onclose,callFunc}) => {


    const fetchDeleteProduct = async (status) => {
        const dataApi = await fetch(SummaryApi.deleteProduct.url,{
            method: SummaryApi.deleteProduct.method,
            headers:{
                "content-type":"application/json" 
            },
            credentials: 'include',
            body: JSON.stringify({
                deleteProductId: data._id,
                status
            })
        })

        const response = await dataApi.json()

        if(response.success){
            toast.success(response.message)
            onclose()
            fetchAllProductInAdmin(callFunc)
        }

        if(response.error){
            toast.error(response.message)
        }
      }

    const handleDeleteProduct = (status) => {
        fetchDeleteProduct(status)
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
            <h1 className="pb-4 text-lg font-medium">Xóa sản phẩm</h1>

            <p>Tên: {data.name}</p>

                <h2 className="text-lg text-red-600 font-semibold my-3">
                  {data.status
                    ? "Bạn có chắc chắn xóa sản phẩm này?"
                    : "Bạn có muốn khôi phục sản phẩm này?"}
                </h2>
                <button
                  className="w-fit mx-auto block py-1 px-4 rounded-full bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => handleDeleteProduct(data.status ? false : true)}
                >
                  {data.status ? "Xóa" : "Khôi phục"}
                </button>
           
          </div>
        </div>
  )
}

export default DeleteProduct
