const { findUsers, addUser } = require("../models/users.models")

exports.getUsers = (req, res, next) => {
    findUsers()
        .then(users => res.status(200).send({ users }))
        .catch(next)
}

exports.postUser = (req, res, next) => {
    const username = req.params.username
    const name = req.body.name
    const url = req.body.avatar_url
    addUser(username, name, url)
        .then((user) => res.status(201).send({user}))
        .catch(next)
}