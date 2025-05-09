const cart = require("../model/cart");
const cartDetail = require("../model/cart-details");
const product = require("../model/product");

async function addToCart(req, res) {
  try {
    
    const { productId } = req?.body
    const currentUser = req.userId

    const cartUser = await cart.findOne({userId: currentUser})
    if(!cartUser) {
      throw new Error("Giỏ hàng không tồn tại")
    }
    const productCurrent = await product.findOne({_id: productId})
    if(!productCurrent) {
      throw new Error("Sản phẩm không tồn tại")
    }
    const cartDetailCurrent = await cartDetail.findOne({productId, cartId: cartUser._id})
    if(cartDetailCurrent) {
      if(cartDetailCurrent.quantity < productCurrent.quantity) {
      cartDetailCurrent.quantity += 1
      cartDetailCurrent.total_price = productCurrent.new_price * cartDetailCurrent.quantity
      await cartDetailCurrent.save()
      }
      else {
        throw new Error("Sản phẩm đã hết hàng")
      }
    } else {
      const cartDetailData = new cartDetail({
        productId,
        quantity: 1,
        total_price: productCurrent.new_price,
        cartId: cartUser._id
      })
      await cartDetailData.save()
    }

    res.json({
      message: "Thêm sản phẩm vào giỏ hàng thành công",
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

async function countProductInCart(req, res) {
  try {
    
    const currentUser = req.userId
    const cartUser = await cart.findOne({userId: currentUser})
    if(!cartUser) {
      throw new Error("Giỏ hàng không tồn tại")
    }
    const cartDetailCurrent = await cartDetail.find({cartId: cartUser._id})
    if(!cartDetailCurrent) {
      throw new Error("Giỏ hàng không có sản phẩm nào")
    }

    const countProduct = await cartDetail.countDocuments({cartId: cartUser._id})
    if(countProduct === 0) {
      return res.json({
        message: "Giỏ hàng không có sản phẩm nào",
        success: true,
        error: false,
        data: 0
      });
    }

    res.json({
      message: "Lấy số lượng sản phẩm trong giỏ hàng thành công",
      success: true,
      error: false,
      data: countProduct
    });


  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

async function getCart(req, res) {
  try {
    
    const currentUser = req.userId
    const cartUser = await cart.findOne({userId: currentUser})
    if(!cartUser) {
      throw new Error("Giỏ hàng không tồn tại")
    }
    const cartDetailCurrent = await cartDetail.find({cartId: cartUser._id})
    if(!cartDetailCurrent) {
      throw new Error("Giỏ hàng không có sản phẩm nào")
    }
    
    const cartDetailData = await Promise.all(
      cartDetailCurrent.map(async (item) => {
        const productCurrent = await product.findOne({ _id: item.productId });
        item.total_price = productCurrent.new_price * item.quantity
        await item.save()
        return {
          ...item._doc,
          product: productCurrent,
        };
      })
    );

   
    res.json({
      message: "Lấy sản phẩm trong giỏ hàng thành công",
      success: true,
      error: false,
      data: cartDetailData
    });


  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

async function updateQuantity(req, res) {
  try {
    
    const { productId, quantity } = req?.body
    const currentUser = req.userId
    const cartUser = await cart.findOne({userId: currentUser})
    if(!cartUser) {
      throw new Error("Giỏ hàng không tồn tại")
    }
    const productCurrent = await product.findOne({_id: productId})
    if(!productCurrent) {
      throw new Error("Sản phẩm không tồn tại")
    }
    const cartDetailCurrent = await cartDetail.findOne({productId, cartId: cartUser._id})
    
    if(!cartDetailCurrent) {
      throw new Error("Sản phẩm không có trong giỏ hàng")
    }
    if(quantity > productCurrent.quantity) {
      throw new Error("Sản phẩm đã hết hàng")
    }
    cartDetailCurrent.quantity = quantity
    cartDetailCurrent.total_price = productCurrent.new_price * quantity
    await cartDetailCurrent.save()

   
    res.json({
      message: "Cập nhật số lượng sản phẩm trong giỏ hàng thành công",
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

async function removeProductCart(req, res) {
  try {
    
    const { productId } = req?.body
    
    const currentUser = req.userId
    const cartUser = await cart.findOne({userId: currentUser})
    if(!cartUser) {
      throw new Error("Giỏ hàng không tồn tại")
    }
    const productCurrent = await product.findOne({_id: productId})
    
    if(!productCurrent) {
      throw new Error("Sản phẩm không tồn tại")
    }
    const cartDetailCurrent = await cartDetail.findOne({productId, cartId: cartUser._id})
    if(!cartDetailCurrent) {
      throw new Error("Sản phẩm không có trong giỏ hàng")
    }
    await cartDetailCurrent.deleteOne()
    

   
    res.json({
      message: "Xoa sản phẩm trong giỏ hàng thành công",
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
    addToCart,
    countProductInCart,
    getCart,
    updateQuantity,
    removeProductCart
}