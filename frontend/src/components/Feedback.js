import React, { useEffect, useState } from 'react';
import { FaStar,FaUserCircle } from 'react-icons/fa';
import SummaryApi from '../common';
import moment from 'moment';



const Feedback = ({productId}) => {
  
  const [feedbacks,setFeedbacks] = useState([])

  const fetchFeedback = async() => {
      console.log(productId);
      
      const dataApi = await fetch(SummaryApi.getFeedBacks.url,{
        method:SummaryApi.getFeedBacks.method,
        headers: {
          'content-type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify({productId})
      })

      const res = await dataApi.json()
      if(res.success){
        setFeedbacks(res.data)
      }
  } 

  useEffect(() => {
    fetchFeedback()
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  },[productId])

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Đánh giá</h3>

      {/* Feedback List */}
      <div className="mb-6">
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback, index) => (
            <div key={index} className="border-b pb-4 mb-4 flex gap-2">
              <div className='text-xl pt-1'><FaUserCircle /></div>
              <div>
                <div>{feedback.user.name}</div>
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < feedback.star ? 'text-yellow-500' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <div>{moment(feedback.updatedAt).format('DD-MM-YYYY HH:mm')}</div>
                <p className="text-gray-600 text-lg">{feedback.content}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Chưa có đánh giá sản phẩm nào</p>
        )}
      </div>
      
    </div>
  );
};

export default Feedback;