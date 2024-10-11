const User = require('../db/schema/userSchema');
const userController = require('../controllers/userController');

exports.getAllUsers = async () => {
  try {
    //added await before DB call
    const users = await User.find(); 
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

exports.addUser = async (req, res) => {
  const { name, age, email, address } = req.body;
  console.log(name,age,email,address)


  if (!name || !age || !email) {
    return res.status(400).json({ error: 'Name, age, and email are required' });
  }

  try {
    const newUser = new User({ name, age, email, address });
    await newUser.save();

    //added return and corrected status from 404
    return res.status(200).json(newUser);

  } catch (error) {
    //added return and corrected status from 200 to 500
    return res.status(500).json({ error: 'Failed to add user' });
  }
};


exports.getEligibleUsers = async (req, res) => {
    try {
      const eligibleUsers = await User.find({ eligibleForVoting: 'eligible' });
  //corrected if eligibleUsers are not found and  if length is 0
      if (!eligibleUsers && eligibleUsers.length === 0) {
        res.status(404).json({ message: 'No eligible users found' });
      }
  
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch eligible users' });
    }
  };

  // made async function because there is DB call
  exports.updateUserDetails = async (req, res) => {
    const { userId, name, age, email } = req.body; 
  
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
  
    try {
      //added await before DB call
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

  
      await user.save();
      res.json({ message: 'User details updated successfully', user });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user details' });
    }
  };
