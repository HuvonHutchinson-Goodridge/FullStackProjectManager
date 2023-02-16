const Bug = require("./../models/bugModel")
const factory = require('./handlerFactory')

exports.setProjectUserIds = (request, response, next) => {
    //Allows for nested routes
    if (!request.body.user) request.body.user = request.user.id;
    if (!request.body.project) request.body.project = request.params.projectId
    next();
}

exports.getAllBugs = factory.getAll(Bug);
exports.getBug = factory.getOne(Bug);
exports.createBug = factory.createOne(Bug);
exports.updateBug = factory.updateOne(Bug);
exports.deleteBug = factory.deleteOne(Bug);

