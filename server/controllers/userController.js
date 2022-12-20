const AppError = require("./../utils/appError");
const User = require("./../models/userModel")
const catchAsync = require('./../utils/catchAsync');

const filterObj = (obj, ...allowedFields) => {
    const newObj = Object.create(Object.prototype);
    Object.keys(obj).forEach(element => {
        if (allowedFields.includes(element)) {
            newObj[element] = obj[element]
        }
    })
    return newObj;
}

exports.getAllUsers = catchAsync(async (request, response, next) => {

    let users = await User.find();

    response.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users
        }
    })
})

exports.createUser = catchAsync(async (request, response, next) => {
    response.status(500).json({
        status: 'error',
        message: 'route not defined'
    })
})

exports.getUser = catchAsync(async (request, response, next) => {
    response.status(500).json({
        status: 'error',
        message: 'route not defined'
    })
})

exports.updateMe = catchAsync(async (request, response, next) => {
    //Create an error if user tries to update the password
    if (request.body.password || request.body.confirmPassword) {
        return next(new AppError('This route is not for password updates. Please use /updatePassword', 400))
    }
    //if not, update the user document
    //Filter out unwanted field names
    const filteredBody = filterObj(request.body, "firstName", "lastName", "email");
    const updatedUser = await User.findByIdAndUpdate(request.user.id, filteredBody, {
        new: true, runValidators: true
    });
    response.status(200).json({
        status: 'success',
        data: {
            user: updatedUser
        }

    })
})

exports.deleteMe = catchAsync(async (request, response, next) => {
    await User.findByIdAndUpdate(request.user.id, { active: false });
    response.status(204).json({
        status: 'success',
        data: null
    })
})

exports.updateUser = catchAsync(async (request, response, next) => {
    response.status(500).json({
        status: 'error',
        message: 'route not defined'
    })
})

exports.deleteUser = catchAsync(async (request, response, next) => {
    response.status(500).json({
        status: 'error',
        message: 'route not defined'
    })
})
