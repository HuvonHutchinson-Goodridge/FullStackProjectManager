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
        required: [true, "Project must have registered bugs"]
    }],
    users: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, "Project must have users on it"]
    }]
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }

    }
)

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;