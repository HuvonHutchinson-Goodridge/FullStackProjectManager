const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true],
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    numOfUsers: {
        type: Number,
        default: 0,
    },
    numOfBugs: {
        type: Number,
        default: 0,
    },
    bugsPending: {
        type: Number,
        default: 0
    },
    bugsResolved: {
        type: Number,
        default: 0,
    },
    users: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, "The project must have users"]
    }]
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }

    }
)
//projectSchema.index({ slug: 1 });

//projectSchema.pre('save', function (next) {
//    this.slug = slugify(this.user, { lower: true })
//    next();
//})

projectSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'users',
        select: '-__v'
    })
    next();
})



const Project = mongoose.model('Project', projectSchema);

module.exports = Project;