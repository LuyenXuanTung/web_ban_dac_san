import React, { useContext, useState } from 'react';
import formatPrice from '../helpers/formatMoney';
import qrCode from '../assets/Qr_checkout.png';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import CountProduct from '../context/countProduct';
import {useNavigate} from 'react-router-dom'
import { setUserDetails } from '../store/userSlice';
import fetchCartItems from '../helpers/fetchCartItems';

const Checkout = ({calculateTotal, onClose}) => {
  const [shippingFee, setShippingFee] = useState(30000); 
  const [paymentMethod, setPaymentMethod] = useState('');
  const totalPrice = calculateTotal(); 
  const user = useSelector((state) => state?.user?.user)
  const { cartItems,setCartItems,fetchCountProductInCart } = useContext(CountProduct)
  const cartItemShort = cartItems.map(({ product, ...rest }) => rest);
  const navigate = useNavigate()
  const dispatch = useDispatch()


  
  const [infoShip, setInfoShip] = useState({
    receiveName:user?.receiveName,
    receiveAddress: user?.receiveAddress,
    receivePhone: user?.receivePhone,
    receiveNode: ''
  })

  const handleOnChangeInfo = (e) => {
    const {name , value} = e.target

    setInfoShip((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  const isValid = Object.entries(infoShip)
  .filter(([key]) => key !== 'receiveNode')
  .every(([_, value]) => value && value.trim() !== '');
  

  const calculateTotalWithShipping = () => {
    return totalPrice + shippingFee;
  };

  console.log(calculateTotalWithShipping());
  
  const handlePaymentMethodChange = (e) => {
    const method = e.target.value;
    setPaymentMethod(method);

  };

  

  const handleSubmit = async () => {

    const fetchApi = await fetch(SummaryApi.order.url,{
      method: SummaryApi.order.method,
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        infoShip,
        paymentMethod,
        total_price: calculateTotalWithShipping(),
        cartItemShort
      })
    }) 

    const res = await fetchApi.json()
    
    if(res.success){
      if(res.data){
        window.location.href = res.data;
      }
      
      else{
        toast.success(res.message)
      navigate('/')
      dispatch(setUserDetails({
        ...user,
        receiveName: res.user.receiveName,
        receiveAddress: res.user.receiveAddress,
        receivePhone: res.user.receivePhone,
      }));
      fetchCountProductInCart()
      fetchCartItems(setCartItems)
      }
    }



  }

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column: User Details */}
      <div className="p-4 border rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Thông tin giao hàng</h2>
        <form className="flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="block font-medium mb-1">
              Họ và tên:
            </label>
            <input
              type="text"
              id="receiveName"
              name="receiveName"
              value={infoShip?.receiveName}
              onChange={handleOnChangeInfo}
              placeholder="Nhập họ và tên"
              className="w-full p-2 border rounded"
            />
            {
                infoShip.receiveName === '' && (
                  <label className="text-red-600">
                  Họ và tên không được để trống
                </label>
                )
             }
          </div>
          <div>
            <label htmlFor="address" className="block font-medium mb-1">
              Địa chỉ:
            </label>
            <input
              type="text"
              id="receiveAddress"
              name="receiveAddress"
              value={infoShip?.receiveAddress}
              onChange={handleOnChangeInfo}
              placeholder="Nhập địa chỉ"
              className="w-full p-2 border rounded"
            />
            {
                infoShip.receiveAddress === '' && (
                  <label className="text-red-600">
                  Địa chỉ không được để trống
                </label>
                )
             }
          </div>
          <div>
            <label htmlFor="phone" className="block font-medium mb-1">
              Số điện thoại:
            </label>
            <input
              type="text"
              id="receivePhone"
              name="receivePhone"
              value={infoShip?.receivePhone}
              onChange={handleOnChangeInfo}
              placeholder="Nhập số điện thoại"
              className="w-full p-2 border rounded"
            />
            {
                infoShip.receivePhone === '' && (
                  <label className="text-red-600">
                  Số điện thoại không được để trống
                </label>
                )
             }
          </div>
          <div>
            <label htmlFor="note" className="block font-medium mb-1">
              Ghi chú:
            </label>
            <textarea
              id="receiveNode"
              name="receiveNode"
              value={infoShip?.receiveNode}
              onChange={handleOnChangeInfo}
              placeholder="Nhập ghi chú (nếu có)"
              className="w-full p-2 border rounded resize-none"
              rows="4"
            ></textarea>
          </div>
        </form>
      </div>

      {/* Right Column: Order Summary */}
      <div className="p-4 border rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Thông tin đơn hàng</h2>
        <div className="flex justify-between mb-2">
          <p>Tổng tiền sản phẩm:</p>
          <p className="font-semibold">{formatPrice(totalPrice)}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>Phí vận chuyển:</p>
          <p className="font-semibold">{formatPrice(shippingFee)}</p>
        </div>
        <div className="flex justify-between mb-4">
          <p>Tổng cộng:</p>
          <p className="font-bold text-lg text-red-600">
            {formatPrice(calculateTotalWithShipping())}
          </p>
        </div>

        {/* Payment Methods */}
        <h3 className="text-lg font-bold mb-2">Phương thức thanh toán</h3>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={handlePaymentMethodChange}
            />
            Thanh toán khi nhận hàng
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="paymentMethod"
              value="online"
              checked={paymentMethod === "online"}
              onChange={handlePaymentMethodChange}
            />
            Thanh toán trực tuyến
          </label>
        </div>

        {/* QR Code for Online Payment */}

        <div className='flex items-center gap-10'>
          <button className="w-full border border-red-600 text-red-600 py-2 rounded mt-4 hover:bg-red-700 hover:text-white transition duration-200"
            onClick={onClose}
          >
            Hủy
          </button>
          <button className={`${paymentMethod !== '' && isValid ? '' : 'cursor-not-allowed'} w-full bg-green-600 text-white py-2 rounded mt-4 hover:bg-green-700 transition duration-200`}
            onClick={paymentMethod !== '' && isValid ? handleSubmit : () => toast.error("Vui lòng cung cấp đủ thông tin")}
          >
            Đặt hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;