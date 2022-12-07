require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const route=require("./Routes/route")
const app = express();

app.use(express.json());
mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.URL, { useNewUrlParser: true })
  .then(() => console.log("MongoDb is Connected"))
  .catch((err) => console.log(err));

  app.use("/",route);

  app.listen(process.env.PORT,(req,res)=>{
    console.log("Express App is Running on ",process.env.PORT);
  })