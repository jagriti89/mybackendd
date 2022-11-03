const mongoose = require('mongoose');
   
const orderSchema = new mongoose.Schema( {
    amount: Number,
	productId:{
        type:Number,
        required:true,
        ref:"product"
    },
    isfreeAppUser:{
		type:Boolean,
		default:false
	},
    userId:{
        type:Number,
        required:true,
        ref:"user"
    },
    amount:Number,
    isfreeAppUser:Boolean,
	date:String
},{ timestamps: true });
module.exports = mongoose.model('order', orderSchema) 
