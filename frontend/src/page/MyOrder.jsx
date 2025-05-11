import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import formatPrice from '../helpers/formatMoney';

const MyOrder = () => {
  const [orders, setOrders] = useState([]);

  // Fetch user orders
  const fetchOrders = async () => {
    const response = await fetch(SummaryApi.userOrders.url, {
      method: SummaryApi.userOrders.method,
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
    });

    const data = await response.json();
    if (data.success) {
      setOrders(data.data);
    }
  };

  useEffect(() => {
    // fetchOrders();
  }, []);

  return (
    <div className="bg-white">
      <div className="container mx-auto p-4">
        
        {orders.length > 0 ? (
            <>
                <h1 className="text-2xl font-bold mb-4">Đơn hàng của tôi</h1>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">Mã đơn hàng</th>
                    <th className="border border-gray-300 p-2">Ngày đặt</th>
                    <th className="border border-gray-300 p-2">Tổng tiền</th>
                    <th className="border border-gray-300 p-2">Trạng thái</th>
                    <th className="border border-gray-300 p-2">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-2 text-center">
                        {order._id}
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        {formatPrice(order.total_price)}
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        {order.status}
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        >
                          Xem chi tiết
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
        ) : (
          <div className="w-full h-96 flex items-center justify-center">
            <h2 className="text-2xl font-bold text-gray-500">
              Bạn chưa có đơn hàng nào
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrder;