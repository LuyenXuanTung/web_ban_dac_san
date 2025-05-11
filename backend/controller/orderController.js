const user = require("../model/User");
const order = require("../model/order")
const checkRoleAdmin = require("../middleware/checkRoleAdmin");
const cart = require("../model/cart");
const cartDetail = require("../model/cart-details");
const product = require("../model/product");


async function addOrder(req, res) {
    try {
      const userCurent = await user.findById(req.userId)
      if(!userCurent){
        throw new Error('Người dùng không tồn tại')
      }

      const { infoShip,total_price,paymentMethod,cartItemShort } = req.body

      userCurent.receiveName = infoShip.receiveName
      userCurent.receiveAddress = infoShip.receiveAddress
      userCurent.receivePhone = infoShip.receivePhone
      await userCurent.save()

      const payload = {
        user: userCurent,
        total_price: total_price,
        payment_method: paymentMethod,
        receiveNode: infoShip.receiveNode,
        cart_details: cartItemShort
      }
      

      const newOrder = new order(payload)
      await newOrder.save()

      const cartUser = await cart.findOne({userId: userCurent._id})

      const updateQuantity = await cartDetail.find({cartId: cartUser._id})
      console.log(updateQuantity);
      updateQuantity.forEach(async (p) => {
        const udProduct = await product.findById(p.productId)
        udProduct.quantity -= p.quantity
        await udProduct.save()
      })

      await cartDetail.deleteMany({
        cartId: cartUser._id,
      });
  
      res.json({
        message: "Đặt hàng thành công",
        user: userCurent,
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

async function getOrder(req, res) {
  try {
    if (!checkRoleAdmin(req.userId)) {
      throw new Error("Bạn không có quyền truy cập");
    }

    const allOrder = await order.find()
    allOrder.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({
      message: "Lấy các đơn đặt hàng",
      data: allOrder,
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

async function setStatusOrder(req, res) {
  try {
    if (!checkRoleAdmin(req.userId)) {
      throw new Error("Bạn không có quyền truy cập");
    }

    const {value, orderId} = req.body

    const cartCurrent = await order.findById(orderId)

    if(!cartCurrent){
      throw new Error("Không có đơn hàng này")
    }

    cartCurrent.status = value
    await cartCurrent.save()

    let message = ''
   if(value === 'WAITING'){
    message = "Đơn hàng chưa được xác nhận"
   }
   else if(value === 'CONFIRMED'){
     message = "Đơn hàng đã được xác nhận"
   }
   else if(value === 'CANCEL'){
     message = "Đơn hàng đã hủy"
   }
   else if(value === 'SHIPPING'){
     message = "Đơn hàng đang được giao"
   }
   else if(value === 'COMPLETED'){
     message = "Đơn hàng đã được giao"
   }
    
    res.json({
      message,
      data: value,
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
    addOrder,
    getOrder,
    setStatusOrder
}