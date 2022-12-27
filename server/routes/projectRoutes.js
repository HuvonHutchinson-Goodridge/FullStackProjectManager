const express = require('express');
const router = express.Router();
const projectController = require('./../controllers/projectController')
const authController = require('./../controllers/authController')
const bugController = require('./../controllers/bugController')
const bugRouter = require('./bugRoutes')

router.use('/:projectId/bugs', bugRouter);

router.route('/').get(projectController.getAllProjects).post(projectController.createProject)

router.route('/:id')
    .get(projectController.getProject)
    .patch(authController.protect,
        authController.restrictTo('admin'),
        projectController.updateProject)
    .delete(authController.protect,
        authController.restrictTo('admin'),
        projectController.createProject);

module.exports = router;