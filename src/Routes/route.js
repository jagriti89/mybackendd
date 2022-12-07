const express=require('express');
const { getBlockChain } = require('../Controllers/chainController');
const router=express.Router();

router.get("/",(req,res)=>{
    console.log("This is Home Page of Programming Yatra")
})

router.get("/assets",getBlockChain)

module.exports=router;