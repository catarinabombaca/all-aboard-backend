const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const milestoneProgressSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name is required.']
    },
    description: String,
    expectedDuration: {
      type: Number,
      min: 0,
      trim: true,
      required: [true, 'Expected Duration is required.']
    },
    start: Date,
    end: Date,
    progress: Number,
    actualDuration: Number,
    milestone: {
      type: Schema.Types.ObjectId, 
      ref: "Milestone" 
    }
    },
  {
    timestamps: true,
  }
);

const MilestoneProgress = mongoose.model('MilestoneProgress', milestoneProgressSchema);
module.exports = MilestoneProgress;