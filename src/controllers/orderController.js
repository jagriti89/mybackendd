//const mongoose=require("mongoose")
const { isValidObjectId, default: mongoose } = require("mongoose");
const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");
const orderUser = async function (req, res) {
  let reqbody = req.body;
  const { productId, userId } = reqbody

  if (!productId || !userId) {
    return res.send({ message: "productid and user id is mendetory" })
  }

  if (!isValidObjectId(userId))
    return res.send("userId is not  valide")
  if (!isValidObjectId(productId))
    return res.send("productId is not valid")
  let result1 = await productModel.findById(productId).select({ price: 1, _id: 0 })
  if (!result1)
    return res.send("product is not present")
  let result2 = await userModel.findById(userId).select({ balance: 1, _id: 0 })
  if (!result2)
    return res.send("user is not exist")

  if (req.abc == "true") {
    //	let isFreeAppUser=req.abc
    reqbody.isFreeAppUser = req.abc;
    let or = await orderModel.create(reqbody)
    return res.send(or)

  } else {
    if (result1.price > result2.balance)
      return res.send("user has no sufficient balance for order")
    else {
      reqbody.isFreeAppUser = req.abc

      reqbody.amount = result1.price
      let data = result2.balance - result1.price;

      await userModel.findOneAndUpdate({ $set: { balance: data } })
      let or = await orderModel.create(reqbody)
      return res.send(or)

    }

  }

}

module.exports.orderUser = orderUser;
//module.exports.getorder = getorder;
