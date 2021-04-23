const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const uploader = require('../configs/cloudinary');
const User = require('../models/user-model.js');

//POST PHOTO
router.post('/upload', uploader.single('imageUrl'), (req, res, next) => {
  console.log('file is: ', req.file)
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  res.json({secure_url: req.file.path });
});


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

//GET USERS
router.get('/users', (req, res, next) => {

  User.find()
  .populate('teamLeader')
  .populate('journeyProgress')
  .then(response => res.status(200).json(response))
  .catch(err => res.status(500).json(err))
})

module.exports = router;