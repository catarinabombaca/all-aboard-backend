const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const taskSchema = new Schema(
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
    milestones: {
      type: [Schema.Types.ObjectId], 
      ref: "Milestone" 
    },
    expectedDuration: {
      type: Number,
      min: 0,
      trim: true,
      required: [true, 'Expected Duration is required.']
    }
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;