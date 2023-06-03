const apiRouter = require('express').Router()
const { getEndpoints } = require('../controllers/api.controllers')
const categoriesRouter = require('./categories-router')
const commentsRouter = require('./comments-router')
const reviewsRouter = require('./reviews-router')
const userRouter =require('./users-router')

apiRouter.get('/', getEndpoints)

apiRouter.use('/users', userRouter)
apiRouter.use('/comments', commentsRouter)
apiRouter.use('/categories', categoriesRouter)
apiRouter.use('/reviews', reviewsRouter)

module.exports = apiRouter