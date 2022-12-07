const express=require('express');
const { getBlockChain } = require('../Controllers/chainController');
const router=express.Router();

router.get("/",(req,res)=>{
    res.status(200).json({success:"Welcome To Programming Yatra"})
})

router.get("/assets",getBlockChain)

module.exports=router;