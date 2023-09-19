const connection = require("../db/connection");

const { checkExists } = require("../db/seeds/utils");

const format = require('pg-format')

exports.findReviewById = (id) => {
    const idArray = [id];
    return connection.query(`SELECT reviews.review_id, COUNT(comments.review_id) AS comment_count, reviews.owner, reviews.title, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, reviews.designer,reviews.review_body  FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id  WHERE reviews.review_id = $1 GROUP BY reviews.review_id`, idArray)
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

exports.findReviews = (category, sortBy, order) => {
    if (!['asc', 'desc'].includes(order)) {
        return Promise.reject({status:400,msg:'invalid order query'})
    }
    if (!['category', 'created_at', 'comment_count', 'votes', 'category', 'review_id'].includes(sortBy)) {
        return Promise.reject({status:400, msg:'invalid sort_by query'})
    }

    if (category) {
        return connection.query(
          `SELECT reviews.review_id, COUNT(comments.review_id) AS comment_count, reviews.owner, reviews.title, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, reviews.designer  FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id  WHERE reviews.category = $1 GROUP BY reviews.review_id ORDER BY ${sortBy} ${order};`,[category]
        )
            .then(results => results.rows)
            .then(async (res) => {
                if (!res.length) {
                await checkExists('reviews','category', [category])
                }
                return res
        })
    }else{
          return connection
            .query(
              `SELECT reviews.review_id, COUNT(comments.review_id) AS comment_count, reviews.owner, reviews.title, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, reviews.designer  FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id GROUP BY reviews.review_id ORDER BY ${sortBy} ${order};`,
            )
              .then((results) => results.rows)
              .then(async (res) => {
                if (!res.length) {
                await checkExists('reviews','category', category)
                }
                return res
        })
    }
}

exports.changeReview = async (id, votes) => {
    let idArray = [id]
    await checkExists('reviews', 'review_id', idArray)
    return connection.query('UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *', [votes, id])
    .then(res => res.rows[0])
    
}
exports.addReview = async (body) => {
    await checkExists('categories', 'slug', [body.category])
    await checkExists('users','username',[body.owner])
    return connection.query('INSERT INTO reviews (owner, title, review_body, designer, category, review_img_url) VALUES ($1,$2,$3,$4,$5,$6) RETURNING review_id', [body.owner, body.title, body.review_body, body.designer, body.category, body.review_img_url])
        .then(result => result.rows[0].review_id)
        .then(id => this.findReviewById(id))
}

