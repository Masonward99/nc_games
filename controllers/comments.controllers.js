const { removeCommentsById, addCommentsByReviewId, updateComments } = require("../models/comments.models");

exports.deleteCommentById = (req,res,next) => {
    removeCommentsById(req.params.comment_id)
        .then(() => res.status(204).send())
        .catch(next)
}


exports.postCommentByReviewId = (req, res, next) => {
    addCommentsByReviewId(req.body, req.params.review_id)
        .then(comment =>  res.status(201).send({ comment }))
        .catch(next)
}

exports.changeComment = (req, res, next) => {
    updateComments(req.body.inc_votes, req.params.comment_id)
        .then(comment => res.status(200).send({ comment }))
        .catch(next)
}