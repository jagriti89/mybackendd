const productModel= require("../models/productModel")
const createproduct= async function (req, res) {
    const{name,category,price}=req.body
    if(!name|| !category|| !price)
    {
        return res.send("all fields name,category and price are mendatory field")
    }
    let productDetails=await productModel.create({name,category,price})
    res.send({data:productDetails})

}
module.exports.createproduct=createproduct; 
//module.exports.getproduct=getproduct;