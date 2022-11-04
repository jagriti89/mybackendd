const { isValidObjectId } = require("mongoose");
const orderModel= require("../models/orderModel");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");
const orderUser= async function (req, res) {
  const{productId,userId}=req.body
  const isfreeAppUser=req.isfreeAppUser
  if(!productId||!userId)
  {
    return res.send({message:"productid and user id is mendetory"})
  }
  if(!isValidObjectId(productId))
  {
    return res.send({msg:"product id is not vailed"})
  }



  const userDetails=await userModel.findById(userId)
  if(!userDetails){
    return res.send({msg:"user is not present"})
  }
  const productDetails=await productModel.findById(productId)
  if(!productDetails){
    return res.send({msg:"product is not present"})
  }
if(isfreeAppUser){

}

}

module.exports.orderUser=orderUser;
//module.exports.getorder = getorder;
