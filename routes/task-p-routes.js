const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const TaskProgress = require('../models/data/task-p-model');

//GET MILESTONE PROGRESS TASKS
router.get('/milestones-progress/:id/tasks', (req, res, next) => {

  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({message: 'Specific id is not valid.'});
    return;
  }

  TaskProgress.find({milestonesProgress: mongoose.Types.ObjectId(id)})
  .populate('milestonesProgresses')
  .then(response => res.status(200).json(response))
  .catch(err => res.status(500).json(err))
})

//DELETE TASK PROGRESS
router.delete('/tasks-progress/:id', (req, res, next) => {

  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({message: 'Specific id is not valid.'});
    return;
  }

  TaskProgress.findByIdAndRemove(id)
  .then(() => res.status(200).json({message: `Task Progress with ${id} was removed successfully.`}))
  .catch(err => res.status(500).json(err))
})

//PUT TASK PROGRESS
router.put('/tasks-progress/:id', (req, res, next) => {
  //TO DO: check how to deal with edit milestone in front-end
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({message: 'Specific id is not valid.'});
    return;
  }

  TaskProgress.findByIdAndUpdate(id, req.body, {new: true})
  .then(response => res.status(200).json(response))
  .catch(err => res.status(500).json(err))
})

//GET TASK PROGRESS
router.get('/tasks-progress/:id', (req, res, next) => {

  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({message: 'Specific id is not valid.'});
    return;
  }

  TaskProgress.findById(id)
  .populate('milestonesProgresses')
  .then(response => res.status(200).json(response))
  .catch(err => res.status(500).json(err))
})

//POST TASKS PROGRESS
router.post('/tasks-progress', (req, res, next) => {

  const {name, description, type, course, docsURL, submitURL, start, end, status, actualDuration, expectedDuration, milestonesProgress} = req.body

    TaskProgress.create({
      name, 
      description, 
      type, 
      course, 
      docsURL, 
      submitURL,
      start,
      end, 
      status, 
      actualDuration,
      expectedDuration, 
      milestonesProgress})
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json(err))
})

//GET TASKS PROGRESS
router.get('/tasks-progress', (req, res, next) => {

  TaskProgress.find()
  .populate('milestonesProgresses')
  .then(response => res.status(200).json(response))
  .catch(err => res.status(500).json(err))
})

module.exports = router;