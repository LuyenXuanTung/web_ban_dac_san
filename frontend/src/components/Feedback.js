import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const Feedback = ({ feedbacks, onSubmitFeedback }) => {
  

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Feedback</h3>

      {/* Feedback List */}
      <div className="mb-6">
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback, index) => (
            <div key={index} className="border-b pb-4 mb-4">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < feedback.rating ? 'text-yellow-500' : 'text-gray-300'}
                  />
                ))}
              </div>
              <p className="text-gray-600">{feedback.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No feedback yet. Be the first to leave a review!</p>
        )}
      </div>

      {/* Feedback Form */}
      
    </div>
  );
};

export default Feedback;