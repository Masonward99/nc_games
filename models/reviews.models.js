const connection = require("../db/connection");

const { checkExists } = require("../db/seeds/utils");

const format = require('pg-format')

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

exports.findReviews = () => {
    return connection
      .query(
        `SELECT reviews.review_id, COUNT(comments.review_id) AS comment_count, reviews.owner, reviews.title, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, reviews.designer  FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id GROUP BY reviews.review_id ORDER BY reviews.created_at DESC`
      )
      .then((results) => results.rows);
}

