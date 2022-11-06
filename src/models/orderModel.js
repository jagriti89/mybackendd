const mongoose = require('mongoose');
   const objId=mongoose.Schema.Types.ObjectId
const orderSchema = new mongoose.Schema( {
	productId:{
        type:objId,
        required:true,
        ref:"product"
    },
    isfreeAppUser:{
		type:Boolean,
		default:false
	},
    userId:{
        type:objId,
        required:true,
        ref:"Use"
    },
    amount:{
        type:Number,
        required:true,
        default:0
    },
    
	date:String
},{ timestamps: true });
module.exports = mongoose.model('order', orderSchema) 
