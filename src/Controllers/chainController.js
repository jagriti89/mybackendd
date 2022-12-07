let axios = require("axios");
const BlockChain = require("../Models/chainModel");

exports.getBlockChain = async function (req, res) {
  try {
    let option = {
      method: "get",
      url: `https://api.coincap.io/v2/assets`,
    };
    let result = await axios(option);
    const response = await result.data;
    for (let i = 0; i < response.length; i++) {
      const post=new BlockChain({
        symbol: response[i]["symbol"],
        name: response[i]["name"],
        marketCapUsd: response[i]["marketCapUsd"],
        priceUsd: response[i]["priceUsd"],
      });
      post.save()
    }

    console.log(result.data);
    res.status(200).send({ msg: result.data });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};
