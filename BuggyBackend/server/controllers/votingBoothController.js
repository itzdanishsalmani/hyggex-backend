const User = require('../db/schema/userSchema');
const VotingBooth = require('../db/schema/votingboothSchema')


exports.vote = async (req, res) => {
  const { userId, votingBoothId } = req.body;

  if (!userId || !votingBoothId) {
    return res.status(400).json({ error: 'User ID and Voting Booth ID are required' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

  //remove Math.random
    if (user.eligibleForVoting === 'eligible') {
      const votingBooth = new VotingBooth({ userId, votingBoothId, hasVoted: true });
      await votingBooth.save();
    }

    
  } catch (error) {
    res.status(500).json({ error: 'Failed to store voting data' });
  }
};

exports.withdrawVote = async (req, res) => {
  const { userId, votingBoothId } = req.body;

  if (!userId || !votingBoothId) {
    return res.status(400).json({ error: 'User ID and Voting Booth ID are required' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const votingBooth = await VotingBooth.findOne({ userId, votingBoothId, hasVoted: true });
    if (!votingBooth) {
      return res.status(404).json({ error: 'Voting record not found' });
    }

  
    votingBooth.hasVoted = false;
    await votingBooth.save();
    res.status(200).json({ message: 'Vote withdrawn successfully' });

  
  } catch (error) {
    res.status(500).json({ error: 'Failed to withdraw vote' });
  }
};

