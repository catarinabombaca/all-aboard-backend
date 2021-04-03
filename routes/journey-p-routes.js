const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const JourneyProgress = require('../models/data/journey-p-model');
const JourneyDetailsProgress = require('../models/data/journey-details-p-model');

//DELETE JOURNEY PROGRESS
router.delete('/journeys-progress/:id', (req, res, next) => {

  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({message: 'Specific id is not valid.'});
    return;
  }

  JourneyProgress.findByIdAndRemove(id)
  .then(() => {
    return JourneyDetailsProgress.remove({journeyProgress: id})
  })
  .then(() => res.status(200).json({message: `Journey Progress with ${id} was removed successfully.`}) )
  .catch(err => res.status(500).json(err))
})

//PUT JOURNEY PROGRESS
router.put('/journeys-progress/:id', (req, res, next) => {

  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({message: 'Specific id is not valid.'});
    return;
  }

  JourneyProgress.findByIdAndUpdate(id, req.body, {new: true})
  .then(response => res.status(200).json(response))
  .catch(err => res.status(500).json(err))
})

//GET JOURNEY PROGRESS
router.get('/journeys-progress/:id', (req, res, next) => {

  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({message: 'Specific id is not valid.'});
    return;
  }

  JourneyProgress.findById(id)
  .then(response => res.status(200).json(response))
  .catch(err => res.status(500).json(err))
})

//POST JOURNEYS PROGRESS
router.post('/journeys-progress', (req, res, next) => {
  
  JourneyProgress.create(req.body)
  .then(response => res.status(200).json(response))
  .catch(err => res.status(500).json(err))
})

//GET JOURNEYS PROGRESS
router.get('/journeys-progress', (req, res, next) => {

  JourneyProgress.find()
  .populate('users')
  .then(response => res.status(200).json(response))
  .catch(err => res.status(500).json(err))
})

module.exports = router;