
const { findReviewById, findCommentByReview, findReviews } = require("../models/reviews.models");
const { findReviewById, findReviews } = require("../models/reviews.models");

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
    findReviews()
        .then(reviews => res.status(200).send({ reviews }))
        .catch(next)
}