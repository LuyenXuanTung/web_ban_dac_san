const checkRoleAdmin = require("../middleware/checkRoleAdmin");
const order = require("../model/order");
const product = require("../model/product");
const ratingModel = require("../model/rating")

async function addProduct(req, res) {
  try {
    if (!checkRoleAdmin(req.userId)) {
      throw new Error("Bạn không có quyền truy cập");
    }

    const payload = {
      ...req.body,
      new_price: req.body.price
    }

    const addProduct = new product(payload);
    await addProduct.save();

    res.json({
      message: "Tạo sản phẩm thành công",
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

async function getAllProduct(req, res) {
  try {
    const allProduct = await product.find({status: true})

    res.json({
      message: "Tất cả sản phẩm",
      data: allProduct,
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

async function getAllProductInAdmin(req, res) {
  try {
    if (!checkRoleAdmin(req.userId)) {
      throw new Error("Bạn không có quyền truy cập");
    }
    const allProduct = await product.find()

    res.json({
      message: "Tất cả sản phẩm",
      data: allProduct,
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

async function updateQuantityProduct(req, res) {
  try {
    const { productId, quantity } = req.body;
    if (!checkRoleAdmin(req.userId)) {
      throw new Error("Bạn không có quyền truy cập");
    }

    const productUpdate = await product.findById(productId);
    if (!productUpdate) {
      throw new Error("Sản phẩm không tồn tại");
    }

    if (quantity < 0) {
      throw new Error("Số lượng không được âm");
    }

    productUpdate.quantity = quantity;
    await productUpdate.save();

    res.json({
      message: "Cập nhật số lượng sản phẩm thành công",
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

async function getProductsBestSelling(req, res) {
  try {
    const allProduct = await product.find({total_pay: {$gt: 0}}).sort({total_pay: -1}).limit(5)

    if (!allProduct) {
      throw new Error("Không có sản phẩm nào");
    }

    res.json({
      message: "Các sản phẩm bán chạy",
      data: allProduct,
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

async function getProductsBestPromotion(req, res) {
  try {
    const allProduct = await product.find({ promotion: { $gt: 0 } })
  .sort({ promotion: -1 })
  .limit(5);

    if (!allProduct) {
      throw new Error("Không có sản phẩm nào");
    }

    res.json({
      message: "Các sản phẩm bán chạy",
      data: allProduct,
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

async function getProductsById(req, res) {
  try {
    const { productId } = req.body;
    
    const productById = await product.findOne({_id: productId});

    if (!productById) {
      throw new Error("Không tìm thấy sản phẩm");
    }

    res.json({
      message: "Chi tiết sản phẩm",
      data: productById,
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

async function getProductsByManyId(req, res) {
  try {
    const { productsId } = req.body;
    console.log(productsId);
    
    const allProduct = await Promise.all(
      productsId.map(async (p) => await product.findById(p))
    )

    
    if (!allProduct) {
      throw new Error("Không tìm thấy sản phẩm");
    }

    res.json({
      message: "Chi tiết các sản phẩm",
      data: allProduct,
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

async function setPromotion(req, res) {
  try {
    if (!checkRoleAdmin(req.userId)) {
      throw new Error("Bạn không có quyền truy cập");
    }

    if(req.body.productId){
      const productUpdate = await product.findById(req.body.productId);
      if (!productUpdate) {
        throw new Error("Sản phẩm không tồn tại");
      }
      if(!req.body.discount){
        throw new Error("Vui lòng nhập khuyến mãi");
      }
      else{
        productUpdate.promotion = req.body.discount;
        productUpdate.new_price = productUpdate.price - (productUpdate.price * req.body.discount) / 100;
        await productUpdate.save();

      return res.json({
        message: "Cập nhật khuyến mãi thành công",
        success: true,
        error: false,
      });
      }
    }

    if(req.body.category){
      const productUpdate = await product.find({category: req.body.category});
      if (!productUpdate) {
        return res.json({
          message: "Danh mục không tồn tại",
          error: true,
          success: false,
        });
      }
      productUpdate.forEach((item) => {
        item.promotion = req.body.discount;
        item.new_price = item.price - (item.price * req.body.discount) / 100;
        item.save();
      });

      return res.json({
        message: "Cập nhật khuyến mãi theo danh mục thành công",
        success: true,
        error: false,
      });
    }

    if(req.body.province){
      const productUpdate = await product.find({province: req.body.province});
      
      if (productUpdate === null) {
        return res.json({
          message: "Khu vực không tồn tại",
          error: true,
          success: false,
        });
      }
      else{
        productUpdate.forEach((item) => {
          item.promotion = req.body.discount;
          item.new_price = item.price - (item.price * req.body.discount) / 100;
          item.save();
        });
  
        return res.json({
          message: "Cập nhật khuyến mãi theo khu vực thành công",
          success: true, 
          error: false,
        });
      }
    }

  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

async function getProductsBySelected(req, res) {
  try {
    const { selected } = req.body;
    
    const productBySelected = await product.find({$or: [
      { province: selected },
      { category: selected },
    ]});
    if (!productBySelected) {
      throw new Error("Không tìm thấy sản phẩm");
    }

    res.json({
      message: "Danh sách sản phẩm",
      data: productBySelected,
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

async function searchProduct(req, res) {
  try {
    const { searchValue } = req.body;
    
    const searchProduct = await product.find({name: {$regex: searchValue, $options: 'i'}});

    if (searchProduct.length === 0) {
      throw new Error("Không tìm thấy sản phẩm")
    }
    
    
    res.json({
      message: "Danh sách sản phẩm tìm kiếm",
      data: searchProduct,
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

async function updateProduct(req, res) {
  try {
    if (!checkRoleAdmin(req.userId)) {
      throw new Error("Bạn không có quyền truy cập");
    }

    const data = req.body;
    const productUpdate = await product.findById(data._id);
    if (!productUpdate) {
      throw new Error("Sản phẩm không tồn tại");
    }
    if (data.image.length > 0) {
      productUpdate.image = data.image;
    }
    data.name && (productUpdate.name = data.name);
    data.price && (productUpdate.price = data.price);
    productUpdate.new_price = data.price - (data.price * productUpdate.promotion) / 100;
    data.promotion && (productUpdate.promotion = data.promotion);
    data.category && (productUpdate.category = data.category);
    data.province && (productUpdate.province = data.province);
    data.manufacture && (productUpdate.manufacture = data.manufacture);
    data.expiry && (productUpdate.expiry = data.expiry);
    data.quantity && (productUpdate.quantity = data.quantity);
    data.description && (productUpdate.description = data.description);
    await productUpdate.save();

    res.json({
      message: "Cập nhật sản phẩm thành công",
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

async function deleteProduct(req, res) {
  try {
    if (!checkRoleAdmin(req.userId)) {
      throw new Error("Bạn không có quyền truy cập");
    }

    const {deleteProductId, status} = req.body;
    
    const productUpdate = await product.findByIdAndUpdate(deleteProductId,{status});
    
    if (!productUpdate) {
      throw new Error("Sản phẩm không tồn tại");
    }
    
    let message=''
    status ? message = 'Khôi phục sản phẩm thành công' : message="Xóa sản phẩm thành công"
 

    res.json({
      message,
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

async function feedback(req, res) {
  try {
    
    const { orderCurrentId, productId, rating, comment } = req.body;
    const payload = {
      star: rating,
      content: comment,
      productId,
      userId: req.userId
    }

    
    const newRating = new ratingModel(payload)
    await newRating.save()

    const myOrder = await order.findById(orderCurrentId)
    myOrder.cart_details.forEach(c => {
      if (c.productId.toString() === productId.toString()) {
      c.isRating = true;
      }
    })
    myOrder.markModified('cart_details');
    await myOrder.save();
    
    const productUpdate = await product.findById(productId);
    if (!productUpdate) {
      throw new Error("Sản phẩm không tồn tại");
    }
    productUpdate.total_rating += 1;
    productUpdate.total_stars += rating;
    await productUpdate.save();


    res.json({
      message:"Đánh giá thành công",
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
  addProduct,
  getAllProduct,
  getAllProductInAdmin,
  updateQuantityProduct,
  getProductsBestSelling,
  getProductsBestPromotion,
  getProductsById,
  getProductsByManyId,
  setPromotion,
  getProductsBySelected,
  searchProduct,
  updateProduct,
  deleteProduct,
  feedback,
};
