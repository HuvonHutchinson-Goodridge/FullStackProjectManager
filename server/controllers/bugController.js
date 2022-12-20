const AppError = require("./../utils/appError");
const Bug = require("./../models/bugModel")
const APIFeatures = require("./../utils/apiFeatures")
const catchAsync = require('./../utils/catchAsync');

exports.aliasBestBugs = (request, response, next) => {
    request.query.limit = '5';
    request.query.sort = "numOfPeople";
    request.query.fields = 'user,numOfPeople,bug'
    next();
}



exports.getAllBugs = catchAsync(async (request, response, next) => {
    //execute query
    const features = new APIFeatures(Bug.find(), request.query).filter().sort().limitFields().paginate();
    const bugs = await features.query;

    response.status(200).json({
        status: 'success',
        results: bugs.length,
        data: {
            bugs
        }
    })
})

exports.createBug = catchAsync(async (request, response, next) => {
    const newBug = await Bug.create(request.body);

    response.status(201).json({
        status: 'success',
        data: {
            bug: newBug
        }
    })
})

exports.getBug = catchAsync(async (request, response, next) => {
    const bug = await Bug.findById(request.params.id);

    if (!bug) {
        return next(new AppError('No bug found with that ID', 404));
    }
    response.status(200).json({
        status: 'success',
        data: {
            bug
        }
    })
})

exports.updateBug = catchAsync(async (request, response, next) => {
    const bug = await Bug.findByIdAndUpdate(request.params.id, request.body, {
        new: true,
        runValidators: true
    })

    if (!bug) {
        return next(new AppError('No bug found with that id', 404))
    }

    response.status(200).json({
        status: 'success',
        data: {
            bug
        }
    })
})

exports.deleteBug = catchAsync(async (request, response, next) => {
    const bug = await Bug.findByIdAndDelete(request.params.id);

    if (!bug) {
        return next(new AppError('No bug found with that id'), 404)
    }
    response.status(204).json({
        status: 'success',
        data: null
    })
})

exports.getBugStats = catchAsync(async (request, response, next) => {
    const stats = await Bug.aggregate([
        {
            $match: {
                numOfPeople: { $gte: 10 }
            }
        },
        {
            $group: {
                _id: { $toUpper: "$bugStatus" },
                avgNumOfPeople: { $avg: '$numOfPeople' },
                numOfBugs: { $sum: 1 },
                numOfPending: { $sum: 1 },
                minPeople: { $min: "$numOfPeople" },
                maxPeople: { $max: "numOfPeople" }
            }
        },
        {
            $sort: {
                numOfPeople: 1
            }
        },
        {
            $match: { _id: { $ne: "Pending" } }
        }
    ])
    response.status(200).json({
        status: 'success',
        stats
    })

})