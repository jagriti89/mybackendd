const bookModel=require('../models/bookModel')
const authormodel=require('../models/authorModel')
const getbookdata=async function(req,res)
{
    let c=await authormodel.find({author_name:"Chetan Bhagat"}).select({author_id:1,_id:0})
    c=c[0].author_id
    const result=await bookModel.find({author_id:c})
    res.send({msg:result})
}
const autherlist=async function(req,res)
{
     autherlist=await authoreModel.find({author_id})
     res.send({msg:autherlist})

}

module.exports.getbookdata=getbookdata