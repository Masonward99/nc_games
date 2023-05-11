const connection = require('../db/connection')
const format = require('pg-format')

exports.addCommentsByReviewId = (body, id) => {
    let queryStr = format(`INSERT INTO comments (review_id, username, body) VALUES ($1, $2, $3)`,)
}