import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import { useNavigate} from 'react-router-dom'

const FeedbackForm = ({onclose,orderId,fetchProduct}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const navigate = useNavigate()

  const fetchFeedback = async() => {
    const dataApi = await fetch(SummaryApi.feedBack.url,{
      method:SummaryApi.feedBack.method,
      credentials: 'include',
      headers:{
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        productId: orderId.productId,
        orderCurrentId: orderId.orderId,
        rating,
        comment
      })
    })

    const res = await dataApi.json()
    if(res.success){
      toast.success(res.message)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0 || comment.trim() === "") {
      toast.error("Vui lòng đánh giá")
      return;
    }
    fetchFeedback()
    onclose()
  };

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 w-full h-full z-[11] flex justify-center items-center bg-slate-200 bg-opacity-70">
      <div className="w-full bg-white shadow-md p-4 max-w-sm">
        <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-2xl">Đánh giá</h2>
            <button className="ml-auto block text-lg rounded-full p-1 hover:bg-red-700 hover:text-white" onClick={onclose}><IoMdClose/></button>  
        </div>
        <div className="font-bold mb-2">Tên sản phẩm: <span className="font-normal">{orderId.name} </span></div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={
                  i < rating
                    ? "text-yellow-500 cursor-pointer"
                    : "text-gray-300 cursor-pointer"
                }
                onClick={() => setRating(i + 1)}
              />
            ))}
          </div>
          <textarea
            className="p-2 border rounded w-full"
            rows="4"
            placeholder="Viết đánh giá..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Gửi đánh giá
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
