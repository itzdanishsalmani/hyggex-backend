const User = require('../db/schema/userSchema');

// added (req,res) as a parameters
exports.getAllUsers = async (req,res) => {
  try {
    //added await before DB call
    const users = await User.find(); 
    //added return 
    return res.json(users);
  } catch (error) {
    //added return 
    return res.status(500).json({ error: 'Failed to fetch users' });
  }
};

exports.addUser = async (req, res) => {
  const { name, age, email, address } = req.body;

  if (!name || !age || !email) {
    return res.status(400).json({ error: 'Name, age, and email are required' });
  }

  try {

    //added check for Existing users because, email is set unique in userSchema
    const userExist = await User.findOne({email});

    if (userExist) {
      return res.status(409).json({error:"Email already taken or User exist"});
    }

    // address can be undefined because, adress is not set to require in userSchema 
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
        //added return 
        return res.status(404).json({ message: 'No eligible users found' });
      }

      let eligibleVoterCount = eligibleUsers.length
      // added return, it will send the eligible users
      return res.json({eligibleVoterCount,eligibleUsers})
  
    } catch (error) {
      //added return 
      return res.status(500).json({ error: 'Failed to fetch eligible users' });
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
      
      //added email check, because it should be unique
      const existEmail = await User.findOne({email})

      if(existEmail) {
        return res.status(409).json({error:"Email already exist"})
      }
      // updating 
      user.name = name || user.name;
      user.email = email || user.email;
      if (age !== undefined) {
        user.age = age;
  
        // Update eligibility based on the new age
        if (user.age >= 18) {
          user.eligibleForVoting = 'eligible';
        } else {
          user.eligibleForVoting = 'not eligible';
        }
      }
      await user.save();

      //added return 
      return res.json({ message: 'User details updated successfully', user });
    } catch (error) {
      //added return 
      return res.status(500).json({ error: 'Failed to update user details' });
    }
  };
