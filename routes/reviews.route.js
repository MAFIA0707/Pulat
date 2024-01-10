const express = require('express')
const reviewsRoute = express.Router()
const { createReviews, findAllReviews, findReviewsById, updateReviews, deleteReviews } = require("../controller/reviews.controller")
const authGuard = require("../middleware/auth.guard")
const app = express()




reviewsRoute.post("/",createReviews)
reviewsRoute.get("/", findAllReviews)
reviewsRoute.get("/:id", findReviewsById)
reviewsRoute.patch("/:id", updateReviews)
reviewsRoute.delete("/:id", deleteReviews)

module.exports = reviewsRoute