const mongoose = require('mongoose');

const votingBoothSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  assignedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  capacity: { type: Number, default: 15 },
  records: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      votingBoothId: { type: mongoose.Schema.Types.ObjectId, ref: 'VotingBooth' },
      hasVoted: { type: Boolean, default: false },
    },
  ],
});

// Pre-save validation to ensure assigned users do not exceed capacity
votingBoothSchema.pre('save', function (next) {
  if (this.assignedUsers.length > this.capacity) {
    return next(new Error('Voting booth capacity exceeded'));
  }
  next();
});

// Method to assign a user to the voting booth
votingBoothSchema.methods.assignUser = async function (userId) {
  // Check if the booth is at maximum capacity
  if (this.assignedUsers.length >= this.capacity) {
    throw new Error('Voting booth is at maximum capacity');
  }
  this.assignedUsers.push(userId);
  await this.save(); // Save the updated booth
};

module.exports = mongoose.model('VotingBooth', votingBoothSchema);
