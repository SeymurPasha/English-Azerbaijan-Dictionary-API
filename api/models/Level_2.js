const mongoose = require('mongoose');

const level_2Schema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    eng: {
        type:String
    },
    az: {type:String
    },
    level: {
        type:Number,
        default:2
    },
    image: {
        type: String
    }
});

module.exports = mongoose.model('Level_2', level_2Schema)