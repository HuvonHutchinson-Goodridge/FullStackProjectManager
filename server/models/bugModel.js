const mongoose = require("mongoose")
const slugify = require("slugify")

const bugSchema = new mongoose.Schema({
    user: {
        type: String,
        required: [true, "A bug must have a user"],
        trim: true,
        maxLength: [40, 'Your name is too long'],
        minLength: [10, 'You name is too short']
    },
    userID: {
        type: String,
        required: [true, "A bug must have a userID"]
    },
    bug: {
        type: String,
        unique: true,
        required: [true, "You must input a bug"],
        trim: true
    },
    bugStatus: {
        type: String,
        default: "Pending",
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    assignedTo: {
        type: String,
        default: "Admin",
        trim: true
    },
    project: {
        type: String,
        required: [true, "You must name the project with the bug"],
        trim: true
    },
    numOfPeople: Number,
    slug: String,
    secretBug: {
        type: Boolean,
        default: false
    }
})

//DOCUMENT MIDDLEWARE: RUNS BEFORE .SAVE AND .CREATE()
bugSchema.pre('save', function (next) {
    this.slug = slugify(this.user, { lower: true })
    next();
})

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

const Bug = mongoose.model('Bug', bugSchema);

module.exports = Bug