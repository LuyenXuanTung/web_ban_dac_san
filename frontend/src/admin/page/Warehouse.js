import React, { useEffect, useState } from 'react';
import {MdModeEdit} from 'react-icons/md'
import formatExpiry from '../../helpers/formatExpiry';
import UpdateQuantity from '../components/UpdateQuantity';
import fetchAllProduct from '../../helpers/fetchAllProduct';


const Warehouse = () => {
  const [allProduct, setAllProduct] = useState([])
  const [openUpdateQuantity, setOpenUpdateQuantity] = useState(false)
  const [updateQuantityProduct, setUpdateQupdateQuantityProduct] = useState({
    _id:'',
    name: "",
    quantity: "",
    expiry: ""
  })


  useEffect(() => {
    fetchAllProduct(setAllProduct)
  },[])


 

  return (
    <div className='p-4 w-full'>
      <table className="w-full userTable">
        <thead>
          <tr className='bg-black text-white'>
            <th>STT</th>
            <th>Tên sản phẩm</th>
            <th>Hạn sử dụng</th>
            <th>Số lượng bán</th>
            <th>Số lượng còn lại</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {allProduct.map((product, index) => {
            
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{product?.name}</td>
                <td>
                  {formatExpiry(product?.expiry)}
                </td>
                <td>{product?.total_pay}</td>
                <td>{product?.quantity}</td>
                <td>
                  <button
                    className="bg-green-100 hover:bg-green-500 hover:text-white rounded-full p-2 cursor-pointer"
                    onClick={() => {
                      setOpenUpdateQuantity(true)
                      setUpdateQupdateQuantityProduct(product)
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
      {openUpdateQuantity && <UpdateQuantity setOpenUpdateQuantity={() => setOpenUpdateQuantity(false)} 
                   callFunction={setAllProduct}
                   data = {updateQuantityProduct}
                />}
    </div>
  );
};

export default Warehouse;
