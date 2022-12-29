const mongoose = require("mongoose")
const Project = require('./projectModel');

const bugSchema = new mongoose.Schema({
    bug: {
        type: String,
        unique: true,
        required: [true, "You must input a bug"],
        trim: true
    },
    bugStatus: {
        type: String,
        default: "Pending",
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    assignedTo: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "The bug must be assigned to someone"]
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "The bug must belong to a user"],
    },
    project: {
        type: mongoose.Schema.ObjectId,
        ref: "Project",
        required: [true, "The bug must belong to a project"]
    }
})

//DOCUMENT MIDDLEWARE: RUNS BEFORE .SAVE AND .CREATE()
//bugSchema.pre('save', function (next) {
//    this.slug = slugify(this.user, { lower: true })
//    next();
//})

//bugSchema.post('save', function (doc, next) {
//    console.log(doc)
//    next();
//})

//bugSchema.pre(/^find/, function (next) {
//    this.find({ secretBug: { $ne: true } })
//    this.start = Date.now();
//    next();
//})

//bugSchema.post(/^find/, function (docs, next) {
//    console.log(`Query took ${Date.now() - this.start} milliseconds`)
//    next();
//})

//bugSchema.pre('aggregate', function (next) {
//    this.pipeline().unshift({ $match: { secretBug: {$ne: true}}})
//    next();
//})

bugSchema.statics.calcData = async function (projectId) {
    const stats = await this.aggregate([
        {
            $match: { project: projectId }
        },
        {
            $group: {
                _id: "$bugStatus",
                numOfBugs: {$sum: 1}
            }
        },
    ])
    await Project.findByIdAndUpdate(projectId, {
        bugsPending: stats[0].numOfBugs,
        bugsResolved: stats[1].numOfBugs,
        numOfBugs: stats[0].numOfBugs + stats[1].numOfBugs
    })
}

bugSchema.post('save', function () {
    this.constructor.calcData(this.project)
})

//QUERY MIDDLEWARE
bugSchema.pre(/^findOneAnd/, async function (next) {
    this.r = await this.findOne().clone();
    next();
})

bugSchema.post(/^findOneAnd/, async function () {
    await this.r.constructor.calcData(this.r.project);
})

bugSchema.pre(/^find/, function (next) {
    this.populate({ path: 'user', select: '-email -role -__v' })
    this.populate({ path: 'assignedTo', select: '-email -role -__v' })
    next();
})

const Bug = mongoose.model('Bug', bugSchema);

module.exports = Bug