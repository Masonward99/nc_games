
const { findReviewById, findCommentByReview, findReviews, changeReview } = require("../models/reviews.models");

exports.getReviewById = (req,res,next) => {
    const id = req.params.review_id;
    findReviewById(id)
        .then(review => res.status(200).send({ review }))
        .catch(next);
}


exports.getCommentsByReview = (req, res, next) => {
    const id = req.params.review_id
    findCommentByReview(id)
        .then(data => res.status(200).send({ comments: data }))
    .catch(next)
}
exports.getReviews = (req, res, next) => {
    const query = req.query
    const category = query.category
    let sortBy = query.sort_by
    let order = query.order
    if (!sortBy) {
        sortBy= 'created_at'
    }
    if (!order) {
        order = 'desc'
    }
    findReviews(category, sortBy, order)
        .then(reviews => res.status(200).send({ reviews }))
        .catch(next)
}

exports.patchReview = (req, res, next) => {
    const newVote = req.body.inc_votes
    const id = req.params.review_id
    changeReview(id, newVote)
        .then(review => res.status(200).send({review}))
    .catch(next)
}