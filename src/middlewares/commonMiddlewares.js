
//const mid1= function ( req, res, next) {
  //  req.falana= "hi there. i am adding something new to the req object"
   // console.log("Hi I am a middleware named Mid1")
   // next()
//}

//const mid2= function ( req, res, next) {
 //   console.log("Hi I am a middleware named Mid2")
  //  next()
//}

//const mid3= function ( req, res, next) {
 //   console.log("Hi I am a middleware named Mid3")
 //   next()
//}

//const mid4= function ( req, res, next) {
  //  console.log("Hi I am a middleware named Mid4")
//next()
//}

//const myMiddleware = function(req, res, next){
  //  console.log('I am inside a middleware!')
  //  next()
//}
const headerCheck=function(req,res,next)
{
    let  header=req.headers["isfreeAppUser"];
    if(header=="true" || header=="false"){
        console.log("isfreeAppUser is present in headers",header)
        next()
    }
    else
    {
        console.log("isfreeAppUser is not present in headers ")
        res.send("isfreeAppUser is not present in headers")
    }
}



module.exports.headerCheck=headerCheck;
//module.exports.mid1= mid1
//module.exports.mid2= mid2
//module.exports.mid3= mid3
//module.exports.mid4= mid4
//module.exports.myMiddleware = myMiddleware
