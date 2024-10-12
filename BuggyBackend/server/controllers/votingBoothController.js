const User = require("../db/schema/userSchema");
const VotingBooth = require("../db/schema/votingBoothSchema");

//created create voting booth route
exports.createBooth = async (req, res) => {
  const { location } = req.body;
  console.log(location);
  if (!location) {  
    return res.status(400).json({ error: "location required" });
  }
  try {
    const votingBooth = new VotingBooth({ location });
    await votingBooth.save();

    return res
      .status(200)
      .json({ message: "voting booth created successfully", votingBooth });
  } catch (error) {
    return res.status(500).json({ error: "Error while creating booth" });
  }
};

//created assign user to vote route
exports.assignVote = async (req, res) => {
  const { userId, votingBoothId } = req.body;

  if (!userId || !votingBoothId) {
    return res
      .status(404)
      .json({ error: "userId and votingBoothId are required" });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User doesn't exist" });
    }

    const votingBooth = await VotingBooth.findById(votingBoothId);

    if (!votingBooth) {
      return res.status(404).json({ error: "Voting booth doesn't esist" });
    }

    const assignExist = votingBooth.assignedUsers.includes(userId);

    if (assignExist) {
      return res.status(409).json({ error: "User already assign" });
    }

   // Attempt to assign the user to the voting booth
   try {
    await votingBooth.assignUser(userId);
    return res
      .status(200)
      .json({ message: "User assigned successfully", votingBooth });
  } catch (error) {
    // Handle capacity exceeded error thrown from assignUser
    return res.status(409).json({ error: error.message });
  }
} catch (error) {
  return res.status(500).json({ error: "Error while assigning user", error });
}
};

exports.vote = async (req, res) => {
  const { userId, votingBoothId } = req.body;

  if (!userId || !votingBoothId) {
    return res
      .status(404)
      .json({ error: "User ID and Voting Booth ID are required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const votingBooth = await VotingBooth.findById(votingBoothId);
    if (!votingBooth) {
      return res.status(404).json({ error: "Voting Booth doesn't exist" });
    }

    if (user.eligibleForVoting === "eligible") {
      const assignedBooth = votingBooth.assignedUsers.includes(userId);
      if (!assignedBooth) {
        return res
          .status(401)
          .json({ error: "You are not assigned to this booth" });
      }

      // Check if the user has already voted
      const alreadyVotedUser = votingBooth.records.some(
        (record) => record.userId.toString() === userId
      );
      if (alreadyVotedUser) {
        return res.status(409).json({ error: "User already voted" });
      }

      // Push to records array and save
      votingBooth.records.push({
        userId: userId,
        votingBoothId: votingBoothId,
        hasVoted: true,
      });

      await votingBooth.save();

      return res
        .status(200)
        .json({ message: "User voted successfully", votingBooth });
    } else {
      return res.status(403).json({ error: "User not eligible for voting" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to store voting data" });
  }
};

exports.withdrawVote = async (req, res) => {
  const { userId, votingBoothId } = req.body;

  if (!userId || !votingBoothId) {
    return res
      .status(404)
      .json({ error: "User ID and Voting Booth ID are required" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const votingBooth = await VotingBooth.findById(votingBoothId);

    if (!votingBooth) {
      return res.status(404).json({ error: "Voting booth not found" });
    }

    // Check if the user is eligible to vote; if so, they cannot withdraw their vote
    if (user.eligibleForVoting === "eligible") {
      return res
        .status(401)
        .json({ error: "You are eligible to vote, so no withdraw" });
    }

    const assignedUserIndex = votingBooth.assignedUsers.findIndex(
      (assignedUser) => assignedUser.toString() === userId.toString()
    );

    if (assignedUserIndex === -1) {
      return res
        .status(404)
        .json({ error: "User is not assigned to this voting booth" });
    }

    // Remove the user from the assignedUsers array
    votingBooth.assignedUsers.splice(assignedUserIndex, 1);

    // Save the changes to the votingBooth
    await votingBooth.save();

    return res
      .status(200)
      .json({ message: "Vote withdrawn successfully", votingBooth });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to withdraw vote" });
  }
};
