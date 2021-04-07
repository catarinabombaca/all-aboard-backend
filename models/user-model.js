const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required.'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      trim: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
    },
    imageUrl: {
      type: String,
      default: '/images/user_default.png',
    },
    role: {
      type: String,
      enum: ['Team Member', 'Team Leader'],
      required: [true, 'Role is required.']
    },
    teamLeader: {
      type: Schema.Types.ObjectId, 
      ref: "User" 
    },
    firstTime: Boolean,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;