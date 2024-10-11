const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/', userController.getAllUsers);


router.post('/', userController.addUser);


router.get('/eligible', userController.getEligibleUsers);

router.get('/update', userController.updateUserDetails);

module.exports = router;
