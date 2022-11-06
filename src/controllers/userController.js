const userModel = require("../models/userModel")
//const UserModel= require("../models/userModel")






const createUser = async function (req, res) {
    const { name, address, balance, gender, age } = req.body

    let isfreeAppUser = req.abc;
    //console.log("hellow");
    //isfreeAppUser = isfreeAppUser.toLowerCase() == 'true' ? true : false
    if (!name || !address || !balance || !gender || !age) {
        return res.send({ msg: "all field is mendatory" })
    }

    const userDetails = await userModel.create({ name, address, balance, gender, age, isfreeAppUser })
    return res.send({ data: userDetails })

}






module.exports.createUser = createUser
//module.exports.getUser= getUser
////module.exports.basicCode= basicCode