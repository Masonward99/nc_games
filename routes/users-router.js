const { getUsers, postUser } = require('../controllers/users.controllers');

const userRouter = require('express').Router()

userRouter.get('/', getUsers)

userRouter
    .route('/:username')
    .post(postUser)

module.exports =userRouter