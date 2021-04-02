const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const journeySchema = new Schema(
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
    }
  },
  {
    timestamps: true,
  }
);

const Journey = mongoose.model('Journey', journeySchema);
module.exports = Journey;