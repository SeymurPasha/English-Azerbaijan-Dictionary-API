const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Word = require('../models/Word');


router.get('/', (req,res,next) => {
  Word.find()
  .then(words => res.json(words))
  .catch(err => res.status(400).json('Error :' + err))
})



module.exports = router;