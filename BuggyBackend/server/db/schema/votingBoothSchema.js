const mongoose = require('mongoose');

const votingBoothSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  votingBoothId: { type: String, required: true },
  hasVoted: { 
    type: Boolean, 
    default: false, 
    validate: {
      validator: async function(v) {
      
        const user = await mongoose.model('User').findById(this.userId);
        if (!user) 
          return false;  
        return user.eligibleForVoting === 'eligible';  //remove Math.random
      },
      message: 'User is not eligible to vote'
    }
  },
  assignedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
 
});


module.exports = mongoose.model('VotingBooth', votingBoothSchema);