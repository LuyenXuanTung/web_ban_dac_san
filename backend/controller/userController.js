const bcrypt = require("bcryptjs");
const user = require("../model/User");
const cart = require("../model/cart");
const jwt = require('jsonwebtoken');
const checkRoleAdmin = require("../middleware/checkRoleAdmin");


async function signUp(req, res) {
  try {
    const { email, password } = req.body;

    const userCurrent = await user.findOne({ email });

    if (userCurrent) {
      throw new Error("Email đã tồn tại");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("Có lỗi mật khẩu");
    }

    const payload = {
      ...req.body,
      role: "USER",
      password: hashPassword,
    };

    const userData = new user(payload);
    await userData.save();
    const cartUser = new cart({
      userId: userData._id,
      total_price: 0
    })
    await cartUser.save()

    res.json({
      message: "Tạo tài khoản thành công",
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

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const userCurrent = await user.findOne({email})

        if(!userCurrent){
            throw new Error("email không tồn tại")
        }

        if(userCurrent.status === false){
          throw new Error("tài khoản đã bị khóa")
        }

        const checkPassword = await bcrypt.compare(password, userCurrent.password)

        if(checkPassword){

            const tokenData = {
                _id: userCurrent._id,
                email: userCurrent.email
            };

            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY,{
                expiresIn : 60 * 60 * 8
            })

            const tokenOption = {
                httpOnly: true,
                secure: true
            }

            res.cookie('token', token, tokenOption).json({
                message: "Đăng nhập thành công",
                success: true,
                error: false,
                data: token
            })
        }
        else{
            throw new Error("Mật khẩu không đúng")
        }
        
    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false,
          });
    }
}

async function userDetails(req, res) {
  try {
    const userCurrent = await user.findById(req.userId)

    res.json({
      message: "Người dùng đang đăng nhập",
      data: userCurrent,
      success: true,
      error: false
    })
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

async function logout(req, res) {
  try {
    res.clearCookie("token").json({
      message: "Đăng xuất thành công",
      success: true,
      error: false
    })

    
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

async function getAllUser(req, res) {
  try {
    if(!checkRoleAdmin(req.userId)){
      throw new Error("Bạn không có quyền truy cập")
    }

    const allUsers = await user.find()
    
    res.json({
      data: allUsers,
      message: "Tất cả người dùng",
      success: true,
      error: false
    })

  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

async function updateRoleUser(req, res) {
  try {
    if(!checkRoleAdmin(req.userId)){
      throw new Error("Bạn không quyền truy cập")
    }

    const { userId, role } = req.body
    console.log(userId, role);
    

    const updateUser = await user.findByIdAndUpdate(userId,{role:role})
    
    res.json({
      data: updateUser,
      message: "Cập nhật quyền thành công",
      success: true,
      error: false
    })

  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

async function deleteUser(req, res) {
  try {
    if(!checkRoleAdmin(req.userId)){
      throw new Error("Bạn không quyền truy cập")
    }

    const { deleteUserId,status } = req.body
    console.log(deleteUserId,status);
    let message=''
    status ? message = 'Khôi phục người dùng thành công' : message="Xóa người dùng thành công"
  
    const updateUser = await user.findByIdAndUpdate(deleteUserId,{status})
    
    res.json({
      data: updateUser,
      message,
      success: true,
      error: false
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
    signUp,
    login,
    userDetails,
    logout,
    getAllUser,
    updateRoleUser,
    deleteUser
}