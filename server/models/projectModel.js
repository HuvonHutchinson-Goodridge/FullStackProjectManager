const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true]
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
    bugs: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Bug',
    }],
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

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;