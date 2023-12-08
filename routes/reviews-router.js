const { postCommentByReviewId } = require('../controllers/comments.controllers')
const { getReviewById, patchReview, getCommentsByReview, getReviews, postReview, deleteReviewById } = require('../controllers/reviews.controllers')

const reviewsRouter = require('express').Router()

reviewsRouter
    .route('/:review_id')
    .get(getReviewById)
    .patch(patchReview)
    .delete(deleteReviewById)

reviewsRouter
    .route('/:review_id/comments')
    .get(getCommentsByReview)
    .post(postCommentByReviewId)

reviewsRouter
    .route('/')
    .get(getReviews)
    .post(postReview)

module.exports = reviewsRouter