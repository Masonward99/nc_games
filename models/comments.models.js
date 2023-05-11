const connection = require('../db/connection')
const format = require('pg-format')

exports.addCommentsByReviewId = (body, id) => {

    return connection.query(`INSERT INTO comments (review_id, author, body) VALUES ($1, $2, $3) RETURNING *`, [id, body.username, body.body])
    .then(result  => result.rows)
}