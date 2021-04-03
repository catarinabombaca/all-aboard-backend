const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const JourneyDetails = require('../models/template/journey-details-model');

//DELETE JOURNEY
router.delete('/journeys/:journeyID/details/:detailsID', (req, res, next) => {

  const {journeyID, detailsID} = req.params;

  if(!mongoose.Types.ObjectId.isValid(journeyID) || !mongoose.Types.ObjectId.isValid(detailsID)) {
    res.status(400).json({message: 'Specific id is not valid.'});
    return;
  }

  JourneyDetails.findByIdAndRemove(detailsID)
  .then(() => res.status(200).json({message: `Journey Detail with ${detailsID} was removed successfully.`}) )
  .catch(err => res.status(500).json(err))
})

//PUT JOURNEY DETAILS
router.put('/journeys/:journeyID/details/:detailsID', (req, res, next) => {

  const {journeyID, detailsID} = req.params;

  if(!mongoose.Types.ObjectId.isValid(journeyID) || !mongoose.Types.ObjectId.isValid(detailsID)) {
    res.status(400).json({message: 'Specific id is not valid.'});
    return;
  }

  JourneyDetails.findByIdAndUpdate(detailsID, req.body, {new: true})
  .then(response => res.status(200).json(response))
  .catch(err => res.status(500).json(err))
})

//POST JOURNEY DETAILS
router.post('/journeys/:id/details', (req, res, next) => {

  const {id} = req.params;
  const {milestone, order} = req.body;
  
  JourneyDetails.create({journey: id, milestone, order})
  .then(response => res.status(200).json(response))
  .catch(err => res.status(500).json(err))
})

//GET JOURNEY DETAILS
router.get('/journeys/:id/details', (req, res, next) => {

  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({message: 'Specific id is not valid.'});
    return;
  }

  JourneyDetails.find({journey: id})
  .populate('milestone')
  .populate('journey')
  .then(response => res.status(200).json(response))
  .catch(err => res.status(500).json(err))
})

module.exports = router;