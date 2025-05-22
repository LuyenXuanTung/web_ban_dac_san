import React, { useState, useEffect } from "react";
import SummaryApi from "../common";
import formatPrice from "../helpers/formatMoney";
import statusOrder from "../data/statusOrder";
import moment from "moment";
import { toast } from "react-toastify";
import FeedbackForm from "../components/FeedbackForm";


const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const payment_method = [
    {name: "Thanh toán trực tiếp", value: 'cod'},
    {name: "Thanh toán trực tuyến", value: 'online'},
  ]
  const [openFeedback, setOpenFeedback] = useState(false)
  const [orderId, setOrderId] = useState({
    orderId:'',
    productId: '',
    name: ''
  })
  

  const fetchOrders = async () => {
    const response = await fetch(SummaryApi.allOrder.url, {
      method: SummaryApi.allOrder.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await response.json();
    if (data.success) {
      
      const productsId = data.data.flatMap((order) =>
        order.cart_details.map(({ productId }) => productId)
      );

      fetchProduct(productsId, data.data);
    }
  };

  const fetchProduct = async (productsId, fetchedOrders) => {
    const dataApi = await fetch(SummaryApi.getProductsByManyId.url, {
      method: SummaryApi.getProductsByManyId.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ productsId }),
    });

    const response = await dataApi.json();

    if (response.success) {
      const enrichedOrders = fetchedOrders.map((order) => {
        const enrichedCartDetails = order.cart_details.map((cartDetail) => {
          const product = response.data.find(
            (product) => product._id === cartDetail.productId
          );
          
          return {
            ...cartDetail,        
              product,
          };
        });

        return {
          ...order,
          cart_details: enrichedCartDetails,
        };
      });

      setOrders(enrichedOrders); 
    }
  };
  
  const handleSelected = async (value,orderId) => {
    const dataApi = await fetch(SummaryApi.setStatusOrder.url, {
      method: SummaryApi.setStatusOrder.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        value,
        orderId
      }),
    });

    const res = await dataApi.json();
    if (res.success) {
      toast.success(res.message);
      fetchOrders();
    }
    
  };

  console.log(orders);
  

  const handleComment = (orderId,productId,name) => {
    setOrderId({
      orderId,
      productId,
      name
    })
  }


  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <div className="bg-white">
        <div className="container mx-auto p-4">
          {orders.length > 0 ? (
            <>
              <h1 className="text-2xl font-bold mb-4">Đơn hàng của tôi</h1>
              {orders.map((order) => (
                <div className="py-2">
                  <div className="w-full h-fit rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.2)] flex">
                    {/* Left Half: Products */}
                    <div className="w-1/2 p-4 overflow-y-auto">
                      <h2 className="text-lg font-bold mb-2">Sản phẩm</h2>
                      <ul className="space-y-2">
                        {order.cart_details.map((product, index) => (
                          <li
                            key={index}
                            className="flex items-center justify-between gap-4 border-b-2"
                          >
                            <div className="flex gap-4 items-center">
                              <img
                                src={product.product.image[0]}
                                alt={product.product.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div>
                                <p className="font-medium">
                                  {product.product.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Số lượng: {product.quantity}
                                </p>
                              </div>
                            </div>
                            {order.status === "COMPLETED" &&
                              !product.isRating && (
                                <button
                                  className="py-1 px-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                                  onClick={() => {
                                    handleComment(
                                      order._id,
                                      product.product._id,
                                      product.product.name
                                    );
                                    setOpenFeedback(true);
                                  }}
                                >
                                  Đánh giá
                                </button>
                              )}
                            {order.status === "COMPLETED" &&
                              product.isRating && (
                                <p className="py-1 px-3 bg-green-500 text-white rounded-md">
                                  Đã đánh giá
                                </p>
                              )}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right Half: Order Information */}
                    <div className="w-1/2 p-4 bg-gray-100 rounded-r-lg">
                      <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold mb-2">
                          Thông tin đơn hàng
                        </h2>
                        {order.status === "WAITING" && (
                          <button
                            className="py-1 px-3 bg-red-600 text-white rounded-md hover:bg-red-700"
                            onClick={() => handleSelected("CANCEL", order._id)}
                          >
                            Hủy
                          </button>
                        )}
                      </div>
                      <p>
                        <strong>Mã đơn hàng:</strong> {order._id}
                      </p>
                      <p>
                        <strong>Ngày đặt:</strong>{" "}
                        {moment(order?.createdAt).format("DD-MM-YYYY HH:mm")}
                      </p>
                      <p className="flex gap-2 items-center">
                        <strong>Trạng thái:</strong>{" "}
                        {statusOrder.map(
                          (status) =>
                            status.value === order.status && status.name
                        )}
                      </p>
                      <p>
                        <strong>Phương thức thanh toán:</strong>{" "}
                        {payment_method.map(
                          (p) => order.payment_method === p.value && p.name
                        )}
                      </p>
                      <p className="mt-4 text-lg font-bold text-red-600">
                        Tổng cộng: {formatPrice(order.total_price)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
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
      {openFeedback && (
        <FeedbackForm
          onclose={() => setOpenFeedback(false)}
          orderId={orderId}
          fetchProduct={fetchProduct}
        />
      )}
    </>
  );
};

export default MyOrder;
