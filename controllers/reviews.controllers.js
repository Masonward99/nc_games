
const { findReviewById, findCommentByReview, findReviews, changeReview, addReview, removeReviewById } = require("../models/reviews.models");

exports.getReviewById = (req, res, next) => {
    findReviewById(req.params.review_id)
        .then(review => res.status(200).send({ review }))
        .catch(next);
}

exports.getCommentsByReview = (req, res, next) => {
    findCommentByReview(req.params.review_id)
        .then(data => res.status(200).send({ comments: data }))
        .catch(next)
}
exports.getReviews = (req, res, next) => {
    let sortBy = req.query.sort_by
    let order = req.query.order
    if (!sortBy) {
        sortBy= 'created_at'
    }
    if (!order) {
        order = 'desc'
    }

    findReviews(req.query.category, sortBy, order)
        .then(reviews => res.status(200).send({ reviews }))
        .catch(next)
}

exports.patchReview = (req, res, next) => {
    changeReview(req.params.review_id, req.body.inc_votes)
        .then(review => res.status(200).send({review}))
        .catch(next)
}

exports.postReview = (req, res, next)=>{
    addReview(req.body)
        .then(review => res.status(200).send({review}))
        .catch(next)
}

exports.deleteReviewById = (req, res, next) => {
    removeReviewById(req.params.review_id)
        .then(( )=> res.status(204).send() )
        .catch(next)
}