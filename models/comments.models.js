const connection = require('../db/connection')
const format = require('pg-format')
const { checkExists } = require('../db/seeds/utils')

exports.addCommentsByReviewId = async (body, id) => {
    if (!body.username || !body.body) {
        return Promise.reject({
            status: 400,
        msg:'bad request'})
    }
    let idArray= [id]
    await checkExists('reviews', 'review_id', idArray)
    await checkExists('users','username',[body.username] )
    return connection.query(`INSERT INTO comments (review_id, author, body) VALUES ($1, $2, $3) RETURNING *`, [id, body.username, body.body])
    .then(result  => result.rows[0])
}