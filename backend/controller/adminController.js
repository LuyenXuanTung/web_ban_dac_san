const checkRoleAdmin = require("../middleware/checkRoleAdmin");
const order = require("../model/order");
const product = require("../model/product");
const user = require("../model/User");

async function getAdmin(req, res) {
  try {
    const userCurrent = await user.findById(req.userId);

    res.json({
      message: "Chào mừng bạn đến với trang quản trị",
      success: true,
      error: false,
      data: userCurrent.role,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

async function getDashBoard(req, res) {
  try {
    if (!checkRoleAdmin(req.userId)) {
      throw new Error("Bạn không có quyền truy cập");
    }

    const allOrder = await order.find({
      status: "COMPLETED",
    });
    const total_price = allOrder.reduce(
      (acc, order) => acc + order.total_price,
      0
    );
    const total_product = await product.countDocuments();
    const total_user = await user.countDocuments();
    const total_order = await order.countDocuments();

    const data = {
      total_price,
      total_product,
      total_user,
      total_order,
    };

    res.json({
      message: "Chào mừng bạn đến với trang quản trị",
      success: true,
      error: false,
      data: data,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

async function getSalesByMonth(req, res) {
  try {
    const { startDate, endDate } = req.body;

    const orders = await order.find({
      createdAt: { $gte: startDate, $lte: endDate },
      status: "COMPLETED",
    });

    // if( orders.length === 0) {
    //   return res.json({
    //     success: false,
    //     error: true,
    //     message: "Không có đơn hàng nào trong khoảng thời gian này"
    //   });
    // }

    // const salesByMonth = {};
    // orders.forEach(order => {
    //   const month = new Date(order.createdAt).toLocaleString('default', { month: 'long' });
    //   if (!salesByMonth[month]) {
    //     salesByMonth[month] = 0;
    //   }
    //   salesByMonth[month] += order.total_price;
    // });

    // const result = Object.entries(salesByMonth).map(([month, total]) => ({
    //   month,
    //   total
    // }));

    const start = new Date(startDate);
    const end = new Date(endDate);

    const salesByMonth = {};
    orders.forEach((o) => {
      const month = o.createdAt.getMonth() + 1;
      const year = o.createdAt.getFullYear();
      const key = `${year}-${month}`;
      salesByMonth[key] = (salesByMonth[key] || 0) + o.total_price;
    });

    // Tạo mảng kết quả đủ các tháng
    const result = [];
    let cur = new Date(start.getFullYear(), start.getMonth(), 1);
    const endMonth = end.getMonth();
    const endYear = end.getFullYear();

    while (
      cur.getFullYear() < endYear ||
      (cur.getFullYear() === endYear && cur.getMonth() <= endMonth)
    ) {
      const key = `${cur.getFullYear()}-${cur.getMonth() + 1}`;
      result.push({
        month: cur.getMonth() + 1,
        total: salesByMonth[key] || 0,
      });
      cur.setMonth(cur.getMonth() + 1);
    }

    if (result.length === 0) {
      return res.json({
        success: false,
        error: true,
        message: "Không có dữ liệu doanh thu trong khoảng thời gian này",
      });
    }

    res.json({
      success: true,
      message: "Lấy dữ liệu doanh thu thành công",
      error: false,
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      error: true,
      message: error.message || error,
    });
  }
}

async function countProductByCategory(req, res) {
  try {
    if (!checkRoleAdmin(req.userId)) {
      throw new Error("Bạn không có quyền truy cập");
    }

    const result = await product.aggregate([
      {
        $group: {
          _id: "$category", // gom nhóm theo tên danh mục
          count: { $sum: 1 }, // đếm số sản phẩm mỗi nhóm
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          count: 1,
        },
      },
    ]);

    console.log("result", result);
    
    if (result.length === 0) {
      return res.json({
        message: "Không có sản phẩm nào trong cơ sở dữ liệu",
        success: false,
        error: true,
      });
    }

    res.json({
      message: "Chào mừng bạn đến với trang quản trị",
      success: true,
      error: false,
      data: result,
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
  getAdmin,
  getDashBoard,
  getSalesByMonth,
  countProductByCategory,
};
