const connection = require('../db/connection')
const { checkExists } = require('../db/seeds/utils')

exports.removeCommentsById = async (id) => {
    await checkExists('comments', 'comment_id', [id])
    return connection.query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`, [id])
        .then(res => res.rows)
}


exports.addCommentsByReviewId = async (body, id) => {
    if (!body.username || !body.body) {
        return Promise.reject(
            {
                status: 400,
                msg: 'bad request'
            }
        )
    }
    await checkExists('reviews', 'review_id', [id])
    await checkExists('users','username',[body.username] )
    return connection.query(`INSERT INTO comments (review_id, author, body) VALUES ($1, $2, $3) RETURNING *`, [id, body.username, body.body])
        .then(result  =>result.rows[0])
}

exports.updateComments = async (incVotes, id) => {
    await checkExists('comments', 'comment_id', [id])
    return connection.query('UPDATE comments SET votes = votes + $1 WHERE comment_id = $2 RETURNING *',[incVotes, id])
        .then(res => res.rows[0])

}