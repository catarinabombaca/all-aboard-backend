const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Task = require('../models/template/task-model');

//GET MILESTONE TASKS
router.get('/milestones/:id/tasks', (req, res, next) => {

  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({message: 'Specific id is not valid.'});
    return;
  }

  Task.find({milestones: mongoose.Types.ObjectId(id)})
  .populate('milestones')
  .then(response => res.status(200).json(response))
  .catch(err => res.status(500).json(err))
})

//DELETE TASK
router.delete('/tasks/:id', (req, res, next) => {

  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({message: 'Specific id is not valid.'});
    return;
  }

  Task.findByIdAndRemove(id)
  .then(() => res.status(200).json({message: `Task with ${id} was removed successfully.`}))
  .catch(err => res.status(500).json(err))
})

//PUT TASK
router.put('/tasks/:id', (req, res, next) => {
  //TO DO: check how to deal with edit milestone in front-end
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({message: 'Specific id is not valid.'});
    return;
  }

  Task.findByIdAndUpdate(id, req.body, {new: true})
  .then(response => res.status(200).json(response))
  .catch(err => res.status(500).json(err))
})

//GET TASK
router.get('/tasks/:id', (req, res, next) => {

  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({message: 'Specific id is not valid.'});
    return;
  }

  Task.findById(id)
  .populate('milestones')
  .then(response => res.status(200).json(response))
  .catch(err => res.status(500).json(err))
})

//POST TASKS
router.post('/tasks', (req, res, next) => {

  const {name, description, type, course, docsLink, expectedDuration, milestones} = req.body

    Task.create({
      name, 
      description, 
      type, 
      course, 
      docsLink, 
      expectedDuration, 
      milestones: milestones.split(',')})
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json(err))
})

//GET TASKS
router.get('/tasks', (req, res, next) => {

  Task.find()
  .populate('milestones')
  .then(response => res.status(200).json(response))
  .catch(err => res.status(500).json(err))
})

module.exports = router;