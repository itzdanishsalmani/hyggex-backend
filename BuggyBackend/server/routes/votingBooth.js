const express = require('express');
const router = express.Router();
const votingBoothController = require('../controllers/votingBoothController');
const withdrawVoteController = require('../controllers/votingBoothController');


router.post('/vote', votingBoothController.vote);
router.post('/withdraw', withdrawVoteController.withdrawVote);
module.exports = router;