const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    name: String,
	balance:Number,
	address:String,
	age: Number,
    gender: {
        type: String,
        enum: ["male", "female", "other"] //"falana" will give an error
    },
    isfreeAppUser:{
		type:Boolean,
		default:false
    },
}, { timestamps: true });

module.exports = mongoose.model('Use', userSchema) //users



// String, Number
// Boolean, Object/json, array