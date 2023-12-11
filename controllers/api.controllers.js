const { findEndpoints } = require("../models/api.models")

exports.getEndpoints = (req,res,next) => {
    findEndpoints()
        .then(endpoint => res.status(200).send({ endpoint }))
    .catch(next)
}