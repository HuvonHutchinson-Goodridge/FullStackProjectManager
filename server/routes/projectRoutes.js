const express = require('express');
const router = express.Router();
const projectController = require('./../controllers/projectController')
const authController = require('./../controllers/authController')

router.route('/').get(projectController.getAllProjects).post(projectController.createProject)
router.route('/:id')
    .get(projectController.getProject)
    //.update(projectController.updateProject)
    //.delete(authController.protect,
    //    authController.restrictTo('admin'),
    //    projectController.createProject);


module.exports = router;