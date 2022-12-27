const mongoose = require("mongoose")

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

//QUERY MIDDLEWARE

bugSchema.pre(/^find/, function (next) {
    this.populate({ path: 'user', select: '-email -role -__v' })
    this.populate({ path: 'assignedTo', select: '-email -role -__v' })
    next();
})

const Bug = mongoose.model('Bug', bugSchema);

module.exports = Bug