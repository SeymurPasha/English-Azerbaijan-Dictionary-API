const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fs = require('fs')

const Level_1 = require('../models/Level_1');
const Level_2 = require('../models/Level_2');
const Level_3 = require('../models/Level_3');


function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {}

    if (endIndex < await model.countDocuments().exec()) {
      results.next = {
        page: page + 1,
        limit: limit
      }
    }
    
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      }
    }
    try {
      results.results = await model.find().limit(limit).skip(startIndex).exec()
      res.paginatedResults = results
      next()
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
}

router.get('/beginner/v0', paginatedResults(Level_1), (req,res,next) => {
  res.json(res.paginatedResults)
})

router.get('/intermediate/v0',paginatedResults(Level_2),(req,res,next) => {
  res.json(res.paginatedResults)
})
router.get('/upper-intermediate/v0', paginatedResults(Level_3),(req,res,next) => {
  res.json(res.paginatedResults)
})


router.get('beginner/delete', (req,res) => {
  Level_1.deleteOne({eng:req.query.word}).then(function(){ 
    console.log("Data deleted");
}).catch(function(error){ 
    console.log(error); 
}); 
})
router.get('intermediate/delete', (req,res) => {
  Level_2.deleteOne({eng:req.query.word}).then(function(){ 
    console.log("Data deleted");
}).catch(function(error){ 
    console.log(error); 
}); 
})
router.get('upper-intermediate/delete', (req,res) => {
  Level_3.deleteOne({eng:req.body.word}).then(function(){ 
    console.log("Data deleted");
}).catch(function(error){ 
    console.log(error); 
}); 
})

router.get('/beginner/find/v0', (req,res) => {
  Level_1.findOne({eng: req.query.word }, function (err, docs) { 
    if (err){ 
        console.log(err) 
    } 
    else{ 
        res.send(docs); 
    } 
}); 
  });
router.get('/intermediate/find/v0', (req,res) => {
  Level_2.findOne({eng: req.query.word }, function (err, docs) { 
    if (err){ 
        console.log(err) 
    } 
    else{ 
        res.send(docs); 
    } 
}); 
  });

  router.get('/upper-intermediate/find/v0', (req,res) => {
    Level_3.findOne({eng: req.query.word }, function (err, docs) { 
      if (err){ 
          console.log(err) 
      } 
      else{ 
          res.send(docs); 
      } 
  }); 
    });




module.exports = router;