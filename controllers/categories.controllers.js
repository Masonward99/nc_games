const { findCategories } = require("../models/categories.models")

exports.getCategories = (req, res) => {
    findCategories()
    .then(result => res.status(200).send({categories: result}))
}