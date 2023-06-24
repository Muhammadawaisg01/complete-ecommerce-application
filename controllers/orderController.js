
const Order = require("../models/orderModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");



// Create new Order
exports.createOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    res.status(201).json({
        success: true,
        order,
    });
});


// get Single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {

    const order = await Order.findById(req.params.id).populate(
        "user",
        "name",
        "email"
    );

    if (!order) {
        return next(new ErrorHandler(400, "No order exists with such id   ", req.params.id));
    }

    res.status(200).json({
        success: true,
        order,
    })

})

// get logged in user Orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {

    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
        success: true,
        orders,
    });

})

// get all Orders -- Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {

    const orders = await Order.find();

    if (!orders) {
        return next(new ErrorHandler(400, "No orders"))
    }

    let totalAmount = 0;

    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    })

    res.status(200).json({
        success: true,
        orders,
        totalAmount,
    })
})


// update Order Status -- Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {

})

// delete Order -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {

    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandler(400, "No order found with this id  ", req.params.id));
    }
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success: true,
        message: "Order deleted successfully"
    })
})



