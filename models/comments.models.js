const connection = require("../db/connection")
const { checkExists } = require("../db/seeds/utils")

exports.removeCommentsById = async (id) => {
    const idArray =[id]
    await checkExists('comments', 'comment_id', idArray)
    return connection.query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`, idArray)
    .then(res => res.rows)
}