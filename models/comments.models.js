
const connection = require('../db/connection')
const format = require('pg-format')
const { checkExists } = require('../db/seeds/utils')

exports.removeCommentsById = async (id) => {
    const idArray =[id]
    await checkExists('comments', 'comment_id', idArray)
    return connection.query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`, idArray)
    .then(res => res.rows)
}


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

exports.updateComments = async (incVotes, id) => {
    let idArray = [id]
    await checkExists('comments', 'comment_id', idArray)
    return connection.query('UPDATE comments SET votes = votes + $1 WHERE comment_id = $2 RETURNING *',[incVotes, id])
        .then(res => res.rows[0])

}