const orderModel= require("../models/orderModel")
const orderUser= async function (req, res) {
    let body = req.body
   res.send({msg:body})
}
const getorder = async function (req, res) {
   
    
    
}



module.exports.orderUser=orderUser;
module.exports.getorder = getorder;
