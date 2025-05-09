import React, { useContext, useState } from 'react'
import formatPrice from '../helpers/formatMoney';
import {FaShoppingCart } from "react-icons/fa";
import CountProduct from '../context/countProduct';
import { Link } from 'react-router-dom';
import { FaDeleteLeft } from "react-icons/fa6";
import fetchRemoveProduct from '../helpers/fetchRemoveProduct';


const Cart = () => {
  const [showCart, setShowCart] = useState(false);
  const { countProduct,fetchCountProductInCart, setCartItems,cartItems,setProductDetailsId } = useContext(CountProduct)

  const handleDeleteProduct = async (e,id) => {
    e.preventDefault()
    fetchRemoveProduct(id,setCartItems,fetchCountProductInCart);
  }
  
  
  return (
    <div
      className="relative w-10 h-10 mr-4  rounded-full bg-green-600 cursor-pointer hover:bg-green-700"
      onMouseEnter={() => setShowCart(true)}
      onMouseLeave={() => setShowCart(false)}
    >
      <Link
        to={"/cart"}
        className="h-full w-full flex items-center justify-center"
      >
        <FaShoppingCart />
      </Link>
      <div className="absolute -top-1 -right-1 bg-white border border-green-600 text-green-600 rounded-full w-5 h-5 flex items-center justify-center text-sm font-semibold">
        {countProduct}
      </div>
      {showCart && (
        <div className="absolute top-[100%] -right-14 bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)] rounded-lg min-w-72 w-80 max-w-80 min-h-32 max-h-80 z-50">
          {cartItems && cartItems.length > 0 ? (
            <>
              <h3 className="text-center text-lg text-black font-semibold p-2 border-b">
                Giỏ hàng của bạn
              </h3>
              <div className="max-h-52 overflow-y-auto">
                {cartItems.map((item, index) => (
                  <Link
                    to={`/product-details/${item.product.name}`}
                    key={index}
                    className="flex items-center gap-2 p-2 border-b hover:bg-slate-200"
                    onClick={() => setProductDetailsId(item.product._id)}
                  >
                    <img
                      src={item.product.image[0]}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover"
                    />
                    <div className="flex-1 px-2">
                      <div className='flex justify-between items-center w-full'>
                        <p className="text-sm font-semibold text-black">
                          {item.product.name}
                        </p>
                        <div className="text-red-600 text-lg hover:scale-125 transition duration-200 cursor-pointer"
                          onClick={(e) => handleDeleteProduct(e,item.product._id)}
                        >
                          <FaDeleteLeft />
                        </div>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <p className="text-sm text-gray-500">
                          {item.quantity} x{" "}
                          {formatPrice(item.product.new_price)}
                        </p>
                        <p className="text-base font-semibold text-red-600">
                          {formatPrice(item.total_price)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="flex gap-2 items-center p-4 border-t">
                <button className=" flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200">
                  Mua ngay
                </button>
                <Link
                  to="/cart"
                  className="text-green-600 border flex-1 text-center border-green-600 px-4 py-2 rounded hover:bg-green-600 hover:text-white transition duration-200"
                >
                  Xem chi tiết
                </Link>
              </div>
            </>
          ) : (
            <div className='w-full h-32 flex items-center justify-center'><p className="p-4 text-lg text-center text-gray-500">Giỏ hàng trống</p></div>
          )}
        </div>
      )}
    </div>
  );
}

export default Cart
