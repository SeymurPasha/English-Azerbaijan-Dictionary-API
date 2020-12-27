const mongoose = require('mongoose');

const level_3Schema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    eng: {
        type:String
    },
    az: {type:String
    },
    level: {
        type:Number,
        default:3
    },
    image: {
        type: String
    }
});

module.exports = mongoose.model('Level_3', level_3Schema)