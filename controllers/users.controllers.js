const { findUsers, addUser, findUser, findReviewsByUser, findCommentsByUser } = require("../models/users.models")

exports.getUsers = (req, res, next) => {
    findUsers()
        .then(users => res.status(200).send({ users }))
        .catch(next)
}

exports.postUser = (req, res, next) => {
    const username = req.params.username
    const name = req.body.name
    const url = req.body.avatar_url
    const id = req.body.id
    addUser(username, name, url, id)
        .then((user) => res.status(201).send({user}))
        .catch(next)
}

exports.getUser = (req, res, next)=>{
    const username = req.params.username
    findUser(username)
        .then((user) => res.status(200).send({ user }))
        .catch(next)
}

exports.getReviewsByUser = (req, res, next) => {
    const username = req.params.username;
    findReviewsByUser(username)
        .then((reviews) => res.status(200).send({ reviews }))
        .catch(next)
}

exports.getCommentsByUser = (req, res, next) => {
    const username = req.params.username;
    findCommentsByUser(username)
        .then((comments) => res.status(200).send({ comments }))
        .catch(next)

}