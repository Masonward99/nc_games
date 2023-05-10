const connection = require("../db/connection");
const { calculateCommentCount } = require("../db/seeds/utils");
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

exports.findReview = () => {
    return connection.query(`SELECT reviews.review_id, COUNT(comments.review_id) FROM reviews JOIN comments ON comments.review_id = reviews.review_id GROUP BY reviews.review_id`)
        .then(index => Promise.all([index.rows, connection.query(`ALTER TABLE reviews ADD comment_count INT DEFAULT 0;` )]))
        .then(results => {
            const formatedCount = [];
            results[0].forEach(comment => {
                formatedCount.push([comment.count, comment.review_id])
            })
            for (let i = 0; i < formatedCount.length; i++){
                connection.query(
                  `UPDATE reviews SET comment_count = $1 WHERE review_id = $2 RETURNING *;`,
                  formatedCount[i]
                );
            }
        })
        .then(() => connection.query(`SELECT review_id, title, category, designer, owner, review_img_url, created_at, votes, comment_count FROM reviews ORDER BY created_at DESC`))
    .then(res=> res.rows)
}
