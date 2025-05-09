const express = require("express");
const {
  signUp,
  login,
  userDetails,
  logout,
  getAllUser,
  updateRoleUser,
} = require("../controller/userController");
const authToken = require("../middleware/authToken");
const { getAdmin } = require("../controller/adminController");
const {
  addProduct,
  getAllProduct,
  updateQuantityProduct,
  getProductsBestSelling,
  getProductsById,
  setPromotion,
  getProductsBySelected,
  searchProduct,
  updateProduct,
  getProductsByManyId,
} = require("../controller/productController");
const { addToCart, countProductInCart, getCart, updateQuantity, removeProductCart } = require("../controller/cartController");
const { addOrder, getOrder } = require("../controller/orderController");

const router = express.Router();

// user
router.post("/sign-up", signUp);
router.post("/login", login);
router.get("/user-details", authToken, userDetails);
router.get("/logout", logout);

//admin
router.get("/admin", authToken, getAdmin);
router.get("/admin/users", authToken, getAllUser);
router.post("/admin/update-role-user", authToken, updateRoleUser);

//product
router.post("/add-product", authToken, addProduct);
router.post("/update-quantity-product", authToken, updateQuantityProduct);
router.get("/all-product", getAllProduct);
router.get("/all-product-best-selling", getProductsBestSelling);
router.post("/product-details/:id", getProductsById);
router.post("/products-many-id", getProductsByManyId);
router.post("/setPromotion", authToken, setPromotion);
router.post("/getProductSelected", getProductsBySelected);
router.post("/search-product", searchProduct);
router.post("/update-product", authToken, updateProduct);


//cart
router.post("/add-to-cart",authToken, addToCart);
router.get("/count-product-in-cart", authToken, countProductInCart);
router.get("/get-cart", authToken, getCart);
router.post("/update-quantity-cart", authToken, updateQuantity);
router.post("/remove-product-cart", authToken, removeProductCart);


//order
router.post("/order", authToken, addOrder);
router.get("/all-order", authToken, getOrder);




module.exports = router;
