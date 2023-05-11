const connection = require("../db/connection");
const { checkExists } = require("../db/seeds/utils");

exports.findReviewById = (id) => {
    const idArray = [id];
    return connection.query(`SELECT * FROM reviews WHERE review_id = $1`, idArray)
        .then(result => {
            let review = result.rows[0];
            if (!review) {
                return Promise.reject({
                    status: 404,
                    msg:`no review found with id ${id}`
                })
            }
            return review;
        })
}

exports.findCommentByReview =  (id) => {
    const idArray = [id]
    return connection.query(`SELECT * FROM comments WHERE review_id = $1 ORDER BY created_at DESC`, idArray)
        .then(result => result.rows)
        .then(async (res) => {
            if (!res.length) {
                await checkExists('reviews', 'review_id', idArray)
            }
            return res
        })
}