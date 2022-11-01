const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const moment=require("moment");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://jagriti:Jaggu123@cluster0.nf3nfa7.mongodb.net/jaggu", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

//app.use (
  //  function (req, res, next) {
    //    console.log ("inside GLOBAL MW");
       // next();
  //}
  //);
  app.use(
    function(req,res,next)
{
  const date=moment().format("YYYY-MM-DD hh:mm:ss")
    const ipadd=req.socket.remoteAddress
    console.log( date+" "+ipadd)
    next();
}
  );

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
