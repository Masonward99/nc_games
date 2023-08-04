const { getUsers, postUser, getUser } = require('../controllers/users.controllers');

const userRouter = require('express').Router()

userRouter.get('/', getUsers)

userRouter
    .route('/:username')
    .post(postUser)
    .get(getUser)

module.exports =userRouter