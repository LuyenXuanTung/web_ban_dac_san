import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";
import CountProduct from "../context/countProduct";
import fetchCartItems from "../helpers/fetchCartItems";

const PaymentResult = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const responseCode = params.get("vnp_ResponseCode");
  const dispatch = useDispatch();
  const { setCartItems, fetchCountProductInCart } = useContext(CountProduct);

  const fetchSuccessPaymentOnline = async (orderInfo) => {
    const fetchApi = await fetch(SummaryApi.addOrderOnline.url, {
      method: SummaryApi.addOrderOnline.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(orderInfo),
    });

    const res = await fetchApi.json();
    if (res.success) {
      toast.success(res.message);
      dispatch(setUserDetails(res.user));
      fetchCountProductInCart();
      fetchCartItems(setCartItems);
      localStorage.removeItem("orderInfo");
    }
  };

  useEffect(() => {
    if (responseCode === "00") {
      const orderInfo = JSON.parse(localStorage.getItem("orderInfo"));

      if (orderInfo) {
        fetchSuccessPaymentOnline(orderInfo).then(() => {
          navigate("/my-order");
        });
      } else {
        navigate("/cart");
      }

    } else {
      toast.error("Thanh toán thất bại, vui lòng thử lại sau.");
      navigate("/cart");
      localStorage.removeItem("orderInfo");
    }
  }, [responseCode]);

  return <></>;
};

export default PaymentResult;
