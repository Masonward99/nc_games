const { postCommentByReviewId } = require('../controllers/comments.controllers')
const { getReviewById, patchReview, getCommentsByReview, getReviews } = require('../controllers/reviews.controllers')

const reviewsRouter = require('express').Router()

reviewsRouter
    .route('/:review_id')
    .get(getReviewById)
    .patch(patchReview)

reviewsRouter
    .route('/:review_id/comments')
    .get(getCommentsByReview)
    .post(postCommentByReviewId)

reviewsRouter.get('/', getReviews)

module.exports = reviewsRouter