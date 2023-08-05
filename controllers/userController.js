
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const { sendToken } = require('../utils/jwtToken');
const sendEmail = require("../utils/sendEmail");
const crypto = require('crypto')

// registration new User
exports.registerNewUser = catchAsyncErrors(async (req, res, next) => {

    const { name, email, password } = req.body;
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "Sample ID",
            url: "abcdefg"
        }
    })

    sendToken(user, 201, res);
    // res.status(201).json({
    //     success: true,
    //     token
    // })
})

// Login a User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler(400, "Please Enter Email & Password"));
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler(401, "Invalid email or password"));
    }
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler(401, "Invalid email or password"));
    }
    sendToken(user, 200, res);
})

// logout a User
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });

})

// forgetting a Password (Send link to reset password)
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler(404, "User not found"));
    }
    //  generate reset password token
    const resetToken = await user.genResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(500, error.message));
    }
})

// reset the password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(new ErrorHandler(400, "Reset password token is invalid or has been expired"));
    }
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHander("Password does not match", 400));
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);

})

// update user password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {

    console.log(req.user);
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler(400, "old password is incorrect"));
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler(400, "Password not match"));
    }
    user.password = req.body.newPassword;
    await user.save();

    sendToken(user, 200, res);
})


// get logged in User Details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    })
})

// update user profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }
    // if(req.body.avatar !== ""){
    // }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    res.status(200).json({
        success: true,
    })
})

// get all Users
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })

})

// get single user
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(400, `User not exist with this id ${req.params.id}`));
    }
    res.status(200).json({
        success: true,
        user
    })
})

// update user role  -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const check = await User.findById(req.params.id);
    if (!check) {
        return next(new ErrorHandler(400, `User not found with id -> ${req.params.id}`))
    }
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    res.status(200).json({
        success: true,
        message: "Updated Successfully"
    })

})

// Delete user -- Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(400, `User not exist with this id ${req.params.id} `))
    }
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "User deleted successfully",
    })
})


