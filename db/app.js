const express = require('express');

const cors = require('cors')

const apiRouter = require('../routes/api-router')

const app = express();

app.use(cors())
app.use(express.json())

app.use('/api', apiRouter)


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