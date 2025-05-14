import React, { useEffect, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import formatPrice from '../../helpers/formatMoney';
import { toast } from 'react-toastify';
import SummaryApi from '../../common';
import fetchAllProduct from '../../helpers/fetchAllProduct';


const HandleUpdatePromotion = ({onClose,updatePromotion,setAllProduct}) => {
    const [data, setData] = useState({})
    
    useEffect(() => {
        updatePromotion?.name && updatePromotion?.price && setData((prev) => {
            return {
                ...prev,
               productId: updatePromotion.productId,
            }
        })
    },[])

    const handleOnchange = (e) =>{
        const {name, value} = e.target
        if(name === "discount"){
            if(value > 0 && value <= 100){
                setData((prev) => {
                    return{
                        ...prev,
                        [name]: value
                    }
                })
            }
        }
       
        if(name === "category" || name === "province"){
            setData((prev) => {
                return{
                    ...prev,
                    [name]: value
                }
            })
        }
    
    }

    
    const handleSubmitProduct = async (e) => {
        e.preventDefault()
        const response = await fetch(SummaryApi.setPromotion.url, {
            method: SummaryApi.setPromotion.method,
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
        })

        const result = await response.json() 

        if(result.success){
            toast.success(result.message)
            onClose()
            fetchAllProduct(setAllProduct)
        }
    }
    
    

  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-70 top-0 right-0 left-0 bottom-0 flex justify-center items-center z-10">
      <div className="bg-white p-4 rounded w-full max-w-md h-fit max-h-[60%] overflow-hidden">
        <div className="flex items-center justify-between pb-3">
          <h2 className="font-bold text-lg"> Khuyến mãi</h2>
          <div
            className="w-fit text-2xl cursor-pointer hover:text-red-600"
            onClick={onClose}
          >
            <IoMdClose />
          </div>
        </div>

        {updatePromotion.name && updatePromotion.price && (
          <div className="flex flex-col gap-2">
            <p>Tên sản phẩm: {updatePromotion?.name}</p>
            <p>Giá: {formatPrice(updatePromotion?.price)} </p>
          </div>
        )}

        <form
          className="flex flex-col gap-2 overflow-y-auto h-full"
          onSubmit={handleSubmitProduct}
        >
          {updatePromotion?.category && (
            <>
              <label htmlFor="category" className="mt-3">
                Danh mục sản phẩm:
              </label>
              <select
                value={data.category}
                name="category"
                id="category"
                onChange={handleOnchange}
                className="p-2 bg-slate-100 border rounded"
              >
                <option value={""}>Lựa chọn danh mục</option>
                {updatePromotion.category.map((category, index) => {
                  return (
                    <option key={category + index} value={category}>
                      {category}
                    </option>
                  );
                })}
              </select>
            </>
          )}

          {updatePromotion?.province && (
            <>
              <label htmlFor="province" className="mt-3">
                Danh mục khu vực:
              </label>
              <select
                value={data.province}
                name="province"
                id="province"
                onChange={handleOnchange}
                className="p-2 bg-slate-100 border rounded"
              >
                <option value={""}>Lựa chọn khu vực</option>
                {updatePromotion.province.map((province, index) => {
                  return (
                    <option key={province + index} value={province}>
                      {province}
                    </option>
                  );
                })}
              </select>
            </>
          )}

          <label htmlFor="discount" className="mt-3">
            Giảm giá: (0 - 100)%
          </label>
          <input
            type="number"
            id="discount"
            name="discount"
            placeholder="Nhập số lượng"
            value={data.discount}
            onChange={handleOnchange}
            className="p-2 bg-slate-100 border rounded"
          />

          <button className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white">
            Thêm khuyến mãi
          </button>
        </form>
      </div>
    </div>
  );
}

export default HandleUpdatePromotion
