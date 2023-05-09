const express = require('express');
const { getCategories } = require('../controllers/categories.controllers');
const app = express();

app.get('/api/categories', getCategories);

app.use('*', ( req, res, next) => {
  res.status(404).send({ msg: "Endpoint not found!" });
})
app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal server error!" });
});

module.exports = app