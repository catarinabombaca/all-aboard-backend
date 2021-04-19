const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const MilestoneProgress = require('../models/data/milestone-p-model');
const JourneyDetailsProgress = require('../models/data/journey-details-p-model');
const TaskProgress = require('../models/data/task-p-model');

//DELETE MILESTONE PROGRESS
router.delete('/milestones-progress/:id', (req, res, next) => {

    const {id} = req.params;
  
    if(!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({message: 'Specific id is not valid.'});
      return;
    }
  
    MilestoneProgress.findByIdAndRemove(id)
    .then(() => JourneyDetailsProgress.remove({milestone: id}))
    .then(() => TaskProgress.updateMany({milestones: mongoose.Types.ObjectId(id)}, {$pull: {milestones: mongoose.Types.ObjectId(id)}}, {multi: true}))
    .then(() => res.status(200).json({message: `Milestone Progress with ${id} was removed successfully.`}))
    .catch(err => res.status(500).json(err))
  })
  
  //PUT MILESTONE PROGRESS
  router.put('/milestones-progress/:id', (req, res, next) => {
  
    const {id} = req.params;
  
    if(!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({message: 'Specific id is not valid.'});
      return;
    }
  
    MilestoneProgress.findByIdAndUpdate(id, req.body, {new: true})
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json(err))
  })
  
  //GET MILESTONE PROGRESS
  router.get('/milestones-progress/:id', (req, res, next) => {
  
    const {id} = req.params;
  
    if(!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({message: 'Specific id is not valid.'});
      return;
    }
  
    MilestoneProgress.findById(id)
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json(err))
  })
  
  //POST MILESTONES PROGRESS
  router.post('/milestones-progress', (req, res, next) => {
    
    MilestoneProgress.create(req.body)
    .then(response => res.status(200).json(response))
    .catch(err => {
      console.log(err)
      res.status(500).json(err)})
  })
  
  //GET MILESTONES PROGRESS
  router.get('/milestones-progress', (req, res, next) => {
  
    MilestoneProgress.find()
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json(err))
  })

module.exports = router;