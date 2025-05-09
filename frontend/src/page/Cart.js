import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import formatPrice from '../helpers/formatMoney';
import CountProduct from '../context/countProduct';
import SummaryApi from '../common';
import fetchCartItems from '../helpers/fetchCartItems';
import { toast } from 'react-toastify';
import fetchRemoveProduct from '../helpers/fetchRemoveProduct';
import Checkout from '../components/Checkout';


const Cart = () => {
  
  const { cartItems, setCartItems,fetchCountProductInCart,setProductDetailsId } = useContext(CountProduct)
  const [openCheckout, setOpenCheckout] = useState(false)

  const fetchUpdateQuantity = async (id, quantity) => {
    const response = await fetch(SummaryApi.updateQuantity.url, {
      method: SummaryApi.updateQuantity.method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId: id, quantity }),
    });

    const data = await response.json();
    if (data.success) {
      fetchCartItems(setCartItems);
    }

    if(data.error){
      toast.error(data.message)
    }
  }

  const handleOnChange = (e, id) => {
    const { value } = e.target;
    
    fetchUpdateQuantity(id, value)

  }
 
  

  const handleRemoveItem = (id) => {
    fetchRemoveProduct(id,setCartItems,fetchCountProductInCart);
  };

  const handleIncreaseQuantity = (id) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.product._id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
  
    fetchUpdateQuantity(id, updatedCartItems.find((item) => item.product._id === id).quantity);
  };

  const handleDecreaseQuantity = (id) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.product._id === id) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
  
    fetchUpdateQuantity(id, updatedCartItems.find((item) => item.product._id === id).quantity);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.quantity * item.product.new_price;
    }, 0);
    
  };

  useEffect(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      },[])

  return (
    <>
      {
        openCheckout ? (
          <>
            {/* Create Checkout */}
            <Checkout calculateTotal={calculateTotal} onClose={() => setOpenCheckout(false)}/>
          </>
        ) : (
          <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Giỏ hàng của bạn</h1>
    
          {cartItems && cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                {cartItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 border-b"
                  >
                    <Link
                      to={`/product-details/${item.product.name}`}
                      className="flex-shrink-0"
                      onClick={() => setProductDetailsId(item.product._id)}
                    >
                      <img
                        src={item.product.image[0]}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover"
                      />
                    </Link>
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold">{item.product.name}</h2>
                      <p className="text-gray-500">
                        {formatPrice(item.product.new_price)}
                      </p>
                    </div>
                    <div className="flex flex-1 items-center gap-2 mt-2">
                      {item.product.quantity > 1 ? (
                        <>
                          <button
                            className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                            onClick={() => handleDecreaseQuantity(item.product._id)}
                          >
                            -
                          </button>
                          <input
                            type="text"
                            name={"item" + index}
                            value={item.quantity}
                            className="px-4 py-1 text-center border rounded w-16"
                            onChange={(e) => handleOnChange(e, item.product._id)}
      
                          />
    
                          <button
                            className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                            onClick={() => handleIncreaseQuantity(item.product._id)}
                          >
                            +
                          </button>
                        </>
                      ) : (
                        <h1 className="text-red-600 font-semibold text-center bg-gray-100 px-4 py-2 rounded">
                          Hết hàng
                        </h1>
                      )}
                    </div>
                    <div className="w-40 flex justify-between items-center">
                      <p className="text-lg font-semibold text-red-600">
                        {formatPrice(item.total_price)}
                      </p>
                      <button
                        className="text-red-600 bg-red-100 px-3 py-1 rounded-md hover:text-red-800"
                        onClick={() => handleRemoveItem(item.product._id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                ))}
              </div>
    
              {/* Summary Section */}
              <div className="p-4 border rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Tóm tắt đơn hàng</h2>
                <div className="flex justify-between mb-2">
                  <p>Tổng cộng:</p>
                  <p className="font-semibold">{formatPrice(calculateTotal())}</p>
                </div>
                <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-200"
                
                  onClick={() => setOpenCheckout(true)}
                >
                  Thanh toán
                </button>
                <Link
                  to="/product"
                  className="block text-center mt-4 text-green-600 hover:underline"
                >
                  Tiếp tục mua sắm
                </Link>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">
              Giỏ hàng của bạn đang trống.
            </p>
          )}
        </div>
        )
      }
    </>
  );
};

export default Cart;