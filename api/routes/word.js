const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Level_1 = require('../models/Level_1');
const Level_2 = require('../models/Level_2');
const Level_3 = require('../models/Level_3');


router.get('/level1', (req,res,next) => {
  Level_1.find()
  .then(words => res.json(words))
  .catch(err => res.status(400).json('Error :' + err))
})
router.get('/level2', (req,res,next) => {
  Level_2.find()
  .then(words => res.json(words))
  .catch(err => res.status(400).json('Error :' + err))
})
router.get('/level3', (req,res,next) => {
  Level_3.find()
  .then(words => res.json(words))
  .catch(err => res.status(400).json('Error :' + err))
})

router.post('/delete', (req,res) => {
  Level_2.deleteOne({ "eng": req.body.word}).then(function(){ 
    console.log("Data deleted"); // Success 
}).catch(function(error){ 
    console.log(error); // Failure 
}); 
 console.log(req.body.word);
})


module.exports = router;