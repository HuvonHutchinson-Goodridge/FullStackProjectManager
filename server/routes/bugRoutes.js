const express = require('express');
const bugController = require("./../controllers/bugController")
const authController = require('./../controllers/authController');

const router = express.Router({mergeParams: true});

router.use(authController.protect);

router.route('/stats')
    .get(bugController.getBugStats);

router.route('/')
    .get(authController.protect, bugController.getAllBugs)
    .post(authController.protect, bugController.setProjectUserIds, bugController.createBug);

router.route('/:id')
    .get(bugController.getBug)
    .patch(bugController.updateBug)
    .delete( authController.restrictTo('admin'), bugController.deleteBug)

module.exports = router;