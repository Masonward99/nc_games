const express = require('express');
const { getCategories } = require('../controllers/categories.controllers');
const { getEndpoints } = require('../controllers/api.controllers');
const { getReviewById } = require('../controllers/reviews.controllers');
const { postCommentByReviewId } = require('../controllers/comments.controllers');
const app = express();
app.use(express.json())

app.get('/api/categories', getCategories);

app.get('/api', getEndpoints)

app.get('/api/reviews/:review_id', getReviewById)

app.post('/api/reviews/:review_id/comments',postCommentByReviewId)

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