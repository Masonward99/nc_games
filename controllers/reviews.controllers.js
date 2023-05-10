const { findReviewById, findReview } = require("../models/reviews.models");

exports.getReviewById = (req,res,next) => {
    const id = req.params.review_id;
    findReviewById(id)
        .then(review => res.status(200).send({ review }))
        .catch(next);
}

exports.getReview = (req, res, next) => {
    findReview()
        .then(reviews => res.status(200).send({ reviews }))
        .catch(next)
}