const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/', userController.getAllUsers);


router.post('/', userController.addUser);


router.get('/eligible', userController.getEligibleUsers);

// changed from get to put 
router.put('/update', userController.updateUserDetails);

module.exports = router;
