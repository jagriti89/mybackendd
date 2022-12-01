const express = require("express");
const router = express.Router();

// ________________________________|| CONTROLLERS ||________________________________-----

const bookController = require("../controllers/bookController.js"); // BOOK CONTROLLER
const reviewController = require("../controllers/reviewController.js"); // REVIEW CONTROLLER
const userController = require("../controllers/userController.js"); // USER CONTROLLER

//________________________________|| MIDDLEWARE ||___________________________________

const {
  authentication,
  Authorisation,
  bookAuthorization,
} = require("../middleware/auth.js");

// ________________________________|| USER ||________________________________

router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);

// ________________________________|| BOOK ||________________________________

router.post("/books", authentication, bookController.createBooks);
router.get("/books", authentication, bookController.getBooks);
router.get("/books/:bookId", authentication, bookController.getBookById);
router.put(
  "/books/:bookId",
  authentication,
  Authorisation,
  bookController.updateBook
);
router.delete(
  "/books/:bookId",
  authentication,
  Authorisation,
  bookController.deleteBook
);

// ________________________________|| REVIEW ||________________________________

router.post("/books/:bookId/review", reviewController.createReview);
router.put("/books/:bookId/review/:reviewId", reviewController.updateReview);
router.delete("/books/:bookId/review/:reviewId", reviewController.deleteReview);

// ________________________________|| ROUTER VALIDATION ||________________________________-----

router.all("/*", function (req, res) {
  res.status(400).send({
    status: false,
    message: "Make Sure Your Endpoint is Correct !!!",
  });
});

module.exports = router;
