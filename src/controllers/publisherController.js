const publishermodel= require("../models/publisherModel")

const createpublisher= async function (req, res) {
    let publisher = req.body
    let publisherCreated = await publishermodel.create(publisher)
    res.send({data: publisherCreated})
}

const getpublisherData= async function (req, res) {
    let publishers = await AuthorModel.find()
    res.send({data: publishers})
}

module.exports.createpublisher= createpublisher
module.exports.getpublisherData= getpublisherData