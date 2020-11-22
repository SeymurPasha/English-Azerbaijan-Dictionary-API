const mongoose = require('mongoose');

const countrySchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    capital:{type:String, required:true}
});

module.exports = mongoose.model('Country', countrySchema)