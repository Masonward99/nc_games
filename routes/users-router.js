const { getUsers, postUser, getUser, getReviewsByUser, getCommentsByUser } = require('../controllers/users.controllers');

const userRouter = require('express').Router()

userRouter.get('/', getUsers)

userRouter
    .route('/:username')
    .post(postUser)
    .get(getUser)

userRouter
    .route('/:username/reviews')
    .get(getReviewsByUser)

userRouter
    .route('/:username/comments')
    .get(getCommentsByUser)

module.exports =userRouter