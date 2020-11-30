const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    email: {
        type:String, 
        required:true,
        unique:true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
    password: {type:String, required:true},
    apiKey : {
        type: String,
        required: true,
        unique: true
    },
    host: {
        type:String,
        required:true
    },
    usage: {
    type:Array,
    required : true
    }
});

module.exports = mongoose.model('User', userSchema)