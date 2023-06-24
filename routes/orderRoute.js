
const express = require("express");
const { getAllOrders, myOrders, getSingleOrder, createOrder, updateOrder, deleteOrder } = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth")
const router = express.Router();


router.route("/order/new").post(isAuthenticatedUser, createOrder);

router.route("/getallorders").get(getAllOrders);

router.route("/orders/me").get(isAuthenticatedUser, myOrders);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder)
    .put(isAuthenticatedUser, updateOrder)
    .delete(isAuthenticatedUser, deleteOrder);


module.exports = router;