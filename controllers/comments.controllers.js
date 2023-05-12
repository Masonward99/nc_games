const { removeCommentsById } = require("../models/comments.models");

exports.deleteCommentById = (req,res,next) => {
    const id = req.params.comment_id;
    removeCommentsById(id)
        .then(() => res.status(204).send())
        .catch(next)
}