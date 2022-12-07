const axios = require("axios");
const chainModel = require("../Models/chainModel");
exports.getBlockChain = async function (req, res) {
  try {
    let option = {
      method: "get",
      url: `https://api.coincap.io/v2/assets`,
      
    };
    let result = await axios(option);
    const { data } = await result.data;
    data.sort((a, b) => a.changePercent24Hr - b.changePercent24Hr);
    await chainModel.deleteMany();
    await data.forEach((element) => {
      const result = new chainModel(element);
      result.save();
    });

    console.log(data);
    res.status(200).send({ data: data });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};
