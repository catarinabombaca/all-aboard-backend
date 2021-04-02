const express = require('express');
const mongoose = require('mongoose');
const { route } = require('.');
const router = express.Router();

const Journey = require('../models/template/journey-model');

//POST JOURNEYS
router.post('/journeys', (req, res, next) => {

  const {name, expectedDuration} = req.body;
  
  Journey.create({name, expectedDuration})
  .then(response => res.status(200).json(response))
  .catch(err => res.status(500).json(err))
})

//GET JOURNEYS
router.get('/journeys', (req, res, next) => {

  Journey.find()
  .then(response => res.status(200).json(response))
  .catch(err => res.status(500).json(err))
})

//GET JOURNEY
router.get('journeys/:id', (req, res, next) => {

  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({message: 'Specific id is not valid.'});
    return;
  }

  Journey.findById(id)
  .then(response => res.status(200).json(response))
  .catch(err => res.status(500).json(err))
})

module.exports = router;