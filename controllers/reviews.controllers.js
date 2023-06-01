
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
    findReviews(query)
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