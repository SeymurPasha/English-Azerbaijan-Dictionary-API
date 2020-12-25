const mongoose = require('mongoose');

const wordSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    eng: {
        type:String
    },
    az: {type:String
    },
    level: {
        type:Number,
        default:1
    },
    image: {
        type: String
    }
});

module.exports = mongoose.model('Word', wordSchema)