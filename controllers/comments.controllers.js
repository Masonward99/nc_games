const { addCommentsByReviewId } = require("../models/comments.models")

exports.postCommentByReviewId = (req,res,next) => {
    let id = req.params.review_id
    let body =req.body
    addCommentsByReviewId(body, id)
        .then(comment => res.status(201).send(comment))
        .catch(next)
}