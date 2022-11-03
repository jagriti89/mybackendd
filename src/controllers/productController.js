const productModel= require("../models/productModel")
const createproduct= async function (req, res) {
    let data= req.body
    let savedata= await productModel.create(data)
res.send({ msg:savedata})
}
const getproduct = async function (req, res) {
   
    
    
}

module.exports.createproduct=createproduct; 
module.exports.getproduct=getproduct