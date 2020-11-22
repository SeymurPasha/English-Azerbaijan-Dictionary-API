const express = require('express');
const router = express.Router();
const moongose = require('mongoose');
const Country = require('../models/country');
const checkAuth = require('../middleware/check-auth');

router.get('/', (req, res, next) => {
    Country.find()
    .then(countries => res.json(countries))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/', checkAuth, (req,res, next) => {
    const country = new Country({
    _id: new moongose.Types.ObjectId(),
    name:req.body.name,
    capital:req.body.capital
    });
    country
    .save()
    .then(result => {
    console.log(result);
    })
    .catch(err => console.log(err));
    res.status(200).json({
        message:'Handling POST request to /country',
        country:country
    });
});

router.get('/:countryId',(req, res, next) => {
const id = req.params.productId;
if(id === 'special')
 {
res.status(200).json({
message: 'You discovered the special ID',
id:id
});
 }
else {
    res.status(200).json({
        message:'You passed an ID'
    })
}
});
module.exports = router;