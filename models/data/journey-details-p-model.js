const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const journeyDetailsProgressSchema = new Schema(
  {
    journeyProgress: {
      type: Schema.Types.ObjectId, 
      ref: "JourneyProgress" 
    },
    milestoneProgress: {
      type: Schema.Types.ObjectId, 
      ref: "MilestoneProgress" 
    },
    order: {
      type: Number,
      min: 0, 
      trim: true
    }
  },
  {
    timestamps: true,
  }
);

const JourneyDetailsProgress = mongoose.model('JourneyDetailsProgress', journeyDetailsProgressSchema);
module.exports = JourneyDetailsProgress;