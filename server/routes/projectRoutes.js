const express = require('express');
const router = express.Router();
const projectController = require('./../controllers/projectController')
const authController = require('./../controllers/authController')

router.route('/').get(projectController.getAllProjects)

module.exports = router;