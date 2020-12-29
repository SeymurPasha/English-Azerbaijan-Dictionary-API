const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Level_1 = require('../models/Level_1');
const Level_2 = require('../models/Level_2');
const Level_3 = require('../models/Level_3');

const paginate = (model) => {
  return async(req,res,next) => {
    const page = +(req.query.page)
    const limit = +(req.query.limit)

    const start = (page-1) * limit
    const end = page*limit

    const results = {}

    if(end > await model.countDocuments().exec()) {
      results.next = {
        page:page + 1,
        limit:limit
      }
    }
    if(start > 0) {
      results.previous = {
        page: page - 1,
        limit : limit
      }
    }
    try {
      results.results = await model.find().limit(limit).skip(start).exec()
      res.paginatedResults = results
      next()
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
}

router.get('/beginner', (req,res,next) => {
  Level_1.find()
  .then(words => res.status(200).json(words))
  .catch(err => res.status(400).json('Error :' + err))
})

router.get('/intermediate', paginate(Level_2), (req,res,next) => {
  res.json(res.paginatedResults)
})
router.get('/upper-intermediate', (req,res,next) => {
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
})
router.post('/update', (req,res) => {
  Level_2.findOneAndUpdate({"eng":"zone"}, {"az":"zona"}, () => {
    console.log();
  });

})
router.post('/beginner/find', (req,res) => {
  Level_1.findOne({eng: req.body.word }, function (err, docs) { 
    if (err){ 
        console.log(err) 
    } 
    else{ 
        res.send(docs); 
    } 
}); 
  });
router.post('/intermediate/find', (req,res) => {
  Level_2.findOne({eng: req.body.word }, function (err, docs) { 
    if (err){ 
        console.log(err) 
    } 
    else{ 
        res.send(docs); 
    } 
}); 
  });

  router.post('/upper-intermediate/find', (req,res) => {
    Level_3.findOne({eng: req.body.word }, function (err, docs) { 
      if (err){ 
          console.log(err) 
      } 
      else{ 
          res.send(docs); 
      } 
  }); 
    });




module.exports = router;