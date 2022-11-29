const bookModel = require("../models/bookModel.js");
const userModel = require("../models/userModel.js");
const reviewModel = require("../models/reviewModel");
const validator = require("../Validations/Validator");

//____________________________|| CREATE BOOKS ||____________________________

const createBooks = async (req, res) => {
  try {
    let bookData = req.body;
    let { title, userId, ISBN, category, subcategory, excerpt, releasedAt } =
      bookData;

    if (!validator.isValid(title)) {
      return res
        .status(400)
        .send({ status: false, message: "Title Must be Present" });
    }

    let isUniqueTitle = await bookModel.findOne({ title: title });
    if (isUniqueTitle) {
      return res
        .status(400)
        .send({ status: false, message: "this title is being used" });
    }

    if (!excerpt) {
      return res
        .status(400)
        .send({ status: false, message: "Excerpt Must be Present" });
    }

    if (!validator.isValidObjectId(userId)) {
      return res
        .status(400)
        .send({ status: false, message: "This is not a valid user id" });
    }

    let findUser = await userModel.findOne({ _id: userId });
    if (!validator.isValid(findUser)) {
      return res
        .status(404)
        .send({ status: false, message: "User with this Id does not exist" });
    }

    if (!validator.isValidISBN(ISBN)) {
      return res.status(400).send({
        status: false,
        message: "Please provide a valid isbn number",
      });
    }

    let isUniqueISBN = await bookModel.findOne({ ISBN: ISBN });

    if (isUniqueISBN) {
      return res
        .status(400)
        .send({ status: false, message: "This ISBN is already being used" });
    }

    if (!category) {
      return res
        .status(400)
        .send({ status: false, message: "category is a required field" });
    }

    if (!subcategory) {
      return res
        .status(400)
        .send({ status: false, message: "subcategory is can not be empty" });
    }

    if (!validator.isValidDate(releasedAt)) {
      return res
        .status(400)
        .send({ status: false, message: "Date format is not valid" });
    } //'2000-07-20'

    let saveBook = await bookModel.create(bookData);
    return res.status(201).send({
      status: true,
      message: "you book has been saved",
      data: saveBook,
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const getBooks = async (req, res) => {
  try {
    let data = req.query;
    let { userId, category, subcategory } = data;
    let filter = {
      isDeleted: false,
      ...data,
    };

    if (!validator.isValidObjectId(userId)) {
      return res
        .status(400)
        .send({ status: false, message: "this is not a valid user Id" });
    }

    let findbyUserId = await bookModel.findOne({ userId });
    if (!findbyUserId) {
      return res
        .status(404)
        .send({ status: false, message: "no books with this userId exists" });
    }

    if (category) {
      let findbyCategory = await bookModel.findOne({ category: category });
      if (!findbyCategory) {
        return res.status(404).send({
          status: false,
          message: "no books with this category exists",
        });
      }
    }

    if (subcategory) {
      let findbysubcategory = await bookModel.findOne({
        subcategory: subcategory,
      });
      if (!findbysubcategory) {
        return res.status(404).send({
          status: false,
          message: "no books with this subcategory exists",
        });
      }
    }

    let findBook = await bookModel
      .find(filter)
      .select({
        _id: 1,
        title: 1,
        excerpt: 1,
        userId: 1,
        category: 1,
        releasedAt: 1,
        reviews: 1,
      })
      .sort({ title: 1 });

    if (!findBook) {
      return res
        .status(404)
        .send({ status: false, message: "No books with this query exists" });
    } else {
      return res
        .status(200)
        .send({ status: true, message: "Book List", data: findBook });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//____________________________|| GET BOOKS BY PARAMS ||____________________________

const getBookById = async function (req, res) {
  try {
    let bookId = req.params.bookId;

    if (!validator.isValidObjectId(bookId)) {
      return res
        .status(400)
        .send({ status: false, message: "this is not a valid bookId " });
    }

    let findBook = await bookModel.findOne({ _id: bookId }).lean();

    if (!findBook) {
      return res.status(404).send({
        status: false,
        message: "No document exists with this book Id",
      });
    }

    if (findBook.isDeleted === true) {
      return res.status(404).send({
        status: false,
        message: "This book has been deleted by the user",
      });
    }

    let findReview = await reviewModel.find({
      bookId: findBook._id,
      isDeleted: false,
    });

    findBook["reviewsData"] = findReview;

    return res
      .status(200)
      .send({ status: false, message: "Book details", data: findBook });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

//____________________________|| UPDATE BOOKS ||____________________________

const updateBook = async function (req, res) {
  try {
    let bookId = req.params.bookId;
    let userId = req.query.userId;

    if (!validator.isValidObjectId(bookId)) {
      return res
        .status(400)
        .send({ status: false, message: "this is not a valid bookId " });
    }

    let checkBook = await bookModel.findOne({ _id: bookId });

    if (!checkBook) {
      return res
        .status(404)
        .send({ status: false, message: "No book with this Id exists" });
    }

    if (checkBook.isDeleted == true) {
      return res
        .status(404)
        .send({ status: false, message: "this book has been deleted by you" });
    }

    if (checkBook.userId != userId) {
      return res.status(401).send({
        status: false,
        message: "This book doesn't belong to you, hence you can't update it",
      });
    }

    if (!validator.isValidObjectId(userId)) {
      return res
        .status(400)
        .send({ status: false, message: "this is not a valid authorId " });
    }

    let findUser = await userModel.findOne({ _id: userId });

    if (!findUser) {
      return res.status(404).send({
        status: false,
        message: "a user with this id does not exists",
      });
    }

    let data = req.body;
    let { title, releasedAt, ISBN, excerpt } = data;

    if (title) {
      let findTitle = await bookModel.findOne({ title: title });
      if (findTitle) {
        return res.status(400).send({
          status: false,
          message: "This title is already in use, try another one",
        });
      }
    }

    if (!validator.isValidISBN(ISBN)) {
      return res.status(400).send({
        status: false,
        message: "Please provide a valid isbn number",
      });
    }

    let isUniqueISBN = await bookModel.findOne({ ISBN: ISBN });

    if (isUniqueISBN) {
      return res
        .status(400)
        .send({ status: false, message: "This ISBN is already being used" });
    }

    if (!validator.isValidDate(datePattern)) {
      return res
        .status(400)
        .send({ status: false, message: "Date format is not valid" });
    }

    let findBook = await bookModel.findOneAndUpdate(
      { _id: bookId },
      { $set: { ...data }, updatedAt: Date.now() },
      { new: true, upsert: true }
    );

    return res.status(200).send({
      status: true,
      message: "Updated successfully",
      data: findBook,
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//____________________________|| DELETE BOOKS ||____________________________

const deleteBook = async function (req, res) {
  try {
    let bookId = req.params.bookId;

    if (!bookId) {
      return res
        .status(400)
        .send({ status: false, message: "please provide a bookId in params" });
    }

    let findbookId = await bookModel.findById(bookId);
    if (!findbookId) {
      return res
        .status(404)
        .send({ status: false, msg: "bookId doesn't exists" });
    }

    const checkBookId = await bookModel.findOne({
      _id: bookId,
      isDeleted: false,
    });

    if (!checkBookId) {
      return res.status(404).send({ status: false, message: "no book found" });
    }

    let deletedBook = await bookModel.findByIdAndUpdate(
      { _id: bookId },
      { $set: { isDeleted: true } },
      { new: true }
    );

    return res
      .status(200)
      .send({ status: true, message: "book sucessfully deleted", deletedBook });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//____________________________|| EXPORTING MODULE TO ROUTE.JS ||____________________________

module.exports = { createBooks, getBooks, getBookById, updateBook, deleteBook };
