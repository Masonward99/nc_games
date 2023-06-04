const { findCategories, addCategory } = require("../models/categories.models")

exports.getCategories = (req, res, next) => {
    findCategories()
        .then(result => res.status(200).send({ categories: result }))
    .catch(next)
}

exports.postCategories = (req, res, next) => {
    let slug = req.body.slug
    let desc = req.body.description
    
    addCategory(slug, desc)
        .then(category => res.status(201).send({ category }))
        .catch(next)
}