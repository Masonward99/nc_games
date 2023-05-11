const connection = require('../db/connection')
const format = require('pg-format')
const { checkExists } = require('../db/seeds/utils')

exports.addCommentsByReviewId = async (body, id) => {
    let idArray= [id]
    await checkExists('reviews', 'review_id', idArray)
    return connection.query(`INSERT INTO comments (review_id, author, body) VALUES ($1, $2, $3) RETURNING *`, [id, body.username, body.body])
    .then(result  => result.rows[0])
}