const mongoose = require('mongoose');

// const votingBoothSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   votingBoothId: { type: String, required: true },
//   hasVoted: {
//     type: Boolean,
//     default: false,
//     validate: {
//       validator: async function(v) {
      
//         const user = await mongoose.model('User').findById(this.userId);
//         if (!user) 
//           return false;  
//         return user.eligibleForVoting === 'eligible';  //remove Math.random
//       },
//       message: 'User is not eligible to vote' 
//     }
//   },
//   assignedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  
// });

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
// // votingBoothSchema.js
// const mongoose = require('mongoose');

// const votingBoothSchema = new mongoose.Schema({
//   votingBoothId: { type: String, required: true, unique: true },
//   location: { type: String, required: true },
//   assignedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//   capacity: { type: Number, default: 15 },
// });

// votingBoothSchema.methods.assignUser = async function(userId) {
//   if (this.assignedUsers.length >= this.capacity) {
//     throw new Error('Voting booth is at maximum capacity');
//   }
//   this.assignedUsers.push(userId);
//   await this.save();
// };

// module.exports = mongoose.model('VotingBooth', votingBoothSchema);

// // votingBoothController.js
// const User = require('../db/schema/userSchema');
// const VotingBooth = require('../db/schema/votingBoothSchema');

// exports.createVotingBooth = async (req, res) => {
//   const { votingBoothId, location } = req.body;

//   if (!votingBoothId || !location) {
//     return res.status(400).json({ error: 'Voting Booth ID and location are required' });
//   }

//   try {
//     const existingBooth = await VotingBooth.findOne({ votingBoothId });
//     if (existingBooth) {
//       return res.status(409).json({ error: 'Voting booth with this ID already exists' });
//     }

//     const newBooth = new VotingBooth({ votingBoothId, location });
//     await newBooth.save();
//     res.status(201).json({ message: 'Voting booth created successfully', booth: newBooth });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to create voting booth' });
//   }
// };

// exports.assignVotingBooth = async (req, res) => {
//   const { userId, votingBoothId } = req.body;

//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     if (user.eligibleForVoting !== 'eligible') {
//       return res.status(403).json({ error: 'User is not eligible for voting' });
//     }

//     const votingBooth = await VotingBooth.findOne({ votingBoothId });
//     if (!votingBooth) {
//       return res.status(404).json({ error: 'Voting booth not found' });
//     }

//     await votingBooth.assignUser(userId);
//     res.status(200).json({ message: 'User assigned to voting booth successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// ... (other functions remain the same: vote, withdrawVote, getEligibleUsersCount)