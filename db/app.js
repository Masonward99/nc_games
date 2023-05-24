const express = require('express');
const { getCategories } = require('../controllers/categories.controllers');
const { getEndpoints } = require('../controllers/api.controllers');

const {deleteCommentById, postCommentByReviewId }=require('../controllers/comments.controllers')


const { getReviewById, getCommentsByReview, getReviews, patchReview } = require('../controllers/reviews.controllers');

const { getUsers } = require('../controllers/users.controllers');


const app = express();
app.use(express.json())

app.get('/api/categories', getCategories);

app.get('/api', getEndpoints)

app.get('/api/reviews/:review_id', getReviewById)

app.post('/api/reviews/:review_id/comments',postCommentByReviewId)

app.get('/api/reviews/:review_id/comments',getCommentsByReview)

app.get('/api/reviews', getReviews)

app.get('/api/users', getUsers)

app.delete('/api/comments/:comment_id', deleteCommentById)

app.patch('/api/reviews/:review_id',patchReview )

app.use('*', ( req, res, next) => {
  res.status(404).send({ msg: "Endpoint not found!" });
})

app.use((err, req, res, next)=>{
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg })
  } else {
    next(err)
  }
})

app.use((err, req, res, next) => {
  if (err.code === "22P02" || err.code === "23502" || err.code === "23503") {
    res.status(400).send({ msg: "bad request" });
  } else {
    next(err);
  }
})

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send({ msg: "Internal server error!" });
});

module.exports = app