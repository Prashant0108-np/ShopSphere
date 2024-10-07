const express = require('express')

const router = express.Router()

const userSignupController = require("../controller/user/userSignup");
const userSigninController = require('../controller/user/userSignin');
const authToken = require('../middleware/authToken');
const userDetailsController = require('../controller/user/userDetails');
const userLogout = require('../controller/user/userLogout');
const allUsers = require('../controller/user/allUsers');
const uploadProductController = require('../controller/product/uploadProduct');
const getProductController = require('../controller/product/getProduct');
const updateProductController = require('../controller/product/updateProduct');
const updateUser = require('../controller/user/updateUser');
const getCategoryProduct = require('../controller/product/getCategoryProductOne');
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct');
const getProductDetails = require('../controller/product/getProductDetails');
const addToCartController = require('../controller/user/addToCartController');
const countAddToCartProduct = require('../controller/user/countAddTOCartProduct');
const addToCartViewProduct = require('../controller/user/addToCartViewProduct');
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct');
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct');
const searchProduct = require('../controller/product/searchProduct');
const filterProductController = require('../controller/product/filterProduct');
const paymentController = require('../controller/order/paymentController');
const webhook = require('../controller/order/webhook');
const orderController = require('../controller/order/order.controller');

router.post("/Signup", userSignupController)
router.post("/Signin", userSigninController)
router.get("/user-details", authToken, userDetailsController)
router.get("/userLogout", userLogout)

// Admin Panel
router.get("/all-user", authToken, allUsers)
router.post("/update-user", authToken, updateUser)

//Product
router.post("/upload-product", authToken, uploadProductController)
router.get("/get-product", getProductController)
router.post("/update-product", authToken, updateProductController)
router.get("/get-categoryProduct", getCategoryProduct)
router.post("/category-product", getCategoryWiseProduct)
router.post("/product-details", getProductDetails)
router.get("/search", searchProduct)
router.post("/filter-product", filterProductController)

//User Add to Cart
router.post("/addtocart", authToken, addToCartController)
router.get("/countAddToCartProduct", authToken, countAddToCartProduct)
router.get("/view-cart-product", authToken, addToCartViewProduct)
router.post("/update-cart-product", authToken, updateAddToCartProduct)
router.post("/delete-cart-product", authToken, deleteAddToCartProduct)

//Payment and order
router.post("/checkout", authToken, paymentController)
router.post("/webhook", webhook) //  /api/webhook
router.get("/order-list", authToken, orderController)


module.exports = router