const user = require("../model/User");
const order = require("../model/order")
const checkRoleAdmin = require("../middleware/checkRoleAdmin");
const cart = require("../model/cart");
const cartDetail = require("../model/cart-details");
const product = require("../model/product");
const { VNPay, ignoreLogger, ProductCode, VnpLocale, dateFormat } = require('vnpay')


async function addOrder(req, res) {
    try {
      const userCurent = await user.findById(req.userId)
      if(!userCurent){
        throw new Error('Người dùng không tồn tại')
      }

      const findCart = await cart.findOne({userId: req.userId}) 

      const { infoShip,total_price,paymentMethod,cartItemShort } = req.body
      
      
      userCurent.receiveName = infoShip.receiveName
      userCurent.receiveAddress = infoShip.receiveAddress
      userCurent.receivePhone = infoShip.receivePhone
      await userCurent.save()

      cartItemShort.forEach((p) => {
        p.isRating = false;
      });

      if (paymentMethod === "online") {
        const vnpay = new VNPay({
          // Thông tin cấu hình bắt buộc
          tmnCode: "2N2WI0P0",
          secureSecret: "0T0X41IK2NOM8PU27W5EZ12GLCFWLFZH",
          vnpayHost: "https://sandbox.vnpayment.vn",

          // Cấu hình tùy chọn
          testMode: true, // Chế độ test
          hashAlgorithm: "SHA512", // Thuật toán mã hóa
          loggerFn: ignoreLogger, // Hàm xử lý log tùy chỉnh

          // Tùy chỉnh endpoints cho từng phương thức API (mới)
          // Hữu ích khi VNPay thay đổi endpoints trong tương lai
          
        });

        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        const vnpayResponse = await vnpay.buildPaymentUrl({
          vnp_Amount: total_price,
          vnp_IpAddr: "127.0.0.1",
          vnp_TxnRef: findCart._id,
          vnp_OrderInfo: `${findCart._id}`,
          vnp_OrderType: ProductCode.Other,
          vnp_ReturnUrl: `http://localhost:3000/payment-result`,
          vnp_Locale: VnpLocale.VN, // 'vn' hoac 'en
          vnp_CreateDate: dateFormat(new Date()), // tuy chon, mac đinh la hiện
          vnp_ExpireDate: dateFormat(tomorrow),
        });

        
        return res.status(201).json({
        data: vnpayResponse,
        success: true,
        error: false,
      })
      }

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
      
      updateQuantity.forEach(async (p) => {
        const udProduct = await product.findById(p.productId)
        udProduct.quantity -= p.quantity
        udProduct.total_pay += p.quantity
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

async function addOrderOnline(req, res) {
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

      cartItemShort.forEach((p) => {
        p.isRating = false;
      });


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
      
      updateQuantity.forEach(async (p) => {
        const udProduct = await product.findById(p.productId)
        udProduct.quantity -= p.quantity
        udProduct.total_pay += p.quantity
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

    for (const p of cartCurrent.cart_details) {
      const productCurrent = await product.findById(p.productId);
      if (productCurrent) {
        productCurrent.quantity += p.quantity;
        await productCurrent.save();
      }
    }

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

async function getOrderByUserId(req, res) {
  try {
    const userCurrent = await user.findById(req.userId);
    if (!userCurrent) {
      throw new Error("Người dùng không tồn tại");
    }
   

    const allOrder = await order.find({ "user._id": userCurrent._id });
    console.log("all",allOrder);
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

module.exports = {
    addOrder,
    addOrderOnline,
    getOrder,
    setStatusOrder,
    getOrderByUserId
}