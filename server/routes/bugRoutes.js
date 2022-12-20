const express = require('express');
const bugController = require("./../controllers/bugController")
const router = express.Router();
const authController = require('./../controllers/authController');
/*router.param('id', tourController.checkID)*/

router.route('/best-bugs').get(bugController.aliasBestBugs, bugController.getAllBugs);
router.route('/stats').get(bugController.getBugStats);
router.route('/').get(authController.protect, bugController.getAllBugs).post(bugController.createBug);
router.route('/:id').get(bugController.getBug).patch(bugController.updateBug).delete(authController.protect, authController.restrictTo('admin'), bugController.deleteBug)

module.exports = router;