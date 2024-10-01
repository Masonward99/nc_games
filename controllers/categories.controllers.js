const { findCategories, addCategory } = require("../models/categories.models")

exports.getCategories = (req, res, next) => {
    findCategories()
        .then(result => res.status(200).send({ categories: result }))
        .catch(next)
}

exports.postCategories = (req, res, next) => {
    addCategory(req.body.slug, req.body.description)
        .then(category => res.status(201).send({ category }))
        .catch(next)
}