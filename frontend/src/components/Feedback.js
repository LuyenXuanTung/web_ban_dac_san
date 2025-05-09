import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const Feedback = ({ feedbacks, onSubmitFeedback }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0 || comment.trim() === '') {
      alert('Please provide a rating and a comment.');
      return;
    }
    onSubmitFeedback({ rating, comment });
    setRating(0);
    setComment('');
  };

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
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={i < rating ? 'text-yellow-500 cursor-pointer' : 'text-gray-300 cursor-pointer'}
              onClick={() => setRating(i + 1)}
            />
          ))}
        </div>
        <textarea
          className="p-2 border rounded w-full"
          rows="4"
          placeholder="Write your feedback here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default Feedback;