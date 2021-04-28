const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const taskProgressSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name is required.']
    },
    description: String,
    type: {
      type: String,
      enum: ['General', 'Course', 'Ramp Up'],
      required: [true, 'Type is required.']
    },
    course: String,
    docURL: String,
    submitURL: String,
    milestoneProgress: {
      type: Schema.Types.ObjectId, 
      ref: "MilestoneProgress" 
    },
    expectedDuration: {
      type: Number,
      min: 0,
      trim: true,
      required: [true, 'Expected Duration is required.']
    },
    start: Date,
    end: Date,
    status: {
      type: String,
      enum: ['Pending', 'Closed']
    },
    actualDuration: Number
  },
  {
    timestamps: true,
  }
);

const TaskProgress = mongoose.model('TaskProgress', taskProgressSchema);
module.exports = TaskProgress;