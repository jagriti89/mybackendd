const reviewModel = require("../models/reviewModel.js");
const bookModel = require("../models/bookModel.js");
const validator = require("../Validations/Validator");

//_______________________________|| CREATE REVIEW ||___________________________________

const createReview = async function (req, res) {
  try {
    let bookId = req.params.bookId;
    let data = req.body;

    let { review, rating, reviewedBy } = data;

    if (!bookId) {
      return res
        .status(400)
        .send({ status: false, message: "bookId is not present" });
    }

    if (!validator.isValidObjectId(bookId)) {
      return res
        .status(400)
        .send({ status: false, message: "this is not a valid book Id" });
    }

    let findBook = await bookModel.findOne({ _id: bookId, isDeleted: false });
    if (!validator.isValid(findBook)) {
      return res
        .status(404)
        .send({ status: false, message: "no books with this Books id" });
    }

    if (findBook.isDeleted === true) {
      return res
        .status(404)
        .send({ status: false, message: "This book has been deleted" });
    }

    if (!rating) {
      return res
        .status(400)
        .send({ status: false, message: "rating is a required field" });
    }

    if (!(rating <= 5 && rating >= 1)) {
      return res
        .status(400)
        .send({ status: false, message: "please provide a valid rating" });
    }

    if (!validator.isValid(review)) {
      return res
        .status(400)
        .send({ status: false, message: "review is a required field" });
    }

    if (!validator.isValid(reviewedBy)) {
      return res
        .status(400)
        .send({ status: false, message: "review is a required field" });
    }

    data.bookId = bookId;
    data.reviewedAt = Date.now();

    let checkDetails = await reviewModel.exists(data);

    if (checkDetails) {
      return res.status(400).send({
        status: false,
        message: "a review with this details already exists, please update it",
      });
    }

    let reviewCreated = await reviewModel.create(data);

    // Getting new Review data
    const reviewList = await reviewModel
      .findOne({ _id: reviewCreated._id })
      .select({ isDeleted: 0, createdAt: 0, updatedAt: 0, __v: 0 });

    // Updating the review count
    const ReviewCount = await bookModel
      .findOneAndUpdate(
        { _id: bookId },
        { $inc: { reviews: +1 } },
        { new: true }
      )
      .select({ __v: 0 });

    // reviews list
    const WithReview = ReviewCount.toObject();
    WithReview["reviewsData"] = reviewList;

    return res.status(201).send({
      status: true,
      messege: " Created Review Successful",
      data: WithReview,
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//_______________________________|| UPDATE REVIEW ||___________________________________

const updateReview = async function (req, res) {
  try {
    let data = req.body;
    let bookId = req.params.bookId;
    let reviewId = req.params.reviewId;

    if (!bookId) {
      return res
        .status(400)
        .send({ status: false, message: "bookId is not present" });
    }

    if (!validator.isValidObjectId(bookId)) {
      return res
        .status(400)
        .send({ status: false, message: "this is not a valid book Id" });
    }

    let findBook = await bookModel.findOne({ _id: bookId, isDeleted: false });

    if (!validator.isValid(findBook)) {
      return res.status(404).send({
        status: false,
        message: "A book with this id does not exists",
      });
    }

    if (findBook.isDeleted === true) {
      return res
        .status(404)
        .send({ status: false, message: "This book has been deleted" });
    }

    if (!reviewId) {
      return res
        .status(400)
        .send({ status: false, message: "reviewId is not present" });
    }
    if (!validator.isValidObjectId(reviewId)) {
      return res
        .status(400)
        .send({ status: false, message: "this is not a valid review Id" });
    }

    let findReview = await reviewModel.findOne({
      _id: reviewId,
      isDeleted: false,
    });

    if (!findReview) {
      return res.status(404).send({
        status: false,
        message: "A review with this id does not exists",
      });
    }

    if (findReview.isDeleted === true) {
      return res
        .status(404)
        .send({ status: false, message: "This review has been deleted" });
    }

    if (findReview.bookId != bookId) {
      return res
        .status(403)
        .send({ status: false, message: "This review is not of this book" });
    }

    let updateReview = await reviewModel
      .findOneAndUpdate({ _id: reviewId }, data, { new: true })
      .select({ isDeleted: 0, createdAt: 0, updatedAt: 0, __v: 0 });

    const updatedReview = findBook.toObject();
    updatedReview["reviewsData"] = updateReview;

    return res
      .status(200)
      .send({
        status: true,
        messege: " updated Review Successful",
        data: updatedReview,
      });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//_______________________________|| DELETE REVIEW ||___________________________________

const deleteReview = async function (req, res) {
  try {
    let bookId = req.params.bookId;
    let reviewId = req.params.reviewId;

    if (!bookId) {
      return res
        .status(400)
        .send({ status: false, message: "bookId is not present" });
    }

    if (!validator.isValidObjectId(bookId)) {
      return res
        .status(400)
        .send({ status: false, message: "this is not a valid book Id" });
    }

    if (!reviewId) {
      return res
        .status(400)
        .send({ status: false, message: "reviewId is not present" });
    }

    if (!validator.isValidObjectId(reviewId)) {
      return res
        .status(400)
        .send({ status: false, message: "this is not a valid review Id" });
    }

    let findBook = await bookModel.findOne({ _id: bookId });

    if (!findBook) {
      return res.status(404).send({
        status: false,
        message: "A book with this id does not exists",
      });
    }

    if (findBook.isDeleted == true) {
      return res
        .status(404)
        .send({ status: false, message: "This book has been deleted" });
    }

    let findReview = await reviewModel.findOne({ _id: reviewId });

    if (!findReview) {
      return res.status(404).send({
        status: false,
        message: "A review with this id does not exists",
      });
    }

    if (findReview.isDeleted == true) {
      return res
        .status(404)
        .send({ status: false, message: "This review is already deleted" });
    }

    if (findReview.bookId != bookId) {
      return res
        .status(403)
        .send({ status: false, message: "This review is not of this book" });
    }

    let deletedReview = await reviewModel.findOneAndUpdate(
      { _id: reviewId },
      { $set: { isDeleted: true }, deletedAt: Date.now() },
      { new: true, upsert: true }
    );
    await bookModel.findOneAndUpdate(
      { _id: bookId },
      { $inc: { reviews: -1 } },
      { new: true }
    );
    return res.status(200).send({
      status: true,
      message: "review has been deleted",
      data: deletedReview,
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//_______________________________|| EXPORTING MODULE TO ROUTE.JS ||___________________________________

module.exports = { createReview, updateReview, deleteReview };
