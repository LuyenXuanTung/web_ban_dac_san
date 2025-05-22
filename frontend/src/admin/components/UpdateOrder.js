import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import formatPrice from "../../helpers/formatMoney";
import SummaryApi from "../../common";
import statusOrder from "../../data/statusOrder";
import { toast } from "react-toastify";

const UpdateOrder = ({ onclose, data, callFunc }) => {
  const productsId = data.cart_details.map(
    ({ productId, ...rest }) => productId
  );
  const [productInOrder, setProductInOrder] = useState([]);
 

  const [selected, setSelected] = useState(data.status);


  const fetchSelected = async (value) => {
    const dataApi = await fetch(SummaryApi.setStatusOrder.url, {
      method: SummaryApi.setStatusOrder.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        value,
        orderId: data._id,
      }),
    });

    const res = await dataApi.json();
    if (res.success) {
      toast.success(res.message);
      setSelected(res.data)
      callFunc();
    }
    
  };

  const handleSelected = async (e) => {
    const newValue = e.target.value;
    fetchSelected(newValue);
    
  };

  const fetchProduct = async () => {
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
      const enrichedProducts = response.data.map((product) => {
        const cartDetail = data.cart_details.find(
          (detail) => detail.productId === product._id
        );
        return {
          ...product,
          cartDetail,
        };
      });

      setProductInOrder(enrichedProducts);
    }
  };

  console.log(productInOrder);
  

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 w-full h-full z-[11] flex justify-center items-center bg-slate-200 bg-opacity-70">
      <div className="w-full bg-white shadow-md p-4 max-w-5xl rounded-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Chi tiết đơn hàng</h1>
          <button
            className="text-lg rounded-full p-1 hover:bg-red-700 hover:text-white"
            onClick={onclose}
          >
            <IoMdClose />
          </button>
        </div>

        <div className="max-h-[400px] overflow-y-scroll">
          {/* Order Information */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Thông tin đơn hàng</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <p>
                  <strong>Người đặt hàng:</strong> {data.user.name}
                </p>
                <p>
                  <strong>Tên người nhận:</strong> {data.user.receiveName}
                </p>
                <p>
                  <strong>Phương thức thanh toán:</strong> {data.payment_method}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p>
                  <strong>Địa chỉ:</strong> {data.user.receiveAddress}
                </p>
                <p>
                  <strong>Số điện thoại:</strong> {data.user.receivePhone}
                </p>
                <p>
                  <strong>Ghi chú:</strong> {data.receiveNode || "Không có"}
                </p>
              </div>
            </div>
          </div>
          <div className="mb-4 flex gap-2 items-center">
            <strong>Trạng thái đơn hàng: </strong>
            <p>
              {statusOrder.map(
                (status) => status.value === selected && status.name
              )}
            </p>
            {selected === "CANCEL" || selected === 'COMPLETED' ? (
              <></>
            ) : (
              <select
                className="bg-green-500 p-1 rounded-sm text-white"
                onChange={handleSelected}
              >
                <option className="bg-white text-black">Lựa chọn</option>
  
                {selected === "WAITING" && (
                  <>
                    <option className="bg-white text-black" value="CONFIRMED">
                      {statusOrder.map(
                        (status) => status.value === "CONFIRMED" && status.name
                      )}
                    </option>
                    <option className="bg-white text-black" value="CANCEL">
                      {statusOrder.map(
                        (status) => status.value === "CANCEL" && status.name
                      )}
                    </option>
                  </>
                )}
                {selected === "CONFIRMED" && (
                  <>
                    <option className="bg-white text-black" value="SHIPPING">
                      {statusOrder.map(
                        (status) => status.value === "SHIPPING" && status.name
                      )}
                    </option>
                  </>
                )}
                {selected === "SHIPPING" && (
                  <>
                    <option className="bg-white text-black" value="COMPLETED">
                      {statusOrder.map(
                        (status) => status.value === "COMPLETED" && status.name
                      )}
                    </option>
                  </>
                )}
              </select>
            )}
          </div>
          {/* Product Table */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Sản phẩm</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Hình ảnh</th>
                  <th className="border border-gray-300 p-2">Tên sản phẩm</th>
                  <th className="border border-gray-300 p-2">Giá</th>
                  <th className="border border-gray-300 p-2">Số lượng</th>
                  <th className="border border-gray-300 p-2">Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {productInOrder.map((product, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-2 flex justify-center items-center">
                      <img
                        src={product.image[0]}
                        alt={product.name}
                        width={45}
                        height={45}
                      />
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {product.name}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {formatPrice(product.new_price)}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {product.cartDetail.quantity}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {formatPrice(product.cartDetail.total_price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
  
          {/* Total Price */}
          <div className="text-right pb-4">
            <h2 className="text-lg font-semibol">
              Tổng cộng:{" "}
              <span className="text-red-600">
                {formatPrice(data.total_price)}
              </span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrder;
