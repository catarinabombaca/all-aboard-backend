const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const journeyDetailsSchema = new Schema(
  {
    journey: {
      type: Schema.Types.ObjectId, 
      ref: "Journey" 
    },
    milestone: {
      type: Schema.Types.ObjectId, 
      ref: "Milestone" 
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

const JourneyDetails = mongoose.model('JourneyDetails', journeyDetailsSchema);
module.exports = JourneyDetails;