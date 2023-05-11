const express = require('express');
const { getCategories } = require('../controllers/categories.controllers');
const { getEndpoints } = require('../controllers/api.controllers');
const { getReviewById, getReviews } = require('../controllers/reviews.controllers');
const app = express();

app.get('/api/categories', getCategories);

app.get('/api', getEndpoints)

app.get('/api/reviews/:review_id', getReviewById)

app.get('/api/reviews', getReviews)
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
  if (err.code === '22P02') {
    res.status(400).send({msg: 'bad request'})
  } else {
    next(err)
  }
})

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send({ msg: "Internal server error!" });
});

module.exports = app