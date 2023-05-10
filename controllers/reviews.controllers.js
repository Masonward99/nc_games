const { findReviewById } = require("../models/reviews.models");

exports.getReviewById = (req,res,next) => {
    const id = req.params.review_id;
    findReviewById(id)
        .then(review => res.status(200).send({ review }))
        .catch(next);
}