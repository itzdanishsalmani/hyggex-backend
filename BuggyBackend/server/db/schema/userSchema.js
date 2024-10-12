const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    city: { type: String },
    country: { type: String }
  },
  createdAt: { type: Date, default: Date.now },
  eligibleForVoting: {
    type: String,
    enum: ['eligible', 'not eligible'],
    
    //added age check function when inserting user
    default: function () {
      if(this.age<18){
        return 'not eligible'
      }else{
        return 'eligible'
      }
    }
  }
});

module.exports = mongoose.model('User', userSchema);

