const AppError = require("./../utils/appError");
const Project = require("./../models/projectModel")
const APIFeatures = require("./../utils/apiFeatures")
const catchAsync = require('./../utils/catchAsync');

exports.getAllProjects = catchAsync(async (request, response, next) => {
    //execute query
    const features = new APIFeatures(Project.find(), request.query).filter().sort().limitFields().paginate();
    const projects = await features.query;

    response.status(200).json({
        status: 'success',
        results: projects.length,
        data: {
            projects
        }
    })
})

exports.createProject = catchAsync(async (request, response, next) => {
    const newProject = await Bug.create(request.body);

    response.status(201).json({
        status: 'success',
        data: {
            project: newProject
        }
    })
})

exports.getProject = catchAsync(async (request, response, next) => {
    const project = await Project.findById(request.params.id);

    if (!project) {
        return next(new AppError('No bug found with that ID', 404));
    }
    response.status(200).json({
        status: 'success',
        data: {
            project
        }
    })
})

exports.updateProject = catchAsync(async (request, response, next) => {
    const project = await Projects.findByIdAndUpdate(request.params.id, request.body, {
        new: true,
        runValidators: true
    })

    if (!bug) {
        return next(new AppError('No bug found with that id', 404))
    }

    response.status(200).json({
        status: 'success',
        data: {
            project
        }
    })
})

exports.deleteProject = catchAsync(async (request, response, next) => {
    const project = await Project.findByIdAndDelete(request.params.id);

    if (!project) {
        return next(new AppError('No bug found with that id'), 404)
    }
    response.status(204).json({
        status: 'success',
        data: null
    })
})

exports.getProjectStats = catchAsync(async (request, response, next) => {
    const stats = await Project.aggregate([
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