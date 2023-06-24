const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");


exports.createProduct = catchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id;

    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
});

exports.getAllProducts = catchAsyncErrors(async (req, res) => {

    const resultPerPage = 5;
    const productsCount = await Product.countDocuments();
    const ApiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);

    const products = await ApiFeature.query;
    res.status(200).json({
        success: true,
        products,
        productsCount
    });
});

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler(404, "Product not found"))
    } else {
        res.status(200).json({
            success: true,
            product
        })
    }
});

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler(404, "Product not found"))
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindandModify: false
    });
    res.status(200).json({
        success: true,
        product
    })
});

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler(404, "Product not found"));
    }
    const id = req.params.id;
    console.log(id);
    try {
        await Product.findByIdAndDelete(id);
    } catch (error) {
        console.log("ErrOR   ", error)
    }
    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    })
});


