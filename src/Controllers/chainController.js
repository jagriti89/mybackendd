const axios = require("axios");
const BlockChain = require("../Models/chainModel");

let response=null;
exports.getBlockChain = async (req, res) => {
  try {
    response = await axios.get("https://api.coincap.io/v2/assets", {
      headers: {
        "X-CMC_PRO_API_KEY": "b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c",
      },
    });
  } catch (ex) {
    response = null;
    // error
    console.log(ex);
    res.json(ex);
  }
  if (response) {
    // success
    for (let i = 0; i < response.length; i++) {
      const post = new BlockChain({
        symbol: response[i]["symbol"],
        name: response[i]["name"],
        marketCapUsd: response[i]["marketCapUsd"],
        priceUsd: response[i]["priceUsd"],
      });
      post.save();
    }
    const json = response.data;
   // console.log(json);
    res.status(200).send({ msg: json });
  }
};