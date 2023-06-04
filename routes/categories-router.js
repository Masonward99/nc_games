const { getCategories, postCategories } = require('../controllers/categories.controllers')

const categoriesRouter = require('express').Router()

categoriesRouter
    .route('/')
    .get(getCategories)
    .post(postCategories)


module.exports = categoriesRouter