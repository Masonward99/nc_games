
const { removeCommentsById, addCommentsByReviewId, updateComments } = require("../models/comments.models");

exports.deleteCommentById = (req,res,next) => {
    const id = req.params.comment_id;
    removeCommentsById(id)
        .then(() => res.status(204).send())
  .catch(next)
}


exports.postCommentByReviewId = (req,res,next) => {
    let id = req.params.review_id
    let body =req.body
    addCommentsByReviewId(body, id)
        .then(comment =>  res.status(201).send({ comment }))
        .catch(next)
}

exports.changeComment = (req, res, next) => {
    let id = req.params.comment_id
    let incVotes = req.body.inc_votes
    updateComments(incVotes, id)
        .then(comment => res.status(200).send({ comment }))
    .catch(next)
}