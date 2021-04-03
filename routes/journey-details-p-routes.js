const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const JourneyDetailsProgress = require('../models/data/journey-details-p-model');

//DELETE JOURNEY
router.delete('/journeys-progress/:journeyID/details/:detailsID', (req, res, next) => {

  const {journeyID, detailsID} = req.params;

  if(!mongoose.Types.ObjectId.isValid(journeyID) || !mongoose.Types.ObjectId.isValid(detailsID)) {
    res.status(400).json({message: 'Specific id is not valid.'});
    return;
  }

  JourneyDetailsProgress.findByIdAndRemove(detailsID)
  .then(() => res.status(200).json({message: `Journey Detail Progress with ${detailsID} was removed successfully.`}) )
  .catch(err => res.status(500).json(err))
})

//PUT JOURNEY DETAILS PROGRESS
router.put('/journeys-progress/:journeyID/details/:detailsID', (req, res, next) => {

  const {journeyID, detailsID} = req.params;

  if(!mongoose.Types.ObjectId.isValid(journeyID) || !mongoose.Types.ObjectId.isValid(detailsID)) {
    res.status(400).json({message: 'Specific id is not valid.'});
    return;
  }

  JourneyDetailsProgress.findByIdAndUpdate(detailsID, req.body, {new: true})
  .then(response => res.status(200).json(response))
  .catch(err => res.status(500).json(err))
})

//POST JOURNEY DETAILS PROGRESS
router.post('/journeys-progress/:id/details', (req, res, next) => {

  const {id} = req.params;
  const {milestoneProgress, order} = req.body;
  
  JourneyDetailsProgress.create({journeyProgress: id, milestoneProgress, order})
  .then(response => res.status(200).json(response))
  .catch(err => res.status(500).json(err))
})

//GET JOURNEY DETAILS PROGRESS
router.get('/journeys-progress/:id/details', (req, res, next) => {

  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({message: 'Specific id is not valid.'});
    return;
  }

  JourneyDetailsProgress.find({journeyProgress: id})
  .populate('milestoneProgress')
  .populate('journeyProgress')
  .then(response => res.status(200).json(response))
  .catch(err => res.status(500).json(err))
})

module.exports = router;