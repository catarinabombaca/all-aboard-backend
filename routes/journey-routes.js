const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Journey = require('../models/template/journey-model');
const JourneyDetails = require('../models/template/journey-details-model');

//DELETE JOURNEY
router.delete('/journeys/:id', (req, res, next) => {

  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({message: 'Specific id is not valid.'});
    return;
  }

  Journey.findByIdAndRemove(id)
  .then(() => {
    return JourneyDetails.remove({journey: id})
  })
  .then(() => res.status(200).json({message: `Journey with ${id} was removed successfully.`}) )
  .catch(err => res.status(500).json(err))
})

//PUT JOURNEY
router.put('/journeys/:id', (req, res, next) => {

  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({message: 'Specific id is not valid.'});
    return;
  }

  Journey.findByIdAndUpdate(id, req.body, {new: true})
  .then(response => res.status(200).json(response))
  .catch(err => res.status(500).json(err))
})

//GET JOURNEY
router.get('/journeys/:id', (req, res, next) => {

  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({message: 'Specific id is not valid.'});
    return;
  }

  Journey.findById(id)
  .then(response => res.status(200).json(response))
  .catch(err => res.status(500).json(err))
})

//POST JOURNEYS
router.post('/journeys', (req, res, next) => {
  
  Journey.create(req.body)
  .then(response => res.status(200).json(response))
  .catch(err => res.status(500).json(err))
})

//GET JOURNEYS
router.get('/journeys', (req, res, next) => {

  Journey.find()
  .then(response => res.status(200).json(response))
  .catch(err => res.status(500).json(err))
})

module.exports = router;