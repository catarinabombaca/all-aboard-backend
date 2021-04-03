const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const journeyProgressSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name is required.']
    },
    expectedDuration: {
      type: Number,
      min: 0,
      trim: true,
      required: [true, 'Expected Duration is required.']
    },
    start: {
      type: Date,
      default: Date.now
    },
    end: Date,
    progress: Number,
    expectedDuration: {
      type: Number,
      min: 0,
      trim: true
    },
    user: Schema.Types.ObjectId
  },
  {
    timestamps: true,
  }
);

const JourneyProgress = mongoose.model('JourneyProgress', journeyProgressSchema);
module.exports = JourneyProgress;