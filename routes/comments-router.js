const { deleteCommentById, changeComment } = require('../controllers/comments.controllers');

const commentsRouter = require('express').Router()

commentsRouter
    .route('/:comment_id')
        .patch(changeComment)
        .delete( deleteCommentById)

module.exports =commentsRouter