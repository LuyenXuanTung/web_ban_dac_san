const ratingModel = require("../model/rating")
const user = require("../model/User");


async function getFeedbackByProductId(req, res) {
  try {
    
    const { productId } = req.body
    console.log('id',productId);
    
    const feedbacks = await ratingModel.find({productId})

    if(feedbacks.length === 0){
        throw new Error("Chưa có đánh giá nào")
    }
    
    const feedbacksWithUser = await Promise.all(
      feedbacks.map(async (fb) => {
        const userInfo = await user.findById(fb.userId).select('name');
        return {
          ...fb.toObject(),
          user: userInfo,
        };
      })
    );
    
    console.log(feedbacksWithUser);
    

    res.json({
      message: "Lấy các đánh giá thành công",
      data:feedbacksWithUser,
      success: true,
      error: false,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = {
    getFeedbackByProductId
}