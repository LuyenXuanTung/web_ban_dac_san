const user = require("../model/User");


async function getAdmin(req, res) {
    try {
        const userCurrent = await user.findById(req.userId)
        
        res.json({
            message: "Chào mừng bạn đến với trang quản trị",
            success: true,
            error:false,
            data: userCurrent.role
        })
    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false,
          });
    }
}

module.exports = {
    getAdmin
}