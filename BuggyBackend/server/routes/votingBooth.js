const express = require('express');
const router = express.Router();
const votingBoothController = require('../controllers/votingBoothController');
const withdrawVoteController = require('../controllers/votingBoothController');

router.post('/createbooth',votingBoothController.createBooth);

router.post('/assignbooth', votingBoothController.assignVote);

router.post('/vote', votingBoothController.vote);

router.post('/withdraw', withdrawVoteController.withdrawVote);

module.exports = router;