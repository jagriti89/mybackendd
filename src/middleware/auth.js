const jwt = require("jsonwebtoken");
const bookModel = require("../models/bookModel");
const userModel = require("../models/userModel");
const validator = require("../Validations/Validator");

//________________________________|| AUTHENTICATION ||________________________________

const authentication = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    if (!token) {
      return res
        .status(400)
        .send({ status: false, message: "Token is missing" });
    }
    decodedToken = jwt.verify(token, "Group7", (err, decode) => {
      if (err) {
        return res
          .status(400)
          .send({ status: false, message: "Token is not correct!" });
      }
      req.decode = decode;
      next();
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

//________________________________|| AUTHORIZATION ||________________________________

const Authorisation = async function (req, res, next) {
  try {
    let bookId = req.params.bookId;

    if (!validator.isValidObjectId(bookId)) {
      return res
        .status(400)
        .send({ status: false, message: "please enter valid bookId" });
    }

    let CheckingBook = await bookModel.findOne({ _id: bookId });
    if (!validator.isValid(CheckingBook)) {
      return res
        .status(404)
        .send({ status: false, message: "this book is not found" });
    }
    if (CheckingBook.userId != req.decode.userId) {
      return res
        .status(403)
        .send({ status: false, message: "you are not Authorized person" });
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { authentication, Authorisation };
