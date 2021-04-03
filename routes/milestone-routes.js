const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Milestone = require('../models/template/milestone-model');
const JourneyDetails = require('../models/template/journey-details-model');
const Task = require('../models/template/task-model');

//DELETE MILESTONE
router.delete('/milestones/:id', (req, res, next) => {

    const {id} = req.params;
  
    if(!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({message: 'Specific id is not valid.'});
      return;
    }
  
    Milestone.findByIdAndRemove(id)
    .then(() => JourneyDetails.remove({milestone: id}))
    .then(() => Task.updateMany({milestones: mongoose.Types.ObjectId(id)}, {$pull: {milestones: mongoose.Types.ObjectId(id)}}, {multi: true}))
    .then(() => res.status(200).json({message: `Milestone with ${id} was removed successfully.`}))
    .catch(err => res.status(500).json(err))
  })
  
  //PUT MILESTONE
  router.put('/milestones/:id', (req, res, next) => {
  
    const {id} = req.params;
  
    if(!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({message: 'Specific id is not valid.'});
      return;
    }
  
    Milestone.findByIdAndUpdate(id, req.body, {new: true})
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json(err))
  })
  
  //GET MILESTONE
  router.get('/milestones/:id', (req, res, next) => {
  
    const {id} = req.params;
  
    if(!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({message: 'Specific id is not valid.'});
      return;
    }
  
    Milestone.findById(id)
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json(err))
  })
  
  //POST MILESTONES
  router.post('/milestones', (req, res, next) => {
    
    Milestone.create(req.body)
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json(err))
  })
  
  //GET MILESTONES
  router.get('/milestones', (req, res, next) => {
  
    Milestone.find()
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json(err))
  })

module.exports = router;