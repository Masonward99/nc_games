const { findUsers, addUser, findUser, findReviewsByUser, findCommentsByUser, findUserById } = require("../models/users.models")

exports.getUsers = (req, res, next) => {
    findUsers()
        .then(users => res.status(200).send({ users }))
        .catch(next)
}

exports.postUser = (req, res, next) => {
    addUser(req.params.username, req.body.name, req.body.avatar_url, req.body.id)
        .then((user) => res.status(201).send({user}))
        .catch(next)
}

exports.getUser = (req, res, next)=>{
    findUser(req.params.username)
        .then((user) => res.status(200).send({ user }))
        .catch(next)
}

exports.getReviewsByUser = (req, res, next) => {
    findReviewsByUser(req.params.username)
        .then((reviews) => res.status(200).send({ reviews }))
        .catch(next)
}

exports.getCommentsByUser = (req, res, next) => {
    findCommentsByUser(req.params.username)
        .then((comments) => res.status(200).send({ comments }))
        .catch(next)
}

exports.getUserById = (req, res, next) => {
    findUserById(req.params.id)
        .then((user) => res.status(200).send({ user }))
        .catch(next)
}