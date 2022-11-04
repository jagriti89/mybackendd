const express = require('express');
const router = express.Router();
const UserController= require("../controllers/userController")
//const BookController= require("../controllers/bookController")
const commonMW = require ("../middlewares/commonMiddlewares")
const productController=require("../controllers/productController")
const orderController=require("../controllers/orderController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

//Can we set the 'next' input parameter in a route handler?
//What is the primary difference between a middleware and a route handler?
//router.post("/createBook", commonMW.myMiddleware,BookController.createBook, function(req, res, next){
 //   res.send("Ending the cycle")
//}  )
router.post("/createproduct",productController.createproduct)

router.post("/createorder",commonMW.headerCheck,orderController.orderUser)

router.post("/createUser",commonMW.headerCheck,UserController.createUser)

//router.get("/basicRoute", commonMW.mid1, commonMW.mid2, commonMW.mid3, commonMW.mid4, UserController.basicCode)

module.exports = router;