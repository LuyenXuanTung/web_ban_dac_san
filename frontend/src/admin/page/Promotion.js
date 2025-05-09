import React, { useEffect, useState } from 'react'
import fetchAllProduct from '../../helpers/fetchAllProduct'
import {MdModeEdit} from 'react-icons/md'
import formatPrice from '../../helpers/formatMoney';
import HandleUpdatePromotion from '../components/HandleUpdatePromotion';
import category from '../../data/category';
import province from '../../data/province';


const Promotion = () => {

  const [allProduct, setAllProduct] = useState([])
  const [openPromotion, setOpenPromotion] = useState(false)
  const [updatePromotion, setUpdatePromotion] = useState({
    productId: "",
    name: "",
    price: "",
    category: [],
    province: [],
  })

  useEffect(() => {
    fetchAllProduct(setAllProduct)
  },[])

  return (
    <div className='p-4'>
      <div className='bg-white flex gap-2 py-2 px-4 items-center mb-4'>
        <button className='border-red-600 border-2 text-red-600 rounded-md px-3 py-1 hover:bg-red-600 hover:text-white transition-all'
         onClick={() => {
          setOpenPromotion(true)
          setUpdatePromotion({
            category: category,
          })
         }}
         >Khuyến mãi theo danh mục</button>
         <button className='border-red-600 border-2 text-red-600 rounded-md px-3 py-1 hover:bg-red-600 hover:text-white transition-all'
         onClick={() => {
          setOpenPromotion(true)
          setUpdatePromotion({
            province: province,
          })
         }}
         >Khuyến mãi theo khu vực</button>
      </div>

      <table className="w-full userTable">
        <thead>
          <tr className='bg-black text-white'>
            <th>STT</th>
            <th>Tên sản phẩm</th>
            <th>Giá gốc</th>
            <th>Khuyến mãi</th>
            <th>Giá khuyến mãi</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {allProduct.map((product, index) => {
            
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{product?.name}</td>
                <td>{formatPrice(product?.price)}</td>
                <td>{product?.promotion}% </td>
                <td>{formatPrice(product?.new_price)}</td>
                <td>
                  <button
                    className="bg-green-100 hover:bg-green-500 hover:text-white rounded-full p-2 cursor-pointer"
                    onClick={() => {
                      setOpenPromotion(true)
                      setUpdatePromotion({
                        productId: product?._id,
                        name: product?.name,
                        price: product?.price
                      })
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
          {
            openPromotion && ( <HandleUpdatePromotion 
              onClose={() => setOpenPromotion(false)}
              updatePromotion={updatePromotion}
              setAllProduct={setAllProduct}
               />)
          }
    </div>
  )
}

export default Promotion
