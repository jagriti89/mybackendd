const d= function(){
       let date=  new Date()
       return date
}

const month= function (){

    // const monthname=["january","february","march","apirl","may","june","july","August","September","october","november","December"]
     let name = month[date.getMonth()];
     return month
    }

const batchdetail=function()
{
    let ditail="w3d3"
    let topic="nodejs  module cover "

    console.log(ditail+" "+topic)
    return batchdetail 
}
module.exports.day=d
module.exports.monthh=monthname
module.exports.detail=batchdetail
