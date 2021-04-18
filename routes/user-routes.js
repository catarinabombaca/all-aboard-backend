const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const User = require('../models/user-model.js');

// //DELETE TASK
// router.delete('/tasks/:id', (req, res, next) => {

//   const {id} = req.params;

//   if(!mongoose.Types.ObjectId.isValid(id)) {
//     res.status(400).json({message: 'Specific id is not valid.'});
//     return;
//   }

//   Task.findByIdAndRemove(id)
//   .then(() => res.status(200).json({message: `Task with ${id} was removed successfully.`}))
//   .catch(err => res.status(500).json(err))
// })

//PUT USER
router.put('/users/:id', (req, res, next) => {
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({message: 'Specific id is not valid.'});
    return;
  }
    User.findByIdAndUpdate(id, req.body, {new: true})
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json(err))

})

//GET USER
router.get('/users/:id', (req, res, next) => {

  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({message: 'Specific id is not valid.'});
    return;
  }

  User.findById(id)
  .populate('journeyProgress')
  .populate('teamLeader')
  .then(response => res.status(200).json(response))
  .catch(err => res.status(500).json(err))
})

// //POST TASKS
// router.post('/tasks', (req, res, next) => {

//   const {name, description, type, course, docURL, expectedDuration, milestones} = req.body

//     Task.create({
//       name, 
//       description, 
//       type, 
//       course, 
//       docURL, 
//       expectedDuration})
//     .then(response => res.status(200).json(response))
//     .catch(err => res.status(500).json(err))
// })

//GET USERS
router.get('/users', (req, res, next) => {

  User.find()
  .populate('teamLeader')
  .populate('journeyProgress')
  .then(response => res.status(200).json(response))
  .catch(err => res.status(500).json(err))
})

module.exports = router;